"use client";

import { useMemo, useState } from "react";
import { MapPin, Navigation, Filter, Zap } from "lucide-react";
import {
  generateSmartRoute,
  getStoresByMission,
  calculateDistance,
  estimateTravelTime,
  filterStoresByAdvancedCriteria,
  type Mission,
  type Store,
  type SmartRoute,
} from "@/lib/data";

interface IntelligentMapProps {
  missionSlug?: string;
}

export function IntelligentMap({ missionSlug }: IntelligentMapProps) {
  const [selectedMission, setSelectedMission] = useState(missionSlug);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    minTrust: 0,
    parkingRequired: false,
    crowdPreference: undefined as 'low' | 'medium' | 'high' | undefined,
    difficulty: undefined as 'easy' | 'moderate' | 'hard' | undefined,
  });

  const route = useMemo(() => {
    return selectedMission ? generateSmartRoute(selectedMission) : null;
  }, [selectedMission]);

  const filteredStores = useMemo(() => {
    if (!route) return [];
    return filterStoresByAdvancedCriteria({
      missions: selectedMission ? [selectedMission] : undefined,
      minTrust: filters.minTrust || undefined,
      parkingRequired: filters.parkingRequired,
      crowdPreference: filters.crowdPreference,
      difficulty: filters.difficulty,
    });
  }, [route, selectedMission, filters]);

  if (!route || !selectedMission) {
    return (
      <div className="rounded-[32px] border border-dashed border-black/10 bg-white p-10 text-center">
        <p className="text-lg font-bold text-[#0a0a0a]">Selecione uma missão para ver a rota inteligente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header da Rota */}
      <div className="rounded-[30px] bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold opacity-90">Rota Inteligente</p>
            <h2 className="text-2xl font-bold tracking-tight">
              {route.stores.length} paradas • {route.totalDistance} km • ~{route.estimatedTime} min
            </h2>
            <p className="mt-2 text-sm opacity-80">{route.description}</p>
          </div>
          <div className="text-right">
            <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Dificuldade: {route.difficulty}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros Avançados */}
      <div className="rounded-[20px] border border-black/6 bg-white p-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 font-semibold text-[#0a0a0a]"
        >
          <Filter className="h-4 w-4" />
          Filtros Avançados
        </button>
        {showAdvancedFilters && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs font-semibold text-[#687264]">Confiança Mínima</label>
              <input
                type="range"
                min="0"
                max="10"
                value={filters.minTrust}
                onChange={(e) => setFilters({ ...filters, minTrust: Number(e.target.value) })}
                className="mt-2 w-full"
              />
              <span className="text-xs text-[#687264]">{filters.minTrust}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={filters.parkingRequired}
                onChange={(e) => setFilters({ ...filters, parkingRequired: e.target.checked })}
                className="h-4 w-4 rounded"
              />
              <label htmlFor="parking" className="text-xs font-semibold text-[#687264]">
                Estacionamento obrigatório
              </label>
            </div>
            <select
              value={filters.crowdPreference || ""}
              onChange={(e) => setFilters({ ...filters, crowdPreference: (e.target.value as any) || undefined })}
              className="rounded-lg border border-black/10 px-3 py-2 text-xs"
            >
              <option value="">Preferência de aglomeração</option>
              <option value="low">Pouco movimento</option>
              <option value="medium">Movimento moderado</option>
              <option value="high">Bastante movimento</option>
            </select>
            <select
              value={filters.difficulty || ""}
              onChange={(e) => setFilters({ ...filters, difficulty: (e.target.value as any) || undefined })}
              className="rounded-lg border border-black/10 px-3 py-2 text-xs"
            >
              <option value="">Dificuldade de compra</option>
              <option value="easy">Fácil</option>
              <option value="moderate">Moderada</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
        )}
      </div>

      {/* Detalhes da Rota */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-[#0a0a0a]">Sequência de Paradas</h3>
        {route.stores.map((store, index) => (
          <RouteStopCard key={store.id} store={store} stopNumber={index + 1} totalStops={route.stores.length} />
        ))}
      </div>

      {/* Segmentos de Rota */}
      {route.segments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#0a0a0a]">Trajetos</h3>
          {route.segments.map((segment, index) => (
            <div key={index} className="rounded-[16px] border border-black/6 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-[#687264]">Parada {index + 1}</p>
                    <p className="font-semibold text-[#0a0a0a]">
                      {segment.from} → {segment.to}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0a0a0a]">{segment.distance} km</p>
                  <p className="text-xs text-[#687264]">{segment.duration} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recomendações */}
      <div className="rounded-[24px] border border-amber-200/50 bg-amber-50/50 p-5">
        <div className="flex gap-3">
          <Zap className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">Dica inteligente</p>
            <p className="mt-1 opacity-90">
              Comece cedo (7h-9h) para evitar aglomeração. Use horários de menor movimento indicados em cada loja para
              comprar mais tranquilo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteStopCard({
  store,
  stopNumber,
  totalStops,
}: {
  store: Store;
  stopNumber: number;
  totalStops: number;
}) {
  return (
    <div className="rounded-[20px] border border-black/6 bg-white p-5 shadow-[0_4px_12px_rgba(10,10,10,0.08)]">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
            {stopNumber}
          </div>
          <div>
            <h4 className="font-bold text-[#0a0a0a]">{store.name}</h4>
            <p className="text-xs text-[#687264]">{store.address}</p>
          </div>
        </div>
        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          {store.crowdLevel === 'low' ? '📍 Menos movimento' : store.crowdLevel === 'high' ? '🔴 Aglomerado' : '🟡 Moderado'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-[#f6f7f2] p-2">
          <p className="text-xs text-[#687264]">Melhor horário</p>
          <p className="text-sm font-bold text-[#0a0a0a]">{store.bestTimeToVisit}</p>
        </div>
        <div className="rounded-lg bg-[#f6f7f2] p-2">
          <p className="text-xs text-[#687264]">Estacionamento</p>
          <p className="text-sm font-bold text-[#0a0a0a]">{store.parkingScore}/10</p>
        </div>
        <div className="rounded-lg bg-[#f6f7f2] p-2">
          <p className="text-xs text-[#687264]">Confiança</p>
          <p className="text-sm font-bold text-[#0a0a0a]">{store.score.trust.toFixed(1)}</p>
        </div>
        <div className="rounded-lg bg-[#f6f7f2] p-2">
          <p className="text-xs text-[#687264]">Dificuldade</p>
          <p className="text-sm font-bold text-[#0a0a0a]" style={{
            color: store.difficulty === 'easy' ? '#16a34a' : store.difficulty === 'hard' ? '#dc2626' : '#ea580c',
          }}>
            {store.difficulty === 'easy' ? '✓ Fácil' : store.difficulty === 'hard' ? '! Difícil' : '~ Moderada'}
          </p>
        </div>
      </div>

      <a
        href={store.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
      >
        <MapPin className="h-4 w-4" />
        Abrir no Google Maps
      </a>
    </div>
  );
}
