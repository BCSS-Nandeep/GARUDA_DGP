import { Radio } from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { PhoneCard } from "../../components/entities/PhoneCard";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useNotifications } from "../../context/NotificationContext";
import { PermissionGate } from "../../components/ui/PermissionGate";

export function TelecomIntelligence({ telecom }) {
  const notifications = useNotifications();

  if (!telecom?.length) {
    return <EmptyState title="No telecom records" description="No phone numbers or CDR relationships found for this subject." />;
  }

  return (
    <div className={styles.tabContent}>
      {telecom.map((t) => (
        <div key={t.number} className={styles.caseBlock}>
          <PhoneCard telecom={t} />
          <div className={styles.caseActions}>
            <PermissionGate permission="profile.reveal">
              <Button
                size="sm"
                variant="secondary"
                icon={Radio}
                onClick={() => notifications.success("Unocross CDR request auto-drafted", t.number)}
              >
                Auto-Draft Unocross CDR Request
              </Button>
            </PermissionGate>
          </div>
        </div>
      ))}
    </div>
  );
}
