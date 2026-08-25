import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";
import styles from "./NetworkAnalysis.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { getNetworkMetrics } from "../../services/networkService";

const LABELS = {
  nodes: "Network Nodes",
  connections: "Connections",
  clusters: "Clusters",
  centrality: "Centrality",
  kingpinConfidence: "Kingpin Confidence",
  gnnLastRun: "GNN Last Run",
};

export function NetworkMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getNetworkMetrics().then(setMetrics);
  }, []);

  return (
    <Card>
      <SectionHeader icon={Gauge} title="Network Metrics" />
      {!metrics ? (
        <SkeletonLines count={4} />
      ) : (
        <div className={styles.metricsGrid}>
          {Object.entries(LABELS).map(([key, label]) => (
            <div key={key} className={styles.metricCell}>
              <span className={styles.metricValue}>
                {key === "kingpinConfidence" ? `${metrics[key]}%` : metrics[key]}
              </span>
              <span className={styles.metricLabel}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
