import { useEffect, useState } from "react";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Cpu } from "lucide-react";
import styles from "./AIPipeline.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Skeleton } from "../../components/ui/Skeleton";
import { getModelMonitoring } from "../../services/aiService";
import { formatNumber, formatPercent } from "../../utils/formatters";

function ChartTip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.chartTip}>
      <div>{label}</div>
      <div className={styles.chartTipValue}>
        {payload[0].value}
        {unit}
      </div>
    </div>
  );
}

export function ModelMonitoring() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getModelMonitoring().then(setData);
  }, []);

  return (
    <Card>
      <SectionHeader icon={Cpu} title="Model Monitoring" />
      {!data ? (
        <Skeleton height={220} />
      ) : (
        <>
          <div className={styles.monitorStats}>
            <div className={styles.statCell}>
              <span className={styles.statValue}>{formatPercent(data.nerAccuracy, 1)}</span>
              <span className={styles.statLabel}>NER Accuracy</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>{formatNumber(data.tokensPerSec)}</span>
              <span className={styles.statLabel}>Tokens/sec</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>{formatPercent(data.gpuUtilization)}</span>
              <span className={styles.statLabel}>GPU Utilization</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>{formatNumber(data.documentsProcessed)}</span>
              <span className={styles.statLabel}>Documents Processed</span>
            </div>
            <div className={styles.statCell}>
              <span className={styles.statValue}>{data.activeModels}</span>
              <span className={styles.statLabel}>Active Models</span>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            <div>
              <div className={styles.chartLabel}>Throughput (docs/2hr)</div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={data.throughputSeries}>
                  <XAxis dataKey="time" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTip unit=" docs" />} />
                  <Area type="monotone" dataKey="docs" stroke="#22d3ee" fill="rgba(34,211,238,0.15)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className={styles.chartLabel}>NER Accuracy (7d)</div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={data.accuracySeries}>
                  <XAxis dataKey="time" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip content={<ChartTip unit="%" />} />
                  <Line type="monotone" dataKey="accuracy" stroke="#a78bfa" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
