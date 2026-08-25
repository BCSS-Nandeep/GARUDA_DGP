import { mockDelay } from "./api";
import { alertsData } from "../data/alertsData";

let store = [...alertsData];

export async function getAlerts() {
  return mockDelay([...store].sort((a, b) => b.timestamp - a.timestamp), 450);
}

export async function updateAlert(id, changes) {
  store = store.map((a) => (a.id === id ? { ...a, ...changes } : a));
  const updated = store.find((a) => a.id === id);
  return mockDelay(updated, 350);
}

export async function acknowledgeAlert(id) {
  return updateAlert(id, { status: "assigned" });
}

export async function assignAlert(id, assignee) {
  return updateAlert(id, { status: "assigned", assignee });
}

export async function escalateAlert(id) {
  return updateAlert(id, { severity: "CRITICAL" });
}

export async function resolveAlert(id) {
  return updateAlert(id, { status: "resolved" });
}
