import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import styles from "./NetworkAnalysis.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { ConfidenceScore } from "../../components/ui/ConfidenceScore";
import { getAiFindings } from "../../services/networkService";
import { formatRelativeTime } from "../../utils/formatters";

export function AiFindings() {
  const [findings, setFindings] = useState(null);

  useEffect(() => {
    getAiFindings().then(setFindings);
  }, []);

  return (
    <Card>
      <SectionHeader icon={Sparkles} title="AI / GNN Findings" />
      {!findings ? (
        <SkeletonLines count={3} />
      ) : (
        <div className={styles.findingsList}>
          {findings.map((f) => (
            <div key={f.id} className={styles.findingItem}>
              <div className={styles.findingTop}>
                <span className={styles.findingTitle}>{f.title}</span>
                <ConfidenceScore value={f.confidence} size="sm" />
              </div>
              <p className={styles.findingEntity}>{f.entity}</p>
              <p className={styles.findingReason}>{f.reason}</p>
              <div className={styles.findingMeta}>
                <span>{f.source}</span>
                <span>·</span>
                <span>{f.model}</span>
                <span>·</span>
                <span>{formatRelativeTime(f.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
