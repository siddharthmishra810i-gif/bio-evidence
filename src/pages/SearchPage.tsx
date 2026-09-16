import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Dna,
  Pill,
  HeartPulse,
  BookOpen,
  FlaskConical,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  DEMO_GENES,
  DEMO_DRUGS,
  DEMO_DISEASES,
  DEMO_PUBLICATIONS,
  DEMO_TRIALS,
} from '../data/mockData';
import { SourceBadge } from '../components/common/SourceBadge';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'EGFR';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'All' | 'Genes' | 'Drugs' | 'Diseases' | 'Publications' | 'Trials'>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const qLower = query.toLowerCase().trim();

  // Filter entities
  const matchedGenes = DEMO_GENES.filter(
    (g) =>
      g.symbol.toLowerCase().includes(qLower) ||
      g.name.toLowerCase().includes(qLower) ||
      g.description.toLowerCase().includes(qLower)
  );

  const matchedDrugs = DEMO_DRUGS.filter(
    (d) =>
      d.name.toLowerCase().includes(qLower) ||
      d.mechanism.toLowerCase().includes(qLower) ||
      d.indication.toLowerCase().includes(qLower)
  );

  const matchedDiseases = DEMO_DISEASES.filter(
    (dis) =>
      dis.name.toLowerCase().includes(qLower) ||
      dis.description.toLowerCase().includes(qLower) ||
      dis.category.toLowerCase().includes(qLower)
  );

  const matchedPublications = DEMO_PUBLICATIONS.filter(
    (p) =>
      p.title.toLowerCase().includes(qLower) ||
      p.abstract.toLowerCase().includes(qLower) ||
      p.detectedEntities.some((e) => e.name.toLowerCase().includes(qLower))
  );

  const matchedTrials = DEMO_TRIALS.filter(
    (t) =>
      t.title.toLowerCase().includes(qLower) ||
      t.condition.toLowerCase().includes(qLower) ||
      t.nctId.toLowerCase().includes(qLower) ||
      t.interventions.some((i) => i.toLowerCase().includes(qLower))
  );

  const totalResults =
    matchedGenes.length +
    matchedDrugs.length +
    matchedDiseases.length +
    matchedPublications.length +
    matchedTrials.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#718C78] font-semibold">
            Unified Entity & Literature Retrieval
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252824] mt-1">
            Biomedical Search
          </h1>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="relative max-w-3xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A8077]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search genes, drugs, diseases, mutations, trials (e.g. EGFR, BRCA1, Gefitinib)..."
            className="w-full pl-12 pr-28 py-3 bg-[#EFEEE7] border border-[#DFDCD3] rounded-2xl text-sm text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78] focus:bg-[#F7F5EF] shadow-2xs transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] text-xs font-medium transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick query tags */}
        <div className="flex items-center gap-2 text-xs text-[#666C64]">
          <span>Try querying:</span>
          {['EGFR', 'BRCA1', 'Gefitinib', 'Olaparib', 'Lung cancer'].map((suggest) => (
            <button
              key={suggest}
              onClick={() => {
                setQuery(suggest);
                setSearchParams({ q: suggest });
              }}
              className="px-2 py-0.5 rounded bg-[#EFEEE7] hover:bg-[#E2DFC8] text-[#252824] border border-[#DFDCD3] transition-colors"
            >
              {suggest}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-[#DFDCD3] flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setActiveTab('All')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'All'
              ? 'border-[#252824] text-[#252824] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          All Categories ({totalResults})
        </button>
        <button
          onClick={() => setActiveTab('Genes')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'Genes'
              ? 'border-[#718596] text-[#718596] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          Genes ({matchedGenes.length})
        </button>
        <button
          onClick={() => setActiveTab('Drugs')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'Drugs'
              ? 'border-[#718C78] text-[#718C78] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          Drugs ({matchedDrugs.length})
        </button>
        <button
          onClick={() => setActiveTab('Diseases')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'Diseases'
              ? 'border-[#B78368] text-[#B78368] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          Diseases ({matchedDiseases.length})
        </button>
        <button
          onClick={() => setActiveTab('Publications')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'Publications'
              ? 'border-[#868378] text-[#868378] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          Publications ({matchedPublications.length})
        </button>
        <button
          onClick={() => setActiveTab('Trials')}
          className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'Trials'
              ? 'border-[#7E8A7B] text-[#7E8A7B] font-bold'
              : 'border-transparent text-[#666C64] hover:text-[#252824]'
          }`}
        >
          Clinical Trials ({matchedTrials.length})
        </button>
      </div>

      {/* Results Section */}
      <div className="space-y-10">
        {/* GENES SECTION */}
        {(activeTab === 'All' || activeTab === 'Genes') && matchedGenes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-[#718596]" />
              <h2 className="font-serif text-xl font-bold text-[#252824]">
                Genes ({matchedGenes.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedGenes.map((gene) => (
                <div
                  key={gene.id}
                  onClick={() => navigate(`/genes/${gene.symbol}`)}
                  className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718596] cursor-pointer transition-all space-y-2.5 shadow-2xs group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#718596] font-semibold">
                        Human Gene • Chr {gene.chromosome}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#252824] group-hover:text-[#516455] transition-colors">
                        {gene.symbol} — {gene.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#718596] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>

                  <p className="text-xs text-[#585D56] line-clamp-2 leading-relaxed">
                    {gene.description}
                  </p>

                  <div className="pt-2 border-t border-[#DFDCD3] flex flex-wrap items-center gap-3 text-xs text-[#666C64]">
                    <span className="font-mono text-[11px]">NCBI: {gene.ncbiId}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">UniProt: {gene.uniprotId}</span>
                    <span>•</span>
                    <span className="text-[#718C78] font-medium">{gene.publicationCount} literature records</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DRUGS SECTION */}
        {(activeTab === 'All' || activeTab === 'Drugs') && matchedDrugs.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#718C78]" />
              <h2 className="font-serif text-xl font-bold text-[#252824]">
                Drugs ({matchedDrugs.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedDrugs.map((drug) => (
                <div
                  key={drug.id}
                  onClick={() => navigate(`/drugs/${drug.id}`)}
                  className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] cursor-pointer transition-all space-y-2.5 shadow-2xs group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#718C78] font-semibold">
                        {drug.approvalStatus} • {drug.drugType}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#252824] group-hover:text-[#516455] transition-colors">
                        {drug.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#718C78] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>

                  <p className="text-xs text-[#585D56] line-clamp-2 leading-relaxed">
                    {drug.mechanism}
                  </p>

                  <div className="pt-2 border-t border-[#DFDCD3] flex flex-wrap items-center gap-3 text-xs text-[#666C64]">
                    <span className="font-mono text-[11px]">ChEMBL: {drug.chemblId}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">PubChem: {drug.pubchemCid}</span>
                    <span>•</span>
                    <span className="text-[#718C78] font-medium">{drug.clinicalTrialCount} clinical trials</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISEASES SECTION */}
        {(activeTab === 'All' || activeTab === 'Diseases') && matchedDiseases.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#B78368]" />
              <h2 className="font-serif text-xl font-bold text-[#252824]">
                Diseases ({matchedDiseases.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedDiseases.map((dis) => (
                <div
                  key={dis.id}
                  onClick={() => navigate(`/diseases/${dis.id}`)}
                  className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#B78368] cursor-pointer transition-all space-y-2.5 shadow-2xs group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B78368] font-semibold">
                        {dis.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#252824] group-hover:text-[#B78368] transition-colors">
                        {dis.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#B78368] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>

                  <p className="text-xs text-[#585D56] line-clamp-2 leading-relaxed">
                    {dis.description}
                  </p>

                  <div className="pt-2 border-t border-[#DFDCD3] flex items-center gap-3 text-xs text-[#666C64]">
                    <span className="font-mono text-[11px]">MeSH: {dis.meshId}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">DOID: {dis.doid}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PUBLICATIONS SECTION */}
        {(activeTab === 'All' || activeTab === 'Publications') && matchedPublications.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#868378]" />
              <h2 className="font-serif text-xl font-bold text-[#252824]">
                Scientific Literature ({matchedPublications.length})
              </h2>
            </div>

            <div className="space-y-3">
              {matchedPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-semibold">
                        {pub.evidenceType} Evidence • {pub.journal} ({pub.year})
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#252824] mt-0.5">
                        {pub.title}
                      </h3>
                      <div className="text-xs text-[#7A8077] mt-0.5">
                        {pub.authors.slice(0, 4).join(', ')}{pub.authors.length > 4 ? ' et al.' : ''}
                      </div>
                    </div>

                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#EFEEE7] hover:bg-[#DFDCD3] text-xs font-medium text-[#252824] inline-flex items-center gap-1.5 shrink-0 self-start"
                    >
                      <span>PubMed</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-[#585D56] leading-relaxed">
                    {pub.abstract}
                  </p>

                  <div className="pt-2 border-t border-[#DFDCD3] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-mono text-[#7A8077]">Entities:</span>
                      {pub.detectedEntities.map((ent, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#EFEEE7] text-[10px] font-mono text-[#585D56]">
                          {ent.name}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] text-[#7A8077]">PMID: {pub.pmid} • DOI: {pub.doi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLINICAL TRIALS SECTION */}
        {(activeTab === 'All' || activeTab === 'Trials') && matchedTrials.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#7E8A7B]" />
              <h2 className="font-serif text-xl font-bold text-[#252824]">
                Clinical Trials ({matchedTrials.length})
              </h2>
            </div>

            <div className="space-y-3">
              {matchedTrials.map((trial) => (
                <div
                  key={trial.id}
                  className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#EBF0EC] text-[#516455] text-[10px] font-mono font-semibold">
                          {trial.status}
                        </span>
                        <span className="text-[10px] font-mono text-[#718C78] font-bold">
                          {trial.phase}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#252824] mt-1">
                        {trial.title}
                      </h3>
                      <div className="text-xs text-[#585D56] mt-0.5">
                        Condition: <span className="font-medium text-[#252824]">{trial.condition}</span>
                      </div>
                    </div>

                    <a
                      href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#EFEEE7] hover:bg-[#DFDCD3] text-xs font-medium text-[#252824] inline-flex items-center gap-1.5 shrink-0 self-start"
                    >
                      <span className="font-mono">{trial.nctId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="pt-2 border-t border-[#DFDCD3] flex flex-wrap items-center justify-between text-xs text-[#7A8077] gap-2">
                    <div>
                      <span className="font-semibold text-[#585D56]">Interventions: </span>
                      {trial.interventions.join(' • ')}
                    </div>
                    <span className="font-mono">{trial.locations[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#EFEEE7]/60 border border-[#DFDCD3] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DFDCD3] mx-auto flex items-center justify-center text-[#7A8077]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              No biomedical entities found
            </h3>
            <p className="text-xs text-[#585D56] max-w-sm mx-auto leading-relaxed">
              No matching records for &ldquo;{query}&rdquo; in our current curated demo graph. Try searching for <strong>EGFR</strong>, <strong>BRCA1</strong>, or <strong>Gefitinib</strong>.
            </p>
          </div>
        )}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
