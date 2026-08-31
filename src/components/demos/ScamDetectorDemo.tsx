import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface ThreatSample {
  id: string;
  name: string;
  senderPhone: string;
  message: string;
  expectedVerdict: 'CRITICAL' | 'SUSPICIOUS' | 'SAFE';
  category: string;
}

export const ScamDetectorDemo: React.FC = () => {
  const samples: ThreatSample[] = [
    {
      id: 'scam1',
      name: 'Falso Filho / Troca de Número',
      senderPhone: '+55 11 98842-XXXX (Não salvo)',
      message: 'Oi mãe! Meu celular quebrou a tela, salva esse provisório. Preciso pagar um fornecedor com urgência até às 16h e meu banco bloqueou o token. Faz um Pix de R$ 2.450 pra chave que te passo?',
      expectedVerdict: 'CRITICAL',
      category: 'Engenharia Social'
    },
    {
      id: 'scam2',
      name: 'Falso Boleto / Bloqueio Bancário',
      senderPhone: '+55 0800 591 XXXX',
      message: 'NOTIFICAÇÃO: Acesso não autorizado detectado. Saldo congelado por segurança. Regularize agora em: https://suporte-banco-seguro.com/login',
      expectedVerdict: 'CRITICAL',
      category: 'Phishing Bancário'
    },
    {
      id: 'safe1',
      name: 'Comunicação Legítima',
      senderPhone: '+55 11 97721-XXXX (Contato Salvo)',
      message: 'Boa tarde Carlos! Segue em anexo o relatório mensal de desempenho das campanhas. Alinhamos os detalhes na reunião de sexta.',
      expectedVerdict: 'SAFE',
      category: 'Operacional'
    }
  ];

  const [selectedSample, setSelectedSample] = useState<ThreatSample>(samples[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    verdict: 'CRITICAL' | 'SUSPICIOUS' | 'SAFE';
    vectorDistance: number;
    heuristicTriggers: string[];
  }>({
    score: 94,
    verdict: 'CRITICAL',
    vectorDistance: 0.12,
    heuristicTriggers: ['Gatilho de Urgência Familiar', 'Solicitação de Transferência Pix', 'Número Desconhecido']
  });

  const handleRunAnalysis = (sample: ThreatSample) => {
    setSelectedSample(sample);
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      if (sample.expectedVerdict === 'CRITICAL') {
        setAnalysisResult({
          score: sample.id === 'scam1' ? 96 : 91,
          verdict: 'CRITICAL',
          vectorDistance: 0.084,
          heuristicTriggers: sample.id === 'scam1'
            ? ['Falso Número Novo', 'Gatilho de Urgência Imediata', 'Chave Pix de Terceiro']
            : ['Falso Domínio Bancário', 'Ameaça de Bloqueio', 'Phishing Link']
        });
      } else {
        setAnalysisResult({
          score: 4,
          verdict: 'SAFE',
          vectorDistance: 0.89,
          heuristicTriggers: ['Nenhum padrão malicioso detectado', 'Contato frequente verificado']
        });
      }
    }, 400);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              SentinelShield &middot; Análise Forense de Ameaças
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Single Binary Multi-Role em Go/TS, fila ACID pg-boss e busca vetorial de assinaturas.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          PGVECTOR HNSW
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Amostras */}
        <div className="lg:col-span-5 space-y-2.5">
          <label className="text-[11px] uppercase font-mono-tech text-white/40 block">
            Payloads Interceptados
          </label>

          <div className="space-y-1.5">
            {samples.map((s) => (
              <button
                key={s.id}
                onClick={() => handleRunAnalysis(s)}
                className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedSample.id === s.id
                    ? 'bg-white/[0.06] border-white/30 text-white'
                    : 'bg-white/[0.01] border-white/[0.03] text-white/40 hover:text-white/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>{s.name}</span>
                  <span className="text-[10px] font-mono-tech text-white/40">
                    {s.expectedVerdict}
                  </span>
                </div>
                <div className="text-[11px] text-white/50 mt-1 line-clamp-1 font-light">
                  "{s.message}"
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Relatório Forense */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-black/40 border border-white/[0.04] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-[9px] uppercase font-mono-tech text-white/40 block">
                  Probabilidade de Ameaça
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-medium font-mono-tech text-white">
                    {analyzing ? '...' : `${analysisResult.score}/100`}
                  </span>
                  <span className="text-xs font-mono-tech text-white/70">
                    {analyzing ? 'ANALISANDO' : analysisResult.verdict === 'CRITICAL' ? 'AMEAÇA DETECTADA' : 'SEGURO'}
                  </span>
                </div>
              </div>

              <div className="text-right font-mono-tech">
                <span className="text-[9px] text-white/30 block uppercase">Distância Vetorial</span>
                <span className="text-xs text-white/80 font-medium">
                  {analysisResult.vectorDistance} (&lt; 0.15)
                </span>
              </div>
            </div>

            {/* Triggers */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono-tech text-white/40 block">
                Padrões Heurísticos & Assinaturas
              </span>
              {analysisResult.heuristicTriggers.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.03] text-xs font-light"
                >
                  <div className="flex items-center gap-2">
                    {analysisResult.verdict === 'CRITICAL' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="text-white/80">{t}</span>
                  </div>
                  <span className="text-[9px] font-mono-tech text-white/30">MATCH</span>
                </div>
              ))}
            </div>

            {/* Ação */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono-tech text-white/60 flex items-center justify-between">
              <span>
                {analysisResult.verdict === 'CRITICAL'
                  ? 'Ação: Bloqueio Imediato & Hash Forense'
                  : 'Ação: Tráfego Liberado'}
              </span>
              <span className="text-[10px] text-white/30">pg-boss: ack</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
