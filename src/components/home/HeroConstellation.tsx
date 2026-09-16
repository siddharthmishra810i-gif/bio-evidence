import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink, X } from 'lucide-react';

interface ConstellationNode {
  id: string;
  label: string;
  type: 'Drug' | 'Gene' | 'Disease' | 'Pathway' | 'Publication';
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  baseX: number;
  baseY: number;
  color: string;
  description: string;
  link: string;
}

interface ConstellationEdge {
  source: string;
  target: string;
  label: string;
}

const NODES: ConstellationNode[] = [
  {
    id: 'gefitinib',
    label: 'Gefitinib',
    type: 'Drug',
    x: 22,
    y: 42,
    baseX: 22,
    baseY: 42,
    color: '#718C78', // botanical green
    description: 'First-generation selective EGFR tyrosine kinase inhibitor.',
    link: '/drugs/drug-gefitinib',
  },
  {
    id: 'egfr',
    label: 'EGFR',
    type: 'Gene',
    x: 48,
    y: 36,
    baseX: 48,
    baseY: 36,
    color: '#718596', // blue-gray
    description: 'Receptor tyrosine kinase controlling cell proliferation and survival signaling.',
    link: '/genes/EGFR',
  },
  {
    id: 'nsclc',
    label: 'NSCLC',
    type: 'Disease',
    x: 76,
    y: 45,
    baseX: 76,
    baseY: 45,
    color: '#B78368', // terracotta
    description: 'Non-small cell lung carcinoma with actionable driver mutations.',
    link: '/diseases/disease-nsclc',
  },
  {
    id: 'erbb',
    label: 'ErbB Pathway',
    type: 'Pathway',
    x: 32,
    y: 72,
    baseX: 32,
    baseY: 72,
    color: '#889C82',
    description: 'Signal transduction cascade transmitting extracellular mitogenic cues.',
    link: '/pathways',
  },
  {
    id: 'ipass',
    label: 'IPASS Trial',
    type: 'Publication',
    x: 70,
    y: 78,
    baseX: 70,
    baseY: 78,
    color: '#8A8679',
    description: 'Pivotal NEJM publication establishing biomarker-driven TKI superiority.',
    link: '/literature',
  },
];

const EDGES: ConstellationEdge[] = [
  { source: 'gefitinib', target: 'egfr', label: 'targets' },
  { source: 'egfr', target: 'nsclc', label: 'associated with' },
  { source: 'erbb', target: 'egfr', label: 'involves' },
  { source: 'erbb', target: 'gefitinib', label: 'inhibited by' },
  { source: 'nsclc', target: 'ipass', label: 'studied in' },
  { source: 'gefitinib', target: 'ipass', label: 'evaluated in' },
];

export const HeroConstellation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<ConstellationNode[]>(NODES);
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0, active: false });
  const navigate = useNavigate();

  // Subtle organic harmonic drift animation
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;

      setNodes((prevNodes) =>
        prevNodes.map((node, i) => {
          const driftX = Math.sin(time + i * 1.4) * 1.6;
          const driftY = Math.cos(time * 0.8 + i * 1.8) * 1.4;

          // Gentle mouse displacement
          let mouseDisplacementX = 0;
          let mouseDisplacementY = 0;
          if (mousePosRef.current.active && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const nodeScreenX = (node.baseX / 100) * rect.width;
            const nodeScreenY = (node.baseY / 100) * rect.height;
            const dx = mousePosRef.current.x - nodeScreenX;
            const dy = mousePosRef.current.y - nodeScreenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180 && dist > 0) {
              const force = (180 - dist) / 180;
              mouseDisplacementX = -(dx / dist) * force * 12;
              mouseDisplacementY = -(dy / dist) * force * 12;
            }
          }

          return {
            ...node,
            x: node.baseX + driftX + (mouseDisplacementX / (containerRef.current?.clientWidth || 800)) * 100,
            y: node.baseY + driftY + (mouseDisplacementY / (containerRef.current?.clientHeight || 400)) * 100,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
    setHoveredNodeId(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] sm:h-[460px] bg-[#EFEEE7]/60 rounded-2xl border border-[#DFDCD3] overflow-hidden select-none"
    >
      {/* Background scientific watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#252824_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Corner Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#7A8077] bg-[#F7F5EF]/80 px-2.5 py-1 rounded-full border border-[#DFDCD3]">
        <Sparkles className="w-3 h-3 text-[#718C78]" />
        <span>Scientific Constellation • Interactive Preview</span>
      </div>

      <div className="absolute top-4 right-4 z-10 text-[10px] font-mono text-[#7A8077] hidden sm:block">
        Click node to inspect evidence trace
      </div>

      {/* SVG Connecting Organic Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {EDGES.map((edge, idx) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const isHighlighted =
            hoveredNodeId === edge.source || hoveredNodeId === edge.target;

          return (
            <g key={idx}>
              <line
                x1={`${sourceNode.x}%`}
                y1={`${sourceNode.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke={isHighlighted ? '#516455' : '#C7C2B4'}
                strokeWidth={isHighlighted ? 1.75 : 1}
                strokeDasharray={edge.label === 'studied in' ? '3 3' : 'none'}
                className="transition-colors duration-300"
              />
              {/* Relationship text along line */}
              <text
                x={`${(sourceNode.x + targetNode.x) / 2}%`}
                y={`${(sourceNode.y + targetNode.y) / 2 - 1.5}%`}
                textAnchor="middle"
                className={`text-[9px] font-mono uppercase tracking-wider fill-[#7A8077] transition-opacity duration-300 ${
                  isHighlighted ? 'opacity-100 font-bold fill-[#516455]' : 'opacity-40'
                }`}
              >
                {edge.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isSelected = activeNode?.id === node.id;

        return (
          <div
            key={node.id}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setActiveNode(node)}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
            className="absolute z-20 cursor-pointer group focus:outline-none"
          >
            {/* Subtle botanical halo on select/hover */}
            <div
              className={`absolute -inset-3 rounded-full transition-all duration-300 pointer-events-none ${
                isSelected
                  ? 'bg-[#718C78]/25 scale-125'
                  : isHovered
                  ? 'bg-[#718C78]/15 scale-110'
                  : 'scale-75 opacity-0'
              }`}
            />

            {/* Main Node Circle */}
            <div
              style={{ backgroundColor: node.color }}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-[#F7F5EF] shadow-xs border-2 border-[#F7F5EF] transition-transform duration-200 ${
                isHovered || isSelected ? 'scale-115' : 'scale-100'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#F7F5EF]/80" />
            </div>

            {/* Label below node */}
            <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <span className="font-serif text-xs font-semibold text-[#252824] bg-[#F7F5EF]/90 px-2 py-0.5 rounded border border-[#DFDCD3]/80 shadow-2xs">
                {node.label}
              </span>
              <div className="text-[9px] font-mono text-[#7A8077] uppercase tracking-wider mt-0.5">
                {node.type}
              </div>
            </div>
          </div>
        );
      })}

      {/* Node Preview Panel (when clicked) */}
      {activeNode && (
        <div
          id="hero-node-preview-card"
          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 p-4 rounded-xl bg-[#F7F5EF] border border-[#DFDCD3] shadow-lg text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#EFEEE7] text-[#718C78] font-bold">
                {activeNode.type} Entity
              </span>
              <h3 className="font-serif text-base font-bold text-[#252824] mt-1">
                {activeNode.label}
              </h3>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="p-1 text-[#7A8077] hover:text-[#252824] rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="mt-2 text-[#585D56] leading-relaxed text-[11px]">
            {activeNode.description}
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#DFDCD3] flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#7A8077]">
              Demo Graph Verified
            </span>
            <button
              onClick={() => navigate(activeNode.link)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#718C78] hover:text-[#252824] transition-colors"
            >
              <span>Explore Entity</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
