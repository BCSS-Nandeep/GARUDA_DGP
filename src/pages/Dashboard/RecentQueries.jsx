import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Badge } from "../../components/ui/Badge";
import { SkeletonLines } from "../../components/ui/Skeleton";
import styles from "./Dashboard.module.css";
import { getAuditEvents } from "../../services/auditService";
function formatClock(timestamp) {
  const date = new Date(timestamp);
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function RecentQueries() {
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuditEvents().then((data) => setEvents(data.filter((e) => e.officer !== "SYSTEM").slice(0, 6)));
  }, []);

  return (
    <Card>
      <SectionHeader
        icon={History}
        title="Recent Intelligence Queries"
        actions={
          <button
            onClick={() => navigate("/governance")}
            style={{ background: "transparent", border: "none", color: "var(--accent-cyan)", fontSize: "10px", fontFamily: "var(--font-mono)", cursor: "pointer" }}
          >
            Full audit trail
          </button>
        }
      />
      {!events ? (
        <SkeletonLines count={4} />
      ) : (
        <table className={styles.queryTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Officer</th>
              <th>Query</th>
              <th>Systems Hit</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} onClick={() => navigate("/governance")}>
                <td className="mono">{formatClock(e.timestamp)}</td>
                <td>{e.officer}</td>
                <td className="mono">{e.queryParameters}</td>
                <td>
                  <Badge tone="info" size="sm">
                    {e.systemsAccessed.length} DBs
                  </Badge>
                </td>
                <td className={styles.queryDuration} style={{ color: e.durationMs >= 80000 ? "var(--warning)" : "var(--success)" }}>
                  {(e.durationMs / 1000).toFixed(0)}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
