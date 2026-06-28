"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { GuideCard } from "@/components/guide-card";
import { SupplierCard } from "@/components/supplier-card";
import { searchAll } from "@/lib/data";

export function SearchResults({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchAll(query), [query]);

  return (
    <div className="space-y-8">
      <div onChange={(event) => setQuery((event.target as HTMLInputElement).value)}>
        <SearchInput defaultValue={initialQuery} placeholder="Buscar em lojas, guias, fornecedores, tags e categorias" />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Lojas</h2>
          <span className="rounded-full bg-[#eff4e8] px-3 py-1 text-xs font-semibold text-[#4d564a]">
            {results.stores.length} resultados
          </span>
        </div>
        <div className="grid gap-3">
          {results.stores.map((store) => (
            <Link
              key={store.id}
              href={`/lojas/${store.slug}`}
              className="rounded-[24px] border border-black/6 bg-white px-4 py-4 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)] transition hover:-translate-y-0.5"
            >
              <p className="text-lg font-bold text-[#0a0a0a]">{store.name}</p>
              <p className="mt-1 text-sm text-[#677264]">{store.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Guias</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {results.guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Fornecedores</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {results.suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Categorias e tags úteis</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {results.categories.map((category) => (
            <span key={category.id} className="rounded-full bg-[#eff4e8] px-3 py-2 text-sm font-semibold text-[#4d564a]">
              {category.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
