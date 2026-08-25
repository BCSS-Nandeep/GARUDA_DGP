import { Layers } from "lucide-react";
import styles from "./AIPipeline.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Badge } from "../../components/ui/Badge";

const GROUPS = [
  { label: "Infrastructure", tone: "info", items: ["Ubuntu 22.04 LTS", "Docker CE 24", "Kubernetes 1.29", "Istio 1.20", "NVIDIA A100 80GB ×12"] },
  { label: "Databases", tone: "success", items: ["PostgreSQL 16", "Neo4j 5.x", "Redis 7.2", "Kafka 3.7", "Elasticsearch 8", "ClickHouse 24", "MinIO"] },
  { label: "AI / ML", tone: "ai", items: ["Llama 3.1 70B", "Mistral 7B", "PyTorch 2.3", "PyG GNN", "spaCy 3.7", "LangChain", "Ollama / vLLM"] },
  { label: "Backend & Security", tone: "info", items: ["FastAPI", "Celery", "Airflow 2.9", "Debezium CDC", "Kong API GW"] },
  { label: null, tone: "danger", items: ["Keycloak RBAC", "HashiCorp Vault", "GARUDA-SQLGuard", "TLS 1.3 + mTLS", "Suricata IDS"] },
];

export function TechnologyStack() {
  return (
    <Card>
      <SectionHeader icon={Layers} title="Technology Stack" />
      <div className={styles.stackWrap}>
        {GROUPS.map((group, i) => (
          <div key={i}>
            {group.label && <div className={styles.stackLabel}>{group.label}</div>}
            <div className={styles.stackBadges}>
              {group.items.map((item) => (
                <Badge key={item} tone={group.tone} size="sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
