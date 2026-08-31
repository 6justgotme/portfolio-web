import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface PlaceItem {
  id: string;
  name: string;
  phone: string;
  isMobile: boolean;
  address: string;
  rating: number;
  reviews: number;
  category: string;
}

export const GeoLeadDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'clinics' | 'events' | 'lawyers'>('clinics');
  const [onlyMobile, setOnlyMobile] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const mockDatabase: Record<string, PlaceItem[]> = {
    clinics: [
      { id: '1', name: 'Clínica Dermatológica & Estética Moema', phone: '+55 11 98741-2299', isMobile: true, address: 'Av. Ibirapuera, 2120 - Moema, SP', rating: 4.9, reviews: 184, category: 'Estética' },
      { id: '2', name: 'Instituto Integrado Facial', phone: '+55 11 99312-8844', isMobile: true, address: 'Rua Bela Cintra, 1450 - Jardins, SP', rating: 4.8, reviews: 92, category: 'Harmonização' },
      { id: '3', name: 'Centro Clínico Alphaville', phone: '+55 11 97120-3311', isMobile: true, address: 'Al. Rio Negro, 500 - Alphaville, SP', rating: 5.0, reviews: 240, category: 'Medicina' },
      { id: '4', name: 'Consultório Odonto Paulista', phone: '+55 11 3284-5500', isMobile: false, address: 'Av. Paulista, 1000 - SP', rating: 4.6, reviews: 58, category: 'Odontologia' },
    ],
    events: [
      { id: '5', name: 'Espaço Villa Real Eventos', phone: '+55 11 98455-7711', isMobile: true, address: 'Rua Funchal, 418 - Vila Olímpia, SP', rating: 4.9, reviews: 310, category: 'Salão' },
      { id: '6', name: 'Mansão Gaia Casa de Festas', phone: '+55 11 99182-0044', isMobile: true, address: 'Av. Morumbi, 6000 - SP', rating: 4.8, reviews: 145, category: 'Casamentos' },
    ],
    lawyers: [
      { id: '7', name: 'Sociedade de Advogados Tributários', phone: '+55 11 97600-4411', isMobile: true, address: 'Rua Faria Lima, 3477 - SP', rating: 4.9, reviews: 78, category: 'Tributário' },
      { id: '8', name: 'Gomes & Associados Advocacia', phone: '+55 11 3105-9988', isMobile: false, address: 'Rua Boa Vista, 254 - SP', rating: 4.7, reviews: 42, category: 'Empresarial' }
    ]
  };

  const allResults = mockDatabase[selectedCategory] || mockDatabase.clinics;
  const filteredResults = onlyMobile ? allResults.filter(r => r.isMobile) : allResults;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Snapshot Bruto e CSV E.164 exportados com sucesso.');
    }, 500);
  };

  return (
    <div className="bg-[#090A10] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-white/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <h4 className="text-xs uppercase font-mono-tech tracking-wider text-white/90">
              GeoLead &middot; Ingestão & Higienização E.164
            </h4>
          </div>
          <p className="text-[11px] text-white/40 font-light">
            Bounding Box por coordenadas geográficas com preservação integral de snapshots.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech text-white/40 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.05]">
          TELEFONES ~92%
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Controles */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-black/40 p-4 rounded-xl border border-white/[0.04] space-y-3">
            <div>
              <label className="text-[11px] uppercase font-mono-tech text-white/40 block mb-1.5">
                Segmento
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'clinics', label: 'Clínicas' },
                  { id: 'events', label: 'Eventos' },
                  { id: 'lawyers', label: 'Direito' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id as any)}
                    className={`py-1.5 rounded-lg text-xs font-mono-tech border text-center transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04]">
              <label className="flex items-center justify-between cursor-pointer text-xs text-white/60">
                <span>Apenas WhatsApp Válido</span>
                <input
                  type="checkbox"
                  checked={onlyMobile}
                  onChange={(e) => setOnlyMobile(e.target.checked)}
                  className="w-4 h-4 rounded text-white focus:ring-0 cursor-pointer accent-white"
                />
              </label>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exportando...' : 'Exportar E.164 (CSV)'}</span>
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="lg:col-span-8 bg-black/40 border border-white/[0.05] rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/[0.02] px-4 py-2 border-b border-white/[0.04] flex items-center justify-between text-[11px] font-mono-tech text-white/40">
            <span>REGISTROS HIGIENIZADOS ({filteredResults.length})</span>
            <span>E.164 FORMAT</span>
          </div>

          <div className="p-3 space-y-2 overflow-y-auto max-h-[260px]">
            {filteredResults.map((p) => (
              <div
                key={p.id}
                className="bg-white/[0.01] border border-white/[0.03] hover:border-white/20 rounded-xl p-3 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white/90">{p.name}</span>
                    <span className="text-[9px] font-mono-tech text-white/40 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.04]">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/40 font-light">
                    <span>{p.address}</span>
                    <span>&middot;</span>
                    <span className="text-white/60 font-mono-tech">{p.rating}★ ({p.reviews})</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-mono-tech text-xs text-white/90 block">
                    {p.phone}
                  </span>
                  <span className="text-[9px] text-white/30 font-mono-tech">
                    {p.isMobile ? 'WhatsApp' : 'Fixo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
