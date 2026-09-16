import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Database, Sparkles, X, Activity, BookMarked, User } from 'lucide-react';
import { DEMO_GENES, DEMO_DRUGS, DEMO_DISEASES } from '../../data/mockData';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter items based on query
  const queryLower = searchQuery.toLowerCase().trim();
  const matchedGenes = queryLower ? DEMO_GENES.filter(g => g.symbol.toLowerCase().includes(queryLower) || g.name.toLowerCase().includes(queryLower)) : [];
  const matchedDrugs = queryLower ? DEMO_DRUGS.filter(d => d.name.toLowerCase().includes(queryLower) || d.mechanism.toLowerCase().includes(queryLower)) : [];
  const matchedDiseases = queryLower ? DEMO_DISEASES.filter(dis => dis.name.toLowerCase().includes(queryLower)) : [];

  const handleSelect = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#DFDCD3] bg-[#F7F5EF]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile menu toggle + Context indicator */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-sidebar-toggle-btn"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-[#EFEEE7] text-[#252824] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#666C64]">
          <span className="w-2 h-2 rounded-full bg-[#718C78]" />
          <span className="font-serif italic font-medium text-[#252824]">BioEvidence</span>
          <span className="text-[#DFDCD3]">/</span>
          <span className="font-mono text-[11px] text-[#718596]">Graph Index v2.6</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="relative flex-1 max-w-xl mx-4">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8077]" />
          <input
            ref={searchInputRef}
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search genes, drugs, diseases, publications... (e.g. EGFR)"
            className="w-full pl-9 pr-14 py-2 bg-[#EFEEE7] border border-[#DFDCD3] rounded-full text-xs text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78] focus:bg-[#F7F5EF] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] text-[#7A8077] bg-[#DFDCD3]/60 px-1.5 py-0.5 rounded font-mono">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </form>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-2 bg-[#F7F5EF] border border-[#DFDCD3] rounded-xl shadow-xl overflow-hidden z-50 text-xs divide-y divide-[#DFDCD3]"
          >
            <div className="p-2.5 bg-[#EFEEE7] flex items-center justify-between text-[#666C64]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Quick Results for &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="hover:text-[#252824] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Genes */}
            {matchedGenes.length > 0 && (
              <div className="p-2 space-y-1">
                <div className="text-[10px] font-mono text-[#718596] uppercase px-2 py-0.5 font-semibold">
                  Genes ({matchedGenes.length})
                </div>
                {matchedGenes.map((gene) => (
                  <button
                    key={gene.id}
                    onClick={() => handleSelect(`/genes/${gene.symbol}`)}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-[#EFEEE7] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#252824]">{gene.symbol}</span>
                      <span className="text-[#666C64] ml-2 text-[11px]">{gene.name}</span>
                    </div>
                    <span className="text-[10px] text-[#718C78] font-mono group-hover:underline">View Gene →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Drugs */}
            {matchedDrugs.length > 0 && (
              <div className="p-2 space-y-1">
                <div className="text-[10px] font-mono text-[#718C78] uppercase px-2 py-0.5 font-semibold">
                  Drugs ({matchedDrugs.length})
                </div>
                {matchedDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleSelect(`/drugs/${drug.id}`)}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-[#EFEEE7] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="font-serif font-bold text-[#252824]">{drug.name}</span>
                      <span className="text-[#666C64] ml-2 text-[11px]">{drug.drugType}</span>
                    </div>
                    <span className="text-[10px] text-[#718C78] font-mono group-hover:underline">View Drug →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Diseases */}
            {matchedDiseases.length > 0 && (
              <div className="p-2 space-y-1">
                <div className="text-[10px] font-mono text-[#B78368] uppercase px-2 py-0.5 font-semibold">
                  Diseases ({matchedDiseases.length})
                </div>
                {matchedDiseases.map((dis) => (
                  <button
                    key={dis.id}
                    onClick={() => handleSelect(`/diseases/${dis.id}`)}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-[#EFEEE7] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="font-medium text-[#252824]">{dis.name}</span>
                      <span className="text-[#666C64] ml-2 text-[11px] font-mono">{dis.doid}</span>
                    </div>
                    <span className="text-[10px] text-[#718C78] font-mono group-hover:underline">View Disease →</span>
                  </button>
                ))}
              </div>
            )}

            {matchedGenes.length === 0 && matchedDrugs.length === 0 && matchedDiseases.length === 0 && (
              <div className="p-4 text-center text-[#7A8077]">
                No exact entity match. Press Enter to search literature and trials.
              </div>
            )}

            <div className="p-2 bg-[#EFEEE7]/60 text-right">
              <button
                onClick={handleSubmit}
                className="text-xs text-[#718C78] hover:text-[#252824] font-medium transition-colors"
              >
                View all results for &ldquo;{searchQuery}&rdquo; →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Data status & Researcher Badge */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="hidden md:flex items-center gap-2 text-xs text-[#666C64] px-2.5 py-1 rounded bg-[#EFEEE7] border border-[#DFDCD3]">
          <Database className="w-3.5 h-3.5 text-[#718C78]" />
          <span className="font-mono text-[11px]">Synced: Sept 2026</span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-[#DFDCD3]">
          <div className="w-8 h-8 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] flex items-center justify-center text-[#585D56] font-serif text-sm">
            <User className="w-4 h-4 text-[#718C78]" />
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <div className="font-medium text-[#252824]">Biomedical Scholar</div>
            <div className="text-[10px] text-[#7A8077]">Open Access Mode</div>
          </div>
        </div>
      </div>
    </header>
  );
};
