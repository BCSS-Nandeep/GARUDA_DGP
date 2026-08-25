import { mockDelay } from "./api";
import { pipelineStages, modelMonitoring, throughputSeries, accuracySeries, documents } from "../data/aiPipelineData";

export async function getPipelineStages() {
  return mockDelay(pipelineStages, 450);
}

export async function getModelMonitoring() {
  return mockDelay({ ...modelMonitoring, throughputSeries, accuracySeries }, 500);
}

export async function getDocuments() {
  return mockDelay(documents, 400);
}
