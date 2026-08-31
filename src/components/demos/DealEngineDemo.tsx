import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, ShieldAlert, Cpu } from 'lucide-react';

export const DealEngineDemo: React.FC = () => {
  const [autonomyLevel, setAutonomyLevel] = useState<'level1' | 'level2' | 'level3'>('level3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [testProduct, setTestProduct] = useState<'monitor' | 'phone' | 'coffee'>('monitor');
  const [aiHookMode, setAiHookMode] = useState<'safe' | 'hallucinated'>('safe');
  const [guardrailTriggered, setGuardrailTriggered] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'queued' | 'approved' | 'delivered'>('idle');

  const products = {
    monitor: {
      name: 'Monitor Gamer 27" QHD 165Hz IPS',
      originalPrice: 'R$ 1.899,00',
      promoPrice: 'R$ 1.199,00',
      coupon: 'PROMO100',
      realDiscount: '37% OFF',
      cleanUrl: 'https://meli.la/3xK9pL2'
    },
    phone: {
      name: 'Smartphone Pro 256GB 5G Titanium',
      originalPrice: 'R$ 5.499,00',
      promoPrice: 'R$ 3.899,00',
      coupon: 'TECH300',
      realDiscount: '29% OFF',
      cleanUrl: 'https://meli.la/7yP4mQ8'
    },
    coffee: {
      name: 'Cafeteira Espresso Automática 15 Bar',
      originalPrice: 'R$ 899,00',
      promoPrice: 'R$ 479,00',
      coupon: 'CAFE50',
      realDiscount: '46% OFF',
      cleanUrl: 'https://meli.la/9zW1kR5'
    }
  };

  const currentProd = products[testProduct];

  const handleSimulatePipeline = () => {
    setIsProcessing(true);
    setGuardrailTriggered(false);
    setDispatchStatus('queued');

    setTimeout(() => {
      setIsProcessing(false);
      if (aiHookMode === 'hallucinated') {
        setGuardrailTriggered(true);
      } else {
        setDispatchStatus(autonomyLevel === 'level1' ? 'delivered' : 'queued');
      }
    }, 500);
  };

  const generatedAiHook = aiHookMode === 'safe'
    ? 'Oportunidade confirmada no catálogo de monitores com cupom ativo e estoque verificado.'
    : 'Super promoção! Compre por apenas R$ 499 com 80% OFF acessando o link externo não auditado.';

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header Minimalista */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              Pipeline de Scraping & Guardrail Antialucinação
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Validação determinística de preços antes do transporte via Evolution Go.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          ACID STATE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Painel de Controle */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-black/40 p-4 rounded-xl border border-white/[0.04] space-y-3">
            <label className="text-[11px] uppercase font-mono-tech text-white/40 block">
              1. Payload Extraído
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['monitor', 'phone', 'coffee'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => { setTestProduct(key); setDispatchStatus('idle'); setGuardrailTriggered(false); }}
                  className={`py-1.5 rounded-lg text-xs font-mono-tech border text-center transition-all cursor-pointer ${
                    testProduct === key
                      ? 'bg-white text-black border-white'
                      : 'bg-white/[0.02] border-white/[0.05] text-white/50 hover:text-white'
                  }`}
                >
                  {key === 'monitor' ? 'Monitor' : key === 'phone' ? 'Phone' : 'Cafeteira'}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.04]">
              <label className="text-[11px] uppercase font-mono-tech text-white/40 block mb-2">
                2. Nível de Autonomia
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'level1', label: 'Nível 1: 100% Autônomo' },
                  { id: 'level2', label: 'Nível 2: Segmentação por Nicho' },
                  { id: 'level3', label: 'Nível 3: Supervisão Interativa' }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setAutonomyLevel(lvl.id as any)}
                    className={`w-full p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-all ${
                      autonomyLevel === lvl.id
                        ? 'bg-white/[0.06] border-white/30 text-white'
                        : 'bg-white/[0.01] border-white/[0.03] text-white/40 hover:text-white/70'
                    }`}
                  >
                    <span>{lvl.label}</span>
                    {autonomyLevel === lvl.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04]">
              <label className="text-[11px] uppercase font-mono-tech text-white/40 block mb-1.5">
                3. Teste de Guardrail
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setAiHookMode('safe')}
                  className={`py-1.5 rounded-lg text-xs font-mono-tech border cursor-pointer ${
                    aiHookMode === 'safe'
                      ? 'bg-white/15 border-white/40 text-white'
                      : 'bg-white/[0.02] border-white/[0.05] text-white/40'
                  }`}
                >
                  Modo Seguro
                </button>
                <button
                  onClick={() => setAiHookMode('hallucinated')}
                  className={`py-1.5 rounded-lg text-xs font-mono-tech border cursor-pointer ${
                    aiHookMode === 'hallucinated'
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                      : 'bg-white/[0.02] border-white/[0.05] text-white/40'
                  }`}
                >
                  Forçar Alucinação
                </button>
              </div>
            </div>

            <button
              onClick={handleSimulatePipeline}
              disabled={isProcessing}
              className="w-full py-2.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5" />}
              <span>Executar Validação</span>
            </button>
          </div>
        </div>

        {/* Prévia e Verificação */}
        <div className="lg:col-span-7 space-y-4">
          {guardrailTriggered ? (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3.5 text-rose-200 text-xs flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-300 font-mono-tech text-[11px] mb-0.5">
                  GUARDRAIL ACIONADO: Cópia Rejeitada
                </strong>
                <p className="text-[11px] text-rose-300/70">
                  Preço e link forjados foram interceptados pelo analisador sintático. Fallback fático ativado com zero risco.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-black/40 border border-white/[0.04] rounded-xl p-3 flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Alucinações Detectadas</span>
              </div>
              <span className="text-[10px] text-white/30">req_audit_verified</span>
            </div>
          )}

          {/* Card Prévia WhatsApp */}
          <div className="bg-black/40 border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="bg-white/[0.02] px-4 py-2 border-b border-white/[0.04] flex items-center justify-between text-[11px] font-mono-tech text-white/40">
              <span>WHATSAPP DISPATCH PAYLOAD</span>
              <span>MARKDOWN COMPLIANT</span>
            </div>

            <div className="p-4 space-y-3 text-xs font-sans-clean font-light leading-relaxed">
              <div className="bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.04] text-white/80">
                <p className="text-white/90 mb-2 font-normal">
                  {guardrailTriggered
                    ? 'Alerta de oportunidade verificada no catálogo de produtos:'
                    : generatedAiHook}
                </p>
                <p className="font-medium text-white">{currentProd.name}</p>
                <div className="space-y-0.5 font-mono-tech text-xs text-white/60 my-2">
                  <p className="line-through text-white/30">De: {currentProd.originalPrice}</p>
                  <p className="text-white font-medium text-sm">Por: {currentProd.promoPrice}</p>
                  <p className="text-white/70">Cupom: {currentProd.coupon} ({currentProd.realDiscount})</p>
                </div>
                <div className="pt-2 border-t border-white/[0.05] text-[11px] font-mono-tech text-white/40">
                  {currentProd.cleanUrl}
                </div>
              </div>

              {autonomyLevel === 'level3' && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 flex items-center justify-between">
                  <span className="text-[11px] text-white/50 font-mono-tech">Aprovação Interativa:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDispatchStatus('delivered')}
                      className={`px-3 py-1 rounded text-xs font-mono-tech transition-all cursor-pointer ${
                        dispatchStatus === 'delivered'
                          ? 'bg-white text-black'
                          : 'bg-white/[0.05] text-white hover:bg-white/15 border border-white/10'
                      }`}
                    >
                      {dispatchStatus === 'delivered' ? 'Enviado' : 'Aprovar Envio'}
                    </button>
                    <button
                      onClick={() => setDispatchStatus('idle')}
                      className="px-3 py-1 rounded text-xs font-mono-tech bg-transparent text-white/40 hover:text-white border border-white/5 cursor-pointer"
                    >
                      Descartar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
