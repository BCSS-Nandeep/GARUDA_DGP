// Synthetic demo data — Network Analysis panel from GARUDA_UI.html.
export const networkNodes = [
  { id: "N-IBRAHIM", type: "PERSON", label: "Ibrahim K.", risk: "CRITICAL", role: "KINGPIN", firs: 12, status: "Wanted", links: "14 persons, 3 vehicles, 2 shell companies" },
  { id: "N-RAFIQ", type: "PERSON", label: "Mohammed Rafiq", risk: "HIGH", role: "DISTRIBUTOR", firs: 8, status: "Bail — monitored", links: "6 persons, 4 phones, 1 vehicle" },
  { id: "N-RAVI", type: "PERSON", label: "Ravi Kumar", risk: "HIGH", role: "DISTRIBUTOR", firs: 5, status: "Active investigation", links: "4 persons, 2 vehicles" },
  { id: "N-ANWAR", type: "PERSON", label: "Anwar Shah", risk: "HIGH", role: "FINANCIER", firs: 3, status: "Under surveillance", links: "2 shell companies, 4 bank accounts" },
  { id: "N-SOHAIL", type: "PERSON", label: "Sohail Ahmed", risk: "MODERATE", role: "ASSOCIATE", firs: 2, status: "Known contact", links: "3 persons" },
  { id: "N-SURESH", type: "PERSON", label: "Suresh M.", risk: "MODERATE", role: "ASSOCIATE", firs: 1, status: "Peripheral", links: "2 persons" },
  { id: "VEH-TS09", type: "VEHICLE", label: "TS-09-EF-4421", risk: "HIGH" },
  { id: "PHN-9840", type: "PHONE", label: "9840XXXXXX", risk: "HIGH" },
  { id: "BNK-4821", type: "BANK", label: "XXXX-XXXX-4821", risk: "CRITICAL" },
  { id: "CMP-SHELL", type: "COMPANY", label: "Shell Co. A", risk: "HIGH" },
];

export const networkEdges = [
  { id: "e1", source: "N-IBRAHIM", target: "N-RAFIQ", label: "CONTROLS" },
  { id: "e2", source: "N-IBRAHIM", target: "N-RAVI", label: "CONTROLS" },
  { id: "e3", source: "N-IBRAHIM", target: "N-ANWAR", label: "FINANCES" },
  { id: "e4", source: "N-RAFIQ", target: "N-SOHAIL", label: "ASSOCIATED_WITH" },
  { id: "e5", source: "N-RAVI", target: "N-SURESH", label: "ASSOCIATED_WITH" },
  { id: "e6", source: "N-RAFIQ", target: "PHN-9840", label: "USES" },
  { id: "e7", source: "N-RAFIQ", target: "VEH-TS09", label: "OWNS" },
  { id: "e8", source: "N-ANWAR", target: "BNK-4821", label: "LINKED_TO" },
  { id: "e9", source: "N-ANWAR", target: "CMP-SHELL", label: "CONTROLS" },
  { id: "e10", source: "N-IBRAHIM", target: "CMP-SHELL", label: "LINKED_TO" },
  { id: "e11", source: "N-RAFIQ", target: "N-RAVI", label: "CALLS" },
];

export const networkMetrics = {
  nodes: 10,
  connections: 11,
  clusters: 3,
  centrality: 0.94,
  kingpinConfidence: 94.2,
  gnnLastRun: "just now",
};

export const aiFindings = [
  {
    id: "F-2291",
    title: "Kingpin node detected",
    entity: "Ibrahim K.",
    confidence: 94,
    reason: "GNN analysis complete — new financier node detected in narcotics distribution graph.",
    source: "Graph Neural Network → DOPAMS + Bank Data",
    model: "PyTorch Geometric GNN",
    timestamp: Date.now() - 14 * 60 * 1000,
  },
  {
    id: "F-2288",
    title: "High-activity distributor",
    entity: "Mohammed Rafiq",
    confidence: 88,
    reason: "Mobile active on Tower 14 Secunderabad; bridges vehicle, phone, and associate clusters.",
    source: "H-TRAX / CDR",
    model: "GraphSAGE-v3",
    timestamp: Date.now() - 18 * 60 * 1000,
  },
  {
    id: "F-2279",
    title: "Financial conduit",
    entity: "Anwar Shah",
    confidence: 81,
    reason: "Links to shell company and bank accounts used in Unocross STR flow.",
    source: "Bank Data / Unocross",
    model: "GraphSAGE-v3",
    timestamp: Date.now() - 42 * 60 * 1000,
  },
];
