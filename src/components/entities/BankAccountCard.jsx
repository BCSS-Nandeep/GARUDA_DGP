import { Landmark } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";
import { formatCurrency } from "../../utils/formatters";

export function BankAccountCard({ account, onClick }) {
  return (
    <EntityCardShell
      icon={Landmark}
      title={account.accountMasked}
      subtitle={account.bank}
      badge={account.suspiciousTxns > 0 && <Badge tone="danger">{account.suspiciousTxns} flagged</Badge>}
      rows={[
        account.linkedEntities?.length && { label: "Linked Entities", value: account.linkedEntities.join(", ") },
        { label: "Flagged Total", value: formatCurrency(account.totalFlagged) },
      ].filter(Boolean)}
      onClick={() => onClick?.(account)}
    />
  );
}
