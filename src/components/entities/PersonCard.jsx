import { User } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";

const TONE_BY_CATEGORY = { CRITICAL: "danger", HIGH: "warning", MODERATE: "info", LOW: "success" };

export function PersonCard({ person, onClick }) {
  return (
    <EntityCardShell
      icon={User}
      title={person.name}
      subtitle={person.id}
      badge={<Badge tone={TONE_BY_CATEGORY[person.riskCategory] || "neutral"}>{person.riskCategory}</Badge>}
      rows={[
        person.aliases?.length && { label: "Aliases", value: person.aliases.join(", ") },
        { label: "Domains", value: person.domains?.join(", ") },
        person.knownAddresses?.[0] && { label: "Address", value: person.knownAddresses[0] },
      ].filter(Boolean)}
      onClick={() => onClick?.(person)}
    />
  );
}
