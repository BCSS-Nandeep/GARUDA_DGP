import { mockDelay } from "./api";
import { networkNodes, networkEdges, networkMetrics, aiFindings } from "../data/networkData";

export async function getNetworkGraph() {
  return mockDelay({ nodes: networkNodes, edges: networkEdges }, 550);
}

export async function getNetworkMetrics() {
  return mockDelay(networkMetrics, 400);
}

export async function getAiFindings() {
  return mockDelay(aiFindings, 450);
}
