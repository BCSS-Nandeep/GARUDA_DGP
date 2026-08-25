import { Radar } from "lucide-react";
import styles from "./GeoIntelligence.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { activeGeoFenceStatus } from "../../data/geoFenceStatusData";

export function ActiveGeoFences() {
  return (
    <Card>
      <SectionHeader icon={Radar} title="Active Geo-Fences" description={`${activeGeoFenceStatus.length} live`} />
      <div className={styles.fenceStatusList}>
        {activeGeoFenceStatus.map((f) => (
          <div className={styles.fenceStatusItem} key={f.subject}>
            <div className={styles.fenceStatusTop}>
              <span className={styles.fenceStatusName}>{f.subject}</span>
              <StatusBadge status={f.status} label={f.note} size="sm" />
            </div>
            <div className={styles.fenceStatusDetail}>{f.detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
