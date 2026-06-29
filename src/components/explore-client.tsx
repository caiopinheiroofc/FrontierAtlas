"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { StoreCard } from "@/components/store-card";
import { type Category, type Store } from "@/lib/data";

export function ExploreClient({
  initialMission,
  stores,
  categories,
}: {
  initialMission?: string;
  stores: Store[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesCategory =
        selectedCategory === "todas" || store.categorySlugs.includes(selectedCategory);
      const matchesMission = !initialMission || store.missionSlugs.includes(initialMission);
      const text = `${store.name} ${store.shortDescription} ${store.tags.join(" ")} ${store.categorySlugs.join(" ")}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      return matchesCategory && matchesMission && matchesQuery;
    });
  }, [initialMission, query, selectedCategory, stores]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <div onChange={(event) => setQuery((event.target as HTMLInputElement).value)}>
          <SearchInput placeholder="Buscar loja por nome, categoria ou tag" />
        </div>
        <p className="text-sm leading-6 text-[#5e685b]">
          Esta lista já começa pelas lojas mais importantes para turista, primeira viagem e compra rápida.
        </p>
        <div className="flex flex-wrap gap-2">
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
                    : "bg-[#eff4e8] text-[#4d564a]"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>

      {filteredStores.length ? (
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
      <p className="mt-2 text-sm text-[#687264]">Tente trocar a categoria ou buscar por outro termo.</p>
    </div>
  );
}
