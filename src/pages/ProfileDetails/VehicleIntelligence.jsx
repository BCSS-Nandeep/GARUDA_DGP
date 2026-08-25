import { useNavigate } from "react-router-dom";
import styles from "./ProfileDetails.module.css";
import { VehicleCard } from "../../components/entities/VehicleCard";
import { EmptyState } from "../../components/ui/EmptyState";

export function VehicleIntelligence({ vehicles }) {
  const navigate = useNavigate();

  if (!vehicles?.length) {
    return <EmptyState title="No vehicles linked" description="No registered or associated vehicles found for this subject." />;
  }

  return (
    <div className={styles.tabContent}>
      {vehicles.map((v) => (
        <VehicleCard key={v.regNo} vehicle={v} onClick={() => navigate("/network")} />
      ))}
    </div>
  );
}
