import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertTriangle, FileText, Calendar, Building2 } from 'lucide-react';
import { DocumentMetadata, AuthorityTier } from '../types/research';

interface SourceInspectorDrawerProps {
  source: DocumentMetadata | null;
  onClose: () => void;
}

export const SourceInspectorDrawer: React.FC<SourceInspectorDrawerProps> = ({ source, onClose }) => {
  if (!source) return null;

  const getTierBadge = (tier: AuthorityTier) => {
    switch (tier) {
      case 1:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Tier 1: Official Regulatory / Exchange Filing
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30">
            <FileText className="w-3.5 h-3.5" /> Tier 2: Earnings Call / IR Material
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
            <FileText className="w-3.5 h-3.5" /> Tier 3: Financial Press / Regional News
          </span>
        );
      case 4:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Tier 4: Promotional / Untrusted Blog
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-[#0c1427] border-l border-slate-700/80 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-[#0a1020] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
              [{source.id}]
            </span>
            {getTierBadge(source.authorityTier)}
          </div>
          <h3 className="text-base font-bold text-slate-100 line-clamp-1">{source.sourceName}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{source.filename}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Metadata bar */}
      <div className="px-5 py-3 bg-[#080d19] border-b border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-500 block">Publication Date:</span>
          <span className="text-slate-200 font-mono flex items-center gap-1 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {source.publicationDate}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Reporting Period:</span>
          <span className="text-slate-200 font-mono flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {source.reportingPeriod || 'N/A'}
          </span>
        </div>
        {source.url && (
          <div className="col-span-2">
            <span className="text-slate-500 block">Official Filing Link:</span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 truncate block mt-0.5 font-mono flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{source.url}</span>
            </a>
          </div>
        )}
      </div>

      {/* Warning banner if untrusted */}
      {source.isUntrusted && (
        <div className="mx-5 my-3 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-rose-200">Untrusted / Promotional Source</strong>
            This document contains promotional claims and embedded injection commands. The research pipeline automatically sanitized these instructions and isolated promotional assertions.
          </div>
        </div>
      )}

      {/* Full Document Body with Highlighted Sections */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2">
            Original Document Verbatim Text ({source.characterCount} characters)
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-[#060a14] p-4 rounded-xl border border-slate-800/80 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto">
            {source.content}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-[#0a1020] flex items-center justify-between text-xs text-slate-400">
        <span>Source ID: <strong className="text-emerald-400 font-mono">[{source.id}]</strong></span>
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
