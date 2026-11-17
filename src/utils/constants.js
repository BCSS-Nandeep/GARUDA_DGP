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

// Primary tabs shown in the topbar — mirrors GARUDA_UI.html.
// HTML "Integrations" panel content lives under National Source Systems;
// Integrations remains the URL/link manager and is not modified.
export const TOP_NAV_TABS = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard" },
  { key: "profile-search", label: "Profile Search", path: "/profile-search" },
  { key: "network", label: "Network Analysis", path: "/network" },
  { key: "geo", label: "Geo Intelligence", path: "/geo" },
  { key: "live-systems", label: "Live Systems", path: "/live-systems" },
  { key: "national-source-systems", label: "National Source Systems", path: "/national-source-systems" },
  { key: "ai-pipeline", label: "AI Pipeline", path: "/ai-pipeline" },
  { key: "governance", label: "Governance", path: "/governance" },
];

// Sidebar rail — Live Systems hosts Integration-added modules as a dropdown.
export const NAV_GROUPS = [
  {
    items: [
      { key: "dashboard", label: "Dashboard", path: "/dashboard", icon: "Hexagon" },
      { key: "profile-search", label: "Profile Search", path: "/profile-search", icon: "Search" },
      { key: "network", label: "Network Analysis", path: "/network", icon: "Share2" },
      { key: "geo", label: "Geo Intelligence", path: "/geo", icon: "MapPinned" },
      { key: "live-systems", label: "Live Systems", path: "/live-systems", icon: "RadioTower" },
    ],
  },
  {
    items: [
      { key: "national-source-systems", label: "National Source Systems", path: "/national-source-systems", icon: "Database" },
      { key: "integrations", label: "Integrations", path: "/integrations", icon: "Plug" },
      { key: "ai-pipeline", label: "AI Pipeline", path: "/ai-pipeline", icon: "BrainCircuit" },
      { key: "governance", label: "Governance", path: "/governance", icon: "ScrollText" },
    ],
  },
  {
    items: [
      { key: "alerts", label: "Alerts", path: "/alerts", icon: "AlertTriangle", badgeKey: "alerts" },
      { key: "settings", label: "Settings", path: "/settings", icon: "Settings" },
    ],
  },
];

export const APP_ENV = import.meta.env.VITE_APP_ENV || "development";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export const WS_URL = import.meta.env.VITE_WS_URL || "";
