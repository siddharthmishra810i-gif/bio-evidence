import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Pill,
  Dna,
  HeartPulse,
  ExternalLink,
  BookOpen,
  FlaskConical,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Atom,
} from 'lucide-react';
import { DEMO_DRUGS, DEMO_GENES, DEMO_DISEASES, DEMO_PUBLICATIONS, DEMO_TRIALS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { SourceBadge } from '../components/common/SourceBadge';

export const DrugPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Targets' | 'Indications' | 'Evidence' | 'Pathways' | 'Clinical Trials' | 'Literature'
  >('Overview');

  // Match drug
  const drug = DEMO_DRUGS.find(
    (d) => d.id === id || d.name.toLowerCase() === id?.toLowerCase()
  ) || DEMO_DRUGS[0];

  const targetGenes = DEMO_GENES.filter((g) => drug.targetIds.includes(g.id));
  const indicationDiseases = DEMO_DISEASES.filter((dis) => drug.indicationIds.includes(dis.id));
  const relevantTrials = DEMO_TRIALS.filter((trial) => trial.associatedDrugIds.includes(drug.id));
  const relevantPublications = DEMO_PUBLICATIONS.filter((pub) =>
    pub.detectedEntities.some((e) => e.name.toLowerCase() === drug.name.toLowerCase())
  );

  const tabs = [
    'Overview',
    'Targets',
    'Indications',
    'Evidence',
    'Pathways',
    'Clinical Trials',
    'Literature',
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Drug Header Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] border border-[#718C78]/30 text-[#516455] font-mono text-[11px] font-semibold uppercase">
                {drug.approvalStatus} • {drug.drugType}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F5EF] text-[#7A8077] border border-[#DFDCD3]">
                Small Molecule TKI
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252824]">
              {drug.name}
            </h1>
            <p className="font-serif text-lg text-[#585D56] italic mt-0.5">
              {drug.indication}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href={`https://www.ebi.ac.uk/chembl/compound_report_card/${drug.chemblId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>ChEMBL: {drug.chemblId}</span>
              <ExternalLink className="w-3 h-3 text-[#718C78]" />
            </a>
            <a
              href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drug.pubchemCid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] text-[#252824] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>PubChem: {drug.pubchemCid}</span>
              <ExternalLink className="w-3 h-3 text-[#718C78]" />
            </a>
          </div>
        </div>

        <p className="text-sm text-[#585D56] leading-relaxed max-w-4xl border-t border-[#DFDCD3] pt-4">
          {drug.mechanism}
        </p>

        {/* Drug Properties Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Chemical Formula</span>
            <div className="font-mono text-xs font-bold text-[#252824] mt-0.5">
              {drug.molecularFormula}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Molecular Weight</span>
            <div className="font-mono text-xs font-bold text-[#252824] mt-0.5">
              {drug.molecularWeight} g/mol
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">Clinical Studies</span>
            <div className="font-mono text-base font-bold text-[#718C78] mt-0.5">
              {drug.clinicalTrialCount} trials
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#DFDCD3]">
            <span className="text-[10px] font-mono text-[#7A8077] uppercase">First Approval</span>
            <div className="font-mono text-base font-bold text-[#252824] mt-0.5">
              {drug.firstApprovalYear}
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
                  Pharmacodynamic Action
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  Inhibits the intracellular phosphorylation of tyrosine residues associated with the epidermal growth factor receptor (EGFR). This blocks downstream signaling pathways involved in cell proliferation, apoptosis inhibition, and angiogenesis.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'DrugBank',
                      sourceId: drug.chemblId,
                      url: 'https://go.drugbank.com/',
                    }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#252824]">
                  Therapeutic Class & Indication
                </h3>
                <p className="text-xs text-[#585D56] leading-relaxed">
                  Prescribed for patients with metastatic non-small cell lung cancer whose tumors harbor epidermal growth factor receptor (EGFR) exon 19 deletions or exon 21 (L858R) substitution mutations detected by an FDA-approved companion diagnostic test.
                </p>
                <div className="pt-2">
                  <SourceBadge
                    source={{
                      database: 'Open Targets',
                      sourceId: drug.chemblId,
                      url: `https://platform.opentargets.org/drug/${drug.chemblId}`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Targets & Indications Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#718596] font-bold">Primary Target Genes</span>
                <div className="font-serif font-bold text-lg text-[#252824]">
                  {targetGenes.map((g) => g.symbol).join(', ') || 'EGFR'}
                </div>
                <button
                  onClick={() => setActiveTab('Targets')}
                  className="text-xs text-[#718596] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Review validated targets</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#B78368] font-bold">Documented Indications</span>
                <div className="font-serif font-bold text-lg text-[#252824]">
                  {indicationDiseases.map((d) => d.name).join(', ') || drug.indication}
                </div>
                <button
                  onClick={() => setActiveTab('Indications')}
                  className="text-xs text-[#B78368] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Review disease indications</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Targets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetGenes.map((gene) => (
              <div
                key={gene.id}
                onClick={() => navigate(`/genes/${gene.symbol}`)}
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] cursor-pointer transition-colors space-y-2 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#718596] uppercase font-bold">
                      Direct Target • Chr {gene.chromosome}
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

        {activeTab === 'Indications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indicationDiseases.map((dis) => (
              <div
                key={dis.id}
                onClick={() => navigate(`/diseases/${dis.id}`)}
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#B78368] cursor-pointer transition-colors space-y-2 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#B78368] uppercase font-bold">
                      {dis.category}
                    </span>
                    <h4 className="font-serif font-bold text-xl text-[#252824] group-hover:text-[#B78368] transition-colors">
                      {dis.name}
                    </h4>
                  </div>
                  <span className="text-xs text-[#B78368] font-mono group-hover:translate-x-1 transition-transform">
                    Inspect Condition →
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

        {activeTab === 'Evidence' && (
          <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              {drug.name} Evidence Network
            </h3>
            <p className="text-xs text-[#585D56] leading-relaxed">
              Explore primary kinase assays, IC50 measurements, and pivotal randomized clinical trial data supporting {drug.name}.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/evidence')}
                className="px-4 py-2.5 rounded-xl bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] text-xs font-medium inline-flex items-center gap-2"
              >
                <span>Launch Full Evidence Dossier for {drug.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
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
