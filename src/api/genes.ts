import { apiClient } from './client';
import { GeneEntity } from '../types';
import { DEMO_GENES } from '../data/mockData';

export async function fetchAllGenes(): Promise<GeneEntity[]> {
  return apiClient<GeneEntity[]>('/api/genes', undefined, () => DEMO_GENES);
}

export async function fetchGeneById(id: string): Promise<GeneEntity | undefined> {
  return apiClient<GeneEntity | undefined>(`/api/genes/${id}`, undefined, () => {
    return DEMO_GENES.find(
      (g) => g.id === id || g.symbol.toLowerCase() === id.toLowerCase() || g.ncbiId === id
    );
  });
}
