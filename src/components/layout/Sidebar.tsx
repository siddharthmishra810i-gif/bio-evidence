import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  Network,
  Scale,
  BookOpen,
  FlaskConical,
  Pill,
  Dna,
  HeartPulse,
  GitBranch,
  Split,
  Database,
  BarChart3,
  Info,
  Sparkles,
  Leaf,
  X,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const location = useLocation();

  const mainNavItems = [
    { label: 'Explore', path: '/', icon: Compass },
    { label: 'Knowledge Graph', path: '/graph', icon: Network },
    { label: 'Evidence', path: '/evidence', icon: Scale },
    { label: 'Ask the Graph', path: '/ask', icon: Sparkles, badge: 'AI Inquiry' },
    { label: 'Literature', path: '/literature', icon: BookOpen },
    { label: 'Clinical Trials', path: '/trials', icon: FlaskConical },
  ];

  const entityNavItems = [
    { label: 'Drugs', path: '/drugs', icon: Pill, count: '5' },
    { label: 'Genes', path: '/genes', icon: Dna, count: '5' },
    { label: 'Diseases', path: '/diseases', icon: HeartPulse, count: '4' },
    { label: 'Mutations', path: '/mutations', icon: Split, count: '4' },
    { label: 'Pathways', path: '/pathways', icon: GitBranch, count: '3' },
  ];

  const resourceNavItems = [
    { label: 'Data Sources', path: '/sources', icon: Database },
    { label: 'Research Dashboard', path: '/analytics', icon: BarChart3 },
    { label: 'About & Methodology', path: '/about', icon: Info },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#EFEEE7] border-r border-[#DFDCD3] text-[#252824] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#DFDCD3] flex items-center justify-between">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#718C78] flex items-center justify-center text-[#F7F5EF] shadow-xs group-hover:bg-[#58735F] transition-colors">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <div className="font-serif font-bold text-lg text-[#252824] tracking-tight leading-none">
              BioEvidence
            </div>
            <div className="text-[10px] text-[#7A8077] font-mono tracking-wider uppercase mt-1">
              Biomedical Graph
            </div>
          </div>
        </NavLink>

        {isMobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md hover:bg-[#DFDCD3] text-[#666C64]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
        {/* Main Section */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7A8077] font-semibold">
            Discovery
          </div>
          <div className="space-y-0.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all ${
                    isActive
                      ? 'bg-[#F7F5EF] text-[#252824] shadow-xs border border-[#DFDCD3]/70 font-semibold'
                      : 'text-[#585D56] hover:bg-[#E7E5DC] hover:text-[#252824]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#718C78]' : 'text-[#7A8077]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#718C78]/15 text-[#516455] font-semibold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Entities Section */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7A8077] font-semibold">
            Entities
          </div>
          <div className="space-y-0.5">
            {entityNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F7F5EF] text-[#252824] shadow-xs border border-[#DFDCD3]/70 font-semibold'
                      : 'text-[#585D56] hover:bg-[#E7E5DC] hover:text-[#252824]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#718C78]' : 'text-[#7A8077]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7A8077]">{item.count}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Resources */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7A8077] font-semibold">
            Resources
          </div>
          <div className="space-y-0.5">
            {resourceNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F7F5EF] text-[#252824] shadow-xs border border-[#DFDCD3]/70 font-semibold'
                      : 'text-[#585D56] hover:bg-[#E7E5DC] hover:text-[#252824]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#718C78]' : 'text-[#7A8077]'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Status Box */}
      <div className="p-3 border-t border-[#DFDCD3] bg-[#EAE8E0]/70 text-[11px] text-[#666C64] space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#516455]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#718C78] animate-pulse" />
            System: Connected
          </span>
          <span className="font-mono text-[10px] text-[#7A8077]">Demo Graph</span>
        </div>
        <div className="text-[10px] text-[#7A8077] flex items-center justify-between border-t border-[#DFDCD3]/70 pt-1.5">
          <span>Data updated:</span>
          <span className="font-mono">Sept 2026</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
