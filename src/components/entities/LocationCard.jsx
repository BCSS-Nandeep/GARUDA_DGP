import { MapPin } from "lucide-react";
import { EntityCardShell } from "./EntityCardShell";

export function LocationCard({ location, onClick }) {
  return (
    <EntityCardShell
      icon={MapPin}
      title={location.label}
      subtitle={location.detail}
      rows={[location.position && { label: "Coordinates", value: location.position.join(", ") }].filter(Boolean)}
      onClick={() => onClick?.(location)}
    />
  );
}
