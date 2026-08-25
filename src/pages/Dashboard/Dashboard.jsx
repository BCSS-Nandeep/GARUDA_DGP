import { LayoutDashboard } from "lucide-react";
import styles from "./Dashboard.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { KpiGrid } from "./KpiGrid";
import { AlertFeed } from "./AlertFeed";
import { FirAnalyticsChart } from "./FirAnalyticsChart";
import { SystemHealth } from "./SystemHealth";
import { RecentQueries } from "./RecentQueries";
import { ImplementationTimeline } from "./ImplementationTimeline";
import { useAuth } from "../../context/AuthContext";
import { useRevealOnMount } from "../../hooks/useRevealOnMount";

// Panels reveal after the 8 KPI cards have staggered in (~0.09s each).
const PANEL_BASE_DELAY = 0.75;

export function Dashboard() {
  const { user } = useAuth();
  const headerRef = useRevealOnMount({ delay: 0, y: 14, duration: 0.5 });
  const alertRef = useRevealOnMount({ delay: PANEL_BASE_DELAY });
  const firRef = useRevealOnMount({ delay: PANEL_BASE_DELAY + 0.1 });
  const healthRef = useRevealOnMount({ delay: PANEL_BASE_DELAY + 0.2 });
  const queriesRef = useRevealOnMount({ delay: PANEL_BASE_DELAY + 0.3 });
  const timelineRef = useRevealOnMount({ delay: PANEL_BASE_DELAY + 0.4 });

  return (
    <div>
      <div ref={headerRef}>
        <PageHeader
          icon={LayoutDashboard}
          title="Command Dashboard"
          description={`Welcome back, ${user?.name || "Investigator"}. Unified intelligence overview across all connected systems.`}
        />
      </div>
      <KpiGrid />
      <div className={styles.mainGrid}>
        <div className={styles.mainCol}>
          <div ref={alertRef}>
            <AlertFeed />
          </div>
        </div>
        <div className={styles.sideCol}>
          <div ref={firRef}>
            <FirAnalyticsChart />
          </div>
          <div ref={healthRef}>
            <SystemHealth />
          </div>
        </div>
      </div>
      <div className={styles.bottomGrid}>
        <div ref={queriesRef}>
          <RecentQueries />
        </div>
        <div ref={timelineRef}>
          <ImplementationTimeline />
        </div>
      </div>
    </div>
  );
}
