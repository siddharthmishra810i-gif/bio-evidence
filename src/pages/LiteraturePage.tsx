import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Layers,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { DEMO_PUBLICATIONS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const LiteraturePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const evidenceTypes = ['All', 'Clinical', 'Genomics', 'Molecular', 'Preclinical'];
  const years = ['All', '2024', '2018', '2009', '2004'];

  const filteredPubs = DEMO_PUBLICATIONS.filter((pub) => {
    const matchesSearch =
      searchQuery === '' ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.detectedEntities.some((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || pub.evidenceType === selectedType;
    const matchesYear = selectedYear === 'All' || pub.year.toString() === selectedYear;

    return matchesSearch && matchesType && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <BookOpen className="w-3.5 h-3.5 text-[#718C78]" />
          <span>PubMed & PMC Repository Synthesis</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Literature Explorer
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          Search, filter, and inspect peer-reviewed biological papers with entity extraction, claims verification, and PubMed identifiers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8077]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter literature by title, abstract keyword, or gene..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F5EF] border border-[#DFDCD3] rounded-xl text-xs text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[#7A8077] font-mono uppercase text-[10px]">Evidence:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs font-medium text-[#252824] focus:outline-none focus:border-[#718C78]"
            >
              {evidenceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#7A8077] font-mono uppercase text-[10px]">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs font-medium text-[#252824] focus:outline-none focus:border-[#718C78]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPubs.map((pub) => (
          <div
            key={pub.id}
            className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-3.5 shadow-2xs hover:border-[#718C78]/60 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] border border-[#718C78]/30 text-[#516455] font-mono text-[10px] font-semibold uppercase">
                    {pub.evidenceType} Evidence
                  </span>
                  <span className="text-xs font-mono text-[#7A8077]">
                    {pub.journal} • {pub.year}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#252824]">
                  {pub.title}
                </h3>
                <div className="text-xs text-[#7A8077] mt-0.5">
                  {pub.authors.join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start">
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#EFEEE7] hover:bg-[#DFDCD3] text-xs font-medium text-[#252824] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span className="font-mono">PMID: {pub.pmid}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#718C78]" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#585D56] leading-relaxed">
              {pub.abstract}
            </p>

            {/* Extracted biological claims & detected entities */}
            <div className="pt-3 border-t border-[#DFDCD3] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A8077] font-semibold">
                  Detected Entities:
                </span>
                {pub.detectedEntities.map((ent, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#EFEEE7] border border-[#DFDCD3] text-[10px] font-mono text-[#252824]"
                  >
                    {ent.type}: {ent.name}
                  </span>
                ))}
              </div>

              <div className="text-xs font-mono text-[#7A8077]">
                DOI: {pub.doi}
              </div>
            </div>
          </div>
        ))}

        {filteredPubs.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#EFEEE7]/60 border border-[#DFDCD3] space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-[#7A8077]" />
            <h4 className="font-serif font-bold text-base text-[#252824]">No publications match your criteria</h4>
            <p className="text-xs text-[#585D56]">Try clearing your search query or selecting &lsquo;All&rsquo; evidence types.</p>
          </div>
        )}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
