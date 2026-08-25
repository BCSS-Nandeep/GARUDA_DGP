import { FileText } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";

export function CaseCard({ caseItem, onClick }) {
  return (
    <EntityCardShell
      icon={FileText}
      title={caseItem.firNumber}
      subtitle={caseItem.section}
      badge={<Badge tone="warning">{caseItem.status}</Badge>}
      rows={[
        { label: "Police Station", value: caseItem.policeStation },
        { label: "Court Status", value: caseItem.courtStatus },
        { label: "Warrant", value: caseItem.warrantStatus },
        { label: "Filed On", value: caseItem.filedOn },
      ]}
      onClick={() => onClick?.(caseItem)}
    />
  );
}
