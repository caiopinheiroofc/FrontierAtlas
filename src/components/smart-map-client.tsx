"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock3, MapPinned, Route } from "lucide-react";
import { GoogleSmartMap } from "@/components/google-smart-map";
import {
  smartMapMissionRoutes,
  smartMapOrigins,
  type SmartMapZoneGroup,
} from "@/lib/smart-map";

type TouristRoute = {
  slug: "1-dia" | "3-dias";
  title: string;
  subtitle: string;
  description: string;
  missionSlug: string;
  idealFor: string;
};

const touristRoutes: TouristRoute[] = [
  {
    slug: "1-dia",
    title: "Rota de 1 dia",
    subtitle: "Essencial para turista",
    description: "Percurso mais curto para resolver o principal com lojas confiáveis e pouco desvio.",
    missionSlug: "primeira-viagem",
    idealFor: "Quem vai e volta no mesmo dia ou quer uma compra mais rápida.",
  },
  {
    slug: "3-dias",
    title: "Rota de 3 dias",
    subtitle: "Mais comparação e calma",
    description: "Rota mais aberta para quem quer comparar melhor, visitar mais lojas e dividir a compra com menos pressa.",
    missionSlug: "eletronicos",
    idealFor: "Quem vai ficar mais tempo e quer comprar com mais profundidade.",
  },
];

export function SmartMapClient({ zones }: { zones: SmartMapZoneGroup[] }) {
  const [selectedRouteSlug, setSelectedRouteSlug] = useState<TouristRoute["slug"]>("1-dia");

  const allStores = useMemo(() => zones.flatMap((zone) => zone.stores), [zones]);
  const storeMap = useMemo(() => new Map(allStores.map((item) => [item.store.slug, item])), [allStores]);
  const selectedRoute = touristRoutes.find((route) => route.slug === selectedRouteSlug) ?? touristRoutes[0];
  const selectedMission =
    smartMapMissionRoutes.find((route) => route.slug === selectedRoute.missionSlug) ?? smartMapMissionRoutes[0];
  const currentOrigin =
    smartMapOrigins.find((origin) => origin.slug === selectedMission.recommendedOriginSlug) ?? smartMapOrigins[0] ?? null;

  const routeStores = useMemo(
    () => selectedMission.storeSlugs.map((slug) => storeMap.get(slug)).filter(Boolean),
    [selectedMission.storeSlugs, storeMap],
  );

  const routePoints = useMemo(() => {
    const points = [];
    if (currentOrigin) {
      points.push(currentOrigin.coordinate);
    }
    for (const item of routeStores) {
      if (item.coordinate) {
        points.push(item.coordinate);
      }
    }
    return points;
  }, [currentOrigin, routeStores]);

  const routeStops = routeStores.map((item) => item.store.name);
  const routeZones = useMemo(() => {
    const slugs = new Set(routeStores.map((item) => item.zoneSlug));
    return zones.filter((zone) => slugs.has(zone.slug));
  }, [routeStores, zones]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Mapa para turista</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#0a0a0a]">
            Escolha uma rota simples para comprar o essencial na CDE
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5e685b]">
            A ideia aqui nao e mostrar tudo. E mostrar as lojas mais importantes e uma ordem clara para quem quer comprar bem em 1 dia ou em 3 dias.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {touristRoutes.map((route) => {
              const active = route.slug === selectedRouteSlug;

              return (
                <button
                  key={route.slug}
                  type="button"
                  onClick={() => setSelectedRouteSlug(route.slug)}
                  className={`rounded-[26px] border p-5 text-left transition ${
                    active
                      ? "border-[#d9ff1f] bg-[#0b120e] text-white shadow-[0_30px_80px_-45px_rgba(10,10,10,0.85)]"
                      : "border-black/6 bg-[#f8f9f3] text-[#0a0a0a]"
                  }`}
                >
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${active ? "text-[#d9ff1f]" : "text-[#6b7280]"}`}>
                    {route.subtitle}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{route.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${active ? "text-white/74" : "text-[#5e685b]"}`}>{route.description}</p>
                  <p className={`mt-4 text-sm font-semibold ${active ? "text-white" : "text-[#22331f]"}`}>{route.idealFor}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[30px] border border-black/6 bg-[#0b120e] p-6 text-white shadow-[0_30px_90px_-55px_rgba(10,10,10,0.8)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">Resumo da rota</p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{selectedRoute.title}</h3>
          <div className="mt-5 space-y-3 text-sm text-white/76">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4">
              <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-[#d9ff1f]" />
              <div>
                <p className="font-semibold text-white">Saida sugerida</p>
                <p>{currentOrigin?.title ?? "Ponto principal de entrada"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4">
              <Route className="mt-0.5 h-4 w-4 shrink-0 text-[#d9ff1f]" />
              <div>
                <p className="font-semibold text-white">Paradas principais</p>
                <p>{routeStores.length} lojas essenciais nesta rota.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#d9ff1f]" />
              <div>
                <p className="font-semibold text-white">Melhor uso</p>
                <p>{selectedRoute.idealFor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleSmartMap
        zones={routeZones}
        activeZoneSlug={routeZones[0]?.slug}
        customRoutePoints={routePoints}
        customRouteLabel={selectedRoute.title}
        customRouteAccent="#d9ff1f"
        customOrigin={currentOrigin ? { title: currentOrigin.title, coordinate: currentOrigin.coordinate } : undefined}
        customRouteStops={routeStops}
      />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Sequencia sugerida</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#d9ff1f] px-4 py-2 text-sm font-semibold text-[#0a0a0a]">
              Partida: {currentOrigin?.title ?? "origem"}
            </span>
            {routeStores.map((item, index) => (
              <span key={item.store.id} className="rounded-full bg-[#eff4e8] px-4 py-2 text-sm font-semibold text-[#4d564a]">
                {index + 1}. {item.store.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {routeStores.map((item, index) => (
            <div
              key={item.store.id}
              className="rounded-[26px] border border-black/6 bg-white p-4 shadow-[0_18px_70px_-55px_rgba(10,10,10,0.6)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#d9ff1f] text-sm font-black text-[#0a0a0a]">
                    {index + 1}
                  </div>
                  <div>
                    <Link href={`/lojas/${item.store.slug}`} className="text-lg font-black tracking-[-0.03em] text-[#0a0a0a]">
                      {item.store.name}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-[#596456]">{item.store.shortDescription}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#eff4e8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#4d564a]">
                  Principal
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-[#4f5950] sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f6f7f2] px-4 py-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#74806f]">Endereco</p>
                  <p className="mt-1">{item.store.address}</p>
                </div>
                <div className="rounded-2xl bg-[#f6f7f2] px-4 py-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#74806f]">Melhor para</p>
                  <p className="mt-1">{item.tripFits.join(" • ") || "compra principal"}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={item.store.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1b1b1b]"
                >
                  Abrir no Maps
                  <MapPinned className="h-4 w-4" />
                </a>
                <Link
                  href={`/lojas/${item.store.slug}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/8 bg-[#eff4e8] px-4 py-3 text-sm font-semibold text-[#0a0a0a]"
                >
                  Ver detalhes
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
