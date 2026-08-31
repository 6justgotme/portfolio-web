import React, { useState } from 'react';
import { type ProjectData } from '../data/projects';
import {
  Zap,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Bot,
  Database,
  UserCheck,
  ShieldCheck,
  Cpu,
  RefreshCw,
  BarChart2
} from 'lucide-react';

interface ProjectPipelineViewProps {
  project: ProjectData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenDetails: (project: ProjectData) => void;
  onOpenDemo: (project: ProjectData) => void;
}

export const ProjectPipelineCard: React.FC<ProjectPipelineViewProps> = ({
  project,
  isExpanded,
  onToggleExpand,
  onOpenDetails,
  onOpenDemo
}) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);

  const handleNodeClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectedNodeIndex(selectedNodeIndex === idx ? null : idx);
  };

  const activeNode = selectedNodeIndex !== null ? project.pipelineSteps[selectedNodeIndex] : null;

  // Helper para renderizar o ícone de cada tipo de nó de pipeline no padrão n8n
  const getNodeIcon = (type: string, name: string) => {
    const text = `${type} ${name}`.toLowerCase();
    if (text.includes('cron') || text.includes('dispatch') || text.includes('ingress') || text.includes('stream')) {
      return <Zap className="w-4 h-4" />;
    }
    if (text.includes('buffer') || text.includes('queue') || text.includes('redis') || text.includes('vault') || text.includes('db')) {
      return <Database className="w-4 h-4" />;
    }
    if (text.includes('agent') || text.includes('llm') || text.includes('reasoning') || text.includes('ast') || text.includes('vision') || text.includes('triage')) {
      return <Bot className="w-4 h-4" />;
    }
    if (text.includes('handoff') || text.includes('human') || text.includes('outreach') || text.includes('sdr')) {
      return <UserCheck className="w-4 h-4" />;
    }
    if (text.includes('metric') || text.includes('prometheus') || text.includes('grafana') || text.includes('telemetry') || text.includes('chart')) {
      return <BarChart2 className="w-4 h-4" />;
    }
    if (text.includes('guardrail') || text.includes('threat') || text.includes('auth') || text.includes('rls') || text.includes('security')) {
      return <ShieldCheck className="w-4 h-4" />;
    }
    if (text.includes('reconnect') || text.includes('healing') || text.includes('reactivation') || text.includes('cadence')) {
      return <RefreshCw className="w-4 h-4" />;
    }
    return <Cpu className="w-4 h-4" />;
  };

  return (
    <div
      className={`glass-luxury-card rounded-2xl transition-all duration-300 border overflow-hidden ${
        isExpanded
          ? 'border-white/[0.15] bg-[#0A0C14]/90 p-4 sm:p-6 space-y-4 shadow-2xl shadow-black/60'
          : 'border-white/[0.05] hover:border-white/[0.12] p-4 sm:px-5 sm:py-3.5 hover:bg-[#0A0B12]/80'
      }`}
    >
      {/* Header do Accordion (Sempre Visível e Clicável) */}
      <div
        onClick={onToggleExpand}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group/header"
      >
        {/* Lado Esquerdo: Número, Título em Serif, Categoria e Tagline */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[11px] font-mono-tech text-white/30 font-medium group-hover/header:text-white/60 transition-colors">
            #{project.number}
          </span>
          <span className="text-white/10 font-mono-tech">&middot;</span>
          <h3 className="text-lg md:text-xl font-normal text-white font-serif-luxury tracking-tight truncate group-hover/header:text-white/90 transition-colors">
            {project.title}
          </h3>
          <span className="hidden md:inline-block text-[9px] font-mono-tech uppercase tracking-widest text-white/40 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04] truncate">
            {project.categoryLabel}
          </span>
          <span className="hidden lg:inline-block text-xs text-white/30 font-light truncate max-w-xs">
            {project.tagline}
          </span>
        </div>

        {/* Lado Direito: Quantidade de Nós, Botões e Chevron */}
        <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
          <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.02] px-2 py-0.5 rounded-md border border-white/[0.04]">
            {project.pipelineSteps.length} NÓS
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDemo(project);
            }}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium bg-white text-black hover:bg-white/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span className="hidden sm:inline">Simulador</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-white/80 border border-white/[0.06] transition-all flex items-center gap-1 cursor-pointer"
            title="Ver arquitetura completa"
          >
            <span className="hidden sm:inline">Arquitetura</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
          </button>

          <div className="p-1 rounded-lg text-white/40 group-hover/header:text-white transition-colors">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-white' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Expandido do Accordion: Canvas n8n e Gaveta de Telemetria */}
      {isExpanded && (
        <div className="pt-3 border-t border-white/[0.05] space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Subtítulo & Resumo quando aberto */}
          <p className="text-xs text-white/50 font-light">
            {project.subtitle} &middot; {project.tagline}
          </p>

          {/* Visual Workflow Canvas Estilo n8n Interativo */}
          <div className="relative bg-[#05060A] border border-white/[0.06] rounded-xl p-3 md:p-4 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[620px] gap-2 py-3 relative">
              {/* Trilha do Pipeline com Linha de Conexão */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/[0.06] z-0" />
              {selectedNodeIndex !== null && (
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500 z-0"
                  style={{
                    width: `${(selectedNodeIndex / Math.max(1, project.pipelineSteps.length - 1)) * 88}%`
                  }}
                />
              )}

              {project.pipelineSteps.map((step, idx) => {
                const isSelected = selectedNodeIndex === idx;

                return (
                  <div
                    key={step.id}
                    onClick={(e) => handleNodeClick(e, idx)}
                    className={`relative z-10 flex flex-col items-center cursor-pointer transition-all duration-300 group/node flex-1 ${
                      isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Node Box Estilo n8n */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all shadow-lg ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-white/20 font-bold'
                          : 'bg-[#090A12] text-white/50 border-white/[0.08] group-hover/node:border-white/20 group-hover/node:text-white'
                      }`}
                    >
                      {getNodeIcon(step.type, step.name)}
                    </div>

                    {/* Node Title & Sub */}
                    <div className="text-center mt-2 space-y-0.5">
                      <span className="text-[11px] font-medium text-white/90 block leading-tight truncate max-w-[110px]">
                        {step.name.split('&')[0]}
                      </span>
                      <span className="text-[9px] font-mono-tech text-white/40 block truncate max-w-[110px]">
                        {step.type}
                      </span>
                    </div>

                    {/* Status Dot */}
                    <div className="mt-1">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[8px] font-mono-tech text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                          INSPECT
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono-tech text-white/20">
                          NODE 0{idx + 1}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gaveta de Telemetria Dinâmica (Aparece SOMENTE se o usuário clicar no nó) */}
          {activeNode && (
            <div className="bg-[#07080E] border border-white/[0.06] rounded-xl p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs animate-in fade-in duration-200">
              <div className="md:col-span-8 space-y-1">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] text-white/40">
                  <span className="text-white font-medium">NÓ {activeNode.step}: {activeNode.name}</span>
                  <span>&middot;</span>
                  <span className="text-white/60">{activeNode.tech}</span>
                </div>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {activeNode.description}
                </p>
              </div>

              <div className="md:col-span-4 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04] flex items-center justify-between font-mono-tech text-[11px]">
                <div>
                  <span className="text-[9px] uppercase text-white/30 block">Métrica Validada</span>
                  <span className="text-white font-medium text-xs truncate block mt-0.5">
                    {activeNode.metric}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(project);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/90 text-[11px] font-mono-tech flex items-center gap-1 border border-white/[0.08] cursor-pointer"
                >
                  <span>Deep Dive</span>
                  <ChevronRight className="w-3 h-3 text-white/40" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
