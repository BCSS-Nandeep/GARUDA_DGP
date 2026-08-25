import { useEffect, useState } from "react";
import { ChevronRight, Workflow } from "lucide-react";
import styles from "./AIPipeline.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Skeleton } from "../../components/ui/Skeleton";
import { getPipelineStages } from "../../services/aiService";
import { formatNumber } from "../../utils/formatters";

export function PipelineFlow() {
  const [stages, setStages] = useState(null);

  useEffect(() => {
    getPipelineStages().then(setStages);
  }, []);

  return (
    <Card>
      <SectionHeader icon={Workflow} title="Processing Pipeline" description="Document ingestion → knowledge graph" />
      {!stages ? (
        <Skeleton height={140} radius={10} />
      ) : (
        <div className={styles.pipelineRow}>
          {stages.map((stage, i) => (
            <div className={styles.pipelineStep} key={stage.id}>
              <div className={[styles.stageCard, styles[stage.status.toLowerCase()]].filter(Boolean).join(" ")}>
                <StatusBadge status={stage.status} size="sm" />
                <div className={styles.stageLabel}>{stage.label}</div>
                <div className={styles.stageMeta}>{stage.currentJob}</div>
                <div className={styles.stageStats}>
                  <span>{formatNumber(stage.processed)} ok</span>
                  <span className={stage.failed > 0 ? styles.stageFailed : ""}>{stage.failed} failed</span>
                </div>
                <div className={styles.stageMeta}>{stage.latencyMs}ms avg</div>
              </div>
              {i < stages.length - 1 && <ChevronRight size={16} className={styles.arrow} />}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
