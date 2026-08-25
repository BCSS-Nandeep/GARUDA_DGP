import { ROLES } from "./constants";

/**
 * Permission strings follow "<module>.<action>" convention, e.g. "network.view".
 * This is a UI-level gate only — the backend must enforce authorization independently.
 */
const ALL = "*";

export const ROLE_PERMISSIONS = {
  [ROLES.INVESTIGATOR]: [
    "dashboard.view",
    "profile.view",
    "profile.search",
    "network.view",
    "geo.view",
    "alerts.view",
    "alerts.acknowledge",
    "settings.view",
  ],
  [ROLES.SENIOR_INVESTIGATOR]: [
    "dashboard.view",
    "profile.view",
    "profile.search",
    "profile.reveal",
    "network.view",
    "network.expand",
    "geo.view",
    "geo.geofence.create",
    "alerts.view",
    "alerts.acknowledge",
    "alerts.assign",
    "integrations.view",
    "settings.view",
  ],
  [ROLES.ANALYST]: [
    "dashboard.view",
    "profile.view",
    "profile.search",
    "profile.reveal",
    "network.view",
    "network.expand",
    "geo.view",
    "geo.geofence.create",
    "ai-pipeline.view",
    "alerts.view",
    "alerts.acknowledge",
    "integrations.view",
    "settings.view",
  ],
  [ROLES.SUPERVISOR]: [
    "dashboard.view",
    "profile.view",
    "profile.search",
    "profile.reveal",
    "network.view",
    "network.expand",
    "geo.view",
    "geo.geofence.create",
    "ai-pipeline.view",
    "integrations.view",
    "integrations.manage",
    "alerts.view",
    "alerts.acknowledge",
    "alerts.assign",
    "alerts.escalate",
    "alerts.resolve",
    "governance.view",
    "settings.view",
  ],
  [ROLES.AUDITOR]: ["dashboard.view", "governance.view", "governance.export", "settings.view"],
  [ROLES.ADMIN]: [ALL],
};

export function roleHasPermission(role, permission) {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes(ALL) || perms.includes(permission);
}
