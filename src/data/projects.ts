export interface ProjectMetric {
  label: string;
  value: string;
}

export interface PipelineStep {
  id: string;
  step: string;
  name: string;
  type: string;
  tech: string;
  metric: string;
  status: 'active' | 'synced' | 'standby';
  description: string;
}

export interface ArchitectureNode {
  title: string;
  role: string;
  tech: string;
  details: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'ai-agents' | 'saas-erp' | 'messaging' | 'data-scraping' | 'observability';
  categoryLabel: string;
  tagline: string;
  description: string;
  metrics: ProjectMetric[];
  techStack: string[];
  pipelineSteps: PipelineStep[];
  architecture: ArchitectureNode[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  liveDemoType: 'n8n-orchestrator' | 'observability-telemetry' | 'body-chart' | 'deal-engine' | 'ai-chat' | 'scam-detector' | 'geo-lead' | 'evolution-bench';
  deepDive: {
    problem: string;
    solution: string;
    keyDecisions: string[];
    securityPrivacy: string;
  };
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'vortex-prospect',
    slug: 'vortex-prospect-engine',
    number: '01',
    title: 'Vortex Outbound Mesh',
    subtitle: 'Autonomous n8n Multi-Agent & Retargeting Engine',
    category: 'ai-agents',
    categoryLabel: 'Orquestração n8n & Agentes',
    tagline: 'Engine autônoma de prospecção, buffer deslizante no Redis (8s), cadência de reengajamento e handoff inteligente com tool calling.',
    description: 'Arquitetura modular em 5 sub-workflows especializados com execução atômica, debounce de mensagens fragmentadas e transferência assistida para SDR.',
    metrics: [
      { label: 'Fluxos n8n', value: '5 Sub-Workflows' },
      { label: 'Taxa Resposta', value: '+38.4%' },
      { label: 'Buffer Redis', value: '8s Sliding' },
      { label: 'Handoff SLA', value: '< 15s' }
    ],
    techStack: ['n8n Self-Hosted', 'TypeScript', 'Redis', 'PostgreSQL', 'Evolution Go', 'Claude 3.5 Sonnet', 'OpenRouter', 'Docker'],
    pipelineSteps: [
      {
        id: 'v1',
        step: '01',
        name: 'Batch Dispatch & Jitter',
        type: 'Ingress & Outbound',
        tech: 'n8n Cron + Redis Queue',
        metric: 'Delay 12-45s Anti-Ban',
        status: 'synced',
        description: 'Disparo cadenciado com enriquecimento prévio no Postgres e proteção contra bloqueios de operadora.'
      },
      {
        id: 'v2',
        step: '02',
        name: 'Sliding Window Buffer',
        type: 'Message Buffer',
        tech: 'Redis Hash + Lock Atômico',
        metric: '8s Window • Zero Corrida',
        status: 'active',
        description: 'Agrupa mensagens curtas e áudios sequenciais do WhatsApp antes de acionar a inteligência artificial.'
      },
      {
        id: 'v3',
        step: '03',
        name: 'Core Agent & Tool Calling',
        type: 'LLM Reasoning',
        tech: 'Claude 3.5 + Custom JS Tools',
        metric: 'Tool Calling • RAG 0.94',
        status: 'active',
        description: 'Qualificação semântica com checagem de agenda, cálculo de orçamentos e consulta à base de conhecimento.'
      },
      {
        id: 'v4',
        step: '04',
        name: 'Reactivation Cadence',
        type: 'Lifecycle Recovery',
        tech: 'Cron 48h + Postgres State',
        metric: '+28.4% Recuperação',
        status: 'standby',
        description: 'Retomada automática de leads mornos sem resposta com ganchos contextuais personalizados.'
      },
      {
        id: 'v5',
        step: '05',
        name: 'Executive SDR Handoff',
        type: 'Human Transfer',
        tech: 'Fastify Webhook + WhatsApp',
        metric: 'Transferência SLA < 15s',
        status: 'synced',
        description: 'Gera resumo executivo dos pontos-chave direto no WhatsApp do vendedor para fechamento.'
      }
    ],
    architecture: [
      {
        title: 'WF-01: Batch Dispatch & Jitter',
        role: 'Ingress & Outbound',
        tech: 'n8n Cron + Redis Queue',
        details: 'Dispara prospecções com janelas de segurança, delay randômico de 12-45s anti-ban e enriquecimento de dados prévio.'
      },
      {
        title: 'WF-02: Ingestion & Sliding Debounce',
        role: 'Message Buffer',
        tech: 'Redis Hash + Lock Distribuído',
        details: 'Agrupa mensagens picadas e áudios enviados em sequência antes de acionar a inteligência artificial.'
      },
      {
        title: 'WF-03: Core Decision Agent & Tools',
        role: 'LLM Reasoning',
        tech: 'n8n AI Agent + Custom JS Tools',
        details: 'Agente com tool calling para checagem de agenda, cálculo de propostas e consulta à base vetorial.'
      },
      {
        title: 'WF-04 & 05: Re-engagement & Handoff',
        role: 'Lifecycle & Human Transfer',
        tech: 'Webhook + PostgreSQL State',
        details: 'Reativação de leads mornos após 48h e transferência imediata do contexto limpo para o WhatsApp do atendente.'
      }
    ],
    codeSnippet: {
      filename: 'vortex-debounce-processor.js',
      language: 'javascript',
      code: `// n8n Code Node: Debounce Inteligente & Normalização de Mensagens
const incoming = items[0].json;
const sessionKey = \`buffer:\${incoming.senderPhone}\`;

// 1. Acumular mensagem no buffer temporário do Redis
await redis.rpush(sessionKey, JSON.stringify({
  type: incoming.messageType,
  text: incoming.text || incoming.audioTranscript,
  timestamp: Date.now()
}));

// 2. Renovar janela de espera (8 segundos)
await redis.expire(sessionKey, 8);

// 3. Checar lock para garantir uma única execução do Agente de IA
const isLocked = await redis.set(\`lock:\${sessionKey}\`, '1', 'NX', 'EX', 10);
if (!isLocked) {
  return []; // Aguardando término das mensagens do cliente
}

// 4. Aguardar liberação do buffer e unificar contexto
await sleep(8500);
const allMessages = await redis.lrange(sessionKey, 0, -1);
await redis.del(sessionKey);

return [{
  json: {
    phone: incoming.senderPhone,
    unifiedPrompt: allMessages.map(m => JSON.parse(m).text).join('\\n'),
    messageCount: allMessages.length
  }
}];`,
      explanation: 'Consolida mensagens fragmentadas de WhatsApp em uma única chamada contextual ao LLM, economizando 70% de tokens.'
    },
    liveDemoType: 'n8n-orchestrator',
    deepDive: {
      problem: 'Leads de WhatsApp mandam várias mensagens curtas seguidas e áudios que quebram o fluxo dos bots tradicionais, gastando tokens à toa e gerando respostas desconexas.',
      solution: 'Arquitetura desacoplada em 5 sub-workflows n8n com buffer sliding no Redis, orquestrando desde a prospecção até o handoff humano com histórico.',
      keyDecisions: [
        'Divisão em 5 micro-workflows n8n para isolar responsabilidades e permitir debug individual sem derrubar o fluxo principal.',
        'Redis com locks atômicos para eliminar condições de corrida entre mensagens recebidas simultaneamente.',
        'Handoff com geração de resumo executivo para o vendedor humano assumir sem ler centenas de mensagens.'
      ],
      securityPrivacy: 'Execução 100% self-hosted em cluster Docker com banco Postgres isolado e credenciais criptografadas.'
    }
  },
  {
    id: 'aegis-sentry',
    slug: 'aegis-sentry-telemetry',
    number: '02',
    title: 'Aegis Sentry & Telemetry',
    subtitle: 'Group WhatsApp Sentinel & Prometheus Observability',
    category: 'observability',
    categoryLabel: 'Observabilidade & Triagem de SLAs',
    tagline: 'Monitoramento semântico contínuo em 480+ grupos corporativos, triagem de urgências com IA e exportador Prometheus em tempo real.',
    description: 'Plataforma de alta observabilidade para operações críticas. Captação contínua de eventos, detecção de crises em < 3.2s e painel de escalonamento com SLA rígido.',
    metrics: [
      { label: 'Grupos Vigiados', value: '480+ Ativos' },
      { label: 'Detecção de Crise', value: '< 3.2s' },
      { label: 'Métricas', value: 'Prometheus / P99' },
      { label: 'Cumprimento SLA', value: '99.4%' }
    ],
    techStack: ['Next.js 16', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Prometheus', 'Grafana', 'Redis', 'n8n', 'OpenAI'],
    pipelineSteps: [
      {
        id: 'a1',
        step: '01',
        name: 'Group Webhook Ingress',
        type: 'Mass Ingestion',
        tech: 'Evolution API Stream',
        metric: '180k+ msg/dia',
        status: 'synced',
        description: 'Captura contínua de mensagens em centenas de grupos de clientes com confirmação de entrega.'
      },
      {
        id: 'a2',
        step: '02',
        name: 'Sentiment & SLA Classifier',
        type: 'Semantic Triage',
        tech: 'n8n + GPT-4o-mini',
        metric: '< 2.4s Latência',
        status: 'active',
        description: 'Classificação de humor do cliente, detecção de urgências e atribuição de severidade 1 a 5.'
      },
      {
        id: 'a3',
        step: '03',
        name: 'Prometheus Metric Exporter',
        type: 'Observability Exporter',
        tech: 'prom-client + OpenTelemetry',
        metric: 'P99 / 15s Scrape',
        status: 'active',
        description: 'Exposição de métricas de latência, vazão e contagem de incidentes para painéis do Grafana.'
      },
      {
        id: 'a4',
        step: '04',
        name: 'SLA Escalation Engine',
        type: 'Auto-Routing',
        tech: 'Prisma + Postgres Triggers',
        metric: 'SLA < 5 min',
        status: 'synced',
        description: 'Alerta sonoro e notificação direta no WhatsApp do gestor responsável pelo cliente em caso de risco de SLA.'
      }
    ],
    architecture: [
      {
        title: 'Group Ingress Stream',
        role: 'Real-Time Ingestion',
        tech: 'Evolution API Webhooks',
        details: 'Capta conversas em massa de grupos corporativos com confirmação instantânea de recebimento.'
      },
      {
        title: 'Sentiment & SLA Classifier',
        role: 'Triage Engine',
        tech: 'n8n + GPT-4o-mini',
        details: 'Identifica reclamações sobre campanhas, falhas de pagamento ou dúvidas urgentes com pontuação 1-5.'
      },
      {
        title: 'Prometheus Telemetry Exporter',
        role: 'Observability Hub',
        tech: 'Prometheus Client + Grafana',
        details: 'Métricas de vazão de mensagens por segundo, tempo de resolução de tickets e taxa de alertas críticos.'
      },
      {
        title: 'SLA Escalation Web Panel',
        role: 'Operations Command',
        tech: 'Next.js 16 + Tailwind + WebSocket',
        details: 'Dashboard visual com alertas sonoros, painel kanban de incidentes e reatribuição automática de equipe.'
      }
    ],
    codeSnippet: {
      filename: 'aegis-telemetry-collector.ts',
      language: 'typescript',
      code: `// Coletor de Métricas Prometheus para Monitoramento de SLA
import { Counter, Histogram, Gauge } from 'prom-client';

export const groupMessageCounter = new Counter({
  name: 'corporate_group_messages_total',
  help: 'Total de mensagens processadas nos grupos vigiados',
  labelNames: ['groupId', 'sentiment', 'urgencyLevel']
});

export const slaResolutionDuration = new Histogram({
  name: 'sla_ticket_resolution_seconds',
  help: 'Tempo até o primeiro atendimento qualificado',
  buckets: [30, 60, 120, 300, 600, 1800]
});

export const activeUrgentIncidents = new Gauge({
  name: 'active_urgent_incidents_count',
  help: 'Número de chamados críticos pendentes de resposta'
});

export function recordGroupEvent(event: GroupMessageEvent) {
  groupMessageCounter.inc({
    groupId: event.groupId,
    sentiment: event.sentimentScore < 2 ? 'NEGATIVE' : 'NEUTRAL',
    urgencyLevel: event.isUrgent ? 'CRITICAL' : 'NORMAL'
  });

  if (event.isUrgent) {
    activeUrgentIncidents.inc();
  }
}`,
      explanation: 'Exporta métricas prontas para dashboards do Grafana e alertas automáticos via PagerDuty/Telegram.'
    },
    liveDemoType: 'observability-telemetry',
    deepDive: {
      problem: 'Empresas com centenas de grupos de WhatsApp não conseguem ver quando um cliente reclama de problema crítico, estourando prazos e perdendo contas.',
      solution: 'Sentinela com IA que classifica cada mensagem em milissegundos e gera painéis de telemetria em tempo real com métricas Prometheus.',
      keyDecisions: [
        'Uso de Prometheus para métricas de infraestrutura e SLAs de suporte corporativo.',
        'Prisma com índices compostos em PostgreSQL para consultas instantâneas de histórico por grupo.',
        'Notificação ativa no WhatsApp do gestor responsável caso o SLA atinja 50% do limite.'
      ],
      securityPrivacy: 'Filtros prévios de regex para sanitizar números de cartão e credenciais antes da análise de sentimento por IA.'
    }
  },
  {
    id: 'apexclinics',
    slug: 'apexclinics-os',
    number: '03',
    title: 'ApexClinics OS',
    subtitle: 'Clinical ERP & Real Margin Engine',
    category: 'saas-erp',
    categoryLabel: 'Enterprise ERP & Multi-Tenant',
    tagline: 'Isolamento estrito multi-tenant via RLS, mapeamento anatômico vetorial e auditoria de margem líquida por minuto de sala.',
    description: 'Arquitetura hospitalar e estética avançada. Baixa de insumos em precisão fracionada (0.001 ml) e cálculo determinístico de custos operacionais.',
    metrics: [
      { label: 'Isolamento', value: '100% RLS' },
      { label: 'Precisão Estoque', value: '0.001 ml' },
      { label: 'Latência P99', value: '38ms' },
      { label: 'Conformidade', value: 'HIPAA / LGPD' }
    ],
    techStack: ['NestJS', 'Fastify', 'TypeScript', 'PostgreSQL RLS', 'Turborepo', 'React 19', 'TailwindCSS'],
    pipelineSteps: [
      {
        id: 'ap1',
        step: '01',
        name: 'Tenant Auth & RLS Context',
        type: 'Security Gate',
        tech: 'NestJS + Fastify + JWT',
        metric: 'Zero Cross-Tenant Leak',
        status: 'synced',
        description: 'Autenticação e injeção do ID do tenant na sessão do PostgreSQL para isolamento estrito.'
      },
      {
        id: 'ap2',
        step: '02',
        name: 'Vector Body Charting',
        type: 'Interactive Canvas',
        tech: 'React SVG + Touch Precision',
        metric: '0.1mm Precisão Anatômica',
        status: 'active',
        description: 'Marcação vetorial de pontos de aplicação e evolução clínica em tempo real.'
      },
      {
        id: 'ap3',
        step: '03',
        name: 'Fractional Stock Deduction',
        type: 'Inventory Engine',
        tech: 'Postgres Stored Procedures',
        metric: '0.001 ml Resolução',
        status: 'active',
        description: 'Baixa fracionada de injetáveis direto no lote, controlando validade e desperdício.'
      },
      {
        id: 'ap4',
        step: '04',
        name: 'Real Margin Auditor',
        type: 'Financial Audit',
        tech: 'Calculated Cost Engine',
        metric: 'Auditado por Sessão',
        status: 'synced',
        description: 'Cálculo de margem real considerando insumos, tempo de sala e comissão médica.'
      }
    ],
    architecture: [
      {
        title: 'Core Fastify Gateway',
        role: 'Ingress & RBAC',
        tech: 'NestJS + Fastify',
        details: 'Roteamento sub-50ms com validação DTO e controle granular de permissões por tenant.'
      },
      {
        title: 'Multi-Tenant Database',
        role: 'Data Isolation',
        tech: 'PostgreSQL + Row-Level Security',
        details: 'Políticas em tempo de execução garantem isolamento criptográfico por clínica.'
      },
      {
        title: 'Interactive Vector Chart',
        role: 'Client Canvas',
        tech: 'React SVG + Touch Engine',
        details: 'Mapeamento anatômico de pontos de aplicação e evolução clínica em tempo real.'
      },
      {
        title: 'Margin Audit Worker',
        role: 'Financial Engine',
        tech: 'PostgreSQL Procedures',
        details: 'Cálculo de margem real considerando depreciação, comissão e tempo de sala.'
      }
    ],
    codeSnippet: {
      filename: 'procedure-margin-engine.ts',
      language: 'typescript',
      code: `// Cálculo determinístico de Margem Real por Procedimento
export async function calculateRealMargin(
  tenantId: string,
  procedureId: string,
  sessionMinutes: number
): Promise<MarginReport> {
  const [proc, overhead] = await Promise.all([
    db.procedures.findUniqueOrThrow({ where: { id: procedureId, tenantId } }),
    db.overheads.findUniqueOrThrow({ where: { tenantId } })
  ]);

  const roomCost = (overhead.monthlyExpense / (overhead.workHours * 60)) * sessionMinutes;
  const suppliesCost = proc.supplies.reduce((acc, s) => acc + (s.unitCost * s.dosage), 0);
  const netMargin = proc.price - (roomCost + suppliesCost + proc.commission);

  return {
    grossRevenue: proc.price,
    suppliesCost,
    roomCost,
    netMargin,
    marginRate: Number(((netMargin / proc.price) * 100).toFixed(1))
  };
}`,
      explanation: 'Garante rastreabilidade e cálculo instantâneo de margem líquida com fracionamento de insumos e custo operacional de sala.'
    },
    liveDemoType: 'body-chart',
    deepDive: {
      problem: 'Clínicas perdem até 30% da margem líquida por falta de controle de fracionamento de ampolas e custos ocultos de tempo de sala.',
      solution: 'Motor de prontuário visual conectado à baixa automática em mililitros e cálculo instantâneo da margem de contribuição.',
      keyDecisions: [
        'PostgreSQL Row-Level Security para isolamento nativo com zero custo de múltiplos bancos.',
        'Engine Fastify no NestJS para redução de 65% na latência de rede.',
        'Body Charting vetorial em SVG responsivo para marcações anatômicas milimétricas.'
      ],
      securityPrivacy: 'Criptografia em repouso AES-256 e URLs pré-assinadas efêmeras para imagens médicas.'
    }
  },
  {
    id: 'omniflow',
    slug: 'omniflow-autonomous',
    number: '04',
    title: 'OmniFlow Engine',
    subtitle: 'Autonomous AI Deal & Messaging Pipeline',
    category: 'ai-agents',
    categoryLabel: 'Sistemas Autônomos & IA',
    tagline: 'Arbitragem de ofertas e mensageria inteligente com guardrails determinísticos que eliminam 100% das alucinações de preço.',
    description: 'Scraping headless de alta fidelidade, geração de ganchos via LLM com validação estrita em AST/Regex e fila auditável com jitter anti-ban.',
    metrics: [
      { label: 'Taxa de Alucinação', value: '0.00%' },
      { label: 'Estado', value: '100% ACID' },
      { label: 'Throughput', value: '50k+ / dia' },
      { label: 'Autonomia', value: '3 Modos' }
    ],
    techStack: ['Node.js', 'TypeScript', 'Evolution Go', 'OpenRouter', 'PostgreSQL', 'Redis', 'Playwright'],
    pipelineSteps: [
      {
        id: 'om1',
        step: '01',
        name: 'Headless Scraper & Cupom',
        type: 'Extraction',
        tech: 'Playwright Cluster + Proxies',
        metric: 'Bypass de Antibot',
        status: 'synced',
        description: 'Extração automatizada de produtos, preços em promoção e cupons ocultos.'
      },
      {
        id: 'om2',
        step: '02',
        name: 'AST Guardrail Validator',
        type: 'Zero-Hallucination',
        tech: 'TypeScript AST + Regex',
        metric: '0.00% Alucinação',
        status: 'active',
        description: 'Intercepta qualquer menção de preço ou link forjado pelo LLM antes da montagem.'
      },
      {
        id: 'om3',
        step: '03',
        name: 'ACID Queue & Jitter',
        type: 'State Queue',
        tech: 'PostgreSQL + BullMQ',
        metric: 'Jitter Anti-Ban 14s',
        status: 'active',
        description: 'Fila persistente imune a restart com janelas de horário e distribuição balanceada.'
      },
      {
        id: 'om4',
        step: '04',
        name: 'Evolution Go Transport',
        type: 'WhatsApp Dispatch',
        tech: 'Go + whatsmeow protocol',
        metric: '< 5ms Envio WhatsApp',
        status: 'synced',
        description: 'Envio ultra-rápido com botões interativos de aprovação e resposta privada.'
      }
    ],
    architecture: [
      {
        title: 'Stealth Browser Scraper',
        role: 'Data Extraction',
        tech: 'Playwright Cluster',
        details: 'Extração de preços, cupons e geração de links de afiliados sem bloqueios.'
      },
      {
        title: 'Deterministic AI Guardrail',
        role: 'Zero-Hallucination Gate',
        tech: 'AST Parser + TypeScript Regex',
        details: 'A IA gera apenas a narrativa; dados factuais e valores são injetados programaticamente.'
      },
      {
        title: 'Transactional Queue',
        role: 'State Machine',
        tech: 'PostgreSQL + BullMQ',
        details: 'Controle de taxa, janelas de disparo e pausas inteligentes anti-bloqueio.'
      },
      {
        title: 'Evolution Go WhatsApp Transport',
        role: 'Delivery Hub',
        tech: 'Go + whatsmeow protocol',
        details: 'Envio ultra-rápido com suporte a botões interativos e assistente privado.'
      }
    ],
    codeSnippet: {
      filename: 'ai-guardrail.ts',
      language: 'typescript',
      code: `// Guardrail determinístico: impede que a IA invente preços ou links
export function enforceFactualIntegrity(hookText: string): boolean {
  const illegalPatterns = [
    /https?:\\/\\/[^\\s]+/i,
    /R\\$\\s*\\d+/i,
    /\\b\\d{1,3}(?:[.,]\\d{2})?\\b\\s*(?:reais|off|desconto|%)/i
  ];

  return !illegalPatterns.some(pattern => pattern.test(hookText));
}`,
      explanation: 'A IA só tem permissão para construir tom emocional; todos os dados financeiros são inseridos a partir do banco de dados.'
    },
    liveDemoType: 'deal-engine',
    deepDive: {
      problem: 'Modelos de linguagem frequentemente inventam descontos inexistentes, gerando desconfiança e prejuízos operacionais.',
      solution: 'Separação estrita entre extração fática e geração textual, com barreiras determinísticas antes do envio.',
      keyDecisions: [
        'PostgreSQL como fonte única de verdade (SSoT) ao invés de armazenar estado no motor de automação.',
        'Kill-switch instantâneo para congelar disparos em menos de 10ms.',
        'Modo interativo com aprovação em 1 toque no WhatsApp do administrador.'
      ],
      securityPrivacy: 'Rotação de credenciais de afiliados e isolamento de tokens de sessão.'
    }
  },
  {
    id: 'eventagent',
    slug: 'eventagent-multimodal',
    number: '05',
    title: 'EventAgent Concierge',
    subtitle: 'Multi-Modal AI Ingress & RAG',
    category: 'ai-agents',
    categoryLabel: 'IA Multi-Modal & RAG',
    tagline: 'Concierge autônomo 24/7 com transcrição de voz Whisper, visão computacional para decoração e RAG vetorial.',
    description: 'Atendimento imersivo para eventos de alto padrão. Agrupa mensagens fragmentadas via Redis sliding-window e calcula orçamentos instantâneos.',
    metrics: [
      { label: 'Tempo de Resposta', value: '1.4s' },
      { label: 'Conversão', value: '+42%' },
      { label: 'Compreensão de Áudio', value: '99.8%' },
      { label: 'Disponibilidade', value: '99.9%' }
    ],
    techStack: ['Fastify', 'TypeScript', 'pgvector', 'Redis', 'Whisper API', 'Gemini Vision', 'Evolution Go'],
    pipelineSteps: [
      {
        id: 'ev1',
        step: '01',
        name: 'Inbound Audio & Vision Stream',
        type: 'Multi-Modal Perception',
        tech: 'Whisper + Gemini 1.5 Vision',
        metric: '180ms Transcrição STT',
        status: 'synced',
        description: 'Normalização de áudios com sotaques regionais e análise de fotos de decoração e plantas.'
      },
      {
        id: 'ev2',
        step: '02',
        name: 'Redis Debounce Buffer',
        type: 'Message Ingress',
        tech: 'Redis Sliding-Window 8s',
        metric: 'Agrupamento Contextual',
        status: 'active',
        description: 'Impede disparos fragmentados da IA aguardando o término das mensagens do cliente.'
      },
      {
        id: 'ev3',
        step: '03',
        name: 'pgvector Hybrid RAG Core',
        type: 'Semantic Knowledge',
        tech: 'PostgreSQL + pgvector (HNSW)',
        metric: 'Cosine Match > 0.92',
        status: 'active',
        description: 'Recuperação contextual de pacotes, calendários de disponibilidade e regras de locação.'
      },
      {
        id: 'ev4',
        step: '04',
        name: 'Proposal Generation & Voice',
        type: 'Synthesis & Voice',
        tech: 'Claude API + ElevenLabs',
        metric: 'Latência Total < 1.8s',
        status: 'synced',
        description: 'Gera orçamentos detalhados em texto formatado ou resposta com áudio sintetizado natural.'
      }
    ],
    architecture: [
      {
        title: 'WhatsApp Ingress & Debounce',
        role: 'Message Buffer',
        tech: 'Redis Sliding-Window',
        details: 'Agrupa áudios e textos sequenciais do cliente antes de acionar a inteligência artificial.'
      },
      {
        title: 'Perception Hub',
        role: 'Audio & Vision',
        tech: 'Whisper + Gemini 1.5 Vision',
        details: 'Transcreve voz com sotaque regional e analisa fotos de decoração e plantas.'
      },
      {
        title: 'RAG Knowledge Core',
        role: 'Semantic Search',
        tech: 'PostgreSQL + pgvector (HNSW)',
        details: 'Recuperação contextual de pacotes, disponibilidade e políticas de locação.'
      },
      {
        title: 'Actionable CRM Webhook',
        role: 'Deal Closing',
        tech: 'Fastify API + React 19',
        details: 'Notificação imediata da equipe comercial quando a intenção de compra é qualificada.'
      }
    ],
    codeSnippet: {
      filename: 'multimodal-rag-session.ts',
      language: 'typescript',
      code: `// Processamento Multi-Modal Contextual Unificado
export async function handleInboundSession(events: InboundEvent[]): Promise<string> {
  const contextParts: string[] = [];

  for (const e of events) {
    if (e.type === 'audio') {
      contextParts.push(await whisper.transcribe(e.mediaUrl));
    } else if (e.type === 'image') {
      contextParts.push(await geminiVision.analyzeStyle(e.mediaUrl));
    } else {
      contextParts.push(e.text);
    }
  }

  const prompt = contextParts.join('\\n');
  const knowledge = await vectorStore.query(prompt, { limit: 3 });
  return await agent.respond(prompt, knowledge);
}`,
      explanation: 'Normaliza mensagens de texto, voz e fotos em um único vetor semântico antes da consulta de base.'
    },
    liveDemoType: 'ai-chat',
    deepDive: {
      problem: 'Espaços de eventos perdem leads noturnos pela incapacidade de enviar orçamentos personalizados com fotos e regras de locação.',
      solution: 'Agente multi-modal capaz de interpretar fotos de referências enviadas pelo cliente e compor propostas financeiras em segundos.',
      keyDecisions: [
        'Buffer deslizante de 8 segundos no Redis para evitar respostas fragmentadas a cada mensagem de WhatsApp.',
        'Índices HNSW no pgvector para busca semântica em menos de 15ms.',
        'Geração de voz ultra-natural para manter o toque humano e sofisticado do atendimento.'
      ],
      securityPrivacy: 'Mídias efêmeras purgadas do S3 em até 72 horas.'
    }
  },
  {
    id: 'sentinelshield',
    slug: 'sentinelshield-core',
    number: '06',
    title: 'SentinelShield Core',
    subtitle: 'High-Resilience Threat & Fraud Detection',
    category: 'messaging',
    categoryLabel: 'Segurança & Antifraude',
    tagline: 'Detecção de engenharia social e golpes de WhatsApp em tempo real com arquitetura Single Binary Multi-Role e pgvector.',
    description: 'Motor forense em Go/TypeScript que avalia mensagens em milissegundos, calcula vetores de risco e intercepta golpes antes de transferências.',
    metrics: [
      { label: 'Tempo de Análise', value: '< 280ms' },
      { label: 'Precisão', value: '98.7%' },
      { label: 'Arquitetura', value: 'Single Binary' },
      { label: 'Fila', value: 'ACID pg-boss' }
    ],
    techStack: ['TypeScript', 'Bun', 'Go', 'PostgreSQL', 'pgvector', 'pg-boss', 'Fastify', 'Docker'],
    pipelineSteps: [
      {
        id: 'ss1',
        step: '01',
        name: 'Single Binary Dispatcher',
        type: 'Multi-Role Runtime',
        tech: 'Bun / Node + Role Env',
        metric: 'Deploy Unificado',
        status: 'synced',
        description: 'O mesmo container sobe como API, Worker de fila ou Analisador vetorial via BEHOLDR_ROLE.'
      },
      {
        id: 'ss2',
        step: '02',
        name: 'ACID Queue Ingress',
        type: 'Reliability Queue',
        tech: 'pg-boss on Postgres',
        metric: 'Zero Loss • Sem RabbitMQ',
        status: 'active',
        description: 'Processamento de tarefas sob a mesma transação do banco sem sobrecarga de mensageria externa.'
      },
      {
        id: 'ss3',
        step: '03',
        name: 'Threat Vector Similarity',
        type: 'Pattern Search',
        tech: 'pgvector HNSW Distance',
        metric: 'Limiar &lt; 0.12 Cosine',
        status: 'active',
        description: 'Compara a mensagem interceptada contra milhares de assinaturas de golpes catalogadas.'
      },
      {
        id: 'ss4',
        step: '04',
        name: 'Forensic Block & Hash',
        type: 'Mitigation',
        tech: 'Forensic Risk Scorer',
        metric: '< 280ms Decisão Final',
        status: 'synced',
        description: 'Calcula score 0-100, emite alerta de bloqueio e gera hash auditável da tentativa de fraude.'
      }
    ],
    architecture: [
      {
        title: 'Multi-Role Ingress',
        role: 'Unified Binary',
        tech: 'Bun / Node runtime',
        details: 'Mesmo binário roda como API, Worker, Scheduler ou Analisador vetorial.'
      },
      {
        title: 'ACID Task Queue',
        role: 'Resilience',
        tech: 'pg-boss on Postgres',
        details: 'Processamento de tarefas transacionais com zero perda e sem overhead de RabbitMQ.'
      },
      {
        title: 'Threat Vector Similarity',
        role: 'Pattern Matching',
        tech: 'pgvector Cosine Distance',
        details: 'Compara a mensagem contra milhares de narrativas de golpe catalogadas.'
      },
      {
        title: 'Forensic Risk Scoring',
        role: 'Verdict',
        tech: 'Heuristics + Semantic LLM',
        details: 'Gera probabilidade de fraude 0-100 e evidências forenses auditáveis.'
      }
    ],
    codeSnippet: {
      filename: 'threat-classifier.ts',
      language: 'typescript',
      code: `// Avaliação Forense de Engenharia Social
export async function evaluateThreat(message: string, isContact: boolean): Promise<ThreatResult> {
  const urgency = /urgente|bloqueio|número novo|salva aí/i.test(message);
  const financial = /pix|transferência|depósito|boleto/i.test(message);

  const embedding = await vectorService.embed(message);
  const matches = await db.scamSignatures.search(embedding, { threshold: 0.12 });

  const score = (urgency ? 25 : 0) + (matches.length > 0 ? 45 : 0) + (financial && !isContact ? 30 : 0);

  return {
    score,
    verdict: score >= 75 ? 'CRITICAL' : score >= 40 ? 'SUSPICIOUS' : 'SAFE',
    action: score >= 75 ? 'BLOCK_AND_ALERT' : 'PASS'
  };
}`,
      explanation: 'Combina análise de urgência psicológica com distância vetorial de golpes já conhecidos.'
    },
    liveDemoType: 'scam-detector',
    deepDive: {
      problem: 'Golpes modernos utilizam linguagem convincente e trocas falsas de número que passam despercebidas por filtros comuns de spam.',
      solution: 'Análise semântica profunda combinando heurística com embeddings de ameaças para proteção em tempo real.',
      keyDecisions: [
        'Single Binary Multi-Role para escalabilidade horizontal simples e manutenção limpa.',
        'pg-boss no Postgres substituindo Redis/RabbitMQ, reduzindo a complexidade de infraestrutura.',
        'Anonimização de telefones e dados sensíveis antes de qualquer cálculo vetorial.'
      ],
      securityPrivacy: 'Isolamento estrito de dados e conformidade com privacidade de ponta a ponta.'
    }
  },
  {
    id: 'evolution-ecosystem',
    slug: 'evolution-ecosystem',
    number: '07',
    title: 'Evolution Go Core',
    subtitle: 'High-Concurrency WhatsApp Engine & Skill Protocol',
    category: 'messaging',
    categoryLabel: 'Infraestrutura & Protocolo Go',
    tagline: 'Infraestrutura de mensageria compilada em Go com auto-healing de conexões e protocolo canônico para agentes de IA.',
    description: 'Pegada de memória 92% menor (22MB vs 280MB em Node), suporte a WebSockets, botões PIX e pacote de habilidades para Claude, Cursor e Copilot.',
    metrics: [
      { label: 'Memória / Instância', value: '22 MB' },
      { label: 'Throughput', value: '12.8k msg/s' },
      { label: 'Reconexão', value: '< 180ms' },
      { label: 'Compatibilidade', value: '6 IDEs' }
    ],
    techStack: ['Go (Golang)', 'whatsmeow', 'Gin', 'WebSockets', 'PostgreSQL', 'Docker', 'Claude Skill Pack'],
    pipelineSteps: [
      {
        id: 'evg1',
        step: '01',
        name: 'whatsmeow Protocol Ingress',
        type: 'Low-Level Socket',
        tech: 'Go Pure Compiled',
        metric: '22MB RAM / Sessão',
        status: 'synced',
        description: 'Conexão direta de baixo nível aos servidores WhatsApp com consumo mínimo de recursos.'
      },
      {
        id: 'evg2',
        step: '02',
        name: 'Auto-Healing Reconnector',
        type: 'Connection Resilience',
        tech: 'Exponential Backoff in Go',
        metric: '< 180ms Zero Drop',
        status: 'active',
        description: 'Restauração automática de sessões caídas sem perda de mensagens acumuladas na fila.'
      },
      {
        id: 'evg3',
        step: '03',
        name: 'Event Broadcast Stream',
        type: 'Pub/Sub Transport',
        tech: 'NATS / WebSockets / RabbitMQ',
        metric: '12.8k msg/s Throughput',
        status: 'active',
        description: 'Transmissão bidirecional de eventos e confirmações de entrega para microsserviços.'
      },
      {
        id: 'evg4',
        step: '04',
        name: 'Canonical AI Skill Pack',
        type: 'AI Enablement',
        tech: 'Markdown Specification Schema',
        metric: 'Multi-IDE Support',
        status: 'synced',
        description: 'Especificações formais para que Claude, Cursor e Copilot programem integrações sem alucinações.'
      }
    ],
    architecture: [
      {
        title: 'Core WhatsApp Engine (Go)',
        role: 'Low-Level Transport',
        tech: 'Go + whatsmeow',
        details: 'Conexão nativa e eficiente aos servidores com pegada de memória mínima.'
      },
      {
        title: 'Auto-Healing Watcher',
        role: 'Connection Health',
        tech: 'Exponential Backoff in Go',
        details: 'Restauração de sessões caídas sem perda de mensagens na fila.'
      },
      {
        title: 'Universal AI Skill Pack',
        role: 'Agent Protocol',
        tech: 'Canonical Markdown Schema',
        details: 'Especificações formais para que assistentes de IA programem sem alucinações.'
      },
      {
        title: 'Event Streaming Hub',
        role: 'Pub/Sub',
        tech: 'NATS & WebSockets',
        details: 'Transmissão em tempo real de confirmações de entrega e mensagens recebidas.'
      }
    ],
    codeSnippet: {
      filename: 'reconnection-watcher.go',
      language: 'go',
      code: `// Auto-Healing de Conexão WhatsApp em Go
package watcher

import (
	"context"
	"time"
	"go.mau.fi/whatsmeow"
)

func AutoHeal(ctx context.Context, client *whatsmeow.Client) {
	backoff := 2 * time.Second
	for {
		select {
		case <-ctx.Done():
			return
		default:
			if !client.IsConnected() {
				if err := client.Connect(); err == nil {
					return
				}
				time.Sleep(backoff)
				backoff *= 2
			} else {
				return
			}
		}
	}
}`,
      explanation: 'Rotina em Go de alta eficiência para auto-recuperação de sessões sem vazamento de memória.'
    },
    liveDemoType: 'evolution-bench',
    deepDive: {
      problem: 'APIs tradicionais em NodeJS consomem memória excessiva quando escaladas para centenas de conexões simultâneas.',
      solution: 'Migração para código compilado em Go e criação de uma especificação formal de skills para desenvolvedores e IAs.',
      keyDecisions: [
        'Uso de Go puro para redução de consumo de 300MB para 22MB por instância.',
        'Desenvolvimento de Skill Canônica multi-IDE para eliminar erros de integração.',
        'Persistência imediata de eventos no Postgres garantindo confiabilidade.'
      ],
      securityPrivacy: 'Criptografia local de chaves de sessão com tokens de autenticação por instância.'
    }
  },
  {
    id: 'geolead',
    slug: 'geolead-intelligence',
    number: '08',
    title: 'GeoLead Intelligence',
    subtitle: 'Geospatial Bounding & Data Cleansing Engine',
    category: 'data-scraping',
    categoryLabel: 'Engenharia de Dados Geoespaciais',
    tagline: 'Extração e higienização geoespacial com 92%+ de taxa de recuperação de telefones em padrão internacional E.164.',
    description: 'Estratégia de bounding box por coordenadas e armazenamento de snapshots brutos para auditoria e enriquecimento contínuo.',
    metrics: [
      { label: 'Taxa de Telefones', value: '~92%' },
      { label: 'Formato', value: '100% E.164' },
      { label: 'Preservação', value: 'Raw JSONB' },
      { label: 'Rastreabilidade', value: 'Permanente' }
    ],
    techStack: ['TypeScript', 'Fastify', 'PostgreSQL', 'Serper.dev API', 'TailwindCSS', 'React', 'Docker'],
    pipelineSteps: [
      {
        id: 'gl1',
        step: '01',
        name: 'Geocoding Coordinate Bound',
        type: 'Spatial Query',
        tech: 'Lat/Lng Bounding Box',
        metric: 'Precisão Geográfica 100%',
        status: 'synced',
        description: 'Geocodifica cidades evitando dispersão de resultados fora da região de prospecção.'
      },
      {
        id: 'gl2',
        step: '02',
        name: 'Raw JSONB Snapshot Vault',
        type: 'Immutability',
        tech: 'PostgreSQL search_pages.raw',
        metric: 'Zero Descarte Bruto',
        status: 'active',
        description: 'Armazenamento perpétuo das respostas cruas da API para re-execução de parsers sem custo.'
      },
      {
        id: 'gl3',
        step: '03',
        name: 'Phone & Address Sanitizer',
        type: 'Data Cleansing',
        tech: 'E.164 Regex Engine',
        metric: '~92% Telefones Válidos',
        status: 'active',
        description: 'Validação de DDDs, identificação de celulares e descarte automático de linhas inválidas.'
      },
      {
        id: 'gl4',
        step: '04',
        name: 'Actionable Outreach Sync',
        type: 'Campaign Trigger',
        tech: 'React Data Grid + WhatsApp',
        metric: 'Disparo com 1 Clique',
        status: 'synced',
        description: 'Exportação limpa e início instantâneo de campanhas ativas de WhatsApp.'
      }
    ],
    architecture: [
      {
        title: 'Geographic Bounding Box',
        role: 'Spatial Ingress',
        tech: 'Lat/Lng Coordinate Bounds',
        details: 'Garante que os resultados respeitem estritamente o raio geográfico desejado.'
      },
      {
        title: 'Raw Snapshot Store',
        role: 'Data Preservation',
        tech: 'PostgreSQL JSONB',
        details: 'Salva o payload bruto original para permitir novas higienizações sem novos custos.'
      },
      {
        title: 'Phone Normalizer',
        role: 'Data Cleansing',
        tech: 'E.164 Regex Engine',
        details: 'Valida DDD, formata números para WhatsApp e descarta registros inválidos.'
      },
      {
        title: 'Instant Outreach Trigger',
        role: 'Action Layer',
        tech: 'React Data Grid + WhatsApp API',
        details: 'Inicia conversas e fluxos de prospecção com um clique.'
      }
    ],
    codeSnippet: {
      filename: 'places-sanitizer.ts',
      language: 'typescript',
      code: `// Normalização E.164 para WhatsApp
export function formatToE164(rawPhone: string): { phone: string; isMobile: boolean } | null {
  const digits = rawPhone.replace(/\\D/g, '');
  if (digits.length !== 10 && digits.length !== 11) return null;

  const phone = \`+55\${digits}\`;
  const isMobile = digits.length === 11 && digits[2] === '9';

  return { phone, isMobile };
}`,
      explanation: 'Converte telefones em padrão universal pronto para envio de mensagens ativas.'
    },
    liveDemoType: 'geo-lead',
    deepDive: {
      problem: 'Consultas de locais frequentemente devolvem resultados fora da região ou com telefones fixos incompatíveis com WhatsApp.',
      solution: 'Estratégia de coordenadas vetoriais com normalização rigorosa e retenção dos dados brutos.',
      keyDecisions: [
        'Busca por coordenadas lat/lng evitando derivações de consultas textuais genéricas.',
        'Armazenamento imutável de respostas para auditoria permanente.',
        'Exportação rápida em CSV/JSON para fluxos de prospecção.'
      ],
      securityPrivacy: 'Tratamento de dados públicos em total conformidade com diretrizes de prospecção B2B.'
    }
  }
];

export const TECHNICAL_DOMAINS = [
  {
    title: 'Orquestração n8n & Agentes Autônomos',
    tech: 'n8n Self-Hosted · Redis Buffer · Tool Calling · Sub-Workflows',
    desc: 'Engines completas de prospecção, debounce de mensagens picadas no WhatsApp, retomada de cadências e handoff humano com estado.'
  },
  {
    title: 'Observabilidade & Engenharia de SLAs',
    tech: 'Prometheus · Grafana · OpenTelemetry · Next.js 16 · Prisma',
    desc: 'Sentinelas de monitoramento contínuo em centenas de grupos de WhatsApp, classificação de sentimento em tempo real e exportadores Prometheus.'
  },
  {
    title: 'Sistemas Concorrentes & Go',
    tech: 'Go (whatsmeow) · Node.js · Fastify · Docker · WebSockets',
    desc: 'Microsserviços de alto rendimento, auto-healing de conexões WhatsApp, gateways sub-40ms e monorepos Turborepo.'
  },
  {
    title: 'Bancos de Dados & Segurança RLS',
    tech: 'PostgreSQL · Row-Level Security · pgvector · pg-boss',
    desc: 'Isolamento estrito multi-tenant no nível do banco, filas transacionais ACID e busca vetorial HNSW com zero vazamento de dados.'
  }
];

export const CORE_PHILOSOPHY = [
  {
    number: 'I',
    title: 'Factualidade Absoluta',
    desc: 'Modelos de linguagem constroem narrativa; código determinístico e guardrails garantem a verdade fática. Preços, links e decisões críticas nunca são entregues à alucinação.'
  },
  {
    number: 'II',
    title: 'Observabilidade em Tempo Real',
    desc: 'Se não é mensurável com métricas de P99, histogramas de latência e contadores de SLA, não está pronto para produção.'
  },
  {
    number: 'III',
    title: 'Isolamento por Design',
    desc: 'A segurança é estabelecida no nível mais baixo da infraestrutura — do Row-Level Security no Postgres ao mascaramento completo de dados sensíveis.'
  },
  {
    number: 'IV',
    title: 'Resiliência de Estado & Debounce',
    desc: 'Filas transacionais que sobrevivem a reinicializações, janelas deslizantes de mensagens no Redis e arquiteturas que falham com elegância.'
  }
];
