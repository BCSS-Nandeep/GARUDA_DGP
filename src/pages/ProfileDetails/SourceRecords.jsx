import styles from "./ProfileDetails.module.css";
import { SourceBadge } from "../../components/ui/SourceBadge";
import { EmptyState } from "../../components/ui/EmptyState";

export function SourceRecords({ sources }) {
  if (!sources?.length) {
    return <EmptyState title="No source records" description="No connected source systems have returned data for this subject." />;
  }

  return (
    <div className={styles.sourceGrid}>
      {sources.map((s) => (
        <SourceBadge key={s.system} system={s.system} updated={s.updated} confidence={s.confidence} />
      ))}
    </div>
  );
}
