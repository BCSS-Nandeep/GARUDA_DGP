import { PageHeader } from "./PageHeader";
import { EmptyState } from "./EmptyState";

export function ComingSoon({ title, icon, description }) {
  return (
    <div>
      <PageHeader title={title} icon={icon} description={description} />
      <EmptyState title="Module under construction" description="This section is being wired up to live data." />
    </div>
  );
}
