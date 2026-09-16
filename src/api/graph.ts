import { apiClient } from './client';
import { GraphNodeData, GraphEdgeData } from '../types';
import { DEMO_GRAPH_NODES, DEMO_GRAPH_EDGES } from '../data/mockData';

export interface GraphPayload {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
}

export async function fetchGraphData(): Promise<GraphPayload> {
  return apiClient<GraphPayload>('/api/graph', undefined, () => ({
    nodes: DEMO_GRAPH_NODES,
    edges: DEMO_GRAPH_EDGES,
  }));
}

/**
 * Alias for fetchGraphData
 */
export async function fetchGraph(): Promise<GraphPayload> {
  return fetchGraphData();
}

