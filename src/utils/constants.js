export const ROLES = {
  INVESTIGATOR: "Investigator",
  SENIOR_INVESTIGATOR: "Senior Investigator",
  ANALYST: "Intelligence Analyst",
  SUPERVISOR: "Supervisor",
  ADMIN: "Administrator",
  AUDITOR: "Auditor",
};

export const SEVERITY = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  INFO: "INFO",
};

export const SEVERITY_ORDER = [SEVERITY.CRITICAL, SEVERITY.HIGH, SEVERITY.MEDIUM, SEVERITY.INFO];

export const RISK_CATEGORY = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MODERATE: "MODERATE",
  LOW: "LOW",
};

export const TOP_NAV_TABS = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard" },
  { key: "integrations", label: "Integrations", path: "/integrations" },
  { key: "settings", label: "Settings", path: "/settings" },
];

// Fixed sidebar items. Named URLs added from Integrations are inserted between these groups.
export const NAV_GROUPS = [
  {
    items: [
      { key: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Hexagon" },
      { key: "integrations", label: "Integrations", path: "/integrations", icon: "Plug" },
    ],
  },
  {
    items: [{ key: "settings", label: "Settings", path: "/settings", icon: "Settings" }],
  },
];

export const APP_ENV = import.meta.env.VITE_APP_ENV || "development";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export const WS_URL = import.meta.env.VITE_WS_URL || "";
