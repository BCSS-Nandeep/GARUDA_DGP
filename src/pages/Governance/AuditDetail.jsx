import styles from "./Governance.module.css";
import { Drawer } from "../../components/ui/Drawer";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { formatDateTime } from "../../utils/formatters";
import { useRetainedValue } from "../../hooks/useRetainedValue";

const FIELD_ROWS = [
  ["id", "Audit ID"],
  ["officer", "User"],
  ["role", "Role"],
  ["session", "Session"],
  ["action", "Action"],
  ["entity", "Entity"],
  ["case", "Case"],
  ["queryParameters", "Query"],
  ["justification", "Justification"],
  ["authorization", "Authorization"],
  ["device", "Device"],
  ["correlationId", "Correlation ID"],
];

export function AuditDetail({ event: incoming, onClose }) {
  // Retain the last event so the drawer can animate out with content intact.
  const event = useRetainedValue(incoming);
  if (!event) return null;

  return (
    <Drawer open={!!incoming} onClose={onClose} title="Audit Event" subtitle={event.id} width={460}>
      <div className={styles.detailTop}>
        <StatusBadge status={event.result} />
        <span className={styles.detailTimestamp}>{formatDateTime(event.timestamp)}</span>
      </div>
      <div className={styles.detailRows}>
        {FIELD_ROWS.map(([key, label]) => (
          <div className={styles.detailRow} key={key}>
            <span className={styles.detailLabel}>{label}</span>
            <span className={styles.detailValue}>{event[key] || "—"}</span>
          </div>
        ))}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Systems Accessed</span>
          <span className={styles.systemBadges}>
            {event.systemsAccessed.map((s) => (
              <Badge key={s} tone="neutral" size="sm">
                {s}
              </Badge>
            ))}
          </span>
        </div>
      </div>
    </Drawer>
  );
}
