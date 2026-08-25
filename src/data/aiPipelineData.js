// Synthetic demo data.
export const pipelineStages = [
  { id: "ingestion", label: "Document Ingestion", status: "HEALTHY", currentJob: "Batch #4471", processed: 58210, failed: 12, latencyMs: 210, model: "—" },
  { id: "ner", label: "NER Extraction", status: "HEALTHY", currentJob: "Batch #4471", processed: 57980, failed: 44, latencyMs: 680, model: "GARUDA-NER-v4" },
  { id: "validation", label: "Schema Validation", status: "HEALTHY", currentJob: "Batch #4471", processed: 57812, failed: 168, latencyMs: 90, model: "—" },
  { id: "resolution", label: "Entity Resolution", status: "WARNING", currentJob: "Batch #4470", processed: 57200, failed: 340, latencyMs: 1120, model: "EntityLink-v2" },
  { id: "postgres", label: "PostgreSQL Write", status: "HEALTHY", currentJob: "Batch #4470", processed: 57180, failed: 20, latencyMs: 45, model: "—" },
  { id: "neo4j", label: "Neo4j Graph Update", status: "HEALTHY", currentJob: "Batch #4469", processed: 56900, failed: 8, latencyMs: 132, model: "—" },
  { id: "audit", label: "Audit + Alert", status: "HEALTHY", currentJob: "Batch #4469", processed: 56900, failed: 0, latencyMs: 30, model: "—" },
];

export const modelMonitoring = {
  nerAccuracy: 96.4,
  tokensPerSec: 8420,
  gpuUtilization: 71,
  documentsProcessed: 58210,
  activeModels: 4,
};

export const throughputSeries = [
  { time: "00:00", docs: 320 }, { time: "02:00", docs: 280 }, { time: "04:00", docs: 260 },
  { time: "06:00", docs: 410 }, { time: "08:00", docs: 690 }, { time: "10:00", docs: 810 },
  { time: "12:00", docs: 760 }, { time: "14:00", docs: 890 }, { time: "16:00", docs: 940 },
  { time: "18:00", docs: 820 }, { time: "20:00", docs: 610 }, { time: "22:00", docs: 450 },
];

export const accuracySeries = [
  { time: "Mon", accuracy: 95.1 }, { time: "Tue", accuracy: 95.6 }, { time: "Wed", accuracy: 96.0 },
  { time: "Thu", accuracy: 95.8 }, { time: "Fri", accuracy: 96.4 }, { time: "Sat", accuracy: 96.6 },
  { time: "Sun", accuracy: 96.4 },
];

export const documents = [
  { id: "DOC-88213", name: "FIR_2026_01147_scan.pdf", language: "Telugu", extractionStatus: "COMPLETE", entities: 24, confidence: 94, validation: "PASSED", dbStatus: "WRITTEN", graphStatus: "UPDATED" },
  { id: "DOC-88212", name: "CDR_Report_9840XXXXXX.csv", language: "English", extractionStatus: "COMPLETE", entities: 118, confidence: 98, validation: "PASSED", dbStatus: "WRITTEN", graphStatus: "UPDATED" },
  { id: "DOC-88209", name: "Chargesheet_08812.pdf", language: "Hindi", extractionStatus: "PROCESSING", entities: 0, confidence: null, validation: "PENDING", dbStatus: "PENDING", graphStatus: "PENDING" },
  { id: "DOC-88204", name: "Bank_Statement_4421.pdf", language: "English", extractionStatus: "COMPLETE", entities: 61, confidence: 91, validation: "REVIEW_REQUIRED", dbStatus: "WRITTEN", graphStatus: "PENDING" },
  { id: "DOC-88198", name: "Witness_Statement_Old_City.pdf", language: "Urdu", extractionStatus: "FAILED", entities: 0, confidence: null, validation: "FAILED", dbStatus: "NOT_WRITTEN", graphStatus: "NOT_UPDATED" },
];
