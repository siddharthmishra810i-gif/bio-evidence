import React from 'react';
import { RelationshipDetail } from '../../types';
import { SourceBadge } from './SourceBadge';
import { X, ArrowRight, BookOpen, ExternalLink, HelpCircle, Layers } from 'lucide-react';

interface WhyDrawerProps {
  relationship: RelationshipDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhyDrawer: React.FC<WhyDrawerProps> = ({ relationship, isOpen, onClose }) => {
  if (!isOpen || !relationship) return null;

  return (
    <div
      id="why-relationship-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="why-relationship-drawer"
        className="w-full max-w-2xl bg-[#F7F5EF] h-full shadow-2xl border-l border-[#DFDCD3] flex flex-col overflow-hidden text-[#252824]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#DFDCD3] bg-[#EFEEE7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#718C78]/15 flex items-center justify-center text-[#718C78]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#718C78] font-semibold">
                Relationship Provenance Trace
              </span>
              <h2 className="text-xl font-serif text-[#252824] leading-tight">
                Why does this relationship exist?
              </h2>
            </div>
          </div>
          <button
            id="close-why-drawer-button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-[#DFDCD3]/50 text-[#666C64] hover:text-[#252824] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {/* Path Header */}
          <div className="p-4 rounded-lg bg-[#EFEEE7]/80 border border-[#DFDCD3]">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-[#252824]">{relationship.sourceEntityName}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#DFDCD3] text-[#585D56]">{relationship.sourceEntityType}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#718C78] font-mono font-medium">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{relationship.relationshipType.replace(/_/g, ' ')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-[#252824]">{relationship.targetEntityName}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#DFDCD3] text-[#585D56]">{relationship.targetEntityType}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#585D56] border-t border-[#DFDCD3] pt-2.5">
              {relationship.summary}
            </p>
          </div>

          {/* Evidence Distribution */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666C64]">
                Evidence Breakdown ({relationship.totalEvidenceCount} items)
              </h3>
              <span className="text-xs text-[#718C78] font-medium font-mono">
                {((relationship.supportingCount / relationship.totalEvidenceCount) * 100).toFixed(0)}% Supporting
              </span>
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden bg-[#DFDCD3] p-0.5 gap-0.5">
              <div
                style={{ width: `${(relationship.supportingCount / relationship.totalEvidenceCount) * 100}%` }}
                className="bg-[#718C78] rounded-full"
                title={`Supporting: ${relationship.supportingCount}`}
              />
              <div
                style={{ width: `${(relationship.limitedCount / relationship.totalEvidenceCount) * 100}%` }}
                className="bg-[#718596] rounded-full"
                title={`Limited: ${relationship.limitedCount}`}
              />
              <div
                style={{ width: `${(relationship.contradictoryCount / relationship.totalEvidenceCount) * 100}%` }}
                className="bg-[#B78368] rounded-full"
                title={`Contradictory / Resistance: ${relationship.contradictoryCount}`}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-[11px] text-[#666C64]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#718C78]" /> Supporting ({relationship.supportingCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#718596]" /> Limited ({relationship.limitedCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B78368]" /> Resistance / Divergent ({relationship.contradictoryCount})
              </span>
            </div>
          </div>

          {/* Step-by-Step Evidence List */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666C64] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#718C78]" />
              Structured Evidence Dossier
            </h3>

            {relationship.evidenceItems.map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 rounded-lg bg-[#EFEEE7] border border-[#DFDCD3] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#F7F5EF] border border-[#DFDCD3] text-[#516455] font-semibold">
                        {item.category} Evidence
                      </span>
                      <span className="text-xs font-mono text-[#7A8077]">{item.year}</span>
                    </div>
                    <h4 className="font-serif text-base font-medium text-[#252824] leading-snug">
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

                {(item.studyType || item.sampleSizeDescription || item.sampleSize !== undefined) && (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#666C64]">
                    {item.studyType && (
                      <span>
                        <span className="font-medium">Design:</span> {item.studyType}
                      </span>
                    )}
                    {(item.sampleSizeDescription || item.sampleSize !== undefined) && (
                      <span>
                        {item.studyType && <span className="mr-2">•</span>}
                        <span className="font-mono">
                          {item.sampleSizeDescription || `n = ${item.sampleSize?.toLocaleString()}`}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {item.pValueOrAffinity && (
                  <div className="p-2 rounded bg-[#F7F5EF] border border-[#DFDCD3] text-[11px] font-mono text-[#252824]">
                    <span className="text-[#666C64]">Metric / Affinity: </span>
                    <span className="font-semibold text-[#516455]">{item.pValueOrAffinity}</span>
                  </div>
                )}

                {/* Sources for this evidence */}
                <div className="pt-2 border-t border-[#DFDCD3] space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8077]">
                    Originating Sources:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {item.sources.map((src, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <SourceBadge source={src} showDetails={false} />
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#718C78] hover:underline shrink-0"
                          >
                            <span>View original source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Historical Timeline */}
          {relationship.timeline && relationship.timeline.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666C64] flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#718C78]" />
                Discovery & Investigation Timeline
              </h3>
              <div className="relative pl-6 border-l-2 border-[#DFDCD3] space-y-4">
                {relationship.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#718C78] border-2 border-[#F7F5EF]" />
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-bold text-[#718C78]">{event.year}</span>
                      <span className="font-serif font-medium text-sm text-[#252824]">{event.title}</span>
                    </div>
                    <p className="text-xs text-[#666C64] mt-0.5">{event.description}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono text-[#7A8077]">
                      Ref: {event.source}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#DFDCD3] bg-[#EFEEE7] flex items-center justify-between text-xs text-[#666C64]">
          <span>Data synchronized from Open Targets & PubMed</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] font-medium transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
