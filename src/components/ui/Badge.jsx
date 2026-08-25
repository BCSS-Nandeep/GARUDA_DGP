import styles from "./Badge.module.css";

export function Badge({ tone = "neutral", size = "md", children, className = "" }) {
  return (
    <span className={[styles.badge, styles[tone], styles[size], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
