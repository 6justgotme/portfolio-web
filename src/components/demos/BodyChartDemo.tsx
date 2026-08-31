import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Point {
  id: string;
  x: number;
  y: number;
  area: string;
  substance: string;
  dosage: number;
  costPerMl: number;
}

export const BodyChartDemo: React.FC = () => {
  const [selectedSubstance, setSelectedSubstance] = useState<'botox' | 'filler' | 'sculptra'>('botox');
  const [points, setPoints] = useState<Point[]>([
    { id: '1', x: 50, y: 22, area: 'Frontal', substance: 'Toxina Botulínica', dosage: 12, costPerMl: 18 },
    { id: '2', x: 38, y: 30, area: 'Glabela', substance: 'Toxina Botulínica', dosage: 8, costPerMl: 18 },
    { id: '3', x: 62, y: 30, area: 'Glabela', substance: 'Toxina Botulínica', dosage: 8, costPerMl: 18 },
    { id: '4', x: 42, y: 48, area: 'Malar E.', substance: 'Ácido Hialurônico', dosage: 1.0, costPerMl: 340 },
    { id: '5', x: 58, y: 48, area: 'Malar D.', substance: 'Ácido Hialurônico', dosage: 1.0, costPerMl: 340 }
  ]);
  const [procedurePrice, setProcedurePrice] = useState(2400);
  const [sessionMinutes, setSessionMinutes] = useState(45);

  const substancesConfig = {
    botox: { name: 'Toxina Botulínica', unit: 'U', defaultDosage: 10, costPerUnit: 18, color: '#A855F7' },
    filler: { name: 'Ácido Hialurônico', unit: 'ml', defaultDosage: 1.0, costPerUnit: 340, color: '#EC4899' },
    sculptra: { name: 'Bioestimulador', unit: 'frasco', defaultDosage: 0.5, costPerUnit: 520, color: '#10B981' }
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const sub = substancesConfig[selectedSubstance];
    const newPoint: Point = {
      id: Date.now().toString(),
      x,
      y,
      area: y < 35 ? 'Terço Superior' : y < 65 ? 'Terço Médio' : 'Terço Inferior',
      substance: sub.name,
      dosage: sub.defaultDosage,
      costPerMl: sub.costPerUnit
    };

    setPoints([...points, newPoint]);
  };

  const removePoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPoints(points.filter(p => p.id !== id));
  };

  const totalConsumablesCost = points.reduce((acc, p) => acc + (p.dosage * p.costPerMl), 0);
  const clinicMinuteCost = 3.50;
  const operationalRoomCost = sessionMinutes * clinicMinuteCost;
  const professionalCommission = procedurePrice * 0.25;
  const totalCost = totalConsumablesCost + operationalRoomCost + professionalCommission;
  const realNetMargin = procedurePrice - totalCost;
  const marginPercent = procedurePrice > 0 ? (realNetMargin / procedurePrice) * 100 : 0;

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header Minimalista */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              Mapeamento Anatômico & Margem Real
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Clique no mapa facial para inserir doses vetoriais e recalcular custos instantaneamente.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          RLS ISOLATION
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Canvas Anatômico */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-black/40 rounded-xl p-4 border border-white/[0.04]">
          {/* Seletor de Substâncias Minimalista */}
          <div className="w-full flex items-center justify-center gap-1 mb-3">
            {(Object.keys(substancesConfig) as Array<keyof typeof substancesConfig>).map((key) => {
              const item = substancesConfig[key];
              const isSelected = selectedSubstance === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSubstance(key)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? '#000' : item.color }} />
                  {item.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full max-w-[240px] aspect-[3/4] rounded-lg overflow-hidden border border-white/[0.06] bg-[#05060A]">
            <svg
              viewBox="0 0 100 120"
              onClick={handleSvgClick}
              className="w-full h-full cursor-crosshair select-none"
            >
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="120" fill="url(#grid)" />

              <path
                d="M50,12 C30,12 20,30 20,55 C20,78 32,95 44,106 C48,110 52,110 56,106 C68,95 80,78 80,55 C80,30 70,12 50,12 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <line x1="50" y1="12" x2="50" y2="108" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="25" y1="48" x2="75" y2="48" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="28" y1="72" x2="72" y2="72" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="1 1" />

              {points.map((p) => {
                const isFiller = p.substance.includes('Ácido');
                const isSculptra = p.substance.includes('Bioestimulador');
                const color = isSculptra ? '#10B981' : isFiller ? '#EC4899' : '#A855F7';

                return (
                  <g key={p.id} className="cursor-pointer">
                    <circle cx={p.x} cy={p.y} r="3.5" fill={color} fillOpacity="0.3" />
                    <circle cx={p.x} cy={p.y} r="1.8" fill={color} stroke="#FFFFFF" strokeWidth="0.6" />
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
              <span className="text-[9px] font-mono-tech text-white/40 bg-black/60 px-2 py-0.5 rounded border border-white/[0.04]">
                {points.length} pontos mapeados
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown de Custos */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-black/40 rounded-xl p-3.5 border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2 font-mono-tech">
              <span>Insumos Mapeados</span>
              <span className="text-[10px] text-white/30">Baixa fracionada</span>
            </div>

            <div className="max-h-[120px] overflow-y-auto space-y-1 pr-1 text-xs font-mono-tech">
              {points.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-white/[0.02] px-2 py-1 rounded border border-white/[0.03]"
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="truncate text-white/70">{p.area}</span>
                    <span className="text-[10px] text-white/30">({p.dosage} {p.substance.includes('Toxina') ? 'U' : 'ml'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80">R$ {(p.dosage * p.costPerMl).toFixed(0)}</span>
                    <button
                      onClick={(e) => removePoint(p.id, e)}
                      className="text-white/20 hover:text-rose-400 p-0.5 cursor-pointer"
                      title="Remover"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulador */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
              <div>
                <label className="text-[10px] text-white/40 block mb-1">Preço Total (R$)</label>
                <input
                  type="number"
                  value={procedurePrice}
                  onChange={(e) => setProcedurePrice(Number(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/40 block mb-1">Tempo de Sala (min)</label>
                <input
                  type="number"
                  value={sessionMinutes}
                  onChange={(e) => setSessionMinutes(Number(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-3 flex items-center justify-between font-mono-tech">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Margem Líquida Real</span>
                <span className="text-lg font-medium text-white">
                  R$ {realNetMargin.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/80 font-medium">
                  {marginPercent.toFixed(1)}% Margem
                </span>
                <span className="text-[9px] text-white/30 block mt-0.5">Auditado por Sessão</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
