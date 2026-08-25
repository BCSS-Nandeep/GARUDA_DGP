import { AlertTriangle, ChevronRight } from "lucide-react";
import styles from "./AlertCard.module.css";
import { Badge } from "./Badge";
import { formatRelativeTime } from "../../utils/formatters";

const SEVERITY_TONE = { CRITICAL: "danger", HIGH: "warning", MEDIUM: "info", INFO: "neutral" };

export function AlertCard({ alert, onClick, actions }) {
  return (
    <div className={[styles.wrap, styles[SEVERITY_TONE[alert.severity]]].join(" ")} onClick={onClick}>
      <span className={styles.sevBar} />
      <div className={styles.icon}>
        <AlertTriangle size={16} strokeWidth={2} />
      </div>
      <div className={styles.body}>
        <div className={styles.topRow}>
          <Badge tone={SEVERITY_TONE[alert.severity]} size="sm">
            {alert.severity}
          </Badge>
          <span className={styles.time}>{formatRelativeTime(alert.timestamp)}</span>
        </div>
        <p className={styles.event}>{alert.event}</p>
        <div className={styles.metaRow}>
          <span className={styles.entity}>{alert.entity}</span>
          <span className={styles.dotSep}>•</span>
          <span>{alert.source}</span>
          {alert.caseId && (
            <>
              <span className={styles.dotSep}>•</span>
              <span className={styles.caseId}>{alert.caseId}</span>
            </>
          )}
        </div>
      </div>
      {actions ? <div className={styles.actions} onClick={(e) => e.stopPropagation()}>{actions}</div> : onClick && <ChevronRight size={16} className={styles.chevron} />}
    </div>
  );
}
