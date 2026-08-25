import styles from "./ConfidenceScore.module.css";

export function ConfidenceScore({ value, size = "md" }) {
  const tone = value >= 85 ? "success" : value >= 60 ? "warning" : "danger";
  return (
    <span className={[styles.wrap, styles[size]].join(" ")}>
      <span className={[styles.bar, styles[tone]].join(" ")} style={{ "--pct": `${value}%` }} />
      <span className={styles.label}>{value}%</span>
    </span>
  );
}
