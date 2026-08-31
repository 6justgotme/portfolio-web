import React, { useState } from 'react';
import { Bot, Volume2, CheckCheck, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  type: 'text' | 'audio' | 'image';
  content: string;
  meta?: string;
  timestamp: string;
}

export const AiChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      type: 'audio',
      content: 'Orçamento para casamento de 180 convidados em novembro num sábado, com buffet completo.',
      meta: 'Whisper 180ms • 99.8% Confiança',
      timestamp: '19:42'
    },
    {
      id: '2',
      sender: 'agent',
      type: 'text',
      content: 'Para novembro aos sábados no Salão Cristal (até 250 pessoas), o Pacote Diamond com buffet completo, mobiliário clássico e gerador fica em R$ 38.500 para 180 convidados. Deseja agendar uma degustação?',
      meta: 'pgvector RAG Hit (0.94) • Latência 1.4s',
      timestamp: '19:42'
    }
  ]);
  const [selectedMockPreset, setSelectedMockPreset] = useState<'budget' | 'photo' | 'audio'>('photo');
  const [isTyping, setIsTyping] = useState(false);

  const presets = {
    budget: {
      type: 'text' as const,
      text: 'Vocês têm disponibilidade para o feriado de 15 de novembro? E formas de parcelamento?',
      reply: 'Para 15 de novembro o Espaço Jardim está disponível. Parcelamento em até 12x no boleto até o evento ou 8% de desconto via Pix. Deseja reservar a pré-data por 48 horas?',
      meta: 'pgvector HNSW Calendar Query'
    },
    photo: {
      type: 'image' as const,
      text: 'Gostaria de uma decoração floral com este estilo rústico.',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
      reply: 'Visão Computacional (Gemini): Estilo Boho-Chic com arranjos de eucalipto e fairy lights identificado. O salão possui este acervo próprio, economizando ~R$ 4.200 em locação externa.',
      meta: 'Gemini 1.5 Vision • 3 itens identificados'
    },
    audio: {
      type: 'audio' as const,
      text: 'Tem como incluir open bar de drinks clássicos no pacote?',
      reply: 'Módulo Open Bar Premium adicionado: 6 drinks clássicos e chopp artesanal duplo por R$ 32/pessoa. Prévia de orçamento atualizada.',
      meta: 'Whisper Audio (0:04s) • Cálculo dinâmico'
    }
  };

  const handleSendPreset = () => {
    const preset = presets[selectedMockPreset];
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: preset.type,
      content: preset.text,
      meta: preset.type === 'audio' ? 'Áudio transcrito' : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        type: 'text',
        content: preset.reply,
        meta: preset.meta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 600);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              Concierge Multi-Modal & RAG Vetorial
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Voz (Whisper), visão computacional (Gemini) e buffer deslizante no Redis.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          REDIS BUFFER 8s
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Chat */}
        <div className="lg:col-span-7 bg-black/40 rounded-xl border border-white/[0.05] flex flex-col h-[380px] overflow-hidden">
          <div className="bg-white/[0.02] px-4 py-2 border-b border-white/[0.04] flex items-center justify-between text-[11px] font-mono-tech text-white/50">
            <div className="flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" />
              <span>Concierge IA &middot; WhatsApp</span>
            </div>
            <span>pgvector HNSW</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-light ${
                    m.sender === 'user'
                      ? 'bg-white/[0.08] text-white border border-white/[0.1] rounded-tr-xs'
                      : 'bg-white/[0.02] text-white/80 border border-white/[0.04] rounded-tl-xs'
                  }`}
                >
                  {m.type === 'audio' && (
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono-tech text-white/50">
                      <Volume2 className="w-3 h-3" />
                      <span>Mensagem de Voz</span>
                    </div>
                  )}

                  {m.type === 'image' && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/[0.08] max-w-[180px]">
                      <img src={presets.photo.imageUrl} alt="Ref" className="w-full h-20 object-cover" />
                    </div>
                  )}

                  <p>{m.content}</p>

                  <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-white/[0.04] text-[9px] font-mono-tech text-white/30">
                    <span>{m.timestamp}</span>
                    {m.meta && <span className="truncate">{m.meta}</span>}
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-white/60" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white/[0.02] text-white/40 px-3 py-1.5 rounded-xl text-xs w-fit border border-white/[0.04] font-mono-tech text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1">Consultando RAG...</span>
              </div>
            )}
          </div>
        </div>

        {/* Gatilhos */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-black/40 p-4 rounded-xl border border-white/[0.04] space-y-2.5">
            <h5 className="text-[11px] uppercase font-mono-tech text-white/40">
              Simular Ingestão de Mensagem
            </h5>

            <div className="space-y-1.5">
              {[
                { id: 'photo', label: 'Foto de Referência (Decoração)', sub: 'Gemini 1.5 Vision' },
                { id: 'audio', label: 'Mensagem de Voz (Pergunta)', sub: 'Whisper STT (180ms)' },
                { id: 'budget', label: 'Consulta de Data & Condições', sub: 'Busca Semântica HNSW' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedMockPreset(preset.id as any)}
                  className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedMockPreset === preset.id
                      ? 'bg-white/[0.06] border-white/30 text-white'
                      : 'bg-white/[0.01] border-white/[0.03] text-white/40 hover:text-white/70'
                  }`}
                >
                  <div className="text-xs font-medium text-white/90">{preset.label}</div>
                  <div className="text-[10px] font-mono-tech text-white/40">{preset.sub}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSendPreset}
              disabled={isTyping}
              className="w-full py-2.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Injetar no Buffer</span>
            </button>
          </div>

          <div className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.04] text-[10px] font-mono-tech text-white/40 grid grid-cols-2 gap-2">
            <div>
              <span className="text-white/20 block uppercase">Latência Whisper</span>
              <span className="text-white text-xs font-medium mt-0.5 block">142ms</span>
            </div>
            <div>
              <span className="text-white/20 block uppercase">Cosine Similarity</span>
              <span className="text-white text-xs font-medium mt-0.5 block">0.942 HNSW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
