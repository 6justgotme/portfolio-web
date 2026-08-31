import React, { useState } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

export const EvolutionBenchDemo: React.FC = () => {
  const [engine, setEngine] = useState<'go' | 'node'>('go');
  const [isSimulating, setIsSimulating] = useState(false);
  const [concurrencyTarget, setConcurrencyTarget] = useState(500);

  const engineStats = {
    go: {
      name: 'Evolution Go (whatsmeow)',
      avgMemoryPerInstance: '22 MB',
      totalMemory: `${((concurrencyTarget * 22) / 1024).toFixed(1)} GB`,
      latencyP99: '4.2 ms',
      reconnectTime: '< 180 ms',
      throughput: '12.800 msg/s'
    },
    node: {
      name: 'Node.js / Baileys',
      avgMemoryPerInstance: '280 MB',
      totalMemory: `${((concurrencyTarget * 280) / 1024).toFixed(1)} GB`,
      latencyP99: '68.0 ms',
      reconnectTime: '~ 4.200 ms',
      throughput: '1.450 msg/s'
    }
  };

  const current = engineStats[engine];

  const handleRunLoadTest = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 500);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              Evolution Go &middot; Benchmark de Concorrência
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Comparativo de pegada de memória em Go compilado (whatsmeow) vs. runtime Node.js.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          ECONOMIA 92% RAM
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Controles */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-black/40 p-4 rounded-xl border border-white/[0.04] space-y-3">
            <label className="text-[11px] uppercase font-mono-tech text-white/40 block">
              Engine de Transporte
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setEngine('go')}
                className={`py-2 px-3 rounded-lg text-xs font-mono-tech border text-center transition-all cursor-pointer ${
                  engine === 'go'
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white'
                }`}
              >
                Go (whatsmeow)
              </button>
              <button
                onClick={() => setEngine('node')}
                className={`py-2 px-3 rounded-lg text-xs font-mono-tech border text-center transition-all cursor-pointer ${
                  engine === 'node'
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white'
                }`}
              >
                Node / Baileys
              </button>
            </div>

            <div className="pt-2 border-t border-white/[0.04]">
              <div className="flex justify-between items-center text-xs mb-1.5 font-mono-tech">
                <span className="text-white/50 text-[11px]">Sessões WhatsApp:</span>
                <span className="text-white font-medium">{concurrencyTarget} instâncias</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={concurrencyTarget}
                onChange={(e) => setConcurrencyTarget(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            <button
              onClick={handleRunLoadTest}
              disabled={isSimulating}
              className="w-full py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 fill-black" />}
              <span>Injetar Carga Concorrente</span>
            </button>
          </div>
        </div>

        {/* Métricas */}
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono-tech">
            <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04]">
              <span className="text-[9px] uppercase text-white/30 block">Memória Total</span>
              <span className="text-sm font-medium text-white mt-0.5 block">{current.totalMemory}</span>
              <span className="text-[9px] text-white/40">{current.avgMemoryPerInstance}/inst</span>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04]">
              <span className="text-[9px] uppercase text-white/30 block">Vazão</span>
              <span className="text-sm font-medium text-white mt-0.5 block">{current.throughput}</span>
              <span className="text-[9px] text-white/40">Throughput</span>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04]">
              <span className="text-[9px] uppercase text-white/30 block">Latência P99</span>
              <span className="text-sm font-medium text-white mt-0.5 block">{current.latencyP99}</span>
              <span className="text-[9px] text-white/40">Callback</span>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04]">
              <span className="text-[9px] uppercase text-white/30 block">Reconexão</span>
              <span className="text-sm font-medium text-white mt-0.5 block">{current.reconnectTime}</span>
              <span className="text-[9px] text-white/40">Auto-Healing</span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/[0.04] rounded-xl p-3.5 space-y-2 font-mono-tech text-xs">
            <div className="flex justify-between text-white/50 text-[11px]">
              <span>Consumo Relativo de Memória ({concurrencyTarget} instâncias)</span>
              <span>{engine === 'go' ? 'Alta Eficiência' : 'Risco de OOM'}</span>
            </div>

            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${engine === 'go' ? 'bg-white' : 'bg-rose-400'}`}
                style={{ width: `${engine === 'go' ? Math.max(8, (concurrencyTarget / 2000) * 15) : Math.max(25, (concurrencyTarget / 2000) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
