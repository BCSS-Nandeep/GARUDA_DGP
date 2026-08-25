import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart as PieIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./Dashboard.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Skeleton } from "../../components/ui/Skeleton";
import { getFirCategories } from "../../services/dashboardService";
import { formatNumber } from "../../utils/formatters";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", padding: "8px 12px", fontSize: "var(--fs-xs)" }}>
      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{item.category}</div>
      <div style={{ color: "var(--text-secondary)" }}>{item.count} FIRs</div>
    </div>
  );
}

export function FirAnalyticsChart() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFirCategories().then(setData);
  }, []);

  const total = data?.reduce((sum, d) => sum + d.count, 0) || 0;

  return (
    <Card>
      <SectionHeader icon={PieIcon} title="FIR Category Breakdown" description="By category, last 90 days" />
      {!data ? (
        <Skeleton height={220} />
      ) : (
        <div className={styles.donutRow}>
          <div className={styles.donutChart}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={54}
                  outerRadius={78}
                  paddingAngle={1}
                  cursor="pointer"
                  onClick={(entry) => navigate(`/profile-search?domain=CRIMINAL&category=${encodeURIComponent(entry.category)}`)}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="var(--bg-panel)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.donutCenter}>
              <div className={styles.donutTotal}>{formatNumber(total)}</div>
              <div className={styles.donutTotalLabel}>Total FIRs</div>
            </div>
          </div>
          <div className={styles.donutLegend}>
            {data.map((d) => (
              <div key={d.category} className={styles.legendRow}>
                <span className={styles.legendDot} style={{ background: d.color }} />
                <span className={styles.legendLabel}>{d.category}</span>
                <span className={styles.legendPct}>{Math.round((d.count / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
