import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Flame, BarChart2 } from 'lucide-react';

interface MetricPoint {
  time: string;
  p99: number;
  msgsPerSec: number;
  openIncidents: number;
}

export const ObservabilityDemo: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<MetricPoint[]>([
    { time: '14:00', p99: 42, msgsPerSec: 180, openIncidents: 0 },
    { time: '14:05', p99: 45, msgsPerSec: 220, openIncidents: 0 },
    { time: '14:10', p99: 58, msgsPerSec: 340, openIncidents: 1 },
    { time: '14:15', p99: 142, msgsPerSec: 580, openIncidents: 2 },
    { time: '14:20', p99: 48, msgsPerSec: 290, openIncidents: 0 }
  ]);

  const [activeAlert, setActiveAlert] = useState<boolean>(true);
  const [incidentResolved, setIncidentResolved] = useState<boolean>(false);
  const [monitoredGroups] = useState(482);
  const [totalEventsToday] = useState('184.2k');

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const newP99 = Math.floor(Math.random() * 30) + 35;
        const newMsgs = Math.floor(Math.random() * 150) + 200;
        const newPoint: MetricPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          p99: newP99,
          msgsPerSec: newMsgs,
          openIncidents: activeAlert && !incidentResolved ? 1 : 0
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [activeAlert, incidentResolved]);

  const handleResolveIncident = () => {
    setIncidentResolved(true);
    setTimeout(() => {
      setIncidentResolved(false);
      setActiveAlert(false);
    }, 4000);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80 space-y-5">
      {/* Header com Status Prometheus / OpenTelemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              Bravo Sentinel &middot; Prometheus & Grafana Telemetry Hub
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Monitoramento semântico contínuo em 480+ grupos corporativos com triagem de sentimento e SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono-tech text-[10px]">
          <span className="bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/60">
            PROMETHEUS SCRAPE: 15s
          </span>
          <span className="bg-emerald-950/40 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
            SLA: 99.4%
          </span>
        </div>
      </div>

      {/* 4 Cards de Telemetria em Tempo Real */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04] font-mono-tech">
          <span className="text-[9px] uppercase text-white/30 block">Grupos Vigiados</span>
          <span className="text-xl font-medium text-white mt-0.5 block">{monitoredGroups}</span>
          <span className="text-[9px] text-emerald-400">100% Online</span>
        </div>

        <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04] font-mono-tech">
          <span className="text-[9px] uppercase text-white/30 block">Throughput Diário</span>
          <span className="text-xl font-medium text-white mt-0.5 block">{totalEventsToday}</span>
          <span className="text-[9px] text-white/40">mensagens</span>
        </div>

        <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04] font-mono-tech">
          <span className="text-[9px] uppercase text-white/30 block">Latência P99 Triagem</span>
          <span className="text-xl font-medium text-cyan-300 mt-0.5 block">
            {dataPoints[dataPoints.length - 1]?.p99}ms
          </span>
          <span className="text-[9px] text-white/40">OpenRouter LLM</span>
        </div>

        <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04] font-mono-tech">
          <span className="text-[9px] uppercase text-white/30 block">Chamados Críticos</span>
          <span className={`text-xl font-medium mt-0.5 block ${activeAlert && !incidentResolved ? 'text-rose-400' : 'text-emerald-400'}`}>
            {activeAlert && !incidentResolved ? '1 ALERTA' : '0 PENDENTE'}
          </span>
          <span className="text-[9px] text-white/40">SLA &lt; 5 min</span>
        </div>
      </div>

      {/* Visual Telemetry Chart & Incident Escalation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Painel Gráfico de Latência e Vazão */}
        <div className="md:col-span-7 bg-[#05060A] border border-white/[0.06] rounded-xl p-4 space-y-3 font-mono-tech">
          <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/[0.04] pb-2">
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              GRAFANA HISTOGRAM &middot; P99 LATENCY DYNAMICS
            </span>
            <span>LAST 5 SLICES</span>
          </div>

          <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
            {dataPoints.map((pt, idx) => {
              const heightPercent = Math.min(100, (pt.p99 / 160) * 100);
              const isSpike = pt.p99 > 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[9px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    {pt.p99}ms
                  </span>
                  <div className="w-full bg-white/[0.03] rounded-t-md h-24 flex items-end p-0.5 overflow-hidden">
                    <div
                      className={`w-full rounded-t transition-all duration-500 ${
                        isSpike
                          ? 'bg-gradient-to-t from-rose-600 to-rose-400'
                          : 'bg-gradient-to-t from-cyan-600 to-indigo-400'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-white/40">{pt.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incidente em Tempo Real & Roteamento para Equipe */}
        <div className="md:col-span-5 bg-black/40 border border-white/[0.04] rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/40 border-b border-white/[0.04] pb-2">
            <span>LIVE INCIDENT DISPATCH</span>
            <span className="text-rose-400 flex items-center gap-1">
              <Flame className="w-3 h-3" /> CRITICAL
            </span>
          </div>

          {activeAlert && !incidentResolved ? (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-1">
                <div className="flex items-center justify-between font-mono-tech text-[10px]">
                  <span className="text-rose-300 font-semibold">[GRUPO #214 - E-COMMERCE X]</span>
                  <span className="text-white/40">SLA: 03:12 restante</span>
                </div>
                <p className="text-white/80 font-light text-[11px]">
                  "Cliente reportou que o anúncio do Meta Ads está pausado há 2 horas."
                </p>
                <div className="text-[9px] font-mono-tech text-white/40 pt-1 border-t border-rose-500/20 flex justify-between">
                  <span>Sentimento: 1.2/5.0</span>
                  <span>Roteado para: Gestor de Tráfego</span>
                </div>
              </div>

              <button
                onClick={handleResolveIncident}
                className="w-full py-2 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Assumir & Responder no WhatsApp</span>
              </button>
            </div>
          ) : (
            <div className="py-6 text-center space-y-1.5 text-xs text-white/40">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="font-medium text-white/80">Nenhum incidente crítico pendente</p>
              <p className="text-[10px] font-mono-tech">Todos os 482 grupos dentro do SLA de atendimento.</p>
            </div>
          )}

          <div className="text-[10px] font-mono-tech text-white/30 pt-2 border-t border-white/[0.04] flex justify-between">
            <span>Webhook: Evolution API</span>
            <span>Triagem: GPT-4o-mini</span>
          </div>
        </div>
      </div>
    </div>
  );
};
