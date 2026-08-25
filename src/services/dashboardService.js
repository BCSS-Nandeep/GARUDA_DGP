import { mockDelay } from "./api";
import { kpiData, firCategoryData, infraRings, infraServices } from "../data/dashboardData";
import { alertsData } from "../data/alertsData";

export async function getKpis() {
  return mockDelay(kpiData, 450);
}

export async function getFirCategories() {
  return mockDelay(firCategoryData, 500);
}

export async function getSystemHealth() {
  return mockDelay({ rings: infraRings, services: infraServices }, 400);
}

export async function getRecentAlerts(limit = 6) {
  const sorted = [...alertsData].sort((a, b) => b.timestamp - a.timestamp);
  return mockDelay(sorted.slice(0, limit), 350);
}
