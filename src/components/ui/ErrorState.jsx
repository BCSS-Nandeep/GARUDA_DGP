import { AlertOctagon } from "lucide-react";
import styles from "./EmptyState.module.css";
import { Button } from "./Button";

export function ErrorState({ title = "Something went wrong", description, retryLabel = "Retry", onRetry, secondaryLabel, onSecondary }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.iconWrap} style={{ color: "var(--danger)", background: "var(--danger-dim)" }}>
        <AlertOctagon size={28} strokeWidth={1.5} />
      </div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      <div style={{ display: "flex", gap: "var(--sp-2)", marginTop: "var(--sp-3)" }}>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        )}
        {onSecondary && secondaryLabel && (
          <Button variant="ghost" size="sm" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
