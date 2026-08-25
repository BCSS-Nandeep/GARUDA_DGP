import styles from "./Tabs.module.css";

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className={styles.wrap} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className={[styles.tab, active === tab.key ? styles.active : ""].filter(Boolean).join(" ")}
          onClick={() => onChange(tab.key)}
        >
          {tab.icon && <tab.icon size={14} strokeWidth={2} />}
          {tab.label}
          {tab.count !== undefined && <span className={styles.count}>{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
