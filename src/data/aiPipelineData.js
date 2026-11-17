// Synthetic demo data — AI Pipeline panel from GARUDA_UI.html.
export const pipelineStages = [
  {
    id: "ingestion",
    label: "Document Ingestion (FIRs, SDRs)",
    status: "RUNNING",
    currentJob: "Batch #4471",
    processed: 1204,
    failed: 12,
    latencyMs: 210,
    model: "—",
  },
  {
    id: "ner",
    label: "Llama 3.1 70B — NER Extraction",
    status: "ACTIVE",
    currentJob: "Batch #4471",
    processed: 1180,
    failed: 8,
    latencyMs: 680,
    model: "Llama 3.1 70B",
  },
  {
    id: "validation",
    label: "Pydantic Schema Validation",
    status: "VALIDATING",
    currentJob: "Batch #4471",
    processed: 1150,
    failed: 14,
    latencyMs: 90,
    model: "—",
  },
  {
    id: "resolution",
    label: "Entity Resolution & Deduplication",
    status: "QUEUED",
    currentJob: "Batch #4470",
    processed: 1100,
    failed: 20,
    latencyMs: 1120,
    model: "EntityLink-v2",
  },
  {
    id: "postgres",
    label: "PostgreSQL Write — Profile Update",
    status: "QUEUED",
    currentJob: "Batch #4470",
    processed: 1080,
    failed: 4,
    latencyMs: 45,
    model: "—",
  },
  {
    id: "neo4j",
    label: "Neo4j Graph Update (Relationships)",
    status: "PENDING",
    currentJob: "—",
    processed: 0,
    failed: 0,
    latencyMs: 0,
    model: "—",
  },
  {
    id: "audit",
    label: "Audit Log Write & Alert Dispatch",
    status: "PENDING",
    currentJob: "—",
    processed: 0,
    failed: 0,
    latencyMs: 0,
    model: "—",
  },
];

export const modelMonitoring = {
  nerAccuracy: 98.2,
  tokensPerSec: 4240,
  gpuUtilization: 83,
  documentsProcessed: 1204,
  activeModels: 4,
};

export const activeModels = [
  { name: "Llama 3.1 70B", badge: "PRIMARY", tone: "success" },
  { name: "Mistral 7B", badge: "BATCH", tone: "info" },
  { name: "PyTorch Geometric GNN", badge: "GRAPH", tone: "success" },
  { name: "spaCy 3.7 NER", badge: "NLP", tone: "success" },
];

export const techStack = {
  Infrastructure: ["Ubuntu 22.04 LTS", "Docker CE 24", "Kubernetes 1.29", "Istio 1.20", "NVIDIA A100 80GB ×12"],
  Databases: ["PostgreSQL 16", "Neo4j 5.x", "Redis 7.2", "Kafka 3.7", "Elasticsearch 8", "ClickHouse 24", "MinIO"],
  "AI / ML": ["Llama 3.1 70B", "Mistral 7B", "PyTorch 2.3", "PyG GNN", "spaCy 3.7", "LangChain", "Ollama/vLLM"],
  "Backend & Security": [
    "FastAPI",
    "Celery",
    "Airflow 2.9",
    "Debezium CDC",
    "Kong API GW",
    "Keycloak RBAC",
    "HashiCorp Vault",
    "GARUDA-SQLGuard",
    "TLS 1.3 + mTLS",
    "Suricata IDS",
  ],
};

export const automationSuite = [
  { name: "Auto-Unocross Drafting", status: "ACTIVE" },
  { name: "Conflict Alert Engine", status: "ACTIVE" },
  { name: "BC Roll Auto-Generator", status: "ACTIVE" },
  { name: "IR Auto-Fill Templates", status: "ACTIVE" },
  { name: "Kingpin Discovery GNN", status: "ACTIVE" },
  { name: "LBS Geo-Fence Alerts", status: "ACTIVE" },
];

export const throughputSeries = [
  { time: "00:00", docs: 600 },
  { time: "02:00", docs: 700 },
  { time: "04:00", docs: 720 },
  { time: "06:00", docs: 750 },
  { time: "08:00", docs: 800 },
  { time: "10:00", docs: 820 },
  { time: "12:00", docs: 900 },
  { time: "14:00", docs: 950 },
  { time: "16:00", docs: 980 },
  { time: "18:00", docs: 1000 },
  { time: "20:00", docs: 1100 },
  { time: "22:00", docs: 1204 },
];

export const accuracySeries = [
  { time: "Mon", accuracy: 97.1 },
  { time: "Tue", accuracy: 97.4 },
  { time: "Wed", accuracy: 97.8 },
  { time: "Thu", accuracy: 98.0 },
  { time: "Fri", accuracy: 98.1 },
  { time: "Sat", accuracy: 98.2 },
  { time: "Sun", accuracy: 98.2 },
];

export const documents = [
  { id: "DOC-88213", name: "FIR_HYD_4492_scan.pdf", language: "Telugu", extractionStatus: "COMPLETE", entities: 24, confidence: 98, validation: "PASSED", dbStatus: "WRITTEN", graphStatus: "UPDATED" },
  { id: "DOC-88212", name: "CDR_Report_9840XXXXXX.csv", language: "English", extractionStatus: "COMPLETE", entities: 118, confidence: 98, validation: "PASSED", dbStatus: "WRITTEN", graphStatus: "UPDATED" },
  { id: "DOC-88209", name: "Chargesheet_4820.pdf", language: "Hindi", extractionStatus: "PROCESSING", entities: 0, confidence: null, validation: "PENDING", dbStatus: "PENDING", graphStatus: "PENDING" },
  { id: "DOC-88204", name: "Bank_Statement_4821.pdf", language: "English", extractionStatus: "COMPLETE", entities: 61, confidence: 91, validation: "REVIEW_REQUIRED", dbStatus: "WRITTEN", graphStatus: "PENDING" },
  { id: "DOC-88198", name: "Witness_Statement_Secunderabad.pdf", language: "Urdu", extractionStatus: "FAILED", entities: 0, confidence: null, validation: "FAILED", dbStatus: "NOT_WRITTEN", graphStatus: "NOT_UPDATED" },
];
