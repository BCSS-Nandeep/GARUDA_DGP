import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Share2 } from "lucide-react";
import styles from "./NetworkAnalysis.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { Skeleton } from "../../components/ui/Skeleton";
import { GraphCanvas } from "./GraphCanvas";
import { GraphControls, GRAPH_ENTITY_TYPES } from "./GraphControls";
import { NetworkMetrics } from "./NetworkMetrics";
import { AiFindings } from "./AiFindings";
import { NetworkActions } from "./NetworkActions";
import { NodeDetailPanel } from "./NodeDetailPanel";
import { getNetworkGraph } from "../../services/networkService";
import { useNotifications } from "../../context/NotificationContext";

export function NetworkAnalysis() {
  const { id } = useParams();
  const notifications = useNotifications();
  const [graph, setGraph] = useState(null);
  const [activeTypes, setActiveTypes] = useState(GRAPH_ENTITY_TYPES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(id || null);
  const [fitSignal, setFitSignal] = useState(0);

  useEffect(() => {
    getNetworkGraph().then(setGraph);
  }, []);

  const selectedNode = useMemo(() => {
    if (!graph || !selectedId) return null;
    const n = graph.nodes.find((node) => node.id === selectedId);
    return n ? { ...n } : null;
  }, [graph, selectedId]);

  function toggleType(type) {
    setActiveTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  }

  function handleReset() {
    setActiveTypes(GRAPH_ENTITY_TYPES);
    setSearchQuery("");
    setSelectedId(null);
    setFitSignal((s) => s + 1);
  }

  return (
    <div className={styles.page}>
      <PageHeader
        icon={Share2}
        title="Network Analysis"
        description="Explore entity relationships across cases, subjects, vehicles, phones, and financial links."
      />
      <div className={styles.layout}>
        <div className={styles.graphColumn}>
          <GraphControls
            activeTypes={activeTypes}
            onToggleType={toggleType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onReset={handleReset}
          />
          {!graph ? (
            <Skeleton height={520} radius={12} />
          ) : (
            <GraphCanvas
              graph={graph}
              activeTypes={activeTypes}
              searchQuery={searchQuery}
              onNodeClick={setSelectedId}
              selectedId={selectedId}
              fitSignal={fitSignal}
            />
          )}
        </div>
        <div className={styles.sideColumn}>
          <NetworkMetrics />
          <AiFindings />
          <NetworkActions
            onExpand={() =>
              notifications.info("No additional entities found", "2nd-degree expansion returned no new nodes in this dataset")
            }
          />
        </div>
      </div>

      {graph && <NodeDetailPanel node={selectedNode} graph={graph} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
