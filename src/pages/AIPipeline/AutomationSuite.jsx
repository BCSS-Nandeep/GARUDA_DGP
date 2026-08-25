import { Zap } from "lucide-react";
import styles from "./AIPipeline.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";

const AUTOMATIONS = [
  "Auto-Unocross Drafting",
  "Conflict Alert Engine",
  "BC Roll Auto-Generator",
  "IR Auto-Fill Templates",
  "Kingpin Discovery GNN",
  "LBS Geo-Fence Alerts",
];

export function AutomationSuite() {
  return (
    <Card>
      <SectionHeader icon={Zap} title="Automation Suite Status" />
      <div className={styles.automationList}>
        {AUTOMATIONS.map((label) => (
          <div className={styles.automationRow} key={label}>
            <span>{label}</span>
            <StatusBadge status="ONLINE" label="Active" size="sm" />
          </div>
        ))}
      </div>
    </Card>
  );
}
