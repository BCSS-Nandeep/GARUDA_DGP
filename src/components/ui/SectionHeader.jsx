import styles from "./SectionHeader.module.css";

export function SectionHeader({ title, description, actions, icon: Icon }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        {Icon && <Icon size={16} strokeWidth={2} className={styles.icon} />}
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.right}>
        {description && <span className={styles.description}>{description}</span>}
        {actions}
      </div>
    </div>
  );
}
