import { FileBarChart2, ClipboardList, UserCog, ShieldAlert } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Button } from "../../components/ui/Button";
import { useNotifications } from "../../context/NotificationContext";

const REPORTS = [
  { label: "Q1 Audit Report", icon: FileBarChart2, variant: "secondary" },
  { label: "Data Quality Report", icon: ClipboardList, variant: "gold" },
  { label: "Officer Access Log", icon: UserCog, variant: "secondary" },
  { label: "Security Incidents", icon: ShieldAlert, variant: "danger" },
];

export function AccessReports() {
  const notifications = useNotifications();

  return (
    <Card>
      <SectionHeader title="Access Reports" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
        {REPORTS.map((r) => (
          <Button
            key={r.label}
            variant={r.variant}
            icon={r.icon}
            fullWidth
            onClick={() => notifications.info("Report generation queued", r.label)}
          >
            {r.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
