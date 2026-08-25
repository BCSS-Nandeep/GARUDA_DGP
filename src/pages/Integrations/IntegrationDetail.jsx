import { useState } from "react";
import { PlugZap, RefreshCw, FileText, SlidersHorizontal } from "lucide-react";
import styles from "./Integrations.module.css";
import { Drawer } from "../../components/ui/Drawer";
import { Button } from "../../components/ui/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { formatNumber, formatPercent } from "../../utils/formatters";
import { testConnection, syncNow } from "../../services/integrationService";
import { useNotifications } from "../../context/NotificationContext";
import { useRetainedValue } from "../../hooks/useRetainedValue";

export function IntegrationDetail({ integration: incoming, onClose }) {
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const notifications = useNotifications();
  // Retain the last record so the drawer can animate out with content intact.
  const integration = useRetainedValue(incoming);

  if (!integration) return null;

  async function handleTest() {
    setTesting(true);
    const result = await testConnection(integration.id);
    setTesting(false);
    if (result.ok) notifications.success("Connection healthy", integration.system);
    else notifications.error("Connection test failed", integration.system);
  }

  async function handleSync() {
    setSyncing(true);
    const result = await syncNow(integration.id);
    setSyncing(false);
    notifications.success("Sync complete", `${formatNumber(result.recordsSynced)} records synced from ${integration.system}`);
  }

  return (
    <Drawer
      open={!!incoming}
      onClose={onClose}
      title={integration.system}
      subtitle={integration.department}
      width={480}
      footer={
        <>
          <Button variant="secondary" icon={SlidersHorizontal} onClick={() => notifications.info("Configuration", "Opens integration configuration (not wired in this demo)")}>
            Configuration
          </Button>
          <Button variant="secondary" icon={PlugZap} onClick={handleTest} loading={testing}>
            Test Connection
          </Button>
          <Button variant="primary" icon={RefreshCw} onClick={handleSync} loading={syncing}>
            Sync Now
          </Button>
        </>
      }
    >
      <div className={styles.detailTop}>
        <StatusBadge status={integration.status} />
        <Badge tone="neutral">{integration.priority} priority</Badge>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>API Status</span>
          <span className={styles.detailValue}>{integration.apiStatus}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Integration Type</span>
          <span className={styles.detailValue}>{integration.integrationType}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Last Successful Sync</span>
          <span className={styles.detailValue}>{integration.lastSuccess}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Last Failed Sync</span>
          <span className={styles.detailValue}>{integration.lastFailed}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Records Processed</span>
          <span className={styles.detailValue}>{formatNumber(integration.records)}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Error Rate</span>
          <span className={styles.detailValue}>{formatPercent(integration.errorRate, 1)}</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Latency</span>
          <span className={styles.detailValue}>{integration.latency}ms</span>
        </div>
        <div className={styles.detailCell}>
          <span className={styles.detailLabel}>Data Freshness</span>
          <span className={styles.detailValue}>{integration.dataFreshness}</span>
        </div>
      </div>

      <div className={styles.eventsHeader}>
        <FileText size={13} strokeWidth={2} /> Recent Events
      </div>
      <div className={styles.eventLog}>
        {integration.recentEvents.map((e, i) => (
          <div key={i} className={styles.eventLogRow}>
            <span className={styles.eventLogTime}>{e.time}</span>
            <span>{e.event}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
