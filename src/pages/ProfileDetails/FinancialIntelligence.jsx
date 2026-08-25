import { useNavigate } from "react-router-dom";
import { FileSignature, Share2, Printer } from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { BankAccountCard } from "../../components/entities/BankAccountCard";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useNotifications } from "../../context/NotificationContext";
import { PermissionGate } from "../../components/ui/PermissionGate";

export function FinancialIntelligence({ financial }) {
  const navigate = useNavigate();
  const notifications = useNotifications();

  if (!financial?.length) {
    return <EmptyState title="No financial records" description="No bank accounts or flagged transactions found for this subject." />;
  }

  return (
    <div className={styles.tabContent}>
      {financial.map((f) => (
        <div key={f.accountMasked} className={styles.caseBlock}>
          <BankAccountCard account={f} />
          <div className={styles.caseActions}>
            <PermissionGate permission="profile.reveal">
              <Button
                size="sm"
                variant="gold"
                icon={FileSignature}
                onClick={() => notifications.success("Bank Unocross auto-drafted", f.accountMasked)}
              >
                Auto-Draft Bank Unocross
              </Button>
            </PermissionGate>
            <Button size="sm" variant="ghost" icon={Share2} onClick={() => navigate("/network")}>
              View Network
            </Button>
            <Button size="sm" variant="ghost" icon={Printer} onClick={() => notifications.success("Report generation queued", f.accountMasked)}>
              Generate Report
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
