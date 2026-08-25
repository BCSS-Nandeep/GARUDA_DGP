import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./RiskScore.module.css";

const TONE_BY_CATEGORY = {
  CRITICAL: "danger",
  HIGH: "warning",
  MODERATE: "info",
  LOW: "success",
};

export function RiskScore({ score, category, confidence, size = "lg" }) {
  const tone = TONE_BY_CATEGORY[category] || "neutral";
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (score / 100) * circumference;
  const ringRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const scoreEl = scoreRef.current;
    if (!ring || !scoreEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ring.style.strokeDashoffset = offset;
      scoreEl.textContent = score;
      return;
    }

    const counter = { n: 0 };
    const tl = gsap.timeline();
    tl.fromTo(
      ring,
      { strokeDashoffset: circumference },
      { strokeDashoffset: offset, duration: 1, ease: "power2.out" },
      0
    ).to(
      counter,
      {
        n: score,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          scoreEl.textContent = Math.round(counter.n);
        },
      },
      0
    );
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, offset, circumference]);

  return (
    <div className={[styles.wrap, styles[size]].join(" ")}>
      <svg viewBox="0 0 64 64" className={styles.ring}>
        <circle cx="32" cy="32" r="26" className={styles.track} />
        <circle
          ref={ringRef}
          cx="32"
          cy="32"
          r="26"
          className={[styles.progress, styles[tone]].join(" ")}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.score} ref={scoreRef}>
          0
        </span>
      </div>
      <div className={styles.meta}>
        <span className={[styles.category, styles[tone]].join(" ")}>{category}</span>
        {confidence !== undefined && <span className={styles.confidence}>Confidence {confidence}%</span>}
      </div>
    </div>
  );
}
