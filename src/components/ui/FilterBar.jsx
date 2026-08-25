import styles from "./FilterBar.module.css";

export function FilterBar({ children, right }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>{children}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
}

export function FilterChip({ active, onClick, children, count }) {
  return (
    <button className={[styles.chip, active ? styles.active : ""].filter(Boolean).join(" ")} onClick={onClick}>
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
}
