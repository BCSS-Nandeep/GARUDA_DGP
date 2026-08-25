import styles from "./IconButton.module.css";

export function IconButton({ icon: Icon, size = 18, label, active = false, badge, className = "", ...rest }) {
  return (
    <button
      className={[styles.iconBtn, active ? styles.active : "", className].filter(Boolean).join(" ")}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon size={size} strokeWidth={2} />
      {badge != null && badge !== 0 && <span className={styles.badge}>{badge > 99 ? "99+" : badge}</span>}
    </button>
  );
}
