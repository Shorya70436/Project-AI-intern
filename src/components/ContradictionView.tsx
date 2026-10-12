import React from 'react';
import { GitCompare, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, Layers, FileText, Building2 } from 'lucide-react';
import { ContradictionRecord, EntityResolutionRecord, InjectionDefenseRecord } from '../types/research';

interface ContradictionViewProps {
  contradictions: ContradictionRecord[];
  entities: EntityResolutionRecord[];
  injections: InjectionDefenseRecord[];
}

export const ContradictionView: React.FC<ContradictionViewProps> = ({
  contradictions,
  entities,
  injections,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/30">
            STAGE 4 & 5 AUDIT
          </span>
          <span className="text-xs text-slate-400 font-mono">Automated Conflict Resolution Engine</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Numerical Contradictions, Entity Disambiguation & Injection Defense
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Surfaces cross-document discrepancies, resolves temporal reporting periods, isolates separate corporate entities, and neutralizes prompt-injection payloads.
        </p>
      </div>

      {/* Numerical Discrepancies Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
            Numerical & Temporal Discrepancy Matrix ({contradictions.length} Identified)
          </h3>
        </div>

        <div className="space-y-4">
          {contradictions.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                    {c.id}
                  </span>
                  <h4 className="text-sm font-bold text-white">{c.metric}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">{c.reportingPeriod}</span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      c.status === 'unresolved'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        : c.status === 'reconciled'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Claim A */}
                <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">[{c.claimA.sourceId}] {c.claimA.sourceName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">
                      Tier {c.claimA.authorityTier}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{c.claimA.value}</div>
                </div>

                {/* Claim B */}
                <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">[{c.claimB.sourceId}] {c.claimB.sourceName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">
                      Tier {c.claimB.authorityTier}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{c.claimB.value}</div>
                </div>
              </div>

              {/* Resolution Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block font-semibold mb-0.5">
                    Analytical Reasoning & Evidence Hierarchy:
                  </strong>
                  {c.resolutionExplanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entity Resolution Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
            Corporate Entity Disambiguation ({entities.length} Analyzed)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entities.map((ent) => (
            <div
              key={ent.id}
              className="p-5 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Source [{ent.documentSourceId}]
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    ent.isTargetCompany
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {ent.isTargetCompany ? 'TARGET ISSUER' : 'UNRELATED THIRD-PARTY'}
                </span>
              </div>

              <div className="text-xs">
                <span className="text-slate-500 block">Entity Referenced:</span>
                <span className="text-sm font-bold text-white">{ent.entityMentioned}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed bg-[#060a14] p-3 rounded-xl border border-slate-800">
                {ent.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Injection Defense Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
            Prompt-Injection Defense Logs ({injections.length} Neutralized)
          </h3>
        </div>

        {injections.map((inj) => (
          <div
            key={inj.id}
            className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                  [{inj.sourceId}]
                </span>
                <span className="text-xs font-bold text-rose-200">
                  SYSTEM OVERRIDE PAYLOAD DETECTED
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 font-bold uppercase">
                {inj.actionTaken.replace(/_/g, ' ')}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                Detected Embedded Malicious Instruction:
              </span>
              <pre className="text-xs font-mono text-rose-300 bg-[#060a14] p-3 rounded-xl border border-rose-900/50 overflow-x-auto whitespace-pre-wrap">
                {inj.detectedPayload}
              </pre>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Agent Action: </strong>
              {inj.manipulativeIntent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
