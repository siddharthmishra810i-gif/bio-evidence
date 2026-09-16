import React, { useEffect, useRef, useState, useMemo } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';
import { GraphNodeData, GraphEdgeData, EntityType } from '../../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Search,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  X,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Safeguard against Cytoscape race condition where endBatch/notify is called when renderer is destroyed
try {
  const dummy = cytoscape();
  const coreProto = Object.getPrototypeOf(dummy);
  if (coreProto && !coreProto.__patchedRendererSafe) {
    const origEndBatch = coreProto.endBatch;
    coreProto.endBatch = function () {
      const p = this._private;
      if (!p || p.batchCount === 0) return this;
      if (this.destroyed && this.destroyed()) {
        p.batchCount = 0;
        return this;
      }
      const renderer = this.renderer ? this.renderer() : null;
      if (!renderer) {
        if (p.batchCount > 0) p.batchCount--;
        return this;
      }
      return origEndBatch.apply(this, arguments);
    };

    const origNotify = coreProto.notify;
    coreProto.notify = function (eventName: any, eles: any) {
      if (this.destroyed && this.destroyed()) return this;
      const renderer = this.renderer ? this.renderer() : null;
      if (!renderer) return this;
      return origNotify.apply(this, arguments);
    };

    coreProto.__patchedRendererSafe = true;
  }
  dummy.destroy();
} catch (e) {
  // Ignore in SSR / headless
}

interface CytoscapeGraphProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  onSelectRelationship?: (relId: string) => void;
  height?: string;
  initialSelectedNodeId?: string;
}

const ENTITY_COLORS: Record<EntityType, string> = {
  Drug: '#718C78', // botanical green
  Gene: '#718596', // blue-gray
  Disease: '#B78368', // terracotta
  Protein: '#6A8F80',
  Mutation: '#968172',
  Pathway: '#889C82',
  Publication: '#868378',
  ClinicalTrial: '#7E8A7B',
};

export const CytoscapeGraph: React.FC<CytoscapeGraphProps> = ({
  nodes,
  edges,
  onSelectRelationship,
  height = '620px',
  initialSelectedNodeId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdgeData | null>(null);
  const [layoutName, setLayoutName] = useState<'cose' | 'concentric' | 'circle' | 'breadthfirst'>('cose');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilters, setActiveTypeFilters] = useState<Record<EntityType, boolean>>({
    Drug: true,
    Gene: true,
    Disease: true,
    Protein: true,
    Mutation: true,
    Pathway: true,
    Publication: true,
    ClinicalTrial: true,
  });
  const navigate = useNavigate();

  // Filter nodes and edges based on active entity type filters
  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => activeTypeFilters[n.type]);
  }, [nodes, activeTypeFilters]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return edges.filter((e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));
  }, [edges, filteredNodeIds]);

  // Initialize and update Cytoscape instance
  useEffect(() => {
    if (!containerRef.current) return;

    // Build elements array
    const elements = [
      ...filteredNodes.map((n) => ({
        data: {
          id: n.id,
          label: n.label,
          type: n.type,
          sublabel: n.sublabel || '',
          color: n.color || ENTITY_COLORS[n.type] || '#718C78',
          degree: n.degree || 3,
        },
      })),
      ...filteredEdges.map((e) => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label.replace(/_/g, ' '),
          evidenceCount: e.evidenceCount || 1,
        },
      })),
    ];

    // If an existing cytoscape instance is active, update elements and layout in-place
    if (cyRef.current && !cyRef.current.destroyed()) {
      const cy = cyRef.current;
      try {
        cy.stop();
        cy.batch(() => {
          cy.elements().remove();
          cy.add(elements);
        });
        const layout = cy.layout({
          name: layoutName,
          padding: 50,
          animate: false,
        } as any);
        layout.run();
      } catch (err) {
        console.warn('Error updating elements in existing cytoscape instance:', err);
      }
      return;
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#252824',
            'font-family': 'Inter, sans-serif',
            'font-size': '11px',
            'font-weight': 600,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'width': 34,
            'height': 34,
            'border-width': 2,
            'border-color': '#F7F5EF',
            'transition-property': 'background-color, line-color, target-arrow-color, width, height, opacity, border-width, border-color',
            'transition-duration': 0.2,
          },
        },
        {
          selector: 'node:selected',
          style: {
            'width': 42,
            'height': 42,
            'border-width': 4,
            'border-color': '#252824',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 1.5,
            'line-color': '#D0CBBF',
            'target-arrow-color': '#A8A295',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 0.8,
            'label': 'data(label)',
            'font-size': '8px',
            'font-family': 'JetBrains Mono, monospace',
            'text-rotation': 'autorotate',
            'text-margin-y': -8,
            'color': '#7A8077',
            'opacity': 0.8,
          },
        },
        {
          selector: 'edge:selected',
          style: {
            'width': 2.5,
            'line-color': '#516455',
            'target-arrow-color': '#516455',
            'opacity': 1,
            'color': '#252824',
          },
        },
        {
          selector: '.faded',
          style: {
            'opacity': 0.15,
          },
        },
        {
          selector: '.highlighted',
          style: {
            'opacity': 1,
            'line-color': '#718C78',
            'target-arrow-color': '#718C78',
            'border-color': '#718C78',
          },
        },
      ] as any,
      layout: {
        name: layoutName,
        padding: 50,
        animate: false,
      } as any,
      wheelSensitivity: 0.25,
      minZoom: 0.3,
      maxZoom: 3,
    });

    cyRef.current = cy;

    // Node click handler
    cy.on('tap', 'node', (evt: EventObject) => {
      const node = evt.target;
      const rawData = node.data();
      const matchedData = nodes.find((n) => n.id === rawData.id) || null;
      setSelectedNode(matchedData);
      setSelectedEdge(null);

      // Highlight neighborhood
      cy.elements().addClass('faded').removeClass('highlighted');
      node.removeClass('faded').addClass('highlighted');
      node.neighborhood().removeClass('faded').addClass('highlighted');
    });

    // Edge click handler
    cy.on('tap', 'edge', (evt: EventObject) => {
      const edge = evt.target;
      const edgeData = edge.data();
      const matchedEdge = edges.find((e) => e.id === edgeData.id) || null;
      setSelectedEdge(matchedEdge);
      setSelectedNode(null);

      cy.elements().addClass('faded').removeClass('highlighted');
      edge.removeClass('faded').addClass('highlighted');
      edge.source().removeClass('faded').addClass('highlighted');
      edge.target().removeClass('faded').addClass('highlighted');
    });

    // Tap background to reset selection
    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        cy.elements().removeClass('faded').removeClass('highlighted');
        setSelectedNode(null);
        setSelectedEdge(null);
      }
    });

    // Handle initial selection if provided
    if (initialSelectedNodeId) {
      const target = cy.getElementById(initialSelectedNodeId);
      if (target.length) {
        target.select();
        cy.center(target);
        const matchedData = nodes.find((n) => n.id === initialSelectedNodeId) || null;
        setSelectedNode(matchedData);
      }
    }

    return () => {
      try {
        if (!cy.destroyed()) {
          cy.stop();
          cy.removeAllListeners();
          cy.destroy();
        }
      } catch (err) {
        console.warn('Cytoscape cleanup error suppressed:', err);
      }
      if (cyRef.current === cy) {
        cyRef.current = null;
      }
    };
  }, [filteredNodes, filteredEdges, layoutName]);

  // Handle Search Highlighting
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    if (!searchQuery.trim()) {
      cy.elements().removeClass('faded').removeClass('highlighted');
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matched = cy.nodes().filter((n) => n.data('label').toLowerCase().includes(q));

    if (matched.length > 0) {
      cy.elements().addClass('faded').removeClass('highlighted');
      matched.removeClass('faded').addClass('highlighted');
      matched.neighborhood().removeClass('faded');
    }
  }, [searchQuery]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 40);
  const handleReset = () => {
    setSearchQuery('');
    setSelectedNode(null);
    setSelectedEdge(null);
    cyRef.current?.elements().removeClass('faded').removeClass('highlighted');
    cyRef.current?.reset();
    cyRef.current?.fit(undefined, 40);
  };

  const toggleFilter = (type: EntityType) => {
    setActiveTypeFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Connected entities for selected node
  const connectedNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    return edges
      .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
      .map((e) => {
        const otherId = e.source === selectedNode.id ? e.target : e.source;
        const otherNode = nodes.find((n) => n.id === otherId);
        return {
          edge: e,
          node: otherNode,
        };
      })
      .filter((item) => item.node !== undefined);
  }, [selectedNode, edges, nodes]);

  return (
    <div className="relative flex flex-col xl:flex-row border border-[#DFDCD3] rounded-2xl bg-[#F7F5EF] overflow-hidden shadow-xs">
      {/* Graph Visualizer Main Area */}
      <div className="flex-1 flex flex-col relative min-h-[500px]">
        {/* Graph Controls Toolbar */}
        <div className="p-3 border-b border-[#DFDCD3] bg-[#EFEEE7]/80 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7A8077]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find node in graph..."
                className="pl-8 pr-3 py-1 bg-[#F7F5EF] border border-[#DFDCD3] rounded-md text-xs text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78]"
              />
            </div>

            <div className="flex items-center bg-[#F7F5EF] border border-[#DFDCD3] rounded-md p-0.5">
              {(['cose', 'concentric', 'circle', 'breadthfirst'] as const).map((name) => (
                <button
                  key={name}
                  onClick={() => setLayoutName(name)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                    layoutName === name
                      ? 'bg-[#252824] text-[#F7F5EF] font-medium'
                      : 'text-[#666C64] hover:text-[#252824]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded bg-[#F7F5EF] border border-[#DFDCD3] hover:bg-[#EAE7DE] text-[#252824]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded bg-[#F7F5EF] border border-[#DFDCD3] hover:bg-[#EAE7DE] text-[#252824]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFit}
              className="p-1.5 rounded bg-[#F7F5EF] border border-[#DFDCD3] hover:bg-[#EAE7DE] text-[#252824]"
              title="Fit Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded bg-[#F7F5EF] border border-[#DFDCD3] hover:bg-[#EAE7DE] text-[#252824]"
              title="Reset Graph"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Entity Type Filter Bar */}
        <div className="px-3 py-2 bg-[#F7F5EF] border-b border-[#DFDCD3] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A8077] flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#718C78]" />
            Entity Types:
          </span>
          {(Object.keys(activeTypeFilters) as EntityType[]).map((type) => {
            const active = activeTypeFilters[type];
            const color = ENTITY_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
                  active
                    ? 'border-[#DFDCD3] bg-[#EFEEE7] text-[#252824]'
                    : 'border-transparent bg-transparent text-[#7A8077] opacity-50 line-through'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span>{type}</span>
              </button>
            );
          })}
        </div>

        {/* Cytoscape Canvas Container */}
        <div
          ref={containerRef}
          style={{ height }}
          className="w-full relative bg-[#F7F5EF] cursor-grab active:cursor-grabbing"
        />

        {/* Graph Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#F7F5EF]/90 backdrop-blur-xs border border-[#DFDCD3] rounded-md p-2 text-[10px] text-[#666C64] font-mono flex items-center gap-3 shadow-2xs pointer-events-none">
          <span>Scroll to zoom</span>
          <span>•</span>
          <span>Drag to pan</span>
          <span>•</span>
          <span>Click node or edge to inspect</span>
        </div>
      </div>

      {/* Right Details Panel */}
      <div className="w-full xl:w-96 border-t xl:border-t-0 xl:border-l border-[#DFDCD3] bg-[#EFEEE7]/80 flex flex-col p-5 overflow-y-auto max-h-[700px]">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest text-[#F7F5EF]"
                  style={{ backgroundColor: ENTITY_COLORS[selectedNode.type] || '#718C78' }}
                >
                  {selectedNode.type}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#252824] mt-1">
                  {selectedNode.label}
                </h3>
                {selectedNode.sublabel && (
                  <p className="text-xs text-[#666C64] font-mono mt-0.5">{selectedNode.sublabel}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded text-[#7A8077] hover:text-[#252824]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A8077]">Entity ID:</span>
                <span className="font-mono text-[#252824] font-medium">{selectedNode.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8077]">Direct Connections:</span>
                <span className="font-mono text-[#252824] font-semibold">{connectedNeighbors.length} relationships</span>
              </div>
            </div>

            {/* Connected Neighbors List */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#666C64] mb-2">
                Connected Biomedical Entities
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {connectedNeighbors.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-[#F7F5EF] border border-[#DFDCD3] hover:border-[#718C78] text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-[#252824]">{item.node?.label}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EFEEE7] text-[#666C64]">
                          {item.node?.type}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#718C78] mt-0.5 block">
                        {item.edge.label.replace(/_/g, ' ')} ({item.edge.evidenceCount} sources)
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectRelationship && onSelectRelationship(item.edge.id)}
                      className="p-1.5 text-[#718C78] hover:text-[#252824] hover:bg-[#EFEEE7] rounded"
                      title="Why does this relationship exist?"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-[#DFDCD3] space-y-2">
              <button
                onClick={() => {
                  if (selectedNode.type === 'Gene') navigate(`/genes/${selectedNode.label}`);
                  else if (selectedNode.type === 'Drug') navigate(`/drugs/${selectedNode.id}`);
                  else if (selectedNode.type === 'Disease') navigate(`/diseases/${selectedNode.id}`);
                  else navigate('/evidence');
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#252824] text-[#F7F5EF] hover:bg-[#3D423C] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full {selectedNode.type} Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : selectedEdge ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#718C78]/20 text-[#516455] font-semibold">
                  Relationship Edge
                </span>
                <h3 className="font-serif text-lg font-bold text-[#252824] mt-1">
                  {selectedEdge.label.replace(/_/g, ' ')}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEdge(null)}
                className="p-1 rounded text-[#7A8077] hover:text-[#252824]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A8077]">Source Node:</span>
                <span className="font-mono text-[#252824] font-medium">{selectedEdge.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8077]">Target Node:</span>
                <span className="font-mono text-[#252824] font-medium">{selectedEdge.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8077]">Curated Evidence:</span>
                <span className="font-mono text-[#718C78] font-bold">{selectedEdge.evidenceCount} strings</span>
              </div>
            </div>

            <button
              onClick={() => onSelectRelationship && onSelectRelationship('rel-gefitinib-egfr')}
              className="w-full py-2 px-3 rounded-lg bg-[#718C78] text-[#F7F5EF] hover:bg-[#58735F] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why does this relationship exist?</span>
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-[#7A8077] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#DFDCD3]/60 flex items-center justify-center text-[#666C64]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-medium text-sm text-[#252824]">Interactive Graph Inspection</h4>
              <p className="text-xs text-[#666C64] mt-1 max-w-xs leading-relaxed">
                Click any node (e.g. EGFR, Gefitinib) or connection edge to review molecular evidence, connected targets, and source databases.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
