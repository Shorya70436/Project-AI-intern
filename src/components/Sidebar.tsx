import React from 'react';
import {
  TrendingUp,
  FileText,
  GitCompare,
  Database,
  FlaskConical,
  Zap,
  PlusCircle,
  HelpCircle,
  ExternalLink,
  Shield,
  Layers,
  ChevronRight,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'workspace' | 'report' | 'contradictions' | 'evidence' | 'evaluation';
  setActiveTab: (tab: 'workspace' | 'report' | 'contradictions' | 'evidence' | 'evaluation') => void;
  onNewResearch: () => void;
  onOpenCostModal: () => void;
  onOpenSettings: () => void;
  ticker: string;
  hasReport: boolean;
  modelName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onNewResearch,
  onOpenCostModal,
  onOpenSettings,
  ticker,
  hasReport,
  modelName,
}) => {
  const navItems = [
    {
      id: 'workspace' as const,
      label: 'Research Workspace',
      subtitle: 'Upload, Ingestion & Control',
      icon: Layers,
    },
    {
      id: 'report' as const,
      label: 'Investment Brief',
      subtitle: 'Synthesis & Cited Claims',
      icon: FileText,
      badge: hasReport ? 'Ready' : undefined,
    },
    {
      id: 'contradictions' as const,
      label: 'Contradiction Matrix',
      subtitle: 'Numerical & Period Audit',
      icon: GitCompare,
    },
    {
      id: 'evidence' as const,
      label: 'Structured Evidence',
      subtitle: 'Granular Claim Records',
      icon: Database,
    },
    {
      id: 'evaluation' as const,
      label: 'Evaluation Lab',
      subtitle: '3-Run Benchmark & Scoring',
      icon: FlaskConical,
      highlight: true,
    },
  ];

  return (
    <aside className="w-72 bg-[#090f1d] border-r border-slate-800/80 flex flex-col h-screen select-none">
      {/* Brand & Logo */}
      <div className="p-5 border-b border-slate-800/80 bg-[#070b16]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white uppercase flex items-center gap-1.5">
              Super Investing
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400">Intelligence Terminal</p>
          </div>
        </div>

        {/* Primary New Research Action */}
        <button
          onClick={onNewResearch}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs transition duration-150 group shadow-sm"
        >
          <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          <span>New Research Session</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
          Terminal Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition duration-150 relative ${
                isActive
                  ? 'bg-slate-800/90 text-white font-semibold shadow-inner border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              } ${item.highlight && !isActive ? 'border border-emerald-500/20' : ''}`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800/60 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{item.subtitle}</div>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute right-2.5" />
              )}
            </button>
          );
        })}

        {/* Dedicated "How much will it take to run?" CTA Button */}
        <div className="pt-4 px-1">
          <button
            onClick={onOpenCostModal}
            className="w-full flex items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-left hover:border-emerald-400/50 transition group"
          >
            <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                How much to run?
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                Speed: <strong>~3.5s</strong> • Cost: <strong>&lt; $0.001 (₹0.07)</strong>
              </p>
            </div>
          </button>
        </div>

        {/* Active Company Target */}
        <div className="mt-4 px-3 py-2.5 rounded-xl bg-[#070b16] border border-slate-800/80">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
            Target Listed Entity
          </span>
          <div className="text-xs font-bold text-slate-200 mt-0.5 flex items-center justify-between">
            <span className="font-mono text-emerald-400">NSE: {ticker}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              India
            </span>
          </div>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            SRV Cables & Telecoms Ltd
          </p>
        </div>
      </div>

      {/* Footer Info & Settings */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070b16] text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[10px] text-slate-300 truncate max-w-[130px]">
            {modelName}
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition"
          title="Model Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
