import { useNavigate } from "react-router-dom";
import { UserSearch } from "lucide-react";
import styles from "./SearchResults.module.css";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { PersonCard } from "../../components/entities/PersonCard";

export function SearchResults({ results, loading, hasSearched }) {
  const navigate = useNavigate();

  if (!hasSearched) {
    return (
      <EmptyState
        icon={UserSearch}
        title="Start an intelligence search"
        description="Search by name, alias, FIR number, GARUDA ID, vehicle, phone, or account across all connected sources."
      />
    );
  }

  return (
    <div>
      <SectionHeader title="Results" description={!loading ? `${results.length} profiles matched` : undefined} />
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={128} radius={10} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          title="No matching profiles"
          description="No verified profiles matched this query across connected sources. Try broadening the domain filters."
        />
      ) : (
        <div className={styles.grid}>
          {results.map((p) => (
            <PersonCard key={p.id} person={p} onClick={() => navigate(`/profile/${p.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}
