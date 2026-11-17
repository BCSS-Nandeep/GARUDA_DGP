import { useEffect, useState } from "react";
import { PlugZap, RefreshCw, FileText, SlidersHorizontal, Save, X } from "lucide-react";
import styles from "./Integrations.module.css";
import { Drawer } from "../../components/ui/Drawer";
import { Button } from "../../components/ui/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { formatNumber, formatPercent } from "../../utils/formatters";
import { testConnection, syncNow, updateIntegration } from "../../services/integrationService";
import { useNotifications } from "../../context/NotificationContext";
import { useRetainedValue } from "../../hooks/useRetainedValue";

const EDIT_FIELDS = [
  { key: "department", label: "Department" },
  { key: "sourceType", label: "Type" },
  { key: "integrationMode", label: "Integration Mode" },
  { key: "priority", label: "Priority" },
  { key: "displayStatus", label: "Display Status" },
  { key: "status", label: "System Status" },
  { key: "lastSync", label: "Last Sync" },
  { key: "recordsLabel", label: "Records Label" },
  { key: "apiStatus", label: "API Status" },
  { key: "lastSuccess", label: "Last Successful Sync" },
  { key: "lastFailed", label: "Last Failed Sync" },
  { key: "records", label: "Records Processed", type: "number" },
  { key: "errorRate", label: "Error Rate (%)", type: "number" },
  { key: "latency", label: "Latency (ms)", type: "number" },
  { key: "dataFreshness", label: "Data Freshness" },
];

function draftFrom(integration) {
  return Object.fromEntries(EDIT_FIELDS.map(({ key }) => [key, integration[key] ?? ""]));
}

export function IntegrationDetail({ integration: incoming, onClose, onUpdated }) {
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState(null);
  const notifications = useNotifications();
  // Retain the last record so the drawer can animate out with content intact.
  const integration = useRetainedValue(incoming);

  useEffect(() => {
    setEditing(false);
    setDraft(null);
  }, [incoming?.id]);

  if (!integration) return null;

  function startEdit() {
    setDraft(draftFrom(integration));
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setDraft(null);
  }

  function setField(key, value, type) {
    setDraft((prev) => ({
      ...prev,
      [key]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const patch = {
        ...draft,
        records: Number(draft.records) || 0,
        errorRate: Number(draft.errorRate) || 0,
        latency: Number(draft.latency) || 0,
        integrationType: draft.integrationMode,
      };
      const updated = await updateIntegration(integration.id, patch);
      setEditing(false);
      setDraft(null);
      notifications.success("Configuration saved", updated.system);
      onUpdated?.(updated);
    } catch (err) {
      notifications.error("Save failed", err instanceof Error ? err.message : "Could not save configuration");
    } finally {
      setSaving(false);
    }
  }

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
      onClose={() => {
        cancelEdit();
        onClose();
      }}
      title={integration.system}
      subtitle={integration.department}
      width={480}
      footer={
        editing ? (
          <>
            <Button variant="secondary" icon={X} onClick={cancelEdit} disabled={saving}>
              Cancel
            </Button>
            <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" icon={SlidersHorizontal} onClick={startEdit}>
              Configuration
            </Button>
            <Button variant="secondary" icon={PlugZap} onClick={handleTest} loading={testing}>
              Test Connection
            </Button>
            <Button variant="primary" icon={RefreshCw} onClick={handleSync} loading={syncing}>
              Sync Now
            </Button>
          </>
        )
      }
    >
      <div className={styles.detailTop}>
        <StatusBadge status={editing ? draft.status : integration.status} />
        <Badge tone="neutral">{editing ? draft.priority : integration.priority} priority</Badge>
      </div>

      {editing ? (
        <div className={styles.configForm}>
          {EDIT_FIELDS.map(({ key, label, type }) => (
            <label key={key} className={styles.configField}>
              <span className={styles.detailLabel}>{label}</span>
              <input
                className={styles.input}
                type={type === "number" ? "number" : "text"}
                value={draft[key] ?? ""}
                onChange={(event) => setField(key, event.target.value, type)}
              />
            </label>
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}
    </Drawer>
  );
}
