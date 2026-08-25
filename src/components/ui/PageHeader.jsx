import styles from "./PageHeader.module.css";

export function PageHeader({ title, description, icon: Icon, actions, breadcrumb }) {
  return (
    <div className={styles.wrap}>
      <div>
        {breadcrumb && <div className={styles.breadcrumb}>{breadcrumb}</div>}
        <div className={styles.titleRow}>
          {Icon && (
            <span className={styles.iconWrap}>
              <Icon size={20} strokeWidth={2} />
            </span>
          )}
          <h1 className={styles.title}>{title}</h1>
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
