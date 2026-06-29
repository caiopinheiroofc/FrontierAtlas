"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Compass, Layers3, MapPinned, Route, Sparkles } from "lucide-react";
import { GoogleSmartMap } from "@/components/google-smart-map";
import {
  smartMapMissionRoutes,
  smartMapOrigins,
  type SmartMapZoneGroup,
} from "@/lib/smart-map";

export function SmartMapClient({ zones }: { zones: SmartMapZoneGroup[] }) {
  const [selectedZone, setSelectedZone] = useState<string>("todas");
  const [selectedFit, setSelectedFit] = useState<string>("todas");
  const [routeMode, setRouteMode] = useState<"mission" | "manual">("mission");
  const [selectedMissionSlug, setSelectedMissionSlug] = useState<string>(smartMapMissionRoutes[0]?.slug ?? "eletronicos");
  const [selectedOriginSlug, setSelectedOriginSlug] = useState<string>("");
  const [selectedStoreSlugs, setSelectedStoreSlugs] = useState<string[]>([]);

  const fitOptions = useMemo(() => {
    const values = new Set<string>();
    for (const zone of zones) {
      for (const item of zone.stores) {
        for (const fit of item.tripFits) {
          values.add(fit);
        }
      }
    }
    return ["todas", ...[...values].sort()];
  }, [zones]);

  const visibleZones = useMemo(() => {
    return zones
      .map((zone) => ({
        ...zone,
        stores: zone.stores.filter((item) => {
          const matchesZone = selectedZone === "todas" || zone.slug === selectedZone;
          const matchesFit = selectedFit === "todas" || item.tripFits.includes(selectedFit);
          return matchesZone && matchesFit;
        }),
      }))
      .filter((zone) => zone.stores.length > 0);
  }, [selectedFit, selectedZone, zones]);

  const routeFocusZoneSlug =
    selectedZone !== "todas" && visibleZones.some((zone) => zone.slug === selectedZone)
      ? selectedZone
      : visibleZones[0]?.slug;

  const visibleStores = useMemo(() => visibleZones.flatMap((zone) => zone.stores), [visibleZones]);

  const visibleStoreMap = useMemo(
    () => new Map(visibleStores.map((item) => [item.store.slug, item])),
    [visibleStores],
  );

  const selectedMission = useMemo(
    () => smartMapMissionRoutes.find((route) => route.slug === selectedMissionSlug) ?? null,
    [selectedMissionSlug],
  );

  const currentOrigin = useMemo(
    () =>
      smartMapOrigins.find(
        (origin) =>
          origin.slug ===
          (selectedOriginSlug || (routeMode === "mission" && selectedMission ? selectedMission.recommendedOriginSlug : "")),
      ) ??
      smartMapOrigins[0] ??
      null,
    [routeMode, selectedMission, selectedOriginSlug],
  );

  const routeStores = useMemo(() => {
    const slugs =
      routeMode === "mission"
        ? selectedMission?.storeSlugs ?? []
        : selectedStoreSlugs.filter((slug) => visibleStoreMap.has(slug));

    return slugs.map((slug) => visibleStoreMap.get(slug)).filter(Boolean);
  }, [routeMode, selectedMission, selectedStoreSlugs, visibleStoreMap]);

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

  const routeSummaryLabel =
    routeMode === "mission"
      ? selectedMission?.title ?? "Rota pronta"
      : routeStores.length
        ? "Rota manual personalizada"
        : "Selecione lojas para montar a rota";

  const visibleStats = useMemo(() => {
    const visible = visibleStores;
    return {
      totalStores: visible.length,
      totalZones: visibleZones.length,
      anchorStores: visible.filter((item) => item.routeRole === "anchor").length,
      compareStores: visible.filter((item) => item.routeRole === "compare").length,
    };
  }, [visibleStores, visibleZones.length]);

  const toggleStoreInRoute = (slug: string) => {
    setSelectedStoreSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Camada tática da rota</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">Defina origem, missão ou monte o próprio caminho</h2>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Modo da rota</p>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  active={routeMode === "mission"}
                  label="Rotas prontas"
                  onClick={() => setRouteMode("mission")}
                />
                <FilterButton
                  active={routeMode === "manual"}
                  label="Montar manualmente"
                  onClick={() => setRouteMode("manual")}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Origem operacional</p>
              <div className="flex flex-wrap gap-2">
                {smartMapOrigins.map((origin) => (
                  <FilterButton
                    key={origin.slug}
                    active={currentOrigin?.slug === origin.slug}
                    label={origin.title}
                    onClick={() => setSelectedOriginSlug(origin.slug)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                {routeMode === "mission" ? "Missão pronta" : "Lojas da sua rota"}
              </p>
              <div className="rounded-[24px] bg-[#f6f7f2] p-4 text-sm text-[#4f5950]">
                <p className="font-semibold text-[#0a0a0a]">{routeSummaryLabel}</p>
                <p className="mt-2">
                  Origem: {currentOrigin?.title ?? "não definida"} • Paradas válidas: {routeStores.length}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#74806f]">
                  {routeMode === "mission"
                    ? "A ordem já vem pronta e pode ser ajustada pela origem."
                    : "Ao tocar nas lojas abaixo, você monta a sequência da rota."}
                </p>
              </div>
            </div>
          </div>

          {routeMode === "mission" ? (
            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Escolha uma missão</p>
              <div className="flex flex-wrap gap-2">
                {smartMapMissionRoutes.map((mission) => (
                  <FilterButton
                    key={mission.slug}
                    active={selectedMissionSlug === mission.slug}
                    label={mission.title}
                    onClick={() => setSelectedMissionSlug(mission.slug)}
                  />
                ))}
              </div>
              {selectedMission ? (
                <p className="mt-3 text-sm leading-6 text-[#596456]">{selectedMission.description}</p>
              ) : null}
            </div>
          ) : (
            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Monte a rota tocando nas lojas</p>
              <div className="flex flex-wrap gap-2">
                {visibleStores.map((item) => (
                  <button
                    key={item.store.slug}
                    type="button"
                    onClick={() => toggleStoreInRoute(item.store.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedStoreSlugs.includes(item.store.slug)
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-[#eff4e8] text-[#4d564a]"
                    }`}
                  >
                    {selectedStoreSlugs.includes(item.store.slug)
                      ? `${selectedStoreSlugs.indexOf(item.store.slug) + 1}. ${item.store.name}`
                      : item.store.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[24px] border border-black/6 bg-[#fbfbf7] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b7280]">Sequência atual</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-[#d9ff1f] px-3 py-2 font-semibold text-[#0a0a0a]">
                Partida: {currentOrigin?.title ?? "origem"}
              </span>
              {routeStores.length ? (
                routeStores.map((item, index) => (
                  <span key={item.store.id} className="rounded-full bg-[#eff4e8] px-3 py-2 font-semibold text-[#4d564a]">
                    {index + 1}. {item.store.name}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-[#eff4e8] px-3 py-2 font-semibold text-[#4d564a]">
                  Nenhuma parada escolhida ainda
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <GoogleSmartMap
        zones={visibleZones}
        activeZoneSlug={routeFocusZoneSlug}
        customRoutePoints={routePoints}
        customRouteLabel={routeSummaryLabel}
        customRouteAccent={routeMode === "mission" ? "#d9ff1f" : "#0a0a0a"}
        customOrigin={currentOrigin ? { title: currentOrigin.title, coordinate: currentOrigin.coordinate } : undefined}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Lojas visíveis" value={String(visibleStats.totalStores)} icon={<MapPinned className="h-4 w-4" />} />
        <MetricCard label="Eixos ativos" value={String(visibleStats.totalZones)} icon={<Layers3 className="h-4 w-4" />} />
        <MetricCard label="Âncoras" value={String(visibleStats.anchorStores)} icon={<Compass className="h-4 w-4" />} />
        <MetricCard label="Comparação" value={String(visibleStats.compareStores)} icon={<Route className="h-4 w-4" />} />
      </section>

      <section className="rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Filtro inteligente</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Escolha um eixo</p>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={selectedZone === "todas"}
                label="Todos"
                onClick={() => setSelectedZone("todas")}
              />
              {zones.map((zone) => (
                <FilterButton
                  key={zone.slug}
                  active={selectedZone === zone.slug}
                  label={zone.title.replace("Eixo ", "")}
                  onClick={() => setSelectedZone(zone.slug)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">Escolha a missão do deslocamento</p>
            <div className="flex flex-wrap gap-2">
              {fitOptions.map((fit) => (
                <FilterButton
                  key={fit}
                  active={selectedFit === fit}
                  label={fit === "todas" ? "Todas" : fit}
                  onClick={() => setSelectedFit(fit)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {visibleZones.map((zone) => (
          <div
            key={zone.slug}
            className={`overflow-hidden rounded-[32px] bg-gradient-to-br ${zone.accent} p-[1px] shadow-[0_30px_90px_-55px_rgba(10,10,10,0.75)]`}
          >
            <div className="rounded-[31px] bg-[#f7f7f2] p-5">
              <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[28px] bg-[#0b120e] p-5 text-white">
                  <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/74">
                    {zone.subtitle}
                  </p>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{zone.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/74">{zone.description}</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/62">Função na rota</p>
                    <p className="mt-2 text-sm leading-6 text-white/86">{zone.role}</p>
                  </div>
                  <div className="mt-4 rounded-2xl border border-[#d9ff1f]/20 bg-[#d9ff1f]/10 p-4 text-[#f3ffd2]">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Leitura rápida
                    </div>
                    <p className="mt-2 text-sm leading-6">{zone.highlight}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {zone.stores.map((item, index) => (
                    <StoreMapCard key={item.store.id} item={item} index={index + 1} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
      <div className="flex items-center justify-between text-[#6b7280]">
        <p className="text-xs font-black uppercase tracking-[0.18em]">{label}</p>
        {icon}
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#0a0a0a]">{value}</p>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-[#0a0a0a] text-white" : "bg-[#eff4e8] text-[#4d564a]"
      }`}
    >
      {label}
    </button>
  );
}

function StoreMapCard({
  item,
  index,
}: {
  item: SmartMapZoneGroup["stores"][number];
  index: number;
}) {
  const { store } = item;
  const roleLabel = {
    anchor: "Âncora",
    compare: "Comparação",
    specialist: "Especialista",
    support: "Apoio",
  }[item.routeRole];

  return (
    <div className="rounded-[26px] border border-black/6 bg-white p-4 shadow-[0_18px_70px_-55px_rgba(10,10,10,0.6)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#d9ff1f] text-sm font-black text-[#0a0a0a]">
            {index}
          </div>
          <div>
            <Link href={`/lojas/${store.slug}`} className="text-lg font-black tracking-[-0.03em] text-[#0a0a0a]">
              {store.name}
            </Link>
            <p className="mt-1 text-sm leading-6 text-[#596456]">{store.shortDescription}</p>
          </div>
        </div>
        <span className="rounded-full bg-[#eff4e8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#4d564a]">
          {roleLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-[#4f5950] sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f6f7f2] px-4 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#74806f]">Onde entra</p>
          <p className="mt-1">{store.address}</p>
        </div>
        <div className="rounded-2xl bg-[#f6f7f2] px-4 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#74806f]">Melhor para</p>
          <p className="mt-1">{item.tripFits.join(" • ") || "compra ampla"}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {store.categorySlugs.slice(0, 4).map((category) => (
          <span key={category} className="rounded-full bg-[#eef2e5] px-3 py-1 text-xs font-semibold text-[#5a6457]">
            {category.replace("-", " ")}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={store.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1b1b1b]"
        >
          Abrir no Maps
          <MapPinned className="h-4 w-4" />
        </a>
        <Link
          href={`/lojas/${store.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/8 bg-[#eff4e8] px-4 py-3 text-sm font-semibold text-[#0a0a0a]"
        >
          Ver ficha
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
