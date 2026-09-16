import { apiClient } from './client';
import { DrugEntity } from '../types';
import { DEMO_DRUGS } from '../data/mockData';

export async function fetchAllDrugs(): Promise<DrugEntity[]> {
  return apiClient<DrugEntity[]>('/api/drugs', undefined, () => DEMO_DRUGS);
}

export async function fetchDrugById(id: string): Promise<DrugEntity | undefined> {
  return apiClient<DrugEntity | undefined>(`/api/drugs/${id}`, undefined, () => {
    return DEMO_DRUGS.find((d) => d.id === id || d.name.toLowerCase() === id.toLowerCase());
  });
}
