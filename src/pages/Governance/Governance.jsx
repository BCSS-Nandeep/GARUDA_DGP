import { useEffect, useMemo, useState } from "react";
import { ScrollText } from "lucide-react";
import styles from "./Governance.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Badge } from "../../components/ui/Badge";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Dropdown } from "../../components/ui/Dropdown";
import { DatePicker } from "../../components/ui/DatePicker";
import { FilterBar } from "../../components/ui/FilterBar";
import { AuditDetail } from "./AuditDetail";
import { LegalCompliance } from "./LegalCompliance";
import { AccessReports } from "./AccessReports";
import { getAuditEvents, getAuditFilters } from "../../services/auditService";
import { formatDateTime } from "../../utils/formatters";
import { PermissionGate } from "../../components/ui/PermissionGate";

export function Governance() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({ actions: [], systems: [] });
  const [action, setAction] = useState("ALL");
  const [system, setSystem] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAuditFilters().then(setFilterOptions);
  }, []);

  useEffect(() => {
    setLoading(true);
    getAuditEvents({ action, system }).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, [action, system]);

  const filtered = useMemo(() => {
    if (!fromDate) return events;
    const cutoff = new Date(fromDate).getTime();
    return events.filter((e) => e.timestamp >= cutoff);
  }, [events, fromDate]);

  const columns = [
    { key: "timestamp", header: "Timestamp", value: (r) => formatDateTime(r.timestamp), render: (r) => formatDateTime(r.timestamp) },
    { key: "officer", header: "Officer" },
    { key: "action", header: "Action" },
    { key: "entity", header: "Entity" },
    { key: "systemsAccessed", header: "Systems", value: (r) => r.systemsAccessed.join(", "), render: (r) => r.systemsAccessed.join(", ") },
    { key: "justification", header: "Justification" },
    { key: "result", header: "Status", render: (r) => <StatusBadge status={r.result} size="sm" /> },
  ];

  return (
    <div>
      <PageHeader
        icon={ScrollText}
        title="Governance / Audit Trail"
        description="Every access to intelligence data is logged and reviewable."
        actions={
          <>
            <Badge tone="neutral">Immutable</Badge>
            <Badge tone="success">SQL-Guarded</Badge>
          </>
        }
      />

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <Card>
            <SectionHeader icon={ScrollText} title="Digital Audit Trail" />
            <FilterBar
              right={
                <PermissionGate permission="governance.export">
                  <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>Use table export for CSV download</span>
                </PermissionGate>
              }
            >
              <DatePicker label="From date" value={fromDate} onChange={setFromDate} />
              <Dropdown
                label="Action"
                value={action}
                onChange={setAction}
                options={[{ value: "ALL", label: "All actions" }, ...filterOptions.actions.map((a) => ({ value: a, label: a }))]}
              />
              <Dropdown
                label="System"
                value={system}
                onChange={setSystem}
                options={[{ value: "ALL", label: "All systems" }, ...filterOptions.systems.map((s) => ({ value: s, label: s }))]}
              />
            </FilterBar>

            <DataTable
              columns={columns}
              data={filtered}
              loading={loading}
              searchable
              sortable
              pagination
              pageSize={10}
              exportable
              exportFilename="garuda-audit-trail.csv"
              onRowClick={setSelected}
              emptyDescription="No audit events match the current filters."
            />
          </Card>
        </div>
        <div className={styles.sideCol}>
          <LegalCompliance />
          <AccessReports />
        </div>
      </div>

      <AuditDetail event={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
