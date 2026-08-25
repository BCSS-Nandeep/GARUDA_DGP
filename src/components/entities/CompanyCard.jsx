import { Building2 } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";

export function CompanyCard({ company, onClick }) {
  return (
    <EntityCardShell
      icon={Building2}
      title={company.name || company.label}
      subtitle={company.id}
      rows={[company.linkedAccounts && { label: "Linked Accounts", value: company.linkedAccounts }].filter(Boolean)}
      onClick={() => onClick?.(company)}
    />
  );
}
