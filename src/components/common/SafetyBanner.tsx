import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SafetyBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        id="scientific-safety-banner-compact"
        className="flex items-center gap-2 px-3 py-1.5 bg-[#EFEEE7] border border-[#DFDCD3] rounded-md text-[11px] text-[#666C64]"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-[#B78368] shrink-0" />
        <span>
          <strong className="text-[#252824] font-medium">Research Use Only:</strong> Non-diagnostic platform. Does not provide clinical advice or patient recommendations.
        </span>
      </div>
    );
  }

  return (
    <div
      id="scientific-safety-banner"
      className="p-4 bg-[#EFEEE7]/80 border border-[#DFDCD3] rounded-lg my-6 text-xs text-[#585D56] leading-relaxed flex items-start gap-3.5 shadow-xs"
    >
      <div className="w-7 h-7 rounded-full bg-[#B78368]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#B78368]">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-[#252824] tracking-tight">
          Scientific Research & Evidence Synthesis Notice
        </p>
        <p>
          BioEvidence is an academic exploration tool connecting biomedical databases (Open Targets, ChEMBL, PubMed, ClinicalTrials.gov). 
          The information presented represents curated literature annotations, bioassay affinities, and experimental trial data.
          It does <strong>not</strong> constitute clinical medical diagnosis, treatment protocols, or dosage instructions.
        </p>
      </div>
    </div>
  );
};
