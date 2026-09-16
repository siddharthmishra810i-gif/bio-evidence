import React from 'react';
import { Database, ExternalLink, ShieldCheck, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { DEMO_DATA_SOURCES } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const DataSourcesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <Database className="w-3.5 h-3.5 text-[#718C78]" />
          <span>Biomedical Knowledge Ingestion Architecture</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Data Sources & Provenance Directory
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          BioEvidence synthesizes curated data from premier international biomedical repositories. Every node, edge, and metric is traceable to its primary authoritative database.
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_DATA_SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-2xs hover:border-[#718C78]/60 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-bold">
                  {source.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#252824] mt-0.5">
                  {source.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF0EC] text-[#516455] text-xs font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#718C78]" />
                <span>{source.status}</span>
              </div>
            </div>

            <p className="text-xs text-[#585D56] leading-relaxed">
              {source.description}
            </p>

            {/* How BioEvidence uses this source */}
            <div className="p-3.5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-1 text-xs">
              <span className="font-mono text-[10px] uppercase text-[#7A8077] font-bold">
                Application Integration Role:
              </span>
              <p className="text-[#383D36] font-medium leading-relaxed">
                {source.roleInBioEvidence}
              </p>
            </div>

            {/* Metrics and Link */}
            <div className="pt-2 border-t border-[#DFDCD3] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[#7A8077]">
                Record Volume: <span className="text-[#252824] font-semibold">{source.recordCount}</span>
              </span>

              <a
                href={source.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#718C78] hover:underline inline-flex items-center gap-1 font-medium text-xs"
              >
                <span>Visit Official Database</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
