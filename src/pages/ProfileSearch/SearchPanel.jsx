import { Radar, SlidersHorizontal } from "lucide-react";
import styles from "./SearchPanel.module.css";
import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { SearchInput } from "../../components/ui/SearchInput";
import { Button } from "../../components/ui/Button";
import { DomainFilters } from "./DomainFilters";

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "alias", label: "Alias" },
  { key: "firNumber", label: "FIR Number" },
  { key: "caseNumber", label: "Case Number" },
  { key: "garudaId", label: "GARUDA ID" },
  { key: "mobile", label: "Mobile" },
  { key: "vehicleNumber", label: "Vehicle Number" },
  { key: "bankAccount", label: "Bank Account" },
  { key: "address", label: "Address" },
  { key: "company", label: "Company" },
];

const MODES = [
  { key: "quick", label: "Quick Search" },
  { key: "full", label: "Full Intelligence Search" },
  { key: "advanced", label: "Advanced Search", icon: SlidersHorizontal },
];

export function SearchPanel({
  mode,
  onModeChange,
  query,
  onQueryChange,
  domains,
  onDomainsChange,
  advancedFields,
  onAdvancedFieldChange,
  onSearch,
  onQueryAllSystems,
  querying,
}) {
  return (
    <Card>
      <Tabs tabs={MODES} active={mode} onChange={onModeChange} />
      <div style={{ marginTop: "var(--sp-4)" }}>
        {mode === "advanced" ? (
          <div className={styles.fieldGrid}>
            {FIELDS.map((f) => (
              <div className={styles.field} key={f.key}>
                <label className={styles.fieldLabel}>{f.label}</label>
                <input
                  className={styles.fieldInput}
                  value={advancedFields[f.key] || ""}
                  onChange={(e) => onAdvancedFieldChange(f.key, e.target.value)}
                  placeholder={`Enter ${f.label.toLowerCase()}...`}
                />
              </div>
            ))}
          </div>
        ) : (
          <SearchInput
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearch}
            placeholder="Search by name, alias, GARUDA ID, or known address..."
          />
        )}

        <div style={{ marginTop: "var(--sp-4)" }}>
          <DomainFilters active={domains} onChange={onDomainsChange} />
        </div>

        <div className={styles.actions}>
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
            Queries CCTNS, ICJS, RTA, VAHAN, CDR/IPDR, DOPAMS, Financial &amp; Prison sources
          </span>
          {mode === "full" ? (
            <Button variant="primary" icon={Radar} onClick={onQueryAllSystems} loading={querying}>
              Query All Systems
            </Button>
          ) : (
            <Button variant="primary" onClick={onSearch}>
              Search
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
