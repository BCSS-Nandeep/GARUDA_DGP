import { FilterBar, FilterChip } from "../../components/ui/FilterBar";

const DOMAINS = ["ALL", "CRIMINAL", "VEHICLE", "TELECOM", "FINANCIAL", "CIVIL"];

export function DomainFilters({ active, onChange }) {
  return (
    <FilterBar>
      {DOMAINS.map((d) => (
        <FilterChip key={d} active={active.includes(d)} onClick={() => onChange(d)}>
          {d}
        </FilterChip>
      ))}
    </FilterBar>
  );
}

export { DOMAINS };
