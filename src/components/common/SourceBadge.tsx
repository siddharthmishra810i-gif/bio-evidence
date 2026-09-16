import React from 'react';
import { SourceProvenance } from '../../types';
import { ExternalLink, Database, BookOpen, ShieldCheck } from 'lucide-react';

interface SourceBadgeProps {
  source: SourceProvenance;
  className?: string;
  showDetails?: boolean;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, className = '', showDetails = true }) => {
  return (
    <div
      id={`source-badge-${source.database.toLowerCase().replace(/\s+/g, '-')}-${source.sourceId}`}
      className={`inline-flex flex-wrap items-center gap-2 px-2.5 py-1 rounded border border-[#DFDCD3] bg-[#F7F5EF] text-[#252824] text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 font-medium tracking-wide text-[#516455]">
        <Database className="w-3.5 h-3.5 text-[#718C78]" />
        <span className="uppercase text-[10px] tracking-wider text-[#666C64] font-semibold">{source.database}</span>
      </div>

      <span className="text-[#DFDCD3] select-none">•</span>

      <span className="font-mono text-[11px] text-[#252824] font-medium">{source.sourceId}</span>

      {source.publicationPmid && (
        <>
          <span className="text-[#DFDCD3] select-none">•</span>
          <span className="inline-flex items-center gap-1 text-[#718596] font-mono text-[11px]">
            <BookOpen className="w-3 h-3" />
            PMID:{source.publicationPmid}
          </span>
        </>
      )}

      {source.date && showDetails && (
        <>
          <span className="text-[#DFDCD3] select-none">•</span>
          <span className="text-[#7A8077] text-[11px]">{source.date}</span>
        </>
      )}

      {source.confidenceScore !== undefined && showDetails && (
        <>
          <span className="text-[#DFDCD3] select-none">•</span>
          <span className="inline-flex items-center gap-0.5 text-[10px] text-[#718C78] bg-[#EBF0EC] px-1.5 py-0.5 rounded font-mono">
            <ShieldCheck className="w-3 h-3" />
            {(source.confidenceScore * 100).toFixed(0)}% score
          </span>
        </>
      )}

      {source.url && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-[#718596] hover:text-[#252824] transition-colors inline-flex items-center"
          title={`Open original source at ${source.database}`}
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};
