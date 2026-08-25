import { mockDelay } from "./api";
import { profiles, searchSystems } from "../data/profileData";

export async function quickSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return mockDelay([], 100);
  const results = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.aliases.some((a) => a.toLowerCase().includes(q)) ||
      p.id.toLowerCase().includes(q)
  );
  return mockDelay(results, 250);
}

export async function advancedSearch({ query, domains }) {
  const q = (query || "").trim().toLowerCase();
  let results = profiles;
  if (q) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.aliases.some((a) => a.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q) ||
        p.knownAddresses.some((a) => a.toLowerCase().includes(q))
    );
  }
  if (domains && domains.length && !domains.includes("ALL")) {
    results = results.filter((p) => p.domains.some((d) => domains.includes(d)));
  }
  return mockDelay(results, 600);
}

/**
 * Simulates a federated intelligence query across connected source systems,
 * yielding progress events via the onProgress callback as each system responds.
 */
export async function queryAllSystems({ query, domains }, onProgress) {
  const results = await advancedSearch({ query, domains });
  let completed = 0;
  for (const sys of searchSystems) {
    await mockDelay(null, 260 + Math.random() * 320);
    completed += 1;
    onProgress?.({
      key: sys.key,
      label: sys.label,
      status: sys.key === "cdr" && Math.random() > 0.5 ? "DEGRADED" : "COMPLETE",
      completed,
      total: searchSystems.length,
    });
  }
  return results;
}
