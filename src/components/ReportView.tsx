import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Printer,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { ResearchBriefData, CitationQualitySummary, DocumentMetadata } from '../types/research';

interface ReportViewProps {
  brief: ResearchBriefData | null;
  citationAudit: {
    summary: CitationQualitySummary;
  } | null;
  documents: DocumentMetadata[];
  onSelectCitation: (sourceId: string) => void;
  onRegenerate: () => void;
  isRunning: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  brief,
  citationAudit,
  documents,
  onSelectCitation,
  onRegenerate,
  isRunning,
}) => {
  const [copied, setCopied] = useState(false);

  if (!brief) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <FileText className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-slate-300">No Research Brief Generated Yet</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          Return to the Research Workspace, verify the uploaded document pack, and click "Run Research Agent" to synthesize the brief.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(brief.fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([brief.fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brief.ticker}_Research_Brief_${brief.promptVersion}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = {
      brief,
      citationAudit,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brief.ticker}_Research_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Render markdown text and transform [S1], [S2] into clickable interactive badges
  const renderFormattedMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');

    return lines.map((line, idx) => {
      // Main H1 Title
      if (line.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pb-3 mb-6 border-b border-slate-800">
            {line.replace('# ', '')}
          </h1>
        );
      }
      // H2 Section Headers
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        return (
          <h2 key={idx} className="text-lg font-bold text-emerald-400 uppercase tracking-wider font-mono mt-8 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {title}
          </h2>
        );
      }
      // Bullet items
      if (line.startsWith('- ')) {
        const content = line.replace('- ', '');
        return (
          <li key={idx} className="text-sm text-slate-200 leading-relaxed ml-4 list-disc marker:text-emerald-500 my-1.5">
            {renderInlineCitations(content)}
          </li>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Paragraphs
      return (
        <p key={idx} className="text-sm text-slate-200 leading-relaxed my-2">
          {renderInlineCitations(line)}
        </p>
      );
    });
  };

  // Helper to replace [S1], [S2] with interactive citation buttons
  const renderInlineCitations = (text: string) => {
    const parts = text.split(/(\[S\d+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(S\d+)\]/);
      if (match) {
        const sourceId = match[1];
        return (
          <button
            key={i}
            onClick={() => onSelectCitation(sourceId)}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-400 hover:text-slate-950 transition cursor-pointer align-baseline"
            title={`Click to inspect document [${sourceId}]`}
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/30">
              NSE: {brief.ticker}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Word Count: {brief.wordCount} words (Target: 450–650)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Institutional Research Brief
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Brief'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Markdown (.md)</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Print or Export PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={onRegenerate}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Execution Performance & Real Cost Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0a1020] border border-slate-800 text-xs font-mono">
        <div>
          <span className="text-slate-500 block">Latency:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            {(brief.latencyMs / 1000).toFixed(2)}s
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Token Usage:</span>
          <span className="text-slate-200 font-bold mt-0.5 block">
            {brief.inputTokens.toLocaleString()} in / {brief.outputTokens.toLocaleString()} out
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Financial Cost:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <DollarSign className="w-3.5 h-3.5" />
            ${brief.estimatedCostUsd.toFixed(5)} (~₹{brief.estimatedCostInr.toFixed(3)})
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Engine & Model:</span>
          <span className="text-slate-200 truncate block mt-0.5">
            {brief.modelUsed}
          </span>
        </div>
      </div>

      {/* Citation Quality Summary Card */}
      {citationAudit && (
        <div className="p-5 rounded-2xl bg-[#080d19] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Post-Generation Citation & Factual Audit
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Quality Score:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {citationAudit.summary.overallQualityScore}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Verified Citations:</span>
              <span className="font-mono text-emerald-400 font-bold mt-0.5 block">
                {citationAudit.summary.verifiedCount} / {citationAudit.summary.totalCitations}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Revenue Conflict:</span>
              <span className="font-mono text-emerald-400 font-bold mt-0.5 block">
                {citationAudit.summary.unresolvedDiscrepanciesReported ? 'SURFACED & SITED' : 'MISSED'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Entity Conflation:</span>
              <span className="font-mono text-emerald-400 font-bold mt-0.5 block">
                {citationAudit.summary.entityConflationPrevented ? 'PREVENTED' : 'CONFLATED'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Prompt Injection:</span>
              <span className="font-mono text-emerald-400 font-bold mt-0.5 block">
                {citationAudit.summary.injectionNeutralized ? 'NEUTRALIZED' : 'EXPOSED'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Research Document Container */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#090f1e] border border-slate-800 shadow-2xl space-y-4">
        {renderFormattedMarkdown(brief.fullMarkdown)}
      </div>
    </div>
  );
};
