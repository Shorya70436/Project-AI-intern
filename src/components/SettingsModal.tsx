import React from 'react';
import { X, Settings, ShieldCheck, Cpu, Key, HelpCircle, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  hasApiKey: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  setSelectedModel,
  hasApiKey,
}) => {
  if (!isOpen) return null;

  const models = [
    {
      id: 'gemini-3.8-flash',
      name: 'Gemini 3.8 Flash (Default / High Throughput)',
      latency: '~3.2s',
      inputCost: '$0.10 / 1M',
      outputCost: '$0.30 / 1M',
      description: 'Ideal for financial extraction, document auditing, and prompt injection defense.',
    },
    {
      id: 'gemini-3.1-pro-preview',
      name: 'Gemini 3.1 Pro (Deep Complex Reasoning)',
      latency: '~8.5s',
      inputCost: '$1.25 / 1M',
      outputCost: '$5.00 / 1M',
      description: 'Maximum depth for complex multi-entity corporate restructuring filings.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0a1020] border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Model Configuration & Secrets</h3>
            <p className="text-xs text-slate-400">Server-side execution parameters</p>
          </div>
        </div>

        {/* Security / Secret Status */}
        <div className="p-4 rounded-xl bg-[#080d19] border border-slate-800 mb-5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-500" /> GEMINI_API_KEY:
            </span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                hasApiKey
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : 'bg-blue-950/80 text-blue-300 border border-blue-500/30'
              }`}
            >
              {hasApiKey ? 'Configured (Server-Side Secret)' : 'AI Studio Standard Runtime'}
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            API keys are securely handled on the Express backend via <code>process.env.GEMINI_API_KEY</code> and never exposed to browser client bundles. If an external key is absent, the agent automatically runs the deterministic verification engine with full audit trails.
          </p>
        </div>

        {/* Model Selector */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
            Active Gemini Foundation Model
          </label>
          <div className="space-y-2.5">
            {models.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                  selectedModel === m.id
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                    : 'bg-[#080d19] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    {m.name}
                    {selectedModel === m.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">{m.latency}</span>
                </div>
                <p className="text-xs text-slate-400">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
