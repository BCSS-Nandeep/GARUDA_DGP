import styles from "./ProgressBar.module.css";

export function ProgressBar({ value = 0, max = 100, tone = "cyan", size = "md", showLabel = false }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={styles.wrap}>
      <div className={[styles.track, styles[size]].join(" ")}>
        <div className={[styles.fill, styles[tone]].join(" ")} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className={styles.label}>{Math.round(pct)}%</span>}
    </div>
  );
}
