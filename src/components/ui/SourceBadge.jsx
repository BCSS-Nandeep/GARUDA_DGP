import { Database } from "lucide-react";
import styles from "./SourceBadge.module.css";
import { ConfidenceScore } from "./ConfidenceScore";

export function SourceBadge({ system, updated, confidence }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.system}>
        <Database size={12} strokeWidth={2} />
        {system}
      </span>
      {updated && <span className={styles.updated}>Updated {updated}</span>}
      {confidence !== undefined && <ConfidenceScore value={confidence} size="sm" />}
    </div>
  );
}
