import React from 'react';
import { ShieldAlert, BookOpen, Layers, CheckCircle2, GitBranch, Database, ExternalLink } from 'lucide-react';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#718C78] font-bold">
          BioEvidence Methodology & Philosophy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#252824] leading-tight">
          About BioEvidence
        </h1>
        <p className="text-base text-[#585D56] leading-relaxed">
          A biomedical knowledge graph engineered to make complex biological relationships verifiable, transparent, and grounded in peer-reviewed science.
        </p>
      </div>

      {/* Core Mission */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#252824]">
          The Core Philosophy: &ldquo;Follow the Evidence&rdquo;
        </h2>
        <p className="text-sm text-[#585D56] leading-relaxed">
          Modern biomedical discovery generates millions of publications, clinical trial records, and genomic screens each year. However, finding verifiable answers across fragmented databases remains daunting. Too often, computational biology interfaces either act as black boxes or present claims without transparent provenance.
        </p>
        <p className="text-sm text-[#585D56] leading-relaxed">
          BioEvidence establishes an unbroken chain: <strong>Drug → Gene → Disease → Evidence → Source</strong>. Whenever an edge exists in the knowledge graph, researchers can inspect the primary experimental assay, p-value or IC50 metric, PubMed ID, and clinical trial identifier that supports it.
        </p>
      </div>

      {/* Safety & Compliance Policy */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-4">
        <div className="flex items-center gap-2 text-[#718C78]">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="font-serif text-xl font-bold text-[#252824]">
            Research Integrity & Safety Standards
          </h2>
        </div>
        <p className="text-sm text-[#585D56] leading-relaxed">
          BioEvidence is exclusively designed for <strong>biomedical researchers, computational biologists, oncologists, and life science scholars</strong>. It is strictly not intended for clinical diagnostic use, individual patient treatment recommendations, or therapeutic dosing calculation.
        </p>
        <ul className="space-y-2 text-xs text-[#585D56]">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#718C78] shrink-0 mt-0.5" />
            <span>Never presents speculative AI predictions as verified biological facts.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#718C78] shrink-0 mt-0.5" />
            <span>Clearly discriminates between published preclinical in-vitro findings and human Phase 3 clinical trial outcomes.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#718C78] shrink-0 mt-0.5" />
            <span>Explicitly documents contradictory and resistance reports (such as EGFR T790M gatekeeper mutations) alongside positive response data.</span>
          </li>
        </ul>
      </div>

      {/* Backend & Graph Architecture */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#252824]">
          Architecture & Scalability
        </h2>
        <p className="text-sm text-[#585D56] leading-relaxed">
          The frontend architecture is fully decoupled from the persistence layer. All entity queries, search indices, and graph traversals flow through a structured client layer that connects cleanly to a FastAPI backend backed by Neo4j graph databases and Open Targets ETL pipelines.
        </p>
      </div>

      <SafetyBanner />
    </div>
  );
};
