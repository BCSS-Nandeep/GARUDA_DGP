import { useNavigate } from "react-router-dom";
import { Drawer } from "../../components/ui/Drawer";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { RelationshipCard } from "../../components/entities/RelationshipCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { useRetainedValue } from "../../hooks/useRetainedValue";

const RISK_TONE = { CRITICAL: "danger", HIGH: "warning", MODERATE: "info", LOW: "success" };

export function NodeDetailPanel({ node: incoming, graph, onClose }) {
  const navigate = useNavigate();
  // Retain the last node so the drawer can animate out with content intact.
  const node = useRetainedValue(incoming);
  if (!node) return null;

  const relatedEdges = graph.edges.filter((e) => e.source === node.id || e.target === node.id);
  const relationships = relatedEdges.map((e) => {
    const otherId = e.source === node.id ? e.target : e.source;
    const other = graph.nodes.find((n) => n.id === otherId);
    return { source: node.label, target: other?.label || otherId, label: e.label };
  });

  return (
    <Drawer
      open={!!incoming}
      onClose={onClose}
      title={node.label}
      subtitle={node.id}
      footer={
        node.type === "PERSON" ? (
          <Button variant="primary" onClick={() => navigate(`/profile/${node.id}`)}>
            Open Full Profile
          </Button>
        ) : undefined
      }
    >
      <div style={{ display: "flex", gap: "var(--sp-2)", marginBottom: "var(--sp-5)", flexWrap: "wrap" }}>
        <Badge tone="cyan">{node.type}</Badge>
        {node.role && <Badge tone={node.role === "KINGPIN" ? "danger" : "warning"}>{node.role}</Badge>}
        {node.risk && <Badge tone={RISK_TONE[node.risk] || "neutral"}>{node.risk} RISK</Badge>}
      </div>

      {(node.firs != null || node.status || node.links) && (
        <div style={{ display: "grid", gap: "var(--sp-3)", marginBottom: "var(--sp-5)", fontSize: "var(--fs-sm)" }}>
          {node.firs != null && (
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>FIRs</div>
              <div>{node.firs} registered</div>
            </div>
          )}
          {node.status && (
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>Status</div>
              <div style={{ color: "var(--accent-cyan)" }}>{node.status}</div>
            </div>
          )}
          {node.links && (
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>Network Links</div>
              <div>{node.links}</div>
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: 600, marginBottom: "var(--sp-2)" }}>
        Relationships ({relationships.length})
      </div>
      {relationships.length === 0 ? (
        <EmptyState title="No relationships found" description="No verified relationships are currently available for this entity." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
          {relationships.map((r, i) => (
            <RelationshipCard key={i} relationship={r} />
          ))}
        </div>
      )}
    </Drawer>
  );
}
