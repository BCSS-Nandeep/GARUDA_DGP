import { useEffect, useState } from "react";
import { FileScan } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { DataTable } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Drawer } from "../../components/ui/Drawer";
import { ConfidenceScore } from "../../components/ui/ConfidenceScore";
import { getDocuments } from "../../services/aiService";
import { useRetainedValue } from "../../hooks/useRetainedValue";

const COLUMNS = [
  { key: "name", header: "Document" },
  { key: "language", header: "Language" },
  { key: "extractionStatus", header: "Extraction", render: (r) => <StatusBadge status={r.extractionStatus} size="sm" /> },
  { key: "entities", header: "Entities" },
  {
    key: "confidence",
    header: "Confidence",
    render: (r) => (r.confidence != null ? <ConfidenceScore value={r.confidence} size="sm" /> : "—"),
  },
  { key: "validation", header: "Validation", render: (r) => <StatusBadge status={r.validation} size="sm" /> },
  { key: "dbStatus", header: "Database", render: (r) => <StatusBadge status={r.dbStatus} size="sm" /> },
  { key: "graphStatus", header: "Graph", render: (r) => <StatusBadge status={r.graphStatus} size="sm" /> },
];

export function DocumentProcessing() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  // Retain so the drawer keeps its content while animating out.
  const detail = useRetainedValue(selected);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  return (
    <Card>
      <SectionHeader icon={FileScan} title="Document Processing" />
      <DataTable
        columns={COLUMNS}
        data={documents}
        loading={loading}
        rowKey="id"
        onRowClick={setSelected}
        emptyDescription="No documents have been processed in this window."
      />
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={detail?.name} subtitle={detail?.id} width={420}>
        {detail && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", fontSize: "var(--fs-sm)" }}>
            <Row label="Language" value={detail.language} />
            <Row label="Extraction Status" value={<StatusBadge status={detail.extractionStatus} size="sm" />} />
            <Row label="Entities Extracted" value={detail.entities} />
            <Row label="Confidence" value={detail.confidence != null ? `${detail.confidence}%` : "—"} />
            <Row label="Validation" value={<StatusBadge status={detail.validation} size="sm" />} />
            <Row label="Database Status" value={<StatusBadge status={detail.dbStatus} size="sm" />} />
            <Row label="Graph Status" value={<StatusBadge status={detail.graphStatus} size="sm" />} />
          </div>
        )}
      </Drawer>
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "var(--sp-2)" }}>
      <span style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>{label}</span>
      <span style={{ color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}
