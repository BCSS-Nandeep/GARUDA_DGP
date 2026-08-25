import { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import styles from "./NetworkAnalysis.module.css";
import { nodeTypes } from "./EntityNode";
import { circularLayout } from "./layout";

function GraphCanvasInner({ graph, activeTypes, searchQuery, onNodeClick, selectedId, fitSignal }) {
  const { fitView } = useReactFlow();

  // Re-frame the graph on reset instead of remounting the whole ReactFlow
  // instance (a remount discards the viewport and re-runs node-type checks).
  useEffect(() => {
    if (!fitSignal) return;
    fitView({ padding: 0.3, duration: 400 });
  }, [fitSignal, fitView]);

  const baseNodes = useMemo(() => {
    const withPositions = circularLayout(graph.nodes);
    return withPositions.map((n) => ({
      id: n.id,
      type: "entityNode",
      position: n.position,
      data: { type: n.type, label: n.label, risk: n.risk },
    }));
  }, [graph.nodes]);

  const baseEdges = useMemo(
    () =>
      graph.edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: false,
        className: styles.edge,
        labelBgStyle: { fill: "var(--bg-elevated)", fillOpacity: 0.9 },
        labelStyle: { fill: "var(--text-secondary)", fontSize: 10, fontFamily: "var(--font-mono)" },
        style: { stroke: "var(--border-strong)" },
      })),
    [graph.edges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(baseNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(baseEdges);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    setNodes(
      baseNodes.map((n) => ({
        ...n,
        hidden: !activeTypes.includes(n.data.type),
        selected: n.id === selectedId,
        data: { ...n.data, dimmed: q ? !n.data.label.toLowerCase().includes(q) && !n.id.toLowerCase().includes(q) : false },
      }))
    );
  }, [baseNodes, activeTypes, searchQuery, selectedId, setNodes]);

  useEffect(() => {
    setEdges(
      baseEdges.map((e) => ({
        ...e,
        hidden:
          !activeTypes.includes(graph.nodes.find((n) => n.id === e.source)?.type) ||
          !activeTypes.includes(graph.nodes.find((n) => n.id === e.target)?.type),
      }))
    );
  }, [baseEdges, activeTypes, graph.nodes, setEdges]);

  return (
    <div className={styles.canvasWrap}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node.id)}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="var(--border)" gap={20} />
        <Controls showInteractive={false} className={styles.controls} />
        <MiniMap
          className={styles.minimap}
          maskColor="rgba(5,8,13,0.75)"
          nodeColor={() => "var(--accent-cyan)"}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}

export function GraphCanvas(props) {
  return (
    <ReactFlowProvider>
      <GraphCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
