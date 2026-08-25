import { useState } from "react";
import { User, Eye, EyeOff, MapPin } from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { usePermission } from "../../hooks/usePermission";
import { maskGeneric } from "../../utils/formatters";

export function IdentityCard({ profile }) {
  const [revealed, setRevealed] = useState(false);
  const canReveal = usePermission("profile.reveal");

  return (
    <Card className={styles.identityCard}>
      <div className={styles.identityTop}>
        <div className={styles.avatar}>
          <User size={28} strokeWidth={1.5} />
        </div>
        <div className={styles.identityMain}>
          <div className={styles.identityNameRow}>
            <h2 className={styles.identityName}>{profile.name}</h2>
            {profile.aliases?.length > 0 && (
              <span className={styles.aliasList}>aka {profile.aliases.join(", ")}</span>
            )}
          </div>
          <div className={styles.identityMetaRow}>
            <span className={styles.identityId}>{profile.id}</span>
            <Badge tone="neutral" size="sm">
              {profile.gender}
            </Badge>
            <Badge tone="neutral" size="sm">
              DOB {revealed && canReveal ? profile.dob : maskGeneric(profile.dob, 4)}
            </Badge>
            {canReveal && (
              <button className={styles.revealBtn} onClick={() => setRevealed((v) => !v)}>
                {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
                {revealed ? "Hide" : "Reveal"}
              </button>
            )}
          </div>
        </div>
      </div>
      {profile.knownAddresses?.length > 0 && (
        <div className={styles.addressList}>
          {profile.knownAddresses.map((addr, i) => (
            <span key={i} className={styles.addressItem}>
              <MapPin size={12} strokeWidth={2} />
              {addr}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
