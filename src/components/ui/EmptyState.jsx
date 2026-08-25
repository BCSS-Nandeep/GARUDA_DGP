import { Inbox } from "lucide-react";
import styles from "./EmptyState.module.css";
import { Button } from "./Button";

export function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.iconWrap}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className={styles.action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
