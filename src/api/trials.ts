import { apiClient } from './client';
import { ClinicalTrialItem } from '../types';
import { DEMO_TRIALS } from '../data/mockData';

export async function fetchClinicalTrials(
  query?: string,
  phase?: string,
  status?: string
): Promise<ClinicalTrialItem[]> {
  return apiClient<ClinicalTrialItem[]>('/api/trials', undefined, () => {
    let list = [...DEMO_TRIALS];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.condition.toLowerCase().includes(q) ||
        t.nctId.toLowerCase().includes(q) ||
        t.interventions.some(i => i.toLowerCase().includes(q))
      );
    }
    if (phase && phase !== 'All') {
      list = list.filter(t => t.phase === phase);
    }
    if (status && status !== 'All') {
      list = list.filter(t => t.status === status);
    }
    return list;
  });
}
