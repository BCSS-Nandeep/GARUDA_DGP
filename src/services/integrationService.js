import { mockDelay } from "./api";
import { integrationsData } from "../data/integrationsData";

export async function getIntegrations() {
  return mockDelay(integrationsData, 450);
}

export async function getIntegration(id) {
  const integration = integrationsData.find((i) => i.id === id);
  return mockDelay(integration || null, 300);
}

export async function testConnection(id) {
  await mockDelay(null, 900);
  return { id, ok: Math.random() > 0.15, testedAt: Date.now() };
}

export async function syncNow(id) {
  await mockDelay(null, 1200);
  return { id, ok: true, recordsSynced: Math.floor(200 + Math.random() * 800), syncedAt: Date.now() };
}
