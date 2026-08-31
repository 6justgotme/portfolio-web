import React, { useState, useTransition } from 'react';
import {
  GitBranch,
  Copy,
  Check,
  Sparkles,
  Zap,
  Activity,
  BarChart2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  PROJECTS,
  TECHNICAL_DOMAINS,
  CORE_PHILOSOPHY,
  type ProjectData
} from './data/projects';
import { ProjectPipelineCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { N8nOrchestratorDemo } from './components/demos/N8nOrchestratorDemo';
import { ObservabilityDemo } from './components/demos/ObservabilityDemo';
import { BodyChartDemo } from './components/demos/BodyChartDemo';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'demo' | 'architecture' | 'code' | 'deepdive'>('demo');
  const [activeLabDemo, setActiveLabDemo] = useState<'n8n' | 'observability' | 'bodychart'>('n8n');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(PROJECTS[0]?.id || null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [, startTransition] = useTransition();

  const categories = [
    { id: 'all', label: 'Todos os Pipelines', count: PROJECTS.length },
    { id: 'ai-agents', label: 'Orquestração n8n & IA', count: PROJECTS.filter(p => p.category === 'ai-agents').length },
    { id: 'observability', label: 'Observabilidade & SLAs', count: PROJECTS.filter(p => p.category === 'observability').length },
    { id: 'saas-erp', label: 'Enterprise & Multi-Tenant', count: PROJECTS.filter(p => p.category === 'saas-erp').length },
    { id: 'messaging', label: 'Mensageria & Segurança', count: PROJECTS.filter(p => p.category === 'messaging').length },
    { id: 'data-scraping', label: 'Engenharia de Dados', count: PROJECTS.filter(p => p.category === 'data-scraping').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleToggleExpand = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const handleOpenDemo = (project: ProjectData) => {
    setActiveProject(project);
    setModalInitialTab('demo');
  };

  const handleOpenDetails = (project: ProjectData) => {
    setActiveProject(project);
    setModalInitialTab('deepdive');
  };

  const handleContactAction = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#FFFFFF', '#6366F1', '#A855F7', '#06B6D4']
    });
    navigator.clipboard.writeText('contato@nhr-ai.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#D1D1DB] relative overflow-x-hidden selection:bg-white/20 selection:text-white font-sans-clean">
      {/* Luzes Difusas de Fundo - Obsidian Luxury Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] glow-spot-1 opacity-70 blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[500px] glow-spot-2 opacity-50 blur-[160px]" />
      </div>

      {/* Header / Barra de Navegação Flutuante */}
      <header className="sticky top-5 z-40 max-w-5xl mx-auto px-4">
        <nav className="glass-luxury rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl shadow-black/80">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl font-normal text-white tracking-wide">
              V.B.
            </span>
            <span className="text-white/20 font-mono-tech">&middot;</span>
            <span className="text-xs font-mono-tech text-white/50 tracking-wider uppercase">
              Systems & AI Architect
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-white/50">
            <a href="#projects" className="hover:text-white transition-colors">Pipelines</a>
            <a href="#lab" className="hover:text-white transition-colors">Interactive Lab</a>
            <a href="#engineering" className="hover:text-white transition-colors">Engenharia</a>
            <a href="#philosophy" className="hover:text-white transition-colors">Princípios</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/6justgotme"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white transition-all border border-white/[0.06]"
              title="GitHub"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <button
              onClick={handleContactAction}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-white/5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email Copiado' : 'Contato'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION — Minimalista, Direta e de Alto Impacto */}
      <section className="relative z-10 pt-16 md:pt-24 pb-14 max-w-5xl mx-auto px-4">
        <div className="space-y-5 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono-tech text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Pipelines n8n, Observabilidade & Sistemas Fatuais em Produção &middot; 2026
          </div>

          {/* Headline com Tipografia Serif Editorial de Luxo */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white font-serif-luxury tracking-tight leading-[1.15]">
            Engenharia de pipelines n8n, observabilidade Prometheus e sistemas de mensageria concorrentes.
          </h1>

          {/* Subtítulo Conciso */}
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-2xl">
            Sistemas distribuídos em Go e TypeScript: fluxos autônomos no n8n com buffers no Redis, monitoramento de centenas de canais corporativos e isolamento com PostgreSQL RLS.
          </p>

          {/* Métricas Essenciais em Faixa Minimalista */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06]">
            <div>
              <span className="text-xl font-normal font-serif-luxury text-white block">5 Sub-WFs</span>
              <span className="text-[10px] font-mono-tech text-white/40">Mesh Autônomo n8n</span>
            </div>
            <div>
              <span className="text-xl font-normal font-serif-luxury text-white block">480+</span>
              <span className="text-[10px] font-mono-tech text-white/40">Grupos Vigiados</span>
            </div>
            <div>
              <span className="text-xl font-normal font-serif-luxury text-white block">12.8k</span>
              <span className="text-[10px] font-mono-tech text-white/40">Msg/s em Go (whatsmeow)</span>
            </div>
            <div>
              <span className="text-xl font-normal font-serif-luxury text-white block">0.00%</span>
              <span className="text-[10px] font-mono-tech text-white/40">Alucinação em Dados</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL: PIPELINES COM ACCORDION ELEGANTE */}
      <section id="projects" className="relative z-10 py-12 max-w-5xl mx-auto px-4 border-t border-white/[0.06]">
        {/* Header com Filtros Minimalistas */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40">
              Fluxos de Produção &middot; Accordion Interativo
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-white font-serif-luxury">
              Pipelines de Engenharia & Sistemas Ativos
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  startTransition(() => {
                    setSelectedCategory(cat.id);
                  });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-tech transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-medium'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] text-white/50 hover:text-white border border-white/[0.04]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-white/30">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista em Accordion dos Pipelines */}
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <ProjectPipelineCard
              key={project.id}
              project={project}
              isExpanded={expandedProjectId === project.id}
              onToggleExpand={() => handleToggleExpand(project.id)}
              onOpenDemo={handleOpenDemo}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      </section>

      {/* SEÇÃO INTERACTIVE PLAYGROUND LAB COM SWITCHER DE MODOS */}
      <section id="lab" className="relative z-10 py-14 bg-[#08080E] border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2.5">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 block">
              Live Interactive Lab
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-white font-serif-luxury">
              Laboratório de Simulação em Tempo Real
            </h2>

            {/* Seletor do Laboratório */}
            <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/[0.08] gap-1 font-mono-tech text-xs">
              <button
                onClick={() => setActiveLabDemo('n8n')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLabDemo === 'n8n'
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>n8n Multi-Agent</span>
              </button>
              <button
                onClick={() => setActiveLabDemo('observability')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLabDemo === 'observability'
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Prometheus & SLA</span>
              </button>
              <button
                onClick={() => setActiveLabDemo('bodychart')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLabDemo === 'bodychart'
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Clinical Chart</span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeLabDemo === 'n8n' && <N8nOrchestratorDemo />}
            {activeLabDemo === 'observability' && <ObservabilityDemo />}
            {activeLabDemo === 'bodychart' && <BodyChartDemo />}
          </div>
        </div>
      </section>

      {/* SEÇÃO MATRIZ DE ENGENHARIA */}
      <section id="engineering" className="relative z-10 py-12 max-w-5xl mx-auto px-4">
        <div className="space-y-1 mb-8">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 block">
            Domínios Técnicos
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-white font-serif-luxury">
            Arquitetura & Competências
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {TECHNICAL_DOMAINS.map((domain, idx) => (
            <div
              key={idx}
              className="glass-luxury-card rounded-2xl p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-mono-tech text-white/40">
                <span>0{idx + 1}</span>
                <span className="uppercase text-[9px] tracking-widest">DOMÍNIO</span>
              </div>
              <h3 className="text-lg font-normal text-white font-serif-luxury">
                {domain.title}
              </h3>
              <div className="text-[11px] font-mono-tech text-white/50 bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                {domain.tech}
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {domain.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO PRINCÍPIOS DE CONSTRUÇÃO */}
      <section id="philosophy" className="relative z-10 py-12 bg-[#07070C] border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 block">
              Filosofia Inegociável
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-white font-serif-luxury">
              Princípios de Arquitetura
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_PHILOSOPHY.map((p, idx) => (
              <div
                key={idx}
                className="bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.1] rounded-2xl p-5 space-y-1.5 transition-all"
              >
                <span className="text-xs font-mono-tech text-white/30 block">
                  {p.number}
                </span>
                <h3 className="text-base font-normal text-white font-serif-luxury">
                  {p.title}
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#040406] py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center md:text-left">
            <span className="font-serif-luxury text-xl font-normal text-white block">
              V.B.
            </span>
            <p className="text-xs text-white/40 font-mono-tech">
              Systems & AI Solutions Architect &middot; Produção &middot; 2026
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleContactAction}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-white/5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email Copiado' : 'Copiar Email'}</span>
            </button>
            <a
              href="https://github.com/6justgotme"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white text-xs border border-white/[0.06] transition-all"
            >
              <GitBranch className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-6 pt-4 border-t border-white/[0.04] text-center text-[10px] text-white/30 font-mono-tech">
          Todos os dados e marcas apresentados foram devidamente anonimizados para conformidade com privacidade.
        </div>
      </footer>

      {/* MODAL DE DETALHES & SIMULADORES */}
      <ProjectModal
        project={activeProject}
        initialTab={modalInitialTab}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};
