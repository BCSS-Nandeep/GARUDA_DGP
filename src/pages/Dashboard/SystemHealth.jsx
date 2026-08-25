import { useEffect, useState } from "react";
import { Server } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SkeletonLines } from "../../components/ui/Skeleton";
import styles from "./Dashboard.module.css";
import { getSystemHealth } from "../../services/dashboardService";

function Ring({ label, value, color }) {
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.ringWrap}>
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={r} fill="none" stroke="var(--bg-panel)" strokeWidth="6" />
        <circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
        />
        <text x="30" y="34" textAnchor="middle" fill={color} fontFamily="var(--font-display)" fontSize="12" fontWeight="700">
          {value}%
        </text>
      </svg>
      <div className={styles.ringLabel}>{label}</div>
    </div>
  );
}

export function SystemHealth() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSystemHealth().then(setData);
  }, []);

  return (
    <Card>
      <SectionHeader icon={Server} title="System Health" />
      {!data ? (
        <SkeletonLines count={6} />
      ) : (
        <>
          <div className={styles.ringsRow}>
            {data.rings.map(({ key, ...ring }) => (
              <Ring key={key} {...ring} />
            ))}
          </div>
          <div className={styles.serviceList}>
            {data.services.map((s) => (
              <div key={s.label} className={styles.serviceRow}>
                <span className={styles.serviceLabel}>{s.label}</span>
                {s.status ? <StatusBadge status={s.status} label={s.note} size="sm" /> : <span className={styles.serviceNote}>{s.note}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
