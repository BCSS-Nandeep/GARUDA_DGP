import { useEffect, useMemo, useState } from "react";
import { Bell, Check, UserPlus, TrendingUp, CheckCheck, Eye } from "lucide-react";
import styles from "./Alerts.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { FilterBar, FilterChip } from "../../components/ui/FilterBar";
import { AlertCard } from "../../components/ui/AlertCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { Drawer } from "../../components/ui/Drawer";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { PermissionGate } from "../../components/ui/PermissionGate";
import { getAlerts, acknowledgeAlert, assignAlert, escalateAlert, resolveAlert } from "../../services/alertService";
import { useNotifications } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { formatDateTime } from "../../utils/formatters";
import { useRetainedValue } from "../../hooks/useRetainedValue";

const FILTERS = ["All", "Critical", "High", "Medium", "Info", "Unread", "Assigned", "Resolved"];

export function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  // Retain so the drawer keeps its content while animating out.
  const detail = useRetainedValue(selected);
  const notifications = useNotifications();
  const { user } = useAuth();

  function load() {
    setLoading(true);
    getAlerts().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }

  useEffect(load, []);

  const filtered = useMemo(() => {
    switch (filter) {
      case "Critical":
      case "High":
      case "Medium":
      case "Info":
        return alerts.filter((a) => a.severity === filter.toUpperCase());
      case "Unread":
        return alerts.filter((a) => a.status === "unread");
      case "Assigned":
        return alerts.filter((a) => a.status === "assigned");
      case "Resolved":
        return alerts.filter((a) => a.status === "resolved");
      default:
        return alerts;
    }
  }, [alerts, filter]);

  async function handleAcknowledge(id) {
    await acknowledgeAlert(id);
    notifications.success("Alert acknowledged", id);
    load();
  }
  async function handleAssign(id) {
    await assignAlert(id, user?.name || "Unassigned");
    notifications.success("Alert assigned to you", id);
    load();
  }
  async function handleEscalate(id) {
    await escalateAlert(id);
    notifications.warning("Alert escalated to CRITICAL", id);
    load();
  }
  async function handleResolve(id) {
    await resolveAlert(id);
    notifications.success("Alert resolved", id);
    load();
    setSelected(null);
  }

  return (
    <div>
      <PageHeader icon={Bell} title="Alerts" description="Manage real-time intelligence alerts across all subjects and integrations." />

      <FilterBar>
        {FILTERS.map((f) => (
          <FilterChip
            key={f}
            active={filter === f}
            onClick={() => setFilter(f)}
            count={f === "All" ? alerts.length : undefined}
          >
            {f}
          </FilterChip>
        ))}
      </FilterBar>

      {loading ? (
        <SkeletonLines count={5} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No alerts in this view" description="Nothing matches the current filter." />
      ) : (
        <div className={styles.list}>
          {filtered.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onClick={() => setSelected(alert)}
              actions={
                <>
                  <Button size="sm" variant="ghost" icon={Eye} onClick={() => setSelected(alert)} />
                  {alert.status === "unread" && (
                    <Button size="sm" variant="ghost" icon={Check} onClick={() => handleAcknowledge(alert.id)} />
                  )}
                  <PermissionGate permission="alerts.assign">
                    <Button size="sm" variant="ghost" icon={UserPlus} onClick={() => handleAssign(alert.id)} />
                  </PermissionGate>
                </>
              }
            />
          ))}
        </div>
      )}

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={detail?.id} subtitle={detail?.entity} width={440}>
        {detail && (
          <div className={styles.detail}>
            <Badge tone="danger">{detail.severity}</Badge>
            <p className={styles.detailEvent}>{detail.event}</p>
            <div className={styles.detailMeta}>
              <span>{formatDateTime(detail.timestamp)}</span>
              <span>Source: {detail.source}</span>
              {detail.caseId && <span>Case: {detail.caseId}</span>}
              <span>Assignee: {detail.assignee || "Unassigned"}</span>
              <span>Status: {detail.status}</span>
            </div>
            <div className={styles.detailActions}>
              <Button variant="secondary" icon={Check} onClick={() => handleAcknowledge(detail.id)}>
                Acknowledge
              </Button>
              <PermissionGate permission="alerts.assign">
                <Button variant="secondary" icon={UserPlus} onClick={() => handleAssign(detail.id)}>
                  Assign to me
                </Button>
              </PermissionGate>
              <PermissionGate permission="alerts.escalate">
                <Button variant="secondary" icon={TrendingUp} onClick={() => handleEscalate(detail.id)}>
                  Escalate
                </Button>
              </PermissionGate>
              <PermissionGate permission="alerts.resolve">
                <Button variant="primary" icon={CheckCheck} onClick={() => handleResolve(detail.id)}>
                  Resolve
                </Button>
              </PermissionGate>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
