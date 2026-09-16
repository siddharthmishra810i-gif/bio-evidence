import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Dna,
  Pill,
  HeartPulse,
  GitBranch,
  Search,
  ExternalLink,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { HeroConstellation } from '../components/home/HeroConstellation';
import { CytoscapeGraph } from '../components/graph/CytoscapeGraph';
import { WhyDrawer } from '../components/common/WhyDrawer';
import { SourceBadge } from '../components/common/SourceBadge';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { DEMO_GRAPH_NODES, DEMO_GRAPH_EDGES, DEMO_RELATIONSHIPS, DEMO_DATA_SOURCES } from '../data/mockData';
import { RelationshipDetail } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeRelationship, setActiveRelationship] = useState<RelationshipDetail | null>(null);
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);

  const openWhyDrawer = (relId: string = 'rel-gefitinib-egfr') => {
    const rel = DEMO_RELATIONSHIPS[relId] || DEMO_RELATIONSHIPS['rel-gefitinib-egfr'];
    setActiveRelationship(rel);
    setIsWhyDrawerOpen(true);
  };

  return (
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION 1: HERO */}
      <section className="pt-8 sm:pt-12 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] uppercase tracking-widest font-mono text-[#516455]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#718C78]" />
          <span>Biomedical Knowledge Graph</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#252824] tracking-tight leading-[1.15]">
          Explore the connections behind biological discovery.
        </h1>

        <p className="text-[#585D56] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Trace relationships between drugs, genes, diseases and scientific literature — and follow every connection back to its evidence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="hero-explore-evidence-btn"
            onClick={() => navigate('/evidence')}
            className="px-6 py-3 rounded-xl bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] font-medium text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Explore the Evidence</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-browse-graph-btn"
            onClick={() => navigate('/graph')}
            className="px-6 py-3 rounded-xl bg-[#EFEEE7] text-[#252824] hover:bg-[#E2DFC8] border border-[#DFDCD3] font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <span>Browse the Knowledge Graph</span>
            <ChevronRight className="w-4 h-4 text-[#718C78]" />
          </button>
        </div>

        {/* HERO INTERACTIVE CONSTELLATION VISUAL */}
        <div className="pt-6">
          <HeroConstellation />
        </div>
      </section>

      <SafetyBanner compact />

      {/* SECTION 2: BIOLOGY IS A WEB OF RELATIONSHIPS */}
      <section className="py-12 border-t border-[#DFDCD3]">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
            Section II • Relational Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#252824] mt-1">
            Biology is a web of relationships.
          </h2>
          <p className="text-[#585D56] text-sm sm:text-base mt-2 leading-relaxed">
            Targeted therapies don&rsquo;t act in isolation. They function across an interconnected cascade of genetic loci, cellular pathways, disease phenotypes, and documented publications.
          </p>
        </div>

        {/* Dynamic Connected Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            {
              type: 'Drug',
              name: 'Gefitinib',
              sub: 'ATP-competitive inhibitor',
              icon: Pill,
              color: '#718C78',
              link: '/drugs/drug-gefitinib',
            },
            {
              type: 'Gene',
              name: 'EGFR',
              sub: 'Receptor Tyrosine Kinase',
              icon: Dna,
              color: '#718596',
              link: '/genes/EGFR',
            },
            {
              type: 'Disease',
              name: 'NSCLC',
              sub: 'Lung Adenocarcinoma',
              icon: HeartPulse,
              color: '#B78368',
              link: '/diseases/disease-nsclc',
            },
            {
              type: 'Pathway',
              name: 'ErbB Signaling',
              sub: 'Mitogenic Transduction',
              icon: GitBranch,
              color: '#889C82',
              link: '/pathways',
            },
            {
              type: 'Publication',
              name: 'IPASS Trial',
              sub: 'NEJM (PMID: 19692680)',
              icon: BookOpen,
              color: '#868378',
              link: '/literature',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(item.link)}
                className="p-4 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] hover:border-[#718C78] hover:bg-[#F7F5EF] cursor-pointer transition-all duration-200 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#F7F5EF] mb-3" style={{ backgroundColor: item.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A8077]">
                  {item.type}
                </div>
                <div className="font-serif font-bold text-base text-[#252824] mt-0.5 group-hover:text-[#516455] transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-[#666C64] mt-1 leading-snug">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: FOLLOW THE EVIDENCE */}
      <section className="py-12 border-t border-[#DFDCD3] bg-[#EFEEE7]/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
            Section III • Provenance Transparency
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#252824] mt-1">
            Follow the evidence.
          </h2>
          <p className="text-[#585D56] text-sm sm:text-base mt-2 leading-relaxed">
            Every claimed association is anchored directly into peer-reviewed literature, clinical registries, and biochemical assay records.
          </p>
        </div>

        {/* Featured Relationship Card */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#EBF0EC] text-[#516455]">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#718C78] font-bold">
                  Documented Interaction
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#252824]">
                  Gefitinib <span className="font-sans font-normal text-base text-[#7A8077]">targets</span> EGFR
                </h3>
              </div>
            </div>

            <button
              id="home-why-relationship-btn"
              onClick={() => openWhyDrawer('rel-gefitinib-egfr')}
              className="px-4 py-2.5 rounded-xl bg-[#718C78] text-[#F7F5EF] hover:bg-[#58735F] text-xs font-medium flex items-center gap-2 self-start sm:self-auto shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why does this relationship exist?</span>
            </button>
          </div>

          <p className="text-sm text-[#585D56] leading-relaxed max-w-3xl">
            Direct molecular inhibition of the intracellular tyrosine kinase domain of EGFR by ATP-competitive displacement, exhibiting 10-fold higher affinity for exon 19 deletions and L858R somatic mutations than wild-type EGFR.
          </p>

          {/* Three Evidence Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-bold">Molecular Assay</span>
                <span className="text-xs font-mono text-[#7A8077]">ChEMBL939</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-[#252824]">Biochemical Kinase IC50</h4>
              <p className="text-xs text-[#585D56]">
                Selective ATP-binding site displacement with IC50 = 2.1 nM against L858R mutant protein.
              </p>
              <div className="pt-2">
                <SourceBadge
                  source={{
                    database: 'ChEMBL',
                    sourceId: 'CHEMBL939',
                    url: 'https://www.ebi.ac.uk/chembl/compound_report_card/CHEMBL939/',
                    confidenceScore: 0.98,
                  }}
                  showDetails={false}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#718596] font-bold">Genomics</span>
                <span className="text-xs font-mono text-[#7A8077]">Science 2004</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-[#252824]">Activating Mutation Sensitivity</h4>
              <p className="text-xs text-[#585D56]">
                Identified somatic kinase domain mutations in non-small cell lung cancer conferring exquisite drug response.
              </p>
              <div className="pt-2">
                <SourceBadge
                  source={{
                    database: 'PubMed',
                    sourceId: 'PMID:15118125',
                    publicationPmid: '15118125',
                    url: 'https://pubmed.ncbi.nlm.nih.gov/15118125/',
                    confidenceScore: 0.97,
                  }}
                  showDetails={false}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B78368] font-bold">Phase 3 Clinical Trial</span>
                <span className="text-xs font-mono text-[#7A8077]">NCT00072592</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-[#252824]">IPASS Superiority Study</h4>
              <p className="text-xs text-[#585D56]">
                Demonstrated significant prolongation of progression-free survival compared to cytotoxic doublet chemotherapy.
              </p>
              <div className="pt-2">
                <SourceBadge
                  source={{
                    database: 'ClinicalTrials.gov',
                    sourceId: 'NCT00072592',
                    url: 'https://clinicaltrials.gov/study/NCT00072592',
                    confidenceScore: 0.99,
                  }}
                  showDetails={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FROM MOLECULE TO PUBLICATION (Horizontal Scientific Journey) */}
      <section className="py-12 border-t border-[#DFDCD3]">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
            Section IV • The Discovery Pipeline
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#252824] mt-1">
            From molecule to publication.
          </h2>
          <p className="text-[#585D56] text-sm sm:text-base mt-2 leading-relaxed">
            Follow the continuum of translational medicine step-by-step from initial target engagement to definitive clinical trial results.
          </p>
        </div>

        {/* Horizontal Scientific Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'Drug', name: 'Gefitinib', role: 'Anilinoquinazoline', link: '/drugs/drug-gefitinib' },
            { step: '02', title: 'Target', name: 'Kinase Pocket', role: 'ATP-binding domain', link: '/genes/EGFR' },
            { step: '03', title: 'Gene', name: 'EGFR (7p11.2)', role: 'Exon 19 / L858R', link: '/genes/EGFR' },
            { step: '04', title: 'Disease', name: 'NSCLC', role: 'Adenocarcinoma', link: '/diseases/disease-nsclc' },
            { step: '05', title: 'Study', name: 'IPASS', role: 'Phase 3 Trial', link: '/trials' },
            { step: '06', title: 'Publication', name: 'NEJM', role: 'PMID: 19692680', link: '/literature' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.link)}
              className="p-4 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] hover:bg-[#F7F5EF] hover:border-[#718C78] cursor-pointer transition-colors space-y-1"
            >
              <div className="text-[10px] font-mono text-[#718C78] font-bold">{item.step}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A8077]">{item.title}</div>
              <div className="font-serif font-bold text-sm text-[#252824]">{item.name}</div>
              <div className="text-[11px] text-[#666C64]">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: EXPLORE THE GRAPH (Interactive Cytoscape.js Embedded) */}
      <section className="py-12 border-t border-[#DFDCD3]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
              Section V • Full Knowledge Explorer
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#252824] mt-1">
              Explore the graph.
            </h2>
            <p className="text-[#585D56] text-sm sm:text-base mt-2 leading-relaxed">
              Navigate relationships between drugs, genes, mutations, and clinical conditions with instant provenance tracking.
            </p>
          </div>

          <button
            id="open-fullscreen-graph-btn"
            onClick={() => navigate('/graph')}
            className="px-4 py-2 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] hover:bg-[#E2DFC8] text-xs font-medium text-[#252824] flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
          >
            <span>Open Dedicated Workspace</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#718C78]" />
          </button>
        </div>

        {/* Embedded Cytoscape Graph */}
        <CytoscapeGraph
          nodes={DEMO_GRAPH_NODES}
          edges={DEMO_GRAPH_EDGES}
          onSelectRelationship={(relId) => openWhyDrawer(relId)}
          height="540px"
        />
      </section>

      {/* SECTION 6: BUILT ON OPEN SCIENTIFIC KNOWLEDGE */}
      <section className="py-12 border-t border-[#DFDCD3]">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
            Section VI • Data Infrastructure
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#252824] mt-1">
            Built on open scientific knowledge.
          </h2>
          <p className="text-[#585D56] text-sm sm:text-base mt-2 leading-relaxed">
            Synthesizing authoritative international repositories to ensure every connection is verifiable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_DATA_SOURCES.slice(0, 6).map((source) => (
            <div
              key={source.id}
              className="p-5 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-3 hover:bg-[#F7F5EF] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#252824]">{source.name}</h3>
                  <span className="text-[10px] font-mono text-[#718C78] uppercase">{source.category}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF0EC] text-[#516455] font-semibold">
                  {source.status}
                </span>
              </div>

              <p className="text-xs text-[#585D56] leading-relaxed line-clamp-2">
                {source.description}
              </p>

              <div className="pt-2 border-t border-[#DFDCD3] flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#7A8077]">{source.recordCount.split('•')[0]}</span>
                <a
                  href={source.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#718C78] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="py-16 text-center border-t border-[#DFDCD3] bg-[#EFEEE7]/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Start exploring.
        </h2>
        <p className="text-[#585D56] max-w-lg mx-auto text-sm leading-relaxed">
          Search specific genes or query the biological graph using natural language research questions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/ask')}
            className="px-6 py-3 rounded-xl bg-[#718C78] text-[#F7F5EF] hover:bg-[#58735F] text-sm font-medium flex items-center gap-2 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask the Evidence Graph</span>
          </button>
          <button
            onClick={() => navigate('/evidence')}
            className="px-6 py-3 rounded-xl bg-[#F7F5EF] text-[#252824] hover:bg-[#EAE7DE] border border-[#DFDCD3] text-sm font-medium transition-colors"
          >
            <span>Review Curated Dossiers</span>
          </button>
        </div>
      </section>

      {/* Signature Why Drawer */}
      <WhyDrawer
        relationship={activeRelationship}
        isOpen={isWhyDrawerOpen}
        onClose={() => setIsWhyDrawerOpen(false)}
      />
    </div>
  );
};
