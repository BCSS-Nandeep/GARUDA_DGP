import { ShieldCheck } from "lucide-react";
import styles from "./Governance.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";

const ITEMS = [
  { label: "IT Act 2000", status: "ONLINE", note: "Compliant" },
  { label: "DPDP Act 2023", status: "ONLINE", note: "Compliant" },
  { label: "CDR Legal Framework", status: "ONLINE", note: "Compliant" },
  { label: "Data Sovereignty", status: "ONLINE", note: "On-Premise" },
  { label: "RBAC — Role Bound", status: "ONLINE", note: "Active" },
  { label: "Victim Data RLS", status: "ONLINE", note: "Enabled" },
  { label: "GARUDA-SQLGuard", status: "ONLINE", note: "Blocking" },
  { label: "Biometric Auth", status: "ONLINE", note: "85 Terminals" },
  { label: "Next Pentest", status: "PENDING", note: "May 2026" },
];

export function LegalCompliance() {
  return (
    <Card>
      <SectionHeader icon={ShieldCheck} title="Legal Compliance" />
      <div className={styles.complianceList}>
        {ITEMS.map((item) => (
          <div className={styles.complianceRow} key={item.label}>
            <span className={styles.complianceLabel}>{item.label}</span>
            <StatusBadge status={item.status} label={item.note} size="sm" />
          </div>
        ))}
      </div>
    </Card>
  );
}
