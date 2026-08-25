import { useState } from "react";
import { Phone, Eye, EyeOff } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";
import { usePermission } from "../../hooks/usePermission";

export function PhoneCard({ telecom, onClick }) {
  const [revealed, setRevealed] = useState(false);
  const canReveal = usePermission("profile.reveal");

  return (
    <EntityCardShell
      icon={Phone}
      title={telecom.number}
      subtitle={revealed && canReveal ? `${telecom.subscriber} — reveal logged to audit trail` : telecom.subscriber}
      badge={
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Badge tone={telecom.simStatus === "Active" ? "success" : "neutral"}>{telecom.simStatus}</Badge>
          {canReveal && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRevealed((v) => !v);
              }}
              aria-label={revealed ? "Hide number" : "Reveal number"}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}
            >
              {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          )}
        </span>
      }
      rows={[
        { label: "Last Seen", value: new Date(telecom.lastSeen).toLocaleString("en-IN") },
        { label: "Tower", value: telecom.tower },
        { label: "CDR", value: telecom.cdrRelationship },
      ]}
      onClick={() => onClick?.(telecom)}
    />
  );
}
