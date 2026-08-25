import styles from "./EntityCard.module.css";

export function EntityCardShell({ icon: Icon, title, subtitle, rows = [], badge, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <span className={styles.iconWrap}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className={styles.body}>
        <div className={styles.headRow}>
          <span className={styles.title}>{title}</span>
          {badge}
        </div>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {rows.length > 0 && (
          <div className={styles.rows}>
            {rows.map((r, i) => (
              <div className={styles.row} key={i}>
                <span className={styles.rowLabel}>{r.label}</span>
                <span className={styles.rowValue}>{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
