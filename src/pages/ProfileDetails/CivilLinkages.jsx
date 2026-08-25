import { Scale, FileStack } from "lucide-react";
import { EntityCardShell } from "../../components/entities/EntityCardShell";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useNotifications } from "../../context/NotificationContext";
import styles from "./ProfileDetails.module.css";

export function CivilLinkages({ civilLinkages }) {
  const notifications = useNotifications();

  if (!civilLinkages?.length) {
    return <EmptyState title="No civil linkages" description="No civil disputes or proceedings found for this subject." />;
  }

  return (
    <div className={styles.tabContent}>
      {civilLinkages.map((c, i) => (
        <div key={i} className={styles.caseBlock}>
          <EntityCardShell icon={Scale} title={c.type} subtitle={c.caseRef} badge={<Badge tone="neutral">{c.status}</Badge>} />
          <div className={styles.caseActions}>
            <Button size="sm" variant="gold" icon={FileStack} onClick={() => notifications.success("BC Roll generated", c.caseRef)}>
              Generate BC Roll
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
