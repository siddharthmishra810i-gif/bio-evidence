import { apiClient } from './client';
import { DiseaseEntity } from '../types';
import { DEMO_DISEASES } from '../data/mockData';

export async function fetchAllDiseases(): Promise<DiseaseEntity[]> {
  return apiClient<DiseaseEntity[]>('/api/diseases', undefined, () => DEMO_DISEASES);
}

export async function fetchDiseaseById(id: string): Promise<DiseaseEntity | undefined> {
  return apiClient<DiseaseEntity | undefined>(`/api/diseases/${id}`, undefined, () => {
    return DEMO_DISEASES.find(
      (d) => d.id === id || d.name.toLowerCase() === id.toLowerCase() || d.doid.toLowerCase() === id.toLowerCase()
    );
  });
}
