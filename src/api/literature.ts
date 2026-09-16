import { apiClient } from './client';
import { PublicationItem } from '../types';
import { DEMO_PUBLICATIONS } from '../data/mockData';

export async function fetchPublications(query?: string, filters?: { evidenceType?: string; year?: number }): Promise<PublicationItem[]> {
  return apiClient<PublicationItem[]>('/api/literature', undefined, () => {
    let list = [...DEMO_PUBLICATIONS];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q) ||
        p.detectedEntities.some(e => e.name.toLowerCase().includes(q))
      );
    }
    if (filters?.evidenceType && filters.evidenceType !== 'All') {
      list = list.filter(p => p.evidenceType === filters.evidenceType);
    }
    if (filters?.year) {
      list = list.filter(p => p.year >= filters.year!);
    }
    return list;
  });
}

/**
 * Alias for fetchPublications
 */
export async function fetchLiterature(query?: string, filters?: { evidenceType?: string; year?: number }): Promise<PublicationItem[]> {
  return fetchPublications(query, filters);
}

