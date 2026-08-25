import styles from "./Timeline.module.css";

export function Timeline({ items }) {
  if (!items?.length) return null;
  return (
    <ol className={styles.wrap}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span className={[styles.dot, item.tone ? styles[item.tone] : ""].filter(Boolean).join(" ")} />
          <div className={styles.content}>
            <div className={styles.row}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.date}>{item.date}</span>
            </div>
            {item.source && <span className={styles.source}>{item.source}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}
