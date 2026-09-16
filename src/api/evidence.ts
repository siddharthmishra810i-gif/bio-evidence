import { apiClient } from './client';
import { RelationshipDetail, EvidenceItem } from '../types';
import { DEMO_RELATIONSHIPS } from '../data/mockData';

export async function fetchRelationshipDetail(id: string): Promise<RelationshipDetail | undefined> {
  return apiClient<RelationshipDetail | undefined>(`/api/evidence/${id}`, undefined, () => {
    // Try exact match or match by normalized IDs
    const normalizedId = id.toLowerCase();
    const found = DEMO_RELATIONSHIPS[id] || 
      Object.values(DEMO_RELATIONSHIPS).find(r => 
        r.id.toLowerCase() === normalizedId ||
        (r.sourceEntityName.toLowerCase() + '-' + r.targetEntityName.toLowerCase()).includes(normalizedId) ||
        (r.sourceEntityId.toLowerCase() + '-' + r.targetEntityId.toLowerCase()).includes(normalizedId)
      );
    // Return default first relationship if not found for seamless fallback
    return found || Object.values(DEMO_RELATIONSHIPS)[0];
  });
}

/**
 * Alias for fetchRelationshipDetail matching standard backend endpoint naming.
 */
export async function fetchRelationship(id: string): Promise<RelationshipDetail | undefined> {
  return fetchRelationshipDetail(id);
}

export async function fetchAllRelationships(): Promise<RelationshipDetail[]> {
  return apiClient<RelationshipDetail[]>('/api/evidence', undefined, () => {
    return Object.values(DEMO_RELATIONSHIPS);
  });
}

/**
 * Fetch atomic evidence items, optionally scoped to a particular relationship.
 */
export async function fetchEvidence(relationshipId?: string): Promise<EvidenceItem[]> {
  const endpoint = relationshipId ? `/api/evidence/${relationshipId}/items` : '/api/evidence/items';
  return apiClient<EvidenceItem[]>(endpoint, undefined, () => {
    if (relationshipId) {
      const rel = DEMO_RELATIONSHIPS[relationshipId];
      return rel ? rel.evidenceItems : [];
    }
    return Object.values(DEMO_RELATIONSHIPS).flatMap((r) => r.evidenceItems);
  });
}

