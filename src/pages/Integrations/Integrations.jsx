import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plug } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { IntegrationDetail } from "./IntegrationDetail";
import { getIntegrations } from "../../services/integrationService";
import { formatNumber } from "../../utils/formatters";

const PRIORITY_TONE = { CRITICAL: "danger", HIGH: "warning", LOW: "neutral" };

const COLUMNS = [
  { key: "system", header: "System" },
  { key: "department", header: "Department" },
  { key: "integrationType", header: "Type" },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} size="sm" /> },
  { key: "lastSync", header: "Last Sync" },
  { key: "records", header: "Records", value: (r) => r.records, render: (r) => formatNumber(r.records) },
  { key: "latency", header: "Latency", render: (r) => `${r.latency}ms` },
  {
    key: "priority",
    header: "Priority",
    render: (r) => <Badge tone={PRIORITY_TONE[r.priority] || "neutral"}>{r.priority}</Badge>,
  },
];

export function Integrations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getIntegrations().then((data) => {
      setIntegrations(data);
      setLoading(false);
      if (id) setSelected(data.find((i) => i.id === id) || null);
    });
  }, [id]);

  function openDetail(row) {
    setSelected(row);
    navigate(`/integrations/${row.id}`);
  }

  function closeDetail() {
    setSelected(null);
    navigate("/integrations");
  }

  const onlineCount = integrations.filter((i) => i.status === "ONLINE").length;

  return (
    <div>
      <PageHeader
        icon={Plug}
        title="Integrations"
        description={`${onlineCount}/${integrations.length || 18} connected systems reporting healthy status.`}
      />
      <DataTable
        columns={COLUMNS}
        data={integrations}
        loading={loading}
        searchable
        sortable
        pagination
        pageSize={10}
        onRowClick={openDetail}
        emptyDescription="No integrations match this view."
      />
      <IntegrationDetail integration={selected} onClose={closeDetail} />
    </div>
  );
}
