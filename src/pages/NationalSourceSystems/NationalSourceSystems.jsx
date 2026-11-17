import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Database } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { IntegrationDetail } from "../Integrations/IntegrationDetail";
import { getIntegrations } from "../../services/integrationService";
import styles from "./NationalSourceSystems.module.css";

const STATUS_TONE = {
  LIVE: "success",
  SYNC: "info",
  SYNCING: "info",
  DEGRADED: "danger",
};

const PRIORITY_CLASS = {
  CRITICAL: styles.priorityCritical,
  HIGH: styles.priorityHigh,
  MEDIUM: styles.priorityMedium,
};

export function NationalSourceSystems() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getIntegrations().then((data) => {
      setRows(data);
      setLoading(false);
      if (id) setSelected(data.find((item) => item.id === id) || null);
    });
  }, [id]);

  const summary = useMemo(() => {
    const online = rows.filter((r) => r.displayStatus === "LIVE").length;
    const syncing = rows.filter((r) => r.displayStatus === "SYNC" || r.displayStatus === "SYNCING").length;
    const degraded = rows.filter((r) => r.displayStatus === "DEGRADED").length;
    return { online, syncing, degraded };
  }, [rows]);

  function openDetail(row) {
    setSelected(row);
    navigate(`/national-source-systems/${row.id}`);
  }

  function closeDetail() {
    setSelected(null);
    navigate("/national-source-systems");
  }

  function handleUpdated(updated) {
    setRows((prev) => prev.map((row) => (row.id === updated.id ? { ...row, ...updated } : row)));
    setSelected((prev) => (prev?.id === updated.id ? { ...prev, ...updated } : prev));
  }

  return (
    <div>
      <PageHeader
        icon={Database}
        title="National Source Systems"
        description="18-database integration universe across national, state, telecom, and financial sources."
      />

      <Card padded={false}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>18-Database Integration Universe</div>
          <div className={styles.summary}>
            <Badge tone="success">{summary.online} ONLINE</Badge>
            <Badge tone="info">{summary.syncing} SYNCING</Badge>
            <Badge tone="danger">{summary.degraded} DEGRADED</Badge>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>System</th>
                <th>Department</th>
                <th>Type</th>
                <th>Integration Mode</th>
                <th>Last Sync</th>
                <th>Records</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={`sk-${i}`}>
                      <td colSpan={9} className={styles.mono}>
                        Loading…
                      </td>
                    </tr>
                  ))
                : rows.map((row) => (
                    <tr
                      key={row.id}
                      className={selected?.id === row.id ? styles.active : undefined}
                      onClick={() => openDetail(row)}
                    >
                      <td className={styles.mono}>{row.index}</td>
                      <td>
                        <strong className={styles.systemName}>{row.system}</strong>
                      </td>
                      <td>{row.department}</td>
                      <td>{row.sourceType}</td>
                      <td className={styles.mono}>{row.integrationMode}</td>
                      <td className={styles.mono}>{row.lastSync}</td>
                      <td>{row.recordsLabel}</td>
                      <td>
                        <Badge tone={STATUS_TONE[row.displayStatus] || "neutral"} size="sm">
                          {row.displayStatus}
                        </Badge>
                      </td>
                      <td>
                        <span className={PRIORITY_CLASS[row.priority] || styles.priorityMedium}>{row.priority}</span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Card>

      <IntegrationDetail integration={selected} onClose={closeDetail} onUpdated={handleUpdated} />
    </div>
  );
}
