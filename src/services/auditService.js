import { mockDelay } from "./api";
import { auditEvents, auditActions, auditSystems } from "../data/auditData";

export async function getAuditEvents(filters = {}) {
  let results = [...auditEvents];
  if (filters.officer) {
    const q = filters.officer.toLowerCase();
    results = results.filter((e) => e.officer.toLowerCase().includes(q));
  }
  if (filters.action && filters.action !== "ALL") {
    results = results.filter((e) => e.action === filters.action);
  }
  if (filters.system && filters.system !== "ALL") {
    results = results.filter((e) => e.systemsAccessed.includes(filters.system));
  }
  return mockDelay(results.sort((a, b) => b.timestamp - a.timestamp), 500);
}

export async function getAuditFilters() {
  return mockDelay({ actions: auditActions, systems: auditSystems }, 150);
}
