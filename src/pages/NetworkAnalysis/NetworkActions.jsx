import { Download, GitBranch, Siren } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Button } from "../../components/ui/Button";
import { useNotifications } from "../../context/NotificationContext";

export function NetworkActions({ onExpand }) {
  const notifications = useNotifications();

  return (
    <Card>
      <SectionHeader title="Actions" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
        <Button variant="secondary" icon={Download} fullWidth onClick={() => notifications.success("Network report exported")}>
          Export Network Report
        </Button>
        <Button variant="gold" icon={GitBranch} fullWidth onClick={onExpand}>
          Expand to 2nd Degree
        </Button>
        <Button variant="danger" icon={Siren} fullWidth onClick={() => notifications.warning("Kingpin flagged for arrest")}>
          Flag Kingpin for Arrest
        </Button>
      </div>
    </Card>
  );
}
