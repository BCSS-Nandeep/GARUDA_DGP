import { BrainCircuit } from "lucide-react";
import styles from "./AIPipeline.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { PipelineFlow } from "./PipelineFlow";
import { ModelMonitoring } from "./ModelMonitoring";
import { DocumentProcessing } from "./DocumentProcessing";
import { TechnologyStack } from "./TechnologyStack";
import { AutomationSuite } from "./AutomationSuite";

export function AIPipeline() {
  return (
    <div>
      <PageHeader
        icon={BrainCircuit}
        title="AI Pipeline"
        description="LLM/NER document ingestion, entity resolution, and knowledge-graph write pipeline."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)" }}>
        <PipelineFlow />
        <ModelMonitoring />
        <div className={styles.lowerGrid}>
          <TechnologyStack />
          <AutomationSuite />
        </div>
        <DocumentProcessing />
      </div>
    </div>
  );
}
