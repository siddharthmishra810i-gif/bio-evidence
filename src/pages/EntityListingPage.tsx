import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pill,
  Dna,
  HeartPulse,
  Split,
  GitBranch,
  Search,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  DEMO_DRUGS,
  DEMO_GENES,
  DEMO_DISEASES,
  DEMO_MUTATIONS,
  DEMO_PATHWAYS,
} from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';

interface EntityListingPageProps {
  entityType: 'drugs' | 'genes' | 'diseases' | 'mutations' | 'pathways';
}

export const EntityListingPage: React.FC<EntityListingPageProps> = ({ entityType }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();

  let title = '';
  let subtitle = '';
  let icon = Pill;
  let items: any[] = [];

  if (entityType === 'drugs') {
    title = 'Small Molecule & Biologic Drugs';
    subtitle = 'FDA/EMA approved targeted therapeutics with validated genomic and phenotypic targets.';
    icon = Pill;
    items = DEMO_DRUGS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.mechanism.toLowerCase().includes(q) ||
        d.indication.toLowerCase().includes(q)
    );
  } else if (entityType === 'genes') {
    title = 'Human Target Genes';
    subtitle = 'Protein-coding genes with actionable oncology mutations, clinical trials, and drug affinities.';
    icon = Dna;
    items = DEMO_GENES.filter(
      (g) =>
        g.symbol.toLowerCase().includes(q) ||
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
    );
  } else if (entityType === 'diseases') {
    title = 'Disease Indications & Phenotypes';
    subtitle = 'Pathological conditions characterized by genetic driver alterations and target therapies.';
    icon = HeartPulse;
    items = DEMO_DISEASES.filter(
      (dis) =>
        dis.name.toLowerCase().includes(q) ||
        dis.category.toLowerCase().includes(q) ||
        dis.description.toLowerCase().includes(q)
    );
  } else if (entityType === 'mutations') {
    title = 'Genomic Mutations & Variants';
    subtitle = 'Somatic kinase domain mutations, indels, and frameshifts conferring drug sensitivity or resistance.';
    icon = Split;
    items = DEMO_MUTATIONS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.consequence.toLowerCase().includes(q) ||
        m.clinicalSignificance.toLowerCase().includes(q)
    );
  } else if (entityType === 'pathways') {
    title = 'Cellular Signaling Pathways';
    subtitle = 'Biological cascades regulating cellular proliferation, survival, and metabolic transduction.';
    icon = GitBranch;
    items = DEMO_PATHWAYS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const IconComponent = icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <IconComponent className="w-3.5 h-3.5 text-[#718C78]" />
          <span>Biomedical Knowledge Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          {title}
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8077]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Filter ${entityType}...`}
          className="w-full pl-10 pr-4 py-2 bg-[#EFEEE7] border border-[#DFDCD3] rounded-xl text-xs text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78]"
        />
      </div>

      {/* Grid of Entity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (entityType === 'drugs') navigate(`/drugs/${item.id}`);
              else if (entityType === 'genes') navigate(`/genes/${item.symbol}`);
              else if (entityType === 'diseases') navigate(`/diseases/${item.id}`);
              else navigate('/evidence');
            }}
            className="p-5 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] hover:bg-[#F9F8F4] cursor-pointer transition-all space-y-3 shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-bold">
                  {entityType.slice(0, -1)}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#252824] group-hover:text-[#516455] transition-colors">
                  {item.name || item.symbol}
                </h3>
                {item.symbol && item.name && (
                  <p className="text-xs text-[#7A8077]">{item.name}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-[#7A8077] group-hover:translate-x-1 group-hover:text-[#252824] transition-all" />
            </div>

            <p className="text-xs text-[#585D56] leading-relaxed line-clamp-2">
              {item.description || item.mechanism || item.clinicalSignificance}
            </p>

            <div className="pt-2 border-t border-[#DFDCD3] flex items-center justify-between text-[11px] font-mono text-[#7A8077]">
              <span>ID: {item.id}</span>
              <span className="text-[#718C78] font-sans font-medium">Explore Record →</span>
            </div>
          </div>
        ))}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
