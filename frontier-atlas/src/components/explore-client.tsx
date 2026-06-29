"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { StoreCard } from "@/components/store-card";
import { IntelligentMap } from "@/components/intelligent-map";
import { categories, stores, missions } from "@/lib/data";
import { MapPin, List } from "lucide-react";

export function ExploreClient({
  initialMission,
}: {
  initialMission?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedMission, setSelectedMission] = useState<string>(initialMission || "");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesCategory =
        selectedCategory === "todas" || store.categorySlugs.includes(selectedCategory);
      const matchesMission = !selectedMission || store.missionSlugs.includes(selectedMission);
      const text = `${store.name} ${store.shortDescription} ${store.tags.join(" ")} ${store.categorySlugs.join(" ")}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      return matchesCategory && matchesMission && matchesQuery;
    });
  }, [selectedMission, query, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Barra de Filtros Principais */}
      <div className="grid gap-4 rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <div onChange={(event) => setQuery((event.target as HTMLInputElement).value)}>
          <SearchInput placeholder="Buscar loja por nome, categoria ou tag" />
        </div>

        {/* Seletor de Missão */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#687264]">Missão</label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedMission("")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedMission === ""
                  ? "bg-[#0a0a0a] text-white"
                  : "bg-[#eff4e8] text-[#4d564a]"
              }`}
            >
              Todas
            </button>
            {missions.map((mission) => (
              <button
                key={mission.slug}
                type="button"
                onClick={() => setSelectedMission(mission.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedMission === mission.slug
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {mission.title}
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de Categorias */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#687264]">Categorias</label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("todas")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === "todas"
                  ? "bg-[#0a0a0a] text-white"
                  : "bg-[#eff4e8] text-[#4d564a]"
              }`}
            >
              Todas
            </button>
            {categories
              .filter((category) => category.type === "store")
              .map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category.slug
                      ? "bg-[#0a0a0a] text-white"
                      : "bg-[#eff4e8] text-[#4d564a] hover:bg-[#e8f0dd]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 rounded-[20px] border border-black/6 bg-white p-2">
        <button
          onClick={() => setViewMode("list")}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <List className="h-4 w-4" />
          Lista de Lojas
        </button>
        <button
          onClick={() => setViewMode("map")}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition ${
            viewMode === "map"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <MapPin className="h-4 w-4" />
          Mapa Inteligente
        </button>
      </div>

      {/* Conteúdo */}
      {viewMode === "map" ? (
        <IntelligentMap missionSlug={selectedMission || undefined} />
      ) : filteredStores.length ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[32px] border border-dashed border-black/10 bg-white p-10 text-center shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
      <p className="text-lg font-bold text-[#0a0a0a]">Nada apareceu nessa combinação.</p>
      <p className="mt-2 text-sm text-[#687264]">Tente trocar a categoria, missão ou buscar por outro termo.</p>
    </div>
  );
}
