import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellRing } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { AlertCard } from "../../components/ui/AlertCard";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { getRecentAlerts } from "../../services/dashboardService";

export function AlertFeed() {
  const [alerts, setAlerts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRecentAlerts(6).then(setAlerts);
  }, []);

  return (
    <Card>
      <SectionHeader
        icon={BellRing}
        title="Intelligence Alert Feed"
        actions={
          <button
            onClick={() => navigate("/alerts")}
            style={{ background: "transparent", border: "none", color: "var(--accent-cyan)", fontSize: "var(--fs-xs)", fontWeight: 600, cursor: "pointer" }}
          >
            View all
          </button>
        }
      />
      {!alerts ? (
        <SkeletonLines count={4} />
      ) : alerts.length === 0 ? (
        <EmptyState title="No active alerts" description="All clear. New intelligence alerts will appear here in real time." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
          {alerts.map((a) => (
            <AlertCard key={a.id} alert={a} onClick={() => navigate("/alerts")} />
          ))}
        </div>
      )}
    </Card>
  );
}
