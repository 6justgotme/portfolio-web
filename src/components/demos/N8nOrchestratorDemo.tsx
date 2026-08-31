import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bot, Zap, Database, UserCheck } from 'lucide-react';

interface WorkflowNode {
  id: string;
  name: string;
  sub: string;
  type: 'cron' | 'buffer' | 'agent' | 'retention' | 'handoff';
  status: 'idle' | 'running' | 'success' | 'paused';
  metrics: string;
}

export const N8nOrchestratorDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[WF-01] Cron engatilhado: Lote de 50 contatos com jitter de 24s ativado.',
    '[WF-01] Lead +55 11 98841-XXXX enriquecido via banco de dados.',
    '[WF-02] Mensagem recebida: "Oi, como funciona o serviço de vocês?"',
    '[WF-02] Buffer Redis iniciado: Aguardando 8s de janela de debounce...'
  ]);

  const nodes: WorkflowNode[] = [
    {
      id: 'wf1',
      name: 'WF-01: Disparo & Jitter',
      sub: 'n8n Cron + Redis Queue',
      type: 'cron',
      status: activeStep === 0 ? 'running' : activeStep > 0 ? 'success' : 'idle',
      metrics: 'Delay: 18s • Jitter Anti-Ban'
    },
    {
      id: 'wf2',
      name: 'WF-02: Buffer & Debounce',
      sub: 'Redis Hash (8s Sliding Window)',
      type: 'buffer',
      status: activeStep === 1 ? 'running' : activeStep > 1 ? 'success' : 'idle',
      metrics: 'Locks Atômicos • Zero Corrida'
    },
    {
      id: 'wf3',
      name: 'WF-03: Agente Core (LLM)',
      sub: 'Claude 3.5 Sonnet + Custom JS Tools',
      type: 'agent',
      status: activeStep === 2 ? 'running' : activeStep > 2 ? 'success' : 'idle',
      metrics: 'Tool Calling • RAG 0.94 Match'
    },
    {
      id: 'wf4',
      name: 'WF-04: Cadência de Retomada',
      sub: 'Cron 48h + Reengajamento',
      type: 'retention',
      status: activeStep === 3 ? 'running' : activeStep > 3 ? 'success' : 'idle',
      metrics: 'Reativação: +28.4% Conversão'
    },
    {
      id: 'wf5',
      name: 'WF-05: Handoff Humano',
      sub: 'Resumo Executivo para SDR',
      type: 'handoff',
      status: activeStep === 4 ? 'running' : activeStep > 4 ? 'success' : 'idle',
      metrics: 'Transferência SLA < 15s'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 5;
        const newLogs = [
          `[${nodes[next].name.split(':')[0]}] Executando nó: ${nodes[next].name}`,
          `[${nodes[next].name.split(':')[0]}] Estado validado: ${nodes[next].metrics}`
        ];
        setExecutionLogs((current) => [...current.slice(-5), ...newLogs]);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
    setExecutionLogs((current) => [
      ...current.slice(-4),
      `[MANUAL] Inspecionando nó ${nodes[index].name}`
    ]);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80 space-y-5">
      {/* Header do Orquestrador */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              n8n Multi-Agent Sub-Workflow Mesh &middot; Live Engine
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Arquitetura desacoplada de 5 sub-workflows com fila atômica no Redis e tool calling determinístico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono-tech flex items-center gap-1.5 border border-white/[0.08] transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
            <span>{isPlaying ? 'Pausar Fluxo' : 'Executar Contínuo'}</span>
          </button>
          <button
            onClick={() => { setActiveStep(0); setExecutionLogs(['[RESET] Pipeline reiniciado']); }}
            className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.06] transition-all cursor-pointer"
            title="Reiniciar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Workflow Canvas Interativo */}
      <div className="relative bg-[#05060A] border border-white/[0.06] rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2 py-4 relative">
          {/* Linha de conexão animada */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/[0.06] z-0" />
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-700 z-0"
            style={{ width: `${(activeStep / 4) * 88}%` }}
          />

          {nodes.map((node, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <div
                key={node.id}
                onClick={() => handleStepClick(idx)}
                className={`relative z-10 flex flex-col items-center cursor-pointer group transition-all duration-300 w-32 ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {/* Node Box */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shadow-lg ${
                    isActive
                      ? 'bg-white text-black border-white shadow-white/20'
                      : isCompleted
                      ? 'bg-[#10131F] text-indigo-300 border-indigo-500/40'
                      : 'bg-[#090A12] text-white/40 border-white/[0.08]'
                  }`}
                >
                  {node.type === 'cron' && <Zap className="w-5 h-5" />}
                  {node.type === 'buffer' && <Database className="w-5 h-5" />}
                  {node.type === 'agent' && <Bot className="w-5 h-5" />}
                  {node.type === 'retention' && <RotateCcw className="w-5 h-5" />}
                  {node.type === 'handoff' && <UserCheck className="w-5 h-5" />}
                </div>

                {/* Node Title & Sub */}
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-[11px] font-medium text-white/90 block leading-tight">
                    {node.name.split(':')[0]}
                  </span>
                  <span className="text-[9px] font-mono-tech text-white/40 block leading-tight">
                    {node.name.split(':')[1]}
                  </span>
                </div>

                {/* Status Dot */}
                <div className="mt-1">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono-tech text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                      RUNNING
                    </span>
                  ) : isCompleted ? (
                    <span className="text-[9px] font-mono-tech text-indigo-300">
                      DONE ✓
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono-tech text-white/20">
                      IDLE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Detalhes do Nó Ativo & Terminal de Execução n8n */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Detalhes do Nó Ativo */}
        <div className="md:col-span-5 bg-black/40 border border-white/[0.04] rounded-xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/40 border-b border-white/[0.04] pb-2">
            <span>INSPEÇÃO DO SUB-WORKFLOW</span>
            <span>NODE #{activeStep + 1} OF 5</span>
          </div>

          <div>
            <h5 className="text-sm font-medium text-white font-serif-luxury text-base">
              {nodes[activeStep].name}
            </h5>
            <p className="text-xs font-mono-tech text-white/50 mt-0.5">
              {nodes[activeStep].sub}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono-tech text-white/70 space-y-1">
            <div className="flex justify-between">
              <span className="text-white/30">Métrica Chave:</span>
              <span className="text-white font-medium">{nodes[activeStep].metrics}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Status de Rede:</span>
              <span className="text-emerald-400">200 OK &middot; Zero Drop</span>
            </div>
          </div>
        </div>

        {/* Console de Telemetria n8n em Tempo Real */}
        <div className="md:col-span-7 bg-[#05060A] border border-white/[0.06] rounded-xl p-3.5 flex flex-col justify-between font-mono-tech text-xs">
          <div className="flex items-center justify-between text-[10px] text-white/30 border-b border-white/[0.04] pb-1.5 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              N8N WORKFLOW EXECUTION STREAM
            </span>
            <span>JSON PAYLOAD</span>
          </div>

          <div className="space-y-1 text-[11px] overflow-y-auto max-h-[100px] text-white/60">
            {executionLogs.map((log, idx) => (
              <div key={idx} className="truncate">
                <span className="text-white/30 mr-1.5">&gt;</span>
                <span className={log.includes('RUNNING') || log.includes('enriquecido') ? 'text-white/90' : ''}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-white/30">
            <span>Memory Footprint: 32MB</span>
            <span>Execution ID: exec_{Date.now().toString().slice(-6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
