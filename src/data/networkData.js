// Synthetic demo data for the investigative network graph.
export const networkNodes = [
  { id: "GID-004821", type: "PERSON", label: "Rafiq Ahmed Sheikh", risk: "CRITICAL" },
  { id: "GID-003310", type: "PERSON", label: "Karthik Reddy Naidu", risk: "HIGH" },
  { id: "GID-002204", type: "PERSON", label: "Naveen Kumar Yadav", risk: "MODERATE" },
  { id: "GID-005510", type: "PERSON", label: "Mohammed Irfan Baig", risk: "CRITICAL" },
  { id: "VEH-118820", type: "VEHICLE", label: "TS-09-EF-4421", risk: "MODERATE" },
  { id: "PHN-772104", type: "PHONE", label: "9840XXXXXX", risk: "LOW" },
  { id: "BNK-441207", type: "BANK", label: "XXXX-XXXX-4421", risk: "HIGH" },
  { id: "CMP-110042", type: "COMPANY", label: "Crescent Traders Pvt Ltd", risk: "HIGH" },
  { id: "CASE-01147", type: "CASE", label: "FIR-2026-01147", risk: "CRITICAL" },
  { id: "LOC-778", type: "LOCATION", label: "Old City Perimeter", risk: "LOW" },
];

export const networkEdges = [
  { id: "e1", source: "GID-004821", target: "VEH-118820", label: "OWNS" },
  { id: "e2", source: "GID-004821", target: "PHN-772104", label: "ASSOCIATED_WITH" },
  { id: "e3", source: "GID-004821", target: "BNK-441207", label: "LINKED_TO" },
  { id: "e4", source: "GID-004821", target: "CASE-01147", label: "INVOLVED_IN" },
  { id: "e5", source: "GID-003310", target: "PHN-772104", label: "CALLS" },
  { id: "e6", source: "GID-003310", target: "BNK-441207", label: "LINKED_TO" },
  { id: "e7", source: "BNK-441207", target: "CMP-110042", label: "LINKED_TO" },
  { id: "e8", source: "GID-002204", target: "VEH-118820", label: "ASSOCIATED_WITH" },
  { id: "e9", source: "GID-004821", target: "LOC-778", label: "VISITED" },
  { id: "e10", source: "GID-005510", target: "CMP-110042", label: "LINKED_TO" },
  { id: "e11", source: "GID-005510", target: "GID-004821", label: "ASSOCIATED_WITH" },
];

export const networkMetrics = {
  nodes: 10,
  connections: 11,
  clusters: 3,
  centrality: 0.74,
  kingpinConfidence: 89,
  gnnLastRun: "18 min ago",
};

export const aiFindings = [
  {
    id: "F-2291",
    title: "High-centrality subject detected",
    entity: "Rafiq Ahmed Sheikh",
    confidence: 91,
    reason: "Node centrality score in top 2% of active case network; bridges 3 otherwise disconnected clusters.",
    source: "Network Graph",
    model: "GraphSAGE-v3",
    timestamp: Date.now() - 18 * 60 * 1000,
  },
  {
    id: "F-2288",
    title: "Potential hidden relationship",
    entity: "Karthik Reddy Naidu ↔ Mohammed Irfan Baig",
    confidence: 76,
    reason: "Shared financial counterpart (Crescent Traders Pvt Ltd) not previously linked in case records.",
    source: "GNN Link Prediction",
    model: "GraphSAGE-v3",
    timestamp: Date.now() - 52 * 60 * 1000,
  },
  {
    id: "F-2279",
    title: "Suspicious financial cluster",
    entity: "Crescent Traders Pvt Ltd",
    confidence: 83,
    reason: "6 flagged transactions across 2 linked accounts within a 30-day window, above cluster baseline.",
    source: "Financial Intelligence",
    model: "AnomalyNet-v2",
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
  },
];
