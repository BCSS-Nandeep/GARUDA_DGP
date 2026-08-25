import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import styles from "./KpiCard.module.css";
import { formatCompactCurrency, formatNumber } from "../../utils/formatters";
import { prefersReducedMotion } from "../../utils/motion";

export function KpiCard({ id, title, value, isCurrency, trend, change, status = "info", sparkline, linkTo, total, index = 0 }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const valueRef = useRef(null);
  const max = sparkline ? Math.max(...sparkline) : 1;
  const format = (n) => (isCurrency ? formatCompactCurrency(n) : formatNumber(Math.round(n)));

  // Zero the counter and hide the card before first paint, so the final value
  // never flashes on screen ahead of the entrance/count-up timeline.
  useLayoutEffect(() => {
    const card = cardRef.current;
    const valueEl = valueRef.current;
    if (!card || !valueEl || prefersReducedMotion()) return;
    valueEl.textContent = format(0);
    gsap.set(card, { opacity: 0, y: 26 });
    gsap.set(card.querySelectorAll(`.${styles.bar}`), { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(card.querySelector(`.${styles.accent}`), { scaleX: 0, transformOrigin: "left" });
    gsap.set(card.querySelector(`.${styles.delta}`), { opacity: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const valueEl = valueRef.current;
    if (!card || !valueEl) return;

    const bars = card.querySelectorAll(`.${styles.bar}`);
    const delta = card.querySelector(`.${styles.delta}`);
    const accent = card.querySelector(`.${styles.accent}`);
    const reduced = prefersReducedMotion();

    if (reduced) {
      valueEl.textContent = format(value);
      gsap.set([card, delta], { clearProps: "all" });
      gsap.set(bars, { scaleY: 1 });
      gsap.set(accent, { scaleX: 1 });
      return;
    }

    const counter = { n: 0 };
    // Stagger each card off its grid position so the row reads left-to-right.
    const delay = index * 0.09;

    const tl = gsap.timeline({ delay });

    tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(
        counter,
        {
          n: value,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            valueEl.textContent = format(counter.n);
          },
        },
        "-=0.35"
      )
      .to(delta, { opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.85")
      .to(bars, { scaleY: 1, duration: 0.75, ease: "power2.out", stagger: 0.045 }, "-=0.95")
      .to(accent, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.7");

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isCurrency, index]);

  function handleEnter() {
    if (prefersReducedMotion()) return;
    gsap.to(cardRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
  }

  function handleLeave() {
    if (prefersReducedMotion()) return;
    gsap.to(cardRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  }

  return (
    <button
      ref={cardRef}
      className={[styles.card, styles[status]].join(" ")}
      onClick={() => linkTo && navigate(linkTo)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-testid={`kpi-${id}`}
    >
      <div className={styles.label}>{title}</div>
      <div className={styles.value}>
        <span ref={valueRef}>{format(value)}</span>
        {total !== undefined && <span className={styles.total}> / {total}</span>}
      </div>
      {change !== undefined && (
        <div className={[styles.delta, trend === "up" ? styles.up : trend === "down" ? styles.down : ""].filter(Boolean).join(" ")}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "●"} {trend !== "flat" ? `${Math.abs(change)}%` : "steady"}
        </div>
      )}
      {sparkline && (
        <div className={styles.miniChart}>
          {sparkline.map((v, i) => (
            <span
              key={i}
              className={[styles.bar, i === sparkline.length - 1 ? styles.barHighlight : ""].filter(Boolean).join(" ")}
              style={{ height: `${Math.round((v / max) * 100)}%` }}
            />
          ))}
        </div>
      )}
      <span className={styles.accent} />
    </button>
  );
}
