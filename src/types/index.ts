export type EntityType = 
  | 'Drug'
  | 'Gene'
  | 'Disease'
  | 'Protein'
  | 'Mutation'
  | 'Pathway'
  | 'Publication'
  | 'ClinicalTrial';

export type RelationshipType = 
  | 'TARGETS'
  | 'ASSOCIATED_WITH'
  | 'AFFECTS'
  | 'INVOLVES'
  | 'STUDIED_IN'
  | 'SUPPORTED_BY'
  | string;

export type EvidenceCategory = 
  | 'Molecular'
  | 'Genetic'
  | 'Disease'
  | 'Preclinical'
  | 'Clinical'
  | 'Literature';

export type EvidenceSupportLevel = 'Supporting' | 'Limited' | 'Contradictory';

/**
 * Known biomedical data sources supported or planned for ingestion.
 * Extensible string union to allow backend additions without frontend code breaking.
 */
export type KnownBiomedicalSource =
  | 'Open Targets'
  | 'ChEMBL'
  | 'PubChem'
  | 'PubMed'
  | 'ClinicalTrials.gov'
  | 'DGIdb'
  | 'UniProt'
  | 'NCBI'
  | 'ClinVar'
  | 'Reactome'
  | 'Ensembl'
  | 'Europe PMC'
  | 'GWAS Catalog'
  | 'CIViC'
  | 'COSMIC'
  | string;

/**
 * Universal cross-database entity identifier model.
 * Bridges BioEvidence internal IDs with external authority repositories (e.g. NCBI, Ensembl, UniProt, ChEMBL).
 */
export interface EntityIdentifier {
  system: string;
  value: string;
}

/**
 * Reusable base entity interface for all biomedical knowledge nodes.
 */
export interface BiomedicalEntity {
  id: string;
  name: string;
  type: EntityType;
  identifiers?: EntityIdentifier[];
}

/**
 * Provenance tracking record for every primary biomedical source assertion.
 */
export interface SourceProvenance {
  database: string;
  sourceId: string;
  url: string;

  publicationPmid?: string;
  publicationDoi?: string;

  date?: string;
  evidenceType?: string;

  confidenceScore?: number; // 0.0 to 1.0 quantitative score supplied by source/backend
}

/**
 * Atomic piece of scientific evidence supporting or contesting a relationship.
 */
export interface EvidenceItem {
  id: string;
  category: EvidenceCategory | string;
  title: string;
  description: string;
  supportLevel: EvidenceSupportLevel;
  year: number;
  sources: SourceProvenance[];
  studyType?: string;
  sampleSize?: number;
  sampleSizeDescription?: string;
  pValueOrAffinity?: string;
  confidenceScore?: number; // 0.0 - 1.0 quantitative score
  metadata?: Record<string, unknown>;
}

/**
 * Canonical first-class representation of a biomedical relationship between two entities.
 */
export interface RelationshipDetail {
  id: string;
  sourceEntityId: string;
  sourceEntityName: string;
  sourceEntityType: EntityType;
  targetEntityId: string;
  targetEntityName: string;
  targetEntityType: EntityType;
  relationshipType: RelationshipType;
  summary: string;
  totalEvidenceCount: number;
  supportingCount: number;
  limitedCount: number;
  contradictoryCount: number;
  evidenceItems: EvidenceItem[];
  timeline: {
    year: number;
    title: string;
    description: string;
    source: string;
    evidenceType: EvidenceCategory | string;
  }[];
  identifiers?: EntityIdentifier[];
  confidenceScore?: number;
  metadata?: Record<string, unknown>;
}

export interface GeneEntity extends BiomedicalEntity {
  id: string;
  symbol: string;
  name: string;
  type: 'Gene';
  ncbiId: string;
  ensemblId: string;
  uniprotId: string;
  chromosome: string;
  description: string;
  pathways: string[];
  mutations: string[];
  connectedDrugIds: string[];
  connectedDiseaseIds: string[];
  publicationCount: number;
  clinicalTrialCount: number;
  metrics: {
    evidenceScore: number;
    tractabilityScore: number;
  };
  identifiers?: EntityIdentifier[];
}

export interface DrugEntity extends BiomedicalEntity {
  id: string;
  name: string;
  type: 'Drug';
  drugType: string; // e.g., 'Small Molecule Kinase Inhibitor'
  mechanism: string;
  chemicalFormula?: string;
  molecularFormula?: string;
  molecularWeight?: number;
  firstApprovalYear?: number;
  pubchemCid?: string;
  chemblId?: string;
  approvalStatus: 'Approved' | 'Investigational' | 'Experimental' | string;
  indication: string;
  targetIds: string[];
  diseaseIds: string[];
  indicationIds: string[];
  publicationCount: number;
  clinicalTrialCount: number;
  identifiers?: EntityIdentifier[];
}

export interface DiseaseEntity extends BiomedicalEntity {
  id: string;
  name: string;
  type: 'Disease';
  meshId: string;
  doid: string;
  category: string;
  description: string;
  associatedGeneIds: string[];
  associatedDrugIds: string[];
  clinicalTrialIds: string[];
  publicationCount: number;
  clinicalTrialCount: number;
  identifiers?: EntityIdentifier[];
}

export interface MutationEntity extends BiomedicalEntity {
  id: string;
  name: string;
  type: 'Mutation';
  geneId: string;
  consequence: string;
  clinicalSignificance: string;
  associatedDrugIds: string[];
  identifiers?: EntityIdentifier[];
}

export interface PathwayEntity extends BiomedicalEntity {
  id: string;
  name: string;
  type: 'Pathway';
  reactomeId: string;
  category: string;
  geneIds: string[];
  description: string;
  identifiers?: EntityIdentifier[];
}

export interface PublicationItem {
  id: string;
  pmid: string;
  doi: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  detectedEntities: {
    name: string;
    type: EntityType;
    id: string;
  }[];
  evidenceType: EvidenceCategory | string;
  source: string;
  identifiers?: EntityIdentifier[];
  metadata?: Record<string, unknown>;
}

export interface ClinicalTrialItem {
  id: string;
  nctId: string;
  title: string;
  status: string;
  phase?: string;
  condition: string;
  interventions: string[];
  locations: string[];
  startDate: string;
  completionDate?: string;
  primaryCompletionDate?: string;
  enrollment?: number;
  sponsor: string;
  associatedGeneIds: string[];
  associatedDrugIds: string[];
  identifiers?: EntityIdentifier[];
  metadata?: Record<string, unknown>;
}

export interface GraphNodeData {
  id: string;
  label: string;
  type: EntityType;
  sublabel?: string;
  degree?: number;
  color?: string;
  metadata?: Record<string, unknown>;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: RelationshipType;
  weight?: number;
  evidenceCount?: number;
  metadata?: Record<string, unknown>;
}

export interface DataSourceInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  provides: string;
  lastSync: string;
  recordCount: string;
  version: string;
  website: string;
  documentationUrl: string;
  status: string;
  roleInBioEvidence: string;
}

export interface NaturalLanguageQueryResult {
  query: string;
  detectedEntities: {
    name: string;
    type: EntityType;
    id: string;
  }[];
  graphPaths: {
    start: string;
    relationship: string;
    end: string;
  }[];
  aiExplanation: string;
  isAiGenerated?: boolean;
  evidenceNotice?: string;
  supportingEvidence: EvidenceItem[];
  sources: SourceProvenance[];
}
