import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dna,
  Pill,
  HeartPulse,
  GitBranch,
  Split,
  BookOpen,
  FlaskConical,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DEMO_GENES, DEMO_DRUGS, DEMO_DISEASES, DEMO_PUBLICATIONS, DEMO_TRIALS, DEMO_MUTATIONS, DEMO_PATHWAYS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { SourceBadge } from '../components/common/SourceBadge';

export const GenePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Evidence' | 'Drugs' | 'Diseases' | 'Pathways' | 'Mutations' | 'Literature' | 'Clinical Trials'
  >('Overview');

  // Find gene by id or symbol
  const gene = DEMO_GENES.find(
    (g) => g.symbol.toLowerCase() === id?.toLowerCase() || g.id.toLowerCase() === id?.toLowerCase()
  ) || DEMO_GENES[0];

  // Connected entities
  const connectedDrugs = DEMO_DRUGS.filter((d) => d.targetIds.includes(gene.id));
  const connectedDiseases = DEMO_DISEASES.filter((dis) => dis.associatedGeneIds.includes(gene.id));
  const associatedMutations = DEMO_MUTATIONS.filter((m) => m.geneId === gene.id);
  const associatedPathways = DEMO_PATHWAYS.filter((p) => p.geneIds.includes(gene.id));
  const relevantPublications = DEMO_PUBLICATIONS.filter((pub) =>
    pub.detectedEntities.some((e) => e.name.toLowerCase() === gene.symbol.toLowerCase())
  );
  const relevantTrials = DEMO_TRIALS.filter((trial) => trial.associatedGeneIds.includes(gene.id));

  const tabs = [
    'Overview',
    'Evidence',
    'Drugs',
    'Diseases',
    'Pathways',
    'Mutations',
    'Literature',
    'Clinical Trials',
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Gene Title Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF0F4] border border-[#718596]/30 text-[#718596] font-mono text-[11px] font-semibold uppercase">
                Human Protein-Coding Gene • Chr {gene.chromosome}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF0EC] text-[#516455]">
                Demo Graph Verified
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252824]">
              {gene.symbol}
            </h1>
            <p className="font-serif text-lg text-[#585D56] italic mt-0.5">
              {gene.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href={`https://www.ncbi.nlm.nih.gov/gene/${gene.ncbiId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>NCBI: {gene.ncbiId}</span>
              <ExternalLink className="w-3 h-3 text-[#718596]" />
            </a>
            <a
              href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${gene.ensemblId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Ensembl: {gene.ensemblId}</span>
              <ExternalLink className="w-3 h-3 text-[#718596]" />
            </a>
            <a
              href={`https://www.uniprot.org/uniprotkb/${gene.uniprotId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>UniProt: {gene.uniprotId}</span>
              <ExternalLink className="w-3 h-3 text-[#718596]" />
            </a>
          </div>
        </div>

        <p className="text-sm text-[#585D56] leading-relaxed max-w-4xl border-t border-[#DFDCD3] pt-4">
          {gene.description}
        </p>

        {/* Association Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Association Score</span>
            <div className="font-mono text-base font-bold text-[#516455] mt-0.5">
              {(gene.metrics.evidenceScore * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Tractability Index</span>
            <div className="font-mono text-base font-bold text-[#718596] mt-0.5">
              {(gene.metrics.tractabilityScore * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Curated Studies</span>
            <div className="font-mono text-base font-bold text-[#252824] mt-0.5">
              {gene.publicationCount}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Interventional Trials</span>
            <div className="font-mono text-base font-bold text-[#252824] mt-0.5">
              {gene.clinicalTrialCount}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
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

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biological Role */}
              <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#252824]">
                  Cellular & Molecular Context
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  Upon ligand binding (such as EGF or TGF-alpha), EGFR undergoes homo- or hetero-dimerization with other ERBB receptors (ERBB2/HER2, ERBB3, ERBB4). This triggers autophosphorylation of tyrosine residues in its cytoplasmic domain, initiating signaling cascades that dictate cellular proliferation, survival, angiogenesis, and metastasis.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'UniProt',
                      sourceId: gene.uniprotId,
                      url: `https://www.uniprot.org/uniprotkb/${gene.uniprotId}`,
                    }}
                  />
                </div>
              </div>

              {/* Clinical Target Summary */}
              <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#252824]">
                  Therapeutic Druggability & Biomarkers
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  One of the most extensively validated oncology drug targets. Small molecule tyrosine kinase inhibitors (TKIs) and monoclonal antibodies targeting the extracellular ligand-binding domain have established first-line standards of care in EGFR-mutant cancers.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'Open Targets',
                      sourceId: gene.ensemblId,
                      url: `https://platform.opentargets.org/target/${gene.ensemblId}`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Relationship Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#718C78] font-bold">Targeted By</span>
                <div className="font-serif font-bold text-base text-[#252824]">
                  {connectedDrugs.map((d) => d.name).join(', ') || 'Gefitinib, Osimertinib'}
                </div>
                <button
                  onClick={() => setActiveTab('Drugs')}
                  className="text-xs text-[#718C78] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Inspect active compounds</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#B78368] font-bold">Associated Diseases</span>
                <div className="font-serif font-bold text-base text-[#252824]">
                  {connectedDiseases.map((d) => d.name).join(', ') || 'NSCLC, Glioblastoma'}
                </div>
                <button
                  onClick={() => setActiveTab('Diseases')}
                  className="text-xs text-[#B78368] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Inspect disease links</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#718596] font-bold">Signaling Cascades</span>
                <div className="font-serif font-bold text-base text-[#252824]">
                  {gene.pathways.join(', ')}
                </div>
                <button
                  onClick={() => setActiveTab('Pathways')}
                  className="text-xs text-[#718596] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Inspect pathways</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Evidence' && (
          <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              {gene.symbol} Targeted Evidence Relationships
            </h3>
            <p className="text-xs text-[#585D56] leading-relaxed">
              Explore primary research strings linking {gene.symbol} with approved kinase inhibitors and companion diagnostic assays.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/evidence')}
                className="px-4 py-2.5 rounded-xl bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] text-xs font-medium inline-flex items-center gap-2"
              >
                <span>Launch Full Evidence Dossier for {gene.symbol}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Drugs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedDrugs.map((drug) => (
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

        {activeTab === 'Diseases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedDiseases.map((dis) => (
              <div
                key={dis.id}
                onClick={() => navigate(`/diseases/${dis.id}`)}
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#B78368] cursor-pointer transition-colors space-y-2 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#B78368] font-semibold">
                      {dis.category}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#252824] group-hover:text-[#B78368] transition-colors">
                      {dis.name}
                    </h4>
                  </div>
                  <span className="text-xs text-[#B78368] font-mono group-hover:translate-x-1 transition-transform">
                    Inspect Disease →
                  </span>
                </div>
                <p className="text-xs text-[#585D56] leading-relaxed">{dis.description}</p>
                <div className="pt-2 border-t border-[#DFDCD3] text-[11px] font-mono text-[#7A8077]">
                  DOID: {dis.doid} • MeSH: {dis.meshId}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Mutations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {associatedMutations.map((m) => (
              <div key={m.id} className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#718596] font-bold">Variant Locus</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#585D56] font-semibold">
                    {m.name}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#252824]">{m.consequence}</h4>
                <p className="text-xs text-[#585D56] leading-relaxed">{m.clinicalSignificance}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Pathways' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {associatedPathways.map((p) => (
              <div key={p.id} className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2 shadow-2xs">
                <span className="text-[10px] font-mono uppercase text-[#889C82] font-bold">{p.category}</span>
                <h4 className="font-serif font-bold text-lg text-[#252824]">{p.name}</h4>
                <p className="text-xs text-[#585D56] leading-relaxed">{p.description}</p>
                <div className="pt-2 border-t border-[#DFDCD3] text-[11px] font-mono text-[#7A8077]">
                  Reactome: {p.reactomeId}
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
      </div>

      <SafetyBanner compact />
    </div>
  );
};
