import React, { useState } from 'react';
import { Database, Filter, Search, Tag, Quote, ShieldCheck, HelpCircle } from 'lucide-react';
import { EvidenceRecord, ClaimCategory } from '../types/research';

interface EvidenceViewProps {
  evidence: EvidenceRecord[];
  onSelectSource: (sourceId: string) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ evidence, onSelectSource }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Evidence' },
    { id: 'financial_result', label: 'Financial Results' },
    { id: 'management_guidance', label: 'Management Guidance' },
    { id: 'risk', label: 'Risks & Headwinds' },
    { id: 'ownership', label: 'Ownership & Pledges' },
    { id: 'legal_disclosure', label: 'Legal Disclosures' },
    { id: 'third_party_opinion', label: 'Third-Party Reports' },
  ];

  const filteredEvidence = evidence.filter((e) => {
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      e.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.quotation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sourceId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryBadge = (cat: ClaimCategory) => {
    switch (cat) {
      case 'financial_result':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
      case 'management_guidance':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/30';
      case 'risk':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/30';
      case 'ownership':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/30';
      case 'legal_disclosure':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/30';
      case 'third_party_opinion':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/30">
            STAGE 2: STRUCTURED EXTRACTION
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Granular Claims & Verbatim Passages
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Structured Evidence Records ({evidence.length} Claims)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Every assertion is extracted into an atomic claim with entity tagging, units, reporting periods, verbatim quotations, and confidence scores before report synthesis.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === c.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claims or quotes..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#060a14] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="space-y-3">
        {filteredEvidence.map((e) => (
          <div
            key={e.id}
            className="p-5 rounded-2xl bg-[#0a1020] border border-slate-800 hover:border-slate-700 transition space-y-3"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  {e.id}
                </span>
                <button
                  onClick={() => onSelectSource(e.sourceId)}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-400 hover:text-slate-950 transition font-bold"
                >
                  [{e.sourceId}]
                </button>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getCategoryBadge(
                    e.category
                  )}`}
                >
                  {e.category.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                {e.period && <span>Period: <strong className="text-slate-200">{e.period}</strong></span>}
                <span className="text-slate-600">•</span>
                <span className="capitalize text-emerald-400 font-semibold">
                  {e.confidence} Confidence
                </span>
              </div>
            </div>

            {/* Claim Statement */}
            <div className="text-sm font-semibold text-slate-100 leading-snug">
              {e.claim}
            </div>

            {/* Metrics Chips if any */}
            {(e.metric || e.value) && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {e.metric && (
                  <span className="px-2 py-1 rounded bg-[#060a14] border border-slate-800 text-slate-300">
                    Metric: <strong className="text-white">{e.metric}</strong>
                  </span>
                )}
                {e.value !== undefined && (
                  <span className="px-2 py-1 rounded bg-[#060a14] border border-slate-800 text-emerald-400 font-bold">
                    Value: {e.currency ? `${e.currency} ` : ''}{e.value} {e.unit || ''}
                  </span>
                )}
                {e.companyMentioned && (
                  <span className="px-2 py-1 rounded bg-[#060a14] border border-slate-800 text-slate-400 truncate max-w-xs">
                    Entity: {e.companyMentioned}
                  </span>
                )}
              </div>
            )}

            {/* Verbatim Supporting Quote */}
            <div className="p-3 rounded-xl bg-[#060a14] border border-slate-800/80 text-xs text-slate-400 leading-relaxed font-mono flex items-start gap-2">
              <Quote className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <span className="italic select-text">"{e.quotation}"</span>
            </div>

            {/* Limitations / Caveat if any */}
            {e.limitations && (
              <div className="text-[11px] text-amber-300/90 font-mono bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                ⚠️ Caveat / Limitation: {e.limitations}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
