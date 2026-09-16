import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Dna,
  Pill,
  ExternalLink,
  BookOpen,
  FlaskConical,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { DEMO_DISEASES, DEMO_GENES, DEMO_DRUGS, DEMO_PUBLICATIONS, DEMO_TRIALS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { SourceBadge } from '../components/common/SourceBadge';

export const DiseasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Associated Genes' | 'Associated Drugs' | 'Biomarkers' | 'Clinical Trials' | 'Literature'
  >('Overview');

  const disease = DEMO_DISEASES.find(
    (d) => d.id === id || d.name.toLowerCase().includes(id?.toLowerCase() || '')
  ) || DEMO_DISEASES[0];

  const associatedGenes = DEMO_GENES.filter((g) => disease.associatedGeneIds.includes(g.id));
  const associatedDrugs = DEMO_DRUGS.filter((d) => disease.associatedDrugIds.includes(d.id));
  const relevantTrials = DEMO_TRIALS.filter((t) => disease.clinicalTrialIds.includes(t.id));
  const relevantPublications = DEMO_PUBLICATIONS.filter((pub) =>
    pub.detectedEntities.some((e) => e.name.toLowerCase().includes('lung') || e.name.toLowerCase() === disease.name.toLowerCase())
  );

  const tabs = [
    'Overview',
    'Associated Genes',
    'Associated Drugs',
    'Biomarkers',
    'Clinical Trials',
    'Literature',
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F9F1EC] border border-[#B78368]/30 text-[#B78368] font-mono text-[11px] font-semibold uppercase">
                {disease.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F5EF] text-[#7A8077] border border-[#DFDCD3]">
                Demo Graph Verified
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252824]">
              {disease.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href={`https://disease-ontology.org/?id=${disease.doid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#B78368] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>DOID: {disease.doid}</span>
              <ExternalLink className="w-3 h-3 text-[#B78368]" />
            </a>
            <a
              href={`https://meshb.nlm.nih.gov/record/ui?ui=${disease.meshId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#B78368] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>MeSH: {disease.meshId}</span>
              <ExternalLink className="w-3 h-3 text-[#B78368]" />
            </a>
          </div>
        </div>

        <p className="text-sm text-[#585D56] leading-relaxed max-w-4xl border-t border-[#DFDCD3] pt-4">
          {disease.description}
        </p>

        {/* Association metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Validated Driver Genes</span>
            <div className="font-mono text-base font-bold text-[#718596] mt-0.5">
              {associatedGenes.length}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Approved Therapies</span>
            <div className="font-mono text-base font-bold text-[#718C78] mt-0.5">
              {associatedDrugs.length}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Active Clinical Trials</span>
            <div className="font-mono text-base font-bold text-[#252824] mt-0.5">
              {relevantTrials.length}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Phenotype Status</span>
            <div className="font-mono text-base font-bold text-[#B78368] mt-0.5">
              Curated
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#DFDCD3] flex flex-wrap gap-1 text-xs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-medium transition-all rounded-t-lg ${
              activeTab === tab
                ? 'bg-[#F7F5EF] border-t border-x border-[#DFDCD3] text-[#252824] font-bold shadow-2xs -mb-px'
                : 'text-[#666C64] hover:text-[#252824] hover:bg-[#EFEEE7]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#252824]">
                  Etiological & Pathological Overview
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  Accounts for approximately 85% of all lung cancer diagnoses. Histologically classified into adenocarcinoma, squamous cell carcinoma, and large cell carcinoma. Genomic profiling reveals actionable oncogenic driver mutations in kinase genes including EGFR, ALK, ROS1, BRAF, MET, and RET.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'Open Targets',
                      sourceId: disease.doid,
                      url: `https://platform.opentargets.org/disease/${disease.doid}`,
                    }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#252824]">
                  Clinical Stratification Paradigm
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  Precision oncology standards mandate next-generation sequencing (NGS) and immunohistochemistry upon diagnosis to guide molecularly targeted first-line therapies before systemic cytotoxic regimens are administered.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'PubMed',
                      sourceId: 'NCCN Guidelines',
                      url: 'https://pubmed.ncbi.nlm.nih.gov/',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Relationship Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#718596] font-bold">Top Associated Driver Genes</span>
                <div className="font-serif font-bold text-lg text-[#252824]">
                  {associatedGenes.map((g) => g.symbol).join(', ') || 'EGFR, KRAS, TP53'}
                </div>
                <button
                  onClick={() => setActiveTab('Associated Genes')}
                  className="text-xs text-[#718596] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Explore genomic drivers</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#718C78] font-bold">Approved Therapeutic Agents</span>
                <div className="font-serif font-bold text-lg text-[#252824]">
                  {associatedDrugs.map((d) => d.name).join(', ') || 'Gefitinib, Osimertinib'}
                </div>
                <button
                  onClick={() => setActiveTab('Associated Drugs')}
                  className="text-xs text-[#718C78] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Explore approved drugs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Associated Genes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {associatedGenes.map((gene) => (
              <div
                key={gene.id}
                onClick={() => navigate(`/genes/${gene.symbol}`)}
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] cursor-pointer transition-colors space-y-2 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#718596] uppercase font-bold">
                      Driver Gene • Chr {gene.chromosome}
                    </span>
                    <h4 className="font-serif font-bold text-xl text-[#252824] group-hover:text-[#516455] transition-colors">
                      {gene.symbol} — {gene.name}
                    </h4>
                  </div>
                  <span className="text-xs text-[#718596] font-mono group-hover:translate-x-1 transition-transform">
                    Inspect Target →
                  </span>
                </div>
                <p className="text-xs text-[#585D56] leading-relaxed">{gene.description}</p>
                <div className="pt-2 border-t border-[#DFDCD3] text-[11px] font-mono text-[#7A8077]">
                  NCBI: {gene.ncbiId} • UniProt: {gene.uniprotId}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Associated Drugs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {associatedDrugs.map((drug) => (
              <div
                key={drug.id}
                onClick={() => navigate(`/drugs/${drug.id}`)}
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] cursor-pointer transition-colors space-y-2 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
                      {drug.approvalStatus} • {drug.drugType}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#252824] group-hover:text-[#516455] transition-colors">
                      {drug.name}
                    </h4>
                  </div>
                  <span className="text-xs text-[#718C78] font-mono group-hover:translate-x-1 transition-transform">
                    Inspect Drug →
                  </span>
                </div>
                <p className="text-xs text-[#585D56] leading-relaxed">{drug.mechanism}</p>
                <div className="pt-2 border-t border-[#DFDCD3] text-[11px] font-mono text-[#7A8077]">
                  ChEMBL: {drug.chemblId} • Indication: {drug.indication}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Clinical Trials' && (
          <div className="space-y-4">
            {relevantTrials.map((trial) => (
              <div key={trial.id} className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#EBF0EC] text-[#516455] text-[10px] font-mono font-bold">
                        {trial.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#718C78] font-bold">{trial.phase}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#252824] mt-1">{trial.title}</h4>
                    <div className="text-xs text-[#585D56] mt-0.5">Condition: {trial.condition}</div>
                  </div>
                  <a
                    href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-[#EFEEE7] text-xs font-mono text-[#252824] hover:bg-[#DFDCD3] inline-flex items-center gap-1.5 shrink-0 self-start"
                  >
                    <span>{trial.nctId}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-xs text-[#7A8077] pt-1 border-t border-[#DFDCD3]">
                  Interventions: {trial.interventions.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Literature' && (
          <div className="space-y-4">
            {relevantPublications.map((pub) => (
              <div key={pub.id} className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#718C78] uppercase font-bold">
                      {pub.evidenceType} Evidence • {pub.journal} ({pub.year})
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#252824] mt-0.5">{pub.title}</h4>
                    <div className="text-xs text-[#7A8077]">{pub.authors.join(', ')}</div>
                  </div>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-[#EFEEE7] text-xs font-mono text-[#252824] hover:bg-[#DFDCD3] inline-flex items-center gap-1.5 shrink-0 self-start"
                  >
                    <span>PMID:{pub.pmid}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#585D56] leading-relaxed">{pub.abstract}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
