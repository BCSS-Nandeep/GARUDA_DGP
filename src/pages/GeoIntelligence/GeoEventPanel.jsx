import { ShieldAlert } from "lucide-react";
import styles from "./GeoIntelligence.module.css";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatRelativeTime } from "../../utils/formatters";
import { useNotifications } from "../../context/NotificationContext";

const SEVERITY_TONE = { CRITICAL: "danger", HIGH: "warning", MEDIUM: "info", INFO: "neutral" };

export function GeoEventPanel({ events, onViewSubject, onViewLocation }) {
  const notifications = useNotifications();

  if (!events?.length) {
    return <EmptyState icon={ShieldAlert} title="No geo events" description="No geo-fence or sighting events in the current window." />;
  }

  return (
    <div className={styles.eventList}>
      {events.map((e) => (
        <div key={e.id} className={styles.eventCard}>
          <div className={styles.eventTop}>
            <Badge tone={SEVERITY_TONE[e.severity]} size="sm">
              GEOFENCE ALERT · {e.severity}
            </Badge>
            <span className={styles.eventTime}>{formatRelativeTime(e.timestamp)}</span>
          </div>
          <div className={styles.eventBody}>
            <div className={styles.eventRow}>
              <span className={styles.eventLabel}>Subject</span>
              <span>{e.subject}</span>
            </div>
            <div className={styles.eventRow}>
              <span className={styles.eventLabel}>Location</span>
              <span>{e.location}</span>
            </div>
            <div className={styles.eventRow}>
              <span className={styles.eventLabel}>Distance</span>
              <span>{e.distance}</span>
            </div>
            <div className={styles.eventRow}>
              <span className={styles.eventLabel}>Source</span>
              <span>{e.source}</span>
            </div>
          </div>
          <div className={styles.eventActions}>
            <Button size="sm" variant="ghost" onClick={() => onViewSubject(e)}>
              View Subject
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onViewLocation(e)}>
              View Location
            </Button>
            <Button size="sm" variant="secondary" onClick={() => notifications.success("Alert acknowledged", e.id)}>
              Acknowledge
            </Button>
            <Button size="sm" variant="primary" onClick={() => notifications.info("Investigation opened", e.subject)}>
              Investigate
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
