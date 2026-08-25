import { FileText, Gavel, Printer } from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { CaseCard } from "../../components/entities/CaseCard";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useNotifications } from "../../context/NotificationContext";

export function CriminalIntelligence({ cases }) {
  const notifications = useNotifications();

  if (!cases?.length) {
    return <EmptyState title="No criminal records" description="No FIRs or cases are currently linked to this subject." />;
  }

  return (
    <div className={styles.tabContent}>
      {cases.map((c) => (
        <div key={c.firNumber} className={styles.caseBlock}>
          <CaseCard caseItem={c} onClick={() => notifications.info("FIR opened", c.firNumber)} />
          <div className={styles.caseActions}>
            <Button size="sm" variant="ghost" icon={FileText} onClick={() => notifications.info("Opening FIR", c.firNumber)}>
              View FIR
            </Button>
            <Button size="sm" variant="ghost" icon={Gavel} onClick={() => notifications.info("Opening case file", c.firNumber)}>
              Open Case
            </Button>
            <Button size="sm" variant="ghost" icon={Printer} onClick={() => notifications.success("Report generation queued", c.firNumber)}>
              Generate Report
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
