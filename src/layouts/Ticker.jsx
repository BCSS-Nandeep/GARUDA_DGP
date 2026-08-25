import { useEffect, useRef } from "react";
import { animate } from "motion";
import styles from "./Ticker.module.css";
import { tickerItems } from "../data/tickerData";

const PIXELS_PER_SECOND = 45;

export function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const cycleWidth = el.scrollWidth / 2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cycleWidth) return;

    const controls = animate(el, { x: [0, -cycleWidth] }, { duration: cycleWidth / PIXELS_PER_SECOND, ease: "linear", repeat: Infinity });

    return () => controls.stop();
  }, []);

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>⬤ LIVE FEED</span>
      <div className={styles.track}>
        <div className={styles.inner} ref={trackRef}>
          {items.map((item, i) => (
            <span className={styles.item} key={`${item.id}-${i}`}>
              <span className={[styles.dot, styles[item.tone]].join(" ")} />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
