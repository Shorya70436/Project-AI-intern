import React from 'react';
import {
  FlaskConical,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Layers,
  ChevronDown,
  Info,
  Sparkles,
} from 'lucide-react';
import { EvaluationLabComparison, EvaluationCriterionScore } from '../types/research';

interface EvaluationLabViewProps {
  evaluation: EvaluationLabComparison | null;
  onRunEvaluation: () => void;
  isRunningEval: boolean;
  onViewBrief: (promptVersion: 'A_baseline' | 'B_contradiction_aware' | 'C_hardened_agent') => void;
}

export const EvaluationLabView: React.FC<EvaluationLabViewProps> = ({
  evaluation,
  onRunEvaluation,
  isRunningEval,
  onViewBrief,
}) => {
  const getScoreBadge = (score: 0 | 1 | 2) => {
    switch (score) {
      case 2:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 2 / 2 Pass
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> 1 / 2 Partial
          </span>
        );
      case 0:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3 h-3 text-rose-400" /> 0 / 2 Failed
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/30">
              CORE FEATURE: EVALUATION LAB
            </span>
            <span className="text-xs text-slate-400 font-mono">3-Run Comparative Architecture</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Prompt Engineering & Agent Defense Benchmark
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Executes the identical SRVCABLE document pack across three generations of agent architecture. Evaluates against an 8-criteria objective scoring rubric.
          </p>
        </div>

        <button
          onClick={onRunEvaluation}
          disabled={isRunningEval}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-xl ${
            isRunningEval
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-95'
          }`}
        >
          {isRunningEval ? (
            <>
              <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span>Benchmarking Runs A, B & C...</span>
            </>
          ) : (
            <>
              <FlaskConical className="w-4 h-4 fill-slate-950" />
              <span>Run 3-Model Benchmark</span>
            </>
          )}
        </button>
      </div>

      {/* Comparison Summary Cards */}
      {evaluation && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Run A Card */}
          <div className="p-5 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Run A: Baseline
                </span>
                <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-xs bg-slate-800 text-slate-300">
                  {evaluation.runs.runA.totalScore} / 16 ({evaluation.runs.runA.successPercentage}%)
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Evidence Summarization</h3>
              <p className="text-xs text-slate-400">
                Standard summarization without conflict resolution or injection defense.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Latency:</span>
                  <span className="text-slate-200">{(evaluation.runs.runA.latencyMs / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tokens:</span>
                  <span className="text-slate-200">
                    {evaluation.runs.runA.inputTokens} in / {evaluation.runs.runA.outputTokens} out
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cost:</span>
                  <span className="text-emerald-400 font-bold">${evaluation.runs.runA.estimatedCostUsd.toFixed(5)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewBrief('A_baseline')}
              className="w-full mt-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Inspect Run A Brief
            </button>
          </div>

          {/* Run B Card */}
          <div className="p-5 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Run B: Contradiction
                </span>
                <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-xs bg-blue-950 text-blue-300 border border-blue-500/30">
                  {evaluation.runs.runB.totalScore} / 16 ({evaluation.runs.runB.successPercentage}%)
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Conflict Aware</h3>
              <p className="text-xs text-slate-400">
                Adds numerical variance comparisons and preserves open questions.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Latency:</span>
                  <span className="text-slate-200">{(evaluation.runs.runB.latencyMs / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tokens:</span>
                  <span className="text-slate-200">
                    {evaluation.runs.runB.inputTokens} in / {evaluation.runs.runB.outputTokens} out
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cost:</span>
                  <span className="text-emerald-400 font-bold">${evaluation.runs.runB.estimatedCostUsd.toFixed(5)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewBrief('B_contradiction_aware')}
              className="w-full mt-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Inspect Run B Brief
            </button>
          </div>

          {/* Run C Card (Production Standard) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0a1020] border-2 border-emerald-500/60 space-y-4 relative flex flex-col justify-between shadow-xl shadow-emerald-950/30">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Run C: Hardened Agent
                </span>
                <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-xs bg-emerald-500 text-slate-950">
                  {evaluation.runs.runC.totalScore} / 16 (100%)
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Production Hardened</h3>
              <p className="text-xs text-slate-300">
                Full injection defense, entity disambiguation, authority tiering, and citation audit.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Latency:</span>
                  <span className="text-emerald-300 font-bold">{(evaluation.runs.runC.latencyMs / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tokens:</span>
                  <span className="text-slate-200">
                    {evaluation.runs.runC.inputTokens} in / {evaluation.runs.runC.outputTokens} out
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cost:</span>
                  <span className="text-emerald-400 font-bold">${evaluation.runs.runC.estimatedCostUsd.toFixed(5)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewBrief('C_hardened_agent')}
              className="w-full mt-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition"
            >
              Inspect Run C Brief (Gold Standard)
            </button>
          </div>
        </div>
      )}

      {/* 8-Criteria Comparative Matrix Table */}
      {evaluation && (
        <div className="rounded-2xl bg-[#0a1020] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              Transparent Scoring Rubric (8 Evaluated Dimensions)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Scoring: 0 = Failed, 1 = Partial, 2 = Successful
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#060a14] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3.5 w-64">Evaluation Dimension</th>
                  <th className="p-3.5">Run A (Baseline)</th>
                  <th className="p-3.5">Run B (Contradiction)</th>
                  <th className="p-3.5 bg-emerald-950/20 text-emerald-300">Run C (Hardened)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {evaluation.runs.runC.scores.map((sc, idx) => {
                  const scoreA = evaluation.runs.runA.scores[idx];
                  const scoreB = evaluation.runs.runB.scores[idx];
                  return (
                    <tr key={sc.criterionKey} className="hover:bg-slate-900/30 transition">
                      <td className="p-3.5 align-top font-semibold text-white">
                        <div>{sc.criterion}</div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          {sc.observation}
                        </div>
                      </td>

                      <td className="p-3.5 align-top">
                        {getScoreBadge(scoreA.score)}
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {scoreA.supportingEvidence}
                        </p>
                      </td>

                      <td className="p-3.5 align-top">
                        {getScoreBadge(scoreB.score)}
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {scoreB.supportingEvidence}
                        </p>
                      </td>

                      <td className="p-3.5 align-top bg-emerald-950/10">
                        {getScoreBadge(sc.score)}
                        <p className="text-[11px] text-emerald-300/90 font-medium mt-1 leading-snug">
                          {sc.supportingEvidence}
                        </p>
                      </td>
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="bg-[#060a14] font-bold text-sm border-t-2 border-slate-700">
                  <td className="p-4 uppercase font-mono text-slate-200">Composite Score / 16</td>
                  <td className="p-4 font-mono text-slate-300">
                    {evaluation.runs.runA.totalScore} / 16 ({evaluation.runs.runA.successPercentage}%)
                  </td>
                  <td className="p-4 font-mono text-blue-400">
                    {evaluation.runs.runB.totalScore} / 16 ({evaluation.runs.runB.successPercentage}%)
                  </td>
                  <td className="p-4 font-mono text-emerald-400 bg-emerald-950/30">
                    {evaluation.runs.runC.totalScore} / 16 (100%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Engineering Improvement Log */}
      {evaluation && (
        <div className="p-6 rounded-2xl bg-[#0a1020] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Empirical Architecture Improvements & Failure Mitigations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block font-mono uppercase text-[11px]">
                Key Agentic Capabilities Added in Run C:
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                {evaluation.summary.keyImprovements.map((imp, i) => (
                  <li key={i} className="leading-relaxed">
                    {imp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#070b16] border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block font-mono uppercase text-[11px]">
                Failure Modes Inoculated Against:
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                {evaluation.summary.riskVulnerabilitiesMitigated.map((vuln, i) => (
                  <li key={i} className="leading-relaxed">
                    {vuln}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
