import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Shield,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  Eye,
  Trash2,
  Info,
  Clock,
  DollarSign,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { DocumentMetadata, AuthorityTier } from '../types/research';

interface WorkspaceViewProps {
  ticker: string;
  setTicker: (ticker: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  documents: DocumentMetadata[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentMetadata[]>>;
  onLoadSamplePack: () => void;
  onRunResearch: () => void;
  isRunning: boolean;
  currentStage: string;
  promptVersion: 'A_baseline' | 'B_contradiction_aware' | 'C_hardened_agent';
  setPromptVersion: (v: 'A_baseline' | 'B_contradiction_aware' | 'C_hardened_agent') => void;
  onInspectDocument: (doc: DocumentMetadata) => void;
  researchMode: 'strict_pack' | 'live_grounding';
  setResearchMode: (mode: 'strict_pack' | 'live_grounding') => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  ticker,
  setTicker,
  companyName,
  setCompanyName,
  documents,
  setDocuments,
  onLoadSamplePack,
  onRunResearch,
  isRunning,
  currentStage,
  promptVersion,
  setPromptVersion,
  onInspectDocument,
  researchMode,
  setResearchMode,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const newId = `S${documents.length + index + 1}`;
        const newDoc: DocumentMetadata = {
          id: newId,
          filename: file.name,
          sourceName: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
          sourceType: file.name.toLowerCase().includes('filing') ? 'official_filing' : 'financial_news',
          authorityTier: file.name.toLowerCase().includes('official') ? 1 : 3,
          publicationDate: new Date().toISOString().split('T')[0],
          reportingPeriod: 'Q1 FY27',
          content,
          characterCount: content.length,
        };
        setDocuments((prev) => [...prev, newDoc]);
      };
      reader.readAsText(file);
    });
  };

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const getTierBadge = (tier: AuthorityTier) => {
    switch (tier) {
      case 1:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            Tier 1: Official
          </span>
        );
      case 2:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30">
            Tier 2: Transcripts
          </span>
        );
      case 3:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30">
            Tier 3: Press
          </span>
        );
      case 4:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/30">
            Tier 4: Promotional
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/30">
              STAGE 1: DOCUMENT INGESTION
            </span>
            <span className="text-xs text-slate-400 font-mono">Date: 23 September 2026</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Research Workspace & Evidence Pack
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ingest corporate disclosures, transcripts, news articles, and filings. All sources are assigned stable IDs and audited for authority and contradictions.
          </p>
        </div>

        {/* 1-Click Load SRVCABLE Test Pack Action */}
        <button
          onClick={onLoadSamplePack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          Load SRVCABLE Research Pack (8 Docs)
        </button>
      </div>

      {/* Target Company Metadata Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0a1020] border border-slate-800">
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
            NSE Stock Ticker Symbol
          </label>
          <div className="relative">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. SRVCABLE"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-400 uppercase"
            />
            <span className="absolute right-3 top-3 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              NSE / BSE
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
            Full Registered Legal Corporate Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. SRV Cables & Telecommunications Limited"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Mode & Prompt Version Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Research Mode Selection */}
        <div className="p-4 rounded-xl bg-[#0a1020] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Research Pipeline Mode
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Strict Grounding</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setResearchMode('strict_pack')}
              className={`p-3 rounded-xl text-left border transition text-xs ${
                researchMode === 'strict_pack'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> Strict Pack (Standard)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero outside hallucinations. Uses only supplied document evidence.
              </p>
            </button>

            <button
              onClick={() => setResearchMode('live_grounding')}
              className={`p-3 rounded-xl text-left border transition text-xs ${
                researchMode === 'live_grounding'
                  ? 'bg-blue-950/40 border-blue-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-blue-400">
                <Sparkles className="w-3.5 h-3.5" /> Live Grounding
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Strict pack with distinct labeling for external search validation.
              </p>
            </button>
          </div>
        </div>

        {/* Prompt & Agent Version Selector */}
        <div className="p-4 rounded-xl bg-[#0a1020] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Agent Engineering Profile
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Version Control</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPromptVersion('A_baseline')}
              className={`p-2.5 rounded-xl text-left border transition text-xs ${
                promptVersion === 'A_baseline'
                  ? 'bg-slate-800 border-slate-600 text-white font-semibold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold">Run A</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Baseline Summary</div>
            </button>

            <button
              onClick={() => setPromptVersion('B_contradiction_aware')}
              className={`p-2.5 rounded-xl text-left border transition text-xs ${
                promptVersion === 'B_contradiction_aware'
                  ? 'bg-slate-800 border-slate-600 text-white font-semibold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold">Run B</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Contradiction-Aware</div>
            </button>

            <button
              onClick={() => setPromptVersion('C_hardened_agent')}
              className={`p-2.5 rounded-xl text-left border transition text-xs ${
                promptVersion === 'C_hardened_agent'
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-white font-semibold shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                Run C <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">REC</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hardened Agent</div>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            Array.from(files).forEach((file, index) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                const content = event.target?.result as string;
                const newDoc: DocumentMetadata = {
                  id: `S${documents.length + index + 1}`,
                  filename: file.name,
                  sourceName: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
                  sourceType: 'financial_news',
                  authorityTier: 3,
                  publicationDate: new Date().toISOString().split('T')[0],
                  content,
                  characterCount: content.length,
                };
                setDocuments((prev) => [...prev, newDoc]);
              };
              reader.readAsText(file);
            });
          }
        }}
        className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition ${
          dragOver
            ? 'border-emerald-400 bg-emerald-950/20'
            : 'border-slate-800 hover:border-slate-700 bg-[#070b16]'
        }`}
      >
        <Upload className="w-8 h-8 text-slate-500 mb-2" />
        <p className="text-xs font-semibold text-slate-200">
          Drag and drop research documents, or{' '}
          <label className="text-emerald-400 hover:text-emerald-300 cursor-pointer underline">
            browse files
            <input
              type="file"
              multiple
              accept=".txt,.md,.csv,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">
          Supported: Markdown (.md), Plain Text (.txt), CSV, Exchange Filings
        </p>
      </div>

      {/* Document Ingestion Table */}
      <div className="rounded-2xl bg-[#0a1020] border border-slate-800 overflow-hidden">
        <div className="p-4 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Ingested Document Repository ({documents.length} Files)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Total Content: {documents.reduce((acc, d) => acc + d.characterCount, 0).toLocaleString()} chars
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No research documents uploaded. Click "Load SRVCABLE Research Pack" above to load the 8 test documents.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#060a14] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3 w-16">ID</th>
                  <th className="p-3">Source Name & Filename</th>
                  <th className="p-3">Authority Tier</th>
                  <th className="p-3">Pub Date</th>
                  <th className="p-3">Period</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-emerald-400">
                      [{doc.id}]
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-semibold text-slate-100 truncate">{doc.sourceName}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{doc.filename}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {getTierBadge(doc.authorityTier)}
                    </td>
                    <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                      {doc.publicationDate}
                    </td>
                    <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                      {doc.reportingPeriod || '—'}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onInspectDocument(doc)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="Inspect Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeDoc(doc.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition"
                          title="Remove Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Primary Action Button & Multi-Stage Runner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e172e] to-[#070b16] border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Ready to Synthesize Investment Brief
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Executes multi-stage pipeline: extraction, contradiction checks, injection neutralization, and citation verification.
          </p>
        </div>

        <button
          onClick={onRunResearch}
          disabled={isRunning || documents.length === 0}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-xl ${
            isRunning
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-95'
          }`}
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span>{currentStage || 'Processing Pipeline...'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Run Research Agent</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
