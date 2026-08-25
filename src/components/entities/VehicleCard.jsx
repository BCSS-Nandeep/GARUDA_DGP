import { Car } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";
import { Badge } from "../ui/Badge";

export function VehicleCard({ vehicle, onClick }) {
  return (
    <EntityCardShell
      icon={Car}
      title={vehicle.regNo}
      subtitle={vehicle.make}
      badge={<Badge tone={vehicle.registrationStatus === "Active" ? "success" : "neutral"}>{vehicle.registrationStatus}</Badge>}
      rows={[
        { label: "Owner", value: vehicle.owner },
        vehicle.associatedPersons?.length && { label: "Associated", value: vehicle.associatedPersons.join(", ") },
        { label: "Last Seen", value: new Date(vehicle.lastSeen).toLocaleString("en-IN") },
        vehicle.seizureHistory && { label: "Seizure History", value: vehicle.seizureHistory },
      ].filter(Boolean)}
      onClick={() => onClick?.(vehicle)}
    />
  );
}
