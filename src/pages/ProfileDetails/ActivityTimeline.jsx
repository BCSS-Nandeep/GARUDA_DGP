import { Timeline } from "../../components/ui/Timeline";
import { EmptyState } from "../../components/ui/EmptyState";

export function ActivityTimeline({ timeline }) {
  if (!timeline?.length) {
    return <EmptyState title="No activity recorded" description="No timeline events found for this subject." />;
  }

  return <Timeline items={timeline.map((t) => ({ label: t.label, date: t.date, source: t.source }))} />;
}
