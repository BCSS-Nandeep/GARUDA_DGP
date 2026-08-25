import { RotateCcw } from "lucide-react";
import styles from "./NetworkAnalysis.module.css";
import { FilterBar, FilterChip } from "../../components/ui/FilterBar";
import { SearchInput } from "../../components/ui/SearchInput";
import { Button } from "../../components/ui/Button";

const TYPES = ["PERSON", "VEHICLE", "PHONE", "BANK", "COMPANY", "CASE", "LOCATION"];

export function GraphControls({ activeTypes, onToggleType, searchQuery, onSearchChange, onReset }) {
  return (
    <div className={styles.controlsBar}>
      <SearchInput value={searchQuery} onChange={onSearchChange} placeholder="Search graph..." className={styles.graphSearch} />
      <FilterBar
        right={
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={onReset}>
            Reset Graph
          </Button>
        }
      >
        {TYPES.map((t) => (
          <FilterChip key={t} active={activeTypes.includes(t)} onClick={() => onToggleType(t)}>
            {t}
          </FilterChip>
        ))}
      </FilterBar>
    </div>
  );
}

export { TYPES as GRAPH_ENTITY_TYPES };
