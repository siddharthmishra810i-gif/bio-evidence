import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Send,
  BookOpen,
  FlaskConical,
  Dna,
  Pill,
  HeartPulse,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Network,
} from 'lucide-react';
import { DEMO_RELATIONSHIPS } from '../data/mockData';
import { WhyDrawer } from '../components/common/WhyDrawer';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { SourceBadge } from '../components/common/SourceBadge';

interface QueryPreset {
  id: string;
  question: string;
  directAnswer: string;
  entities: { name: string; type: string }[];
  evidenceHighlights: {
    category: string;
    finding: string;
    source: string;
    sourceUrl: string;
  }[];
  relId: string;
  miniGraphSummary: string;
}

const PRESET_QUERIES: QueryPreset[] = [
  {
    id: 'q1',
    question: 'Why does Gefitinib work in some lung cancers but not others?',
    directAnswer:
      'Gefitinib acts as a selective adenosine triphosphate (ATP)-competitive inhibitor of the EGFR tyrosine kinase domain. Differential efficacy is driven predominantly by somatic tumor genotype: non-small cell lung carcinomas (NSCLCs) with activating mutations in exons 19 (in-frame deletions) or 21 (L858R point mutation) alter kinase domain conformation, increasing drug-binding affinity over 10-fold relative to wild-type EGFR. Conversely, tumors lacking sensitizing mutations or those with the secondary gatekeeper mutation T790M (exon 20) exhibit sterical hindrance that prevents Gefitinib binding, resulting in intrinsic or acquired clinical drug resistance.',
    entities: [
      { name: 'Gefitinib', type: 'Drug' },
      { name: 'EGFR', type: 'Gene' },
      { name: 'L858R', type: 'Mutation' },
      { name: 'T790M', type: 'Mutation' },
      { name: 'NSCLC', type: 'Disease' },
    ],
    evidenceHighlights: [
      {
        category: 'Genomic Discovery',
        finding: 'Identification of somatic EGFR mutations predicting sensitivity to gefitinib in lung adenocarcinoma.',
        source: 'Science 2004 (PMID: 15118125)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/15118125/',
      },
      {
        category: 'Phase 3 Clinical Trial',
        finding: 'IPASS trial demonstrated progression-free survival superiority of gefitinib over carboplatin-paclitaxel specifically in EGFR mutation-positive patients.',
        source: 'NEJM 2009 (PMID: 19692680)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/19692680/',
      },
      {
        category: 'Resistance Mechanism',
        finding: 'Acquired resistance mediated by secondary EGFR T790M gatekeeper mutation altering steric binding.',
        source: 'Cancer Cell 2005 (PMID: 15722137)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/15722137/',
      },
    ],
    relId: 'rel-gefitinib-egfr',
    miniGraphSummary: 'Gefitinib ──[TARGETS]──> EGFR (L858R) ──[INHIBITS]──> NSCLC Proliferation',
  },
  {
    id: 'q2',
    question: 'How do PARP inhibitors exploit synthetic lethality in BRCA1-deficient tumors?',
    directAnswer:
      'PARP1 is an essential nuclear enzyme involved in the repair of DNA single-strand breaks via the base excision repair pathway. Inhibition of PARP by small molecules like Olaparib causes persistent single-strand breaks that collapse replication forks into double-strand breaks during DNA synthesis. In wild-type cells, double-strand breaks are error-free repaired by homologous recombination (HR), which requires functional BRCA1/2. In BRCA1-deficient tumor cells, HR is nonfunctional, forcing reliance on error-prone non-homologous end joining (NHEJ), which results in chromosomal catastrophe and cell death—a biological phenomenon termed synthetic lethality.',
    entities: [
      { name: 'Olaparib', type: 'Drug' },
      { name: 'PARP1', type: 'Gene' },
      { name: 'BRCA1', type: 'Gene' },
      { name: 'Ovarian Cancer', type: 'Disease' },
    ],
    evidenceHighlights: [
      {
        category: 'Molecular Mechanism',
        finding: 'Synthetic lethal interaction demonstrated between PARP inhibition and BRCA1/2 deficiency in vitro and in vivo.',
        source: 'Nature 2005 (PMID: 15829966)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/15829966/',
      },
      {
        category: 'Pivotal Phase 3 Trial',
        finding: 'SOLO-1 trial demonstrated 70% reduction in risk of progression or death with olaparib maintenance in newly diagnosed BRCA-mutated ovarian cancer.',
        source: 'NEJM 2018 (PMID: 30345884)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/30345884/',
      },
    ],
    relId: 'rel-olaparib-brca1',
    miniGraphSummary: 'Olaparib ──[INHIBITS]──> PARP1 ──[SYNTHETIC LETHAL WITH]──> BRCA1 Loss',
  },
  {
    id: 'q3',
    question: 'What evidence links TP53 missense mutations to chemoresistance in solid tumors?',
    directAnswer:
      'TP53 encodes tumor protein p53, the central cellular guardian responding to genotoxic stress by transcriptional activation of cell cycle arrest (p21/CDKN1A), senescence, and apoptosis (BAX, PUMA). Missense mutations in the DNA-binding domain of TP53 abrogate these checkpoints and frequently impart gain-of-function oncogenic activity, preventing chemotherapy-induced apoptotic cascades and resulting in clinical resistance to platinum and alkylating regimens.',
    entities: [
      { name: 'TP53', type: 'Gene' },
      { name: 'p53', type: 'Protein' },
      { name: 'Apoptosis', type: 'Pathway' },
      { name: 'Carcinoma', type: 'Disease' },
    ],
    evidenceHighlights: [
      {
        category: 'Preclinical Genomics',
        finding: 'Loss of wild-type p53 apoptotic competence reduces sensitivity to DNA-damaging cytotoxic chemotherapies.',
        source: 'Cell 1993 (PMID: 8392919)',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/8392919/',
      },
    ],
    relId: 'rel-gefitinib-egfr',
    miniGraphSummary: 'TP53 Mutation ──[DISRUPTS]──> Intrinsic Apoptosis ──[CONFIRES]──> Chemoresistance',
  },
];

export const AskGraphPage: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState<QueryPreset>(PRESET_QUERIES[0]);
  const [customInput, setCustomInput] = useState('');
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Check if matching preset or generate contextual evidence response
    const inputLower = customInput.toLowerCase();
    const matched = PRESET_QUERIES.find((q) =>
      inputLower.includes('brca') || inputLower.includes('parp') || inputLower.includes('olaparib')
        ? q.id === 'q2'
        : inputLower.includes('tp53') || inputLower.includes('p53')
        ? q.id === 'q3'
        : q.id === 'q1'
    );

    setActiveQuery(matched || PRESET_QUERIES[0]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <Sparkles className="w-3.5 h-3.5 text-[#718C78]" />
          <span>Biomedical Knowledge Graph Query Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Ask the Evidence Graph
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          Inquire about molecular mechanisms, treatment resistance, or target interactions. Answers are grounded directly in biomedical graph paths and cited literature.
        </p>
      </div>

      {/* Query Bar */}
      <form onSubmit={handleCustomSubmit} className="relative max-w-4xl">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask a scientific research question (e.g. Why does Gefitinib work in some lung cancers but not others?)..."
          className="w-full pl-5 pr-32 py-4 bg-[#EFEEE7] border border-[#DFDCD3] rounded-2xl text-sm text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78] focus:bg-[#F7F5EF] shadow-2xs transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] text-xs font-medium inline-flex items-center gap-2 transition-colors"
        >
          <span>Query Graph</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Example Prompt Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[#7A8077] uppercase tracking-wider block">
          Curated Scientific Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActiveQuery(preset);
                setCustomInput('');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs text-left transition-all border ${
                activeQuery.id === preset.id
                  ? 'bg-[#252824] text-[#F7F5EF] border-[#252824] font-medium shadow-2xs'
                  : 'bg-[#EFEEE7] text-[#252824] border-[#DFDCD3] hover:bg-[#E2DFC8]'
              }`}
            >
              {preset.question}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Graph Response Dossier */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-xs space-y-6">
        {/* Question & Entities Banner */}
        <div className="border-b border-[#DFDCD3] pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#718C78] font-bold">
                Synthesized Graph Response
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252824] mt-1">
                {activeQuery.question}
              </h2>
            </div>

            <button
              onClick={() => setIsWhyDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#718C78] text-[#F7F5EF] hover:bg-[#58735F] text-xs font-medium inline-flex items-center gap-2 shrink-0 self-start shadow-2xs transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Inspect Full Evidence Trace</span>
            </button>
          </div>

          {/* Extracted Biological Entities */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono uppercase text-[#7A8077] font-semibold mr-1">
              Extracted Entities:
            </span>
            {activeQuery.entities.map((ent, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#EFEEE7] border border-[#DFDCD3] text-xs font-mono text-[#252824] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#718C78]" />
                <span className="font-semibold">{ent.name}</span>
                <span className="text-[10px] text-[#7A8077]">({ent.type})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Direct Scientific Answer */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#252824] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#718C78]" />
            Direct Mechanistic Answer
          </h3>
          <p className="text-sm sm:text-base text-[#383D36] leading-relaxed font-serif bg-[#EFEEE7]/50 p-5 rounded-xl border border-[#DFDCD3]/70">
            {activeQuery.directAnswer}
          </p>
        </div>

        {/* Mini Graph Path Preview */}
        <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#718C78] uppercase text-[10px] font-bold flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              Graph Traversal Path
            </span>
            <button
              onClick={() => navigate('/graph')}
              className="text-[#252824] hover:underline font-mono text-[11px] inline-flex items-center gap-1"
            >
              <span>Explore full graph</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="font-mono text-xs text-[#252824] font-semibold bg-[#F7F5EF] p-3 rounded-lg border border-[#DFDCD3] overflow-x-auto">
            {activeQuery.miniGraphSummary}
          </div>
        </div>

        {/* Supporting Evidence Cards */}
        <div className="space-y-3 pt-2">
          <h3 className="font-serif text-lg font-bold text-[#252824]">
            Supporting Literature & Trial Records ({activeQuery.evidenceHighlights.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeQuery.evidenceHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-2 text-xs"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-bold">
                  {hl.category}
                </div>
                <p className="text-[#585D56] leading-relaxed font-medium">
                  {hl.finding}
                </p>
                <div className="pt-2 border-t border-[#DFDCD3]/60">
                  <a
                    href={hl.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#718C78] hover:underline inline-flex items-center gap-1 text-[11px] font-mono"
                  >
                    <span>{hl.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SafetyBanner />

      {/* Why Drawer Component */}
      <WhyDrawer
        relationship={DEMO_RELATIONSHIPS[activeQuery.relId] || DEMO_RELATIONSHIPS['rel-gefitinib-egfr']}
        isOpen={isWhyDrawerOpen}
        onClose={() => setIsWhyDrawerOpen(false)}
      />
    </div>
  );
};
