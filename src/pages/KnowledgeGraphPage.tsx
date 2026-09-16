import React, { useState } from 'react';
import { CytoscapeGraph } from '../components/graph/CytoscapeGraph';
import { WhyDrawer } from '../components/common/WhyDrawer';
import { SafetyBanner } from '../components/common/SafetyBanner';
import { DEMO_GRAPH_NODES, DEMO_GRAPH_EDGES, DEMO_RELATIONSHIPS } from '../data/mockData';
import { RelationshipDetail } from '../types';
import { Network, Sparkles, HelpCircle, Info, Database } from 'lucide-react';

export const KnowledgeGraphPage: React.FC = () => {
  const [activeRelationship, setActiveRelationship] = useState<RelationshipDetail | null>(null);
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);

  const handleSelectRelationship = (relId: string) => {
    const rel = DEMO_RELATIONSHIPS[relId] || DEMO_RELATIONSHIPS['rel-gefitinib-egfr'];
    setActiveRelationship(rel);
    setIsWhyDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DFDCD3] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455] mb-2">
            <Network className="w-3.5 h-3.5 text-[#718C78]" />
            <span>Interactive Biomedical Topology</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
            Knowledge Graph Explorer
          </h1>
          <p className="text-sm text-[#585D56] mt-1 max-w-2xl leading-relaxed">
            Directly manipulate nodes and edges connecting drugs, genes, diseases, mutations, and clinical evidence strings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#666C64] bg-[#EFEEE7] px-3 py-1.5 rounded-lg border border-[#DFDCD3] self-start sm:self-auto">
          <Database className="w-3.5 h-3.5 text-[#718C78]" />
          <span className="font-mono text-[11px]">20 Nodes • 24 Curated Edges</span>
        </div>
      </div>

      {/* Main Graph Component */}
      <CytoscapeGraph
        nodes={DEMO_GRAPH_NODES}
        edges={DEMO_GRAPH_EDGES}
        onSelectRelationship={handleSelectRelationship}
        height="640px"
      />

      {/* Graph Tips and Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 text-xs">
          <div className="font-serif font-bold text-sm text-[#252824] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#718C78]" />
            Direct Node Selection
          </div>
          <p className="text-[#585D56] leading-relaxed">
            Click any gene (e.g. EGFR, BRCA1) or drug (e.g. Gefitinib, Olaparib) to isolate its immediate neighborhood and reveal direct clinical associations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 text-xs">
          <div className="font-serif font-bold text-sm text-[#252824] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#718596]" />
            Relationship Inspection
          </div>
          <p className="text-[#585D56] leading-relaxed">
            Click connection lines (edges) to review target mechanisms, curated counts, and launch the signature &ldquo;Why does this relationship exist?&rdquo; trace.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 text-xs">
          <div className="font-serif font-bold text-sm text-[#252824] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B78368]" />
            Layout Optimization
          </div>
          <p className="text-[#585D56] leading-relaxed">
            Switch between CoSE (force-directed), Concentric, Circle, and Breadthfirst layouts on the top toolbar to view hierarchical signaling pathways.
          </p>
        </div>
      </div>

      <SafetyBanner compact />

      {/* Why Drawer Component */}
      <WhyDrawer
        relationship={activeRelationship}
        isOpen={isWhyDrawerOpen}
        onClose={() => setIsWhyDrawerOpen(false)}
      />
    </div>
  );
};
