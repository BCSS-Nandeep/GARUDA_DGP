import { Link2 } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";

export function RelationshipCard({ relationship, onClick }) {
  return (
    <EntityCardShell
      icon={Link2}
      title={`${relationship.source} → ${relationship.target}`}
      subtitle={relationship.label}
      badge={relationship.confidence !== undefined && <Badge tone="cyan">{relationship.confidence}% conf.</Badge>}
      onClick={() => onClick?.(relationship)}
    />
  );
}
