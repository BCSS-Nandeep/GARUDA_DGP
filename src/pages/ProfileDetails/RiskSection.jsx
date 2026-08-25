import { ShieldAlert } from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { RiskScore } from "../../components/ui/RiskScore";

export function RiskSection({ profile }) {
  const maxPoints = Math.max(...profile.riskFactors.map((f) => f.points));

  return (
    <Card>
      <SectionHeader icon={ShieldAlert} title="Risk Assessment" />
      <div className={styles.riskLayout}>
        <RiskScore score={profile.riskScore} category={profile.riskCategory} confidence={profile.confidence} />
        <div className={styles.riskFactors}>
          <div className={styles.riskFactorsLabel}>Why this score?</div>
          {profile.riskFactors.map((f) => (
            <div className={styles.factorRow} key={f.label}>
              <span className={styles.factorLabel}>{f.label}</span>
              <div className={styles.factorBarTrack}>
                <div className={styles.factorBarFill} style={{ width: `${(f.points / maxPoints) * 100}%` }} />
              </div>
              <span className={styles.factorPoints}>+{f.points}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
