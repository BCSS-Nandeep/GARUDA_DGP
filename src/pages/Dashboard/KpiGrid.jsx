import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { KpiCard } from "../../components/ui/KpiCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { getKpis } from "../../services/dashboardService";

export function KpiGrid() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    getKpis().then(setKpis);
  }, []);

  return (
    <div className={styles.kpiGrid}>
      {kpis
        ? kpis.map((kpi, i) => <KpiCard key={kpi.id} index={i} {...kpi} />)
        : Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} height={158} radius={0} />)}
    </div>
  );
}
