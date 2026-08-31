import React, { useState } from 'react';
import { type ProjectData } from '../data/projects';
import {
  X,
  Layers,
  Code2,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  FileCode,
  Lock
} from 'lucide-react';
import { N8nOrchestratorDemo } from './demos/N8nOrchestratorDemo';
import { ObservabilityDemo } from './demos/ObservabilityDemo';
import { BodyChartDemo } from './demos/BodyChartDemo';
import { DealEngineDemo } from './demos/DealEngineDemo';
import { AiChatDemo } from './demos/AiChatDemo';
import { ScamDetectorDemo } from './demos/ScamDetectorDemo';
import { GeoLeadDemo } from './demos/GeoLeadDemo';
import { EvolutionBenchDemo } from './demos/EvolutionBenchDemo';

interface ProjectModalProps {
  project: ProjectData | null;
  initialTab?: 'demo' | 'architecture' | 'code' | 'deepdive';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  initialTab = 'demo',
  onClose
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'demo' | 'architecture' | 'code' | 'deepdive'>(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderDemo = () => {
    switch (project.liveDemoType) {
      case 'n8n-orchestrator':
        return <N8nOrchestratorDemo />;
      case 'observability-telemetry':
        return <ObservabilityDemo />;
      case 'body-chart':
        return <BodyChartDemo />;
      case 'deal-engine':
        return <DealEngineDemo />;
      case 'ai-chat':
        return <AiChatDemo />;
      case 'scam-detector':
        return <ScamDetectorDemo />;
      case 'geo-lead':
        return <GeoLeadDemo />;
      case 'evolution-bench':
        return <EvolutionBenchDemo />;
      default:
        return <N8nOrchestratorDemo />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#090A10] border border-white/[0.08] rounded-2xl md:rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal com Tipografia Luxury */}
        <div className="bg-[#0C0D14] border-b border-white/[0.06] p-5 md:p-7 pb-0 flex-shrink-0">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono-tech tracking-wider text-white/50">
                  PROJECT #{project.number}
                </span>
                <span className="text-white/20 font-mono-tech">&middot;</span>
                <span className="text-[11px] font-mono-tech uppercase text-white/50">
                  {project.categoryLabel}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-normal text-white font-serif-luxury tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs text-white/50 max-w-2xl font-light">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white transition-all cursor-pointer border border-white/[0.06]"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs Minimalistas */}
          <div className="flex gap-2 overflow-x-auto border-t border-white/[0.04] pt-2">
            {[
              { id: 'demo', label: 'Simulador Interativo', icon: Zap },
              { id: 'deepdive', label: 'Engenharia & Decisões', icon: ShieldCheck },
              { id: 'architecture', label: 'Nós de Arquitetura', icon: Layers },
              { id: 'code', label: 'Código & Guardrails', icon: Code2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'bg-white/[0.06] text-white border-white'
                      : 'text-white/40 hover:text-white/80 border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-6">
          {/* TAB 1: SIMULADOR */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              {renderDemo()}

              {/* Métricas de Performance */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-xl">
                    <span className="text-[10px] uppercase font-mono-tech text-white/40 block">
                      {m.label}
                    </span>
                    <span className="text-base font-medium font-mono-tech text-white mt-1 block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DEEP DIVE */}
          {activeTab === 'deepdive' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-2">
                  <span className="text-[11px] uppercase font-mono-tech text-white/40 block">
                    Gargalo Operacional
                  </span>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                    {project.deepDive.problem}
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-2">
                  <span className="text-[11px] uppercase font-mono-tech text-white/40 block">
                    Solução Arquitetural
                  </span>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                    {project.deepDive.solution}
                  </p>
                </div>
              </div>

              {/* Decisões Chave */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-3">
                <h4 className="text-xs uppercase font-mono-tech text-white/40">
                  Decisões Críticas de Arquitetura
                </h4>
                <div className="space-y-2">
                  {project.deepDive.keyDecisions.map((dec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white/[0.01] p-3 rounded-xl border border-white/[0.03] text-xs text-white/80 font-light"
                    >
                      <span className="font-mono-tech text-white/30 text-[10px] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{dec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segurança e Privacidade */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex items-start gap-3.5">
                <Lock className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-xs uppercase font-mono-tech text-white/60">
                    Segurança, RLS & Anonimização
                  </h5>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {project.deepDive.securityPrivacy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARQUITETURA */}
          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.architecture.map((node, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex flex-col justify-between hover:border-white/[0.15] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/40 mb-2">
                      <span className="uppercase tracking-wider">{node.role}</span>
                      <span>NODE 0{idx + 1}</span>
                    </div>

                    <h4 className="text-sm font-medium text-white mb-1 font-serif-luxury text-base">
                      {node.title}
                    </h4>

                    <div className="text-[11px] font-mono-tech text-white/50 bg-white/[0.02] px-2 py-1 rounded border border-white/[0.03] my-2">
                      {node.tech}
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {node.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CÓDIGO */}
          {activeTab === 'code' && project.codeSnippet && (
            <div className="bg-[#05060A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#0B0C12] px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-white/40" />
                  <span className="text-xs font-mono-tech text-white/80">
                    {project.codeSnippet.filename}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(project.codeSnippet!.code)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 transition-all border border-white/[0.08] cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 overflow-x-auto bg-[#05060A]">
                <pre className="text-xs font-mono-tech text-white/75 leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>

              <div className="p-3.5 bg-[#08090F] border-t border-white/[0.04] text-xs text-white/50 flex items-center gap-2">
                <span className="text-white/80 font-mono-tech text-[11px]">Propósito:</span>
                <span className="font-light">{project.codeSnippet.explanation}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="bg-[#0C0D14] border-t border-white/[0.06] px-6 py-3.5 flex items-center justify-between text-xs text-white/40 flex-shrink-0">
          <span className="font-mono-tech text-[11px]">
            Todos os dados são anonimizados e prontos para produção.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-medium transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
