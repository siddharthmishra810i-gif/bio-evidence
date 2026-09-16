import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Layers,
  Dna,
  Pill,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { DEMO_PUBLICATIONS, DEMO_GENES, DEMO_DRUGS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Recharts data styled with our botanical editorial palette
  const entityDistributionData = [
    { name: 'Genes', count: 24500, color: '#718596' },
    { name: 'Drugs', count: 14200, color: '#718C78' },
    { name: 'Diseases', count: 8900, color: '#B78368' },
    { name: 'Pathways', count: 3200, color: '#889C82' },
    { name: 'Publications', count: 850000, color: '#868378' },
  ];

  const confidenceDistributionData = [
    { name: 'High Concordance (>90%)', value: 58, color: '#718C78' },
    { name: 'Moderate Evidence (70-90%)', value: 27, color: '#718596' },
    { name: 'Emerging / Exploratory (<70%)', value: 15, color: '#B78368' },
  ];

  const topTargetedGenes = [
    { gene: 'EGFR', connections: 42, type: 'Receptor Tyrosine Kinase' },
    { gene: 'BRCA1', connections: 38, type: 'DNA Repair Enzyme' },
    { gene: 'TP53', connections: 64, type: 'Tumor Suppressor' },
    { gene: 'KRAS', connections: 29, type: 'GTPase Transducer' },
    { gene: 'BRAF', connections: 25, type: 'Serine/Threonine Kinase' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <TrendingUp className="w-3.5 h-3.5 text-[#718C78]" />
          <span>Biomedical Graph Analytics & Coverage</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Research Knowledge Dashboard
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          Aggregated coverage metrics, top researched genetic loci, and evidence confidence distributions synthesized across biomedical domains.
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A8077]">Indexed Entities</span>
          <div className="font-serif text-3xl font-bold text-[#252824]">1.2M+</div>
          <p className="text-[11px] text-[#585D56]">Genes, drugs, diseases, variants</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78]">Curated Edges</span>
          <div className="font-serif text-3xl font-bold text-[#718C78]">4.8M</div>
          <p className="text-[11px] text-[#585D56]">Verified relational associations</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#718596]">PubMed Sources</span>
          <div className="font-serif text-3xl font-bold text-[#718596]">850k+</div>
          <p className="text-[11px] text-[#585D56]">Biomedical publications parsed</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#B78368]">Clinical Registries</span>
          <div className="font-serif text-3xl font-bold text-[#B78368]">45,000</div>
          <p className="text-[11px] text-[#585D56]">Interventional clinical trials</p>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Graph Volume by Entity Type */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#718C78] font-bold">
              Coverage Scope
            </span>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              Entities by Biological Class
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entityDistributionData.slice(0, 4)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#7A8077" fontSize={11} tickLine={false} />
                <YAxis stroke="#7A8077" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F7F5EF',
                    borderColor: '#DFDCD3',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#718C78" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Evidence Confidence Distribution */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#718596] font-bold">
              Provenance Validation
            </span>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              Evidence Concordance Distribution
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confidenceDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {confidenceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#F7F5EF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F7F5EF',
                    borderColor: '#DFDCD3',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {confidenceDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#585D56] font-medium">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Researched Genes and Recent Literature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Connected Genes */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#718596] font-bold">Top Targets</span>
              <h3 className="font-serif text-xl font-bold text-[#252824]">Most Connected Gene Targets</h3>
            </div>
            <button
              onClick={() => navigate('/search?q=gene')}
              className="text-xs text-[#718C78] hover:underline font-medium"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {topTargetedGenes.map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/genes/${item.gene}`)}
                className="p-3 rounded-xl bg-[#EFEEE7] hover:bg-[#E2DFC8] border border-[#DFDCD3] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#718596] text-[#F7F5EF] flex items-center justify-center font-mono text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#252824]">{item.gene}</h4>
                    <span className="text-xs text-[#666C64]">{item.type}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#516455]">{item.connections} links</span>
                  <div className="text-[10px] text-[#7A8077]">drugs & diseases</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Analyzed Publications */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#718C78] font-bold">Literature Feed</span>
              <h3 className="font-serif text-xl font-bold text-[#252824]">Recent Analyzed Papers</h3>
            </div>
            <button
              onClick={() => navigate('/literature')}
              className="text-xs text-[#718C78] hover:underline font-medium"
            >
              Browse all
            </button>
          </div>

          <div className="space-y-3">
            {DEMO_PUBLICATIONS.slice(0, 3).map((pub) => (
              <div
                key={pub.id}
                className="p-3.5 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#718C78] font-bold uppercase">
                    {pub.journal} • {pub.year}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A8077]">PMID:{pub.pmid}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#252824] line-clamp-1">{pub.title}</h4>
                <p className="text-[#585D56] line-clamp-2">{pub.abstract}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SafetyBanner compact />
    </div>
  );
};
