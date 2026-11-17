import { mockDelay } from "./api";
import { integrationsData } from "../data/integrationsData";

const STORAGE_KEY = "garuda.sourceSystemOverrides";

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeOverrides(overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function applyOverrides(list) {
  const overrides = readOverrides();
  return list.map((item) => (overrides[item.id] ? { ...item, ...overrides[item.id] } : item));
}

export async function getIntegrations() {
  return mockDelay(applyOverrides(integrationsData), 450);
}

export async function getIntegration(id) {
  const list = applyOverrides(integrationsData);
  const integration = list.find((i) => i.id === id);
  return mockDelay(integration || null, 300);
}

export async function updateIntegration(id, patch) {
  await mockDelay(null, 350);
  const overrides = readOverrides();
  const current = applyOverrides(integrationsData).find((i) => i.id === id);
  if (!current) throw new Error("Source system not found");

  const next = {
    ...overrides[id],
    ...patch,
    integrationType: patch.integrationMode ?? patch.integrationType ?? overrides[id]?.integrationMode ?? current.integrationMode,
  };
  if (patch.integrationMode) next.integrationType = patch.integrationMode;

  overrides[id] = next;
  writeOverrides(overrides);

  return { ...current, ...next };
}

export async function testConnection(id) {
  await mockDelay(null, 900);
  return { id, ok: Math.random() > 0.15, testedAt: Date.now() };
}

export async function syncNow(id) {
  await mockDelay(null, 1200);
  return { id, ok: true, recordsSynced: Math.floor(200 + Math.random() * 800), syncedAt: Date.now() };
}
