import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { SearchPanel } from "./SearchPanel";
import { QueryOrchestration } from "./QueryOrchestration";
import { SearchResults } from "./SearchResults";
import { advancedSearch, queryAllSystems } from "../../services/searchService";
import { searchSystems } from "../../data/profileData";
import { useNotifications } from "../../context/NotificationContext";

const EMPTY_ADVANCED = {
  name: "",
  alias: "",
  firNumber: "",
  caseNumber: "",
  garudaId: "",
  mobile: "",
  vehicleNumber: "",
  bankAccount: "",
  address: "",
  company: "",
};

export function ProfileSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState("quick");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [domains, setDomains] = useState(() => {
    const d = searchParams.get("domain");
    return d ? [d] : ["ALL"];
  });
  const [advancedFields, setAdvancedFields] = useState(EMPTY_ADVANCED);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [querying, setQuerying] = useState(false);
  const [progressBySystem, setProgressBySystem] = useState({});
  const [elapsedMs, setElapsedMs] = useState(0);
  const [queryComplete, setQueryComplete] = useState(false);
  const elapsedTimer = useRef(null);
  const notifications = useNotifications();

  const combinedQuery = mode === "advanced" ? Object.values(advancedFields).find(Boolean) || "" : query;

  const runSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);
    const res = await advancedSearch({ query: combinedQuery, domains });
    setResults(res);
    setLoading(false);
  }, [combinedQuery, domains]);

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (domains.length && !(domains.length === 1 && domains[0] === "ALL")) params.domain = domains[0];
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, domains]);

  useEffect(() => {
    if (searchParams.get("q") || searchParams.get("domain")) {
      runSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDomainChange(domain) {
    if (domain === "ALL") {
      setDomains(["ALL"]);
      return;
    }
    setDomains((prev) => {
      const withoutAll = prev.filter((d) => d !== "ALL");
      if (withoutAll.includes(domain)) {
        const next = withoutAll.filter((d) => d !== domain);
        return next.length ? next : ["ALL"];
      }
      return [...withoutAll, domain];
    });
  }

  async function handleQueryAllSystems() {
    setQuerying(true);
    setQueryComplete(false);
    setProgressBySystem({});
    setElapsedMs(0);
    setHasSearched(true);
    const start = Date.now();
    elapsedTimer.current = setInterval(() => setElapsedMs(Date.now() - start), 100);

    const res = await queryAllSystems({ query: combinedQuery, domains }, (progress) => {
      setProgressBySystem((prev) => ({ ...prev, [progress.key]: progress }));
    });

    clearInterval(elapsedTimer.current);
    setElapsedMs(Date.now() - start);
    setResults(res);
    setQueryComplete(true);
    setQuerying(false);
    notifications.success(
      "Intelligence query completed",
      `${searchSystems.length} systems queried · ${res.length} profile${res.length === 1 ? "" : "s"} returned`
    );
  }

  useEffect(() => () => clearInterval(elapsedTimer.current), []);

  return (
    <div>
      <PageHeader
        icon={Search}
        title="Profile Search"
        description="Query unified subject intelligence across CCTNS, ICJS, RTA, telecom, financial, and civil sources."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)" }}>
        <SearchPanel
          mode={mode}
          onModeChange={setMode}
          query={query}
          onQueryChange={setQuery}
          domains={domains}
          onDomainsChange={handleDomainChange}
          advancedFields={advancedFields}
          onAdvancedFieldChange={(key, value) => setAdvancedFields((prev) => ({ ...prev, [key]: value }))}
          onSearch={runSearch}
          onQueryAllSystems={handleQueryAllSystems}
          querying={querying}
        />

        {(querying || queryComplete) && mode === "full" && (
          <QueryOrchestration
            progressBySystem={progressBySystem}
            elapsedMs={elapsedMs}
            complete={queryComplete}
            recordsReturned={results.length}
          />
        )}

        <SearchResults results={results} loading={loading} hasSearched={hasSearched} />
      </div>
    </div>
  );
}
