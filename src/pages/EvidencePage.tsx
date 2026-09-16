import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  BookOpen,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { DEMO_RELATIONSHIPS } from '../data/mockData';
import { RelationshipDetail, EvidenceCategory } from '../types';
import { SourceBadge } from '../components/common/SourceBadge';
import { WhyDrawer } from '../components/common/WhyDrawer';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const EvidencePage: React.FC = () => {
  const relationshipList = Object.values(DEMO_RELATIONSHIPS);
  const [selectedRelId, setSelectedRelId] = useState<string>('rel-gefitinib-egfr');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);

  const activeRelationship: RelationshipDetail =
    DEMO_RELATIONSHIPS[selectedRelId] || relationshipList[0];

  const categories: EvidenceCategory[] = [
    'Molecular',
    'Genetic',
    'Disease',
    'Preclinical',
    'Clinical',
    'Literature',
  ];

  const filteredEvidence =
    activeCategoryFilter === 'All'
      ? activeRelationship.evidenceItems
      : activeRelationship.evidenceItems.filter((e) => e.category === activeCategoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header & Relationship Selector */}
      <div className="border-b border-[#DFDCD3] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#718C78]" />
            <span>Biomedical Evidence Dossier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252824] leading-tight">
            Evidence Explorer
          </h1>
          <p className="text-sm text-[#585D56] mt-2 max-w-2xl leading-relaxed">
            Examine the granular experimental records, clinical findings, and molecular metrics underpinning every biological relationship.
          </p>
        </div>

        {/* Relationship Selector Dropdown/Tabs */}
        <div className="flex flex-col gap-1.5 sm:min-w-[280px]">
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#7A8077]">
            Select Relationship Dossier:
          </label>
          <select
            value={selectedRelId}
            onChange={(e) => setSelectedRelId(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] text-xs font-serif font-bold text-[#252824] focus:outline-none focus:border-[#718C78] shadow-2xs"
          >
            {relationshipList.map((rel) => (
              <option key={rel.id} value={rel.id}>
                {rel.sourceEntityName} → {rel.relationshipType} → {rel.targetEntityName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOP RELATIONSHIP HERO DISPLAY */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-2xs text-center min-w-[120px]">
              <span className="text-[10px] font-mono text-[#718C78] uppercase tracking-wider font-semibold">
                {activeRelationship.sourceEntityType}
              </span>
              <div className="font-serif font-bold text-xl sm:text-2xl text-[#252824]">
                {activeRelationship.sourceEntityName}
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DFDCD3]/70 text-[#516455] font-mono text-xs font-semibold uppercase tracking-wider">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{activeRelationship.relationshipType.replace(/_/g, ' ')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-2xs text-center min-w-[120px]">
              <span className="text-[10px] font-mono text-[#718596] uppercase tracking-wider font-semibold">
                {activeRelationship.targetEntityType}
              </span>
              <div className="font-serif font-bold text-xl sm:text-2xl text-[#252824]">
                {activeRelationship.targetEntityName}
              </div>
            </div>
          </div>

          {/* Large Signature Button: "Why does this relationship exist?" */}
          <button
            id="signature-why-button"
            onClick={() => setIsWhyDrawerOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-[#718C78] text-[#F7F5EF] hover:bg-[#58735F] font-serif font-semibold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Why does this relationship exist?</span>
          </button>
        </div>

        <p className="text-sm text-[#585D56] leading-relaxed max-w-4xl border-t border-[#DFDCD3] pt-4">
          {activeRelationship.summary}
        </p>
      </div>

      {/* EVIDENCE LANDSCAPE VISUALIZATION */}
      <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              Evidence Landscape
            </h3>
            <p className="text-xs text-[#7A8077] mt-0.5">
              Empirical distribution of published evidence records by concordance level
            </p>
          </div>
          <span className="text-xs font-mono text-[#516455] font-semibold bg-[#EBF0EC] px-2.5 py-1 rounded-full border border-[#718C78]/20 self-start sm:self-auto">
            {activeRelationship.totalEvidenceCount} Peer-Reviewed & Curated Sources
          </span>
        </div>

        {/* Visual Balance Bars */}
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[#252824] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#718C78]" />
                Supporting Evidence
              </span>
              <span className="font-mono text-[#718C78] font-semibold">
                {activeRelationship.supportingCount} records (
                {((activeRelationship.supportingCount / activeRelationship.totalEvidenceCount) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-[#EFEEE7] overflow-hidden border border-[#DFDCD3]">
              <div
                style={{
                  width: `${(activeRelationship.supportingCount / activeRelationship.totalEvidenceCount) * 100}%`,
                }}
                className="h-full bg-[#718C78] rounded-full transition-all duration-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[#252824] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#718596]" />
                Limited / Context-Dependent Evidence
              </span>
              <span className="font-mono text-[#718596] font-semibold">
                {activeRelationship.limitedCount} records (
                {((activeRelationship.limitedCount / activeRelationship.totalEvidenceCount) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-[#EFEEE7] overflow-hidden border border-[#DFDCD3]">
              <div
                style={{
                  width: `${(activeRelationship.limitedCount / activeRelationship.totalEvidenceCount) * 100}%`,
                }}
                className="h-full bg-[#718596] rounded-full transition-all duration-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[#252824] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B78368]" />
                Contradictory / Acquired Resistance Reports
              </span>
              <span className="font-mono text-[#B78368] font-semibold">
                {activeRelationship.contradictoryCount} records (
                {((activeRelationship.contradictoryCount / activeRelationship.totalEvidenceCount) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-[#EFEEE7] overflow-hidden border border-[#DFDCD3]">
              <div
                style={{
                  width: `${(activeRelationship.contradictoryCount / activeRelationship.totalEvidenceCount) * 100}%`,
                }}
                className="h-full bg-[#B78368] rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[#7A8077] italic pt-1">
          * Note: Evidence concordance is a descriptor of available scientific literature in open repositories, not a clinical treatment endorsement.
        </div>
      </div>

      {/* EVIDENCE TIMELINE (Horizontal) */}
      <div className="p-6 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              Evidence Progression Timeline
            </h3>
            <p className="text-xs text-[#666C64] mt-0.5">
              Chronological milestones from biochemical assay to prospective human clinical trials
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#7A8077]">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronological Order</span>
          </div>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Subtle line across */}
          <div className="hidden md:block absolute top-6 left-6 right-6 h-0.5 bg-[#DFDCD3] -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {activeRelationship.timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] transition-all duration-200 space-y-2 shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-[#718C78] text-[#F7F5EF] font-mono text-xs font-bold flex items-center justify-center border-2 border-[#F7F5EF] shadow-2xs">
                    {item.year.toString().slice(-2)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#516455] font-semibold">
                    {item.evidenceType}
                  </span>
                </div>

                <div className="font-mono text-xs text-[#718C78] font-bold mt-1">
                  {item.year}
                </div>

                <h4 className="font-serif font-bold text-sm text-[#252824] leading-snug group-hover:text-[#516455] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-[#585D56] leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[10px] font-mono text-[#7A8077] pt-1 border-t border-[#DFDCD3]/60 truncate">
                  Source: {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GRANULAR EVIDENCE CARDS BY CATEGORY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#252824]">
              Granular Evidence Dossier
            </h3>
            <p className="text-xs text-[#666C64]">
              Filter across molecular assays, genetic correlations, and clinical investigations
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategoryFilter === 'All'
                  ? 'bg-[#252824] text-[#F7F5EF]'
                  : 'bg-[#EFEEE7] text-[#585D56] hover:bg-[#DFDCD3]'
              }`}
            >
              All Types ({activeRelationship.evidenceItems.length})
            </button>
            {categories.map((cat) => {
              const count = activeRelationship.evidenceItems.filter((e) => e.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCategoryFilter === cat
                      ? 'bg-[#718C78] text-[#F7F5EF]'
                      : 'bg-[#EFEEE7] text-[#585D56] hover:bg-[#DFDCD3]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvidence.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-xs space-y-3.5 hover:border-[#718C78]/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#EFEEE7] text-[#516455] font-semibold border border-[#DFDCD3]">
                      {item.category} Evidence
                    </span>
                    <span className="text-xs font-mono text-[#7A8077]">{item.year}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#252824]">
                    {item.title}
                  </h4>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                    item.supportLevel === 'Supporting'
                      ? 'bg-[#EBF0EC] text-[#516455] border border-[#718C78]/30'
                      : item.supportLevel === 'Contradictory'
                      ? 'bg-[#F9F1EC] text-[#B78368] border border-[#B78368]/30'
                      : 'bg-[#EAF0F4] text-[#718596] border border-[#718596]/30'
                  }`}
                >
                  {item.supportLevel}
                </span>
              </div>

              <p className="text-xs text-[#585D56] leading-relaxed">
                {item.description}
              </p>

              {item.pValueOrAffinity && (
                <div className="p-2.5 rounded-lg bg-[#EFEEE7] border border-[#DFDCD3] text-xs font-mono">
                  <span className="text-[#666C64]">Measured Value / Affinity: </span>
                  <span className="font-bold text-[#252824]">{item.pValueOrAffinity}</span>
                </div>
              )}

              {item.studyType && (
                <div className="flex items-center gap-2 text-xs text-[#666C64]">
                  <span className="font-medium">Design:</span>
                  <span>{item.studyType}</span>
                  {(item.sampleSizeDescription || item.sampleSize !== undefined) && (
                    <>
                      <span>•</span>
                      <span className="font-mono">
                        {item.sampleSizeDescription || `n = ${item.sampleSize?.toLocaleString()}`}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Source badges */}
              <div className="pt-3 border-t border-[#DFDCD3] space-y-2">
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#7A8077] font-semibold">
                  Source Provenance ({item.sources.length} databases):
                </div>
                <div className="flex flex-col gap-1.5">
                  {item.sources.map((src, i) => (
                    <SourceBadge key={i} source={src} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SafetyBanner />

      {/* Why Drawer Component */}
      <WhyDrawer
        relationship={activeRelationship}
        isOpen={isWhyDrawerOpen}
        onClose={() => setIsWhyDrawerOpen(false)}
      />
    </div>
  );
};
