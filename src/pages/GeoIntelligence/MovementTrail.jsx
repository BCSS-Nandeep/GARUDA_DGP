import { Route } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Timeline } from "../../components/ui/Timeline";
import { lbsMovementTrail } from "../../data/geoFenceStatusData";

export function MovementTrail() {
  return (
    <Card>
      <SectionHeader icon={Route} title="LBS Movement Trail" />
      <Timeline items={lbsMovementTrail} />
    </Card>
  );
}
