"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MapPinned, Sparkles } from "lucide-react";
import { type Store } from "@/lib/data";
import {
  buildSuggestedRoute,
  parseShoppingList,
  type RouteMobility,
  type RouteTime,
} from "@/lib/route-builder";

const suggestionChips = [
  "iPhone",
  "Perfume",
  "JBL",
  "PlayStation",
  "Tenis",
  "Chocolate",
];

const timeOptions: Array<{ value: RouteTime; label: string; note: string }> = [
  { value: "expressa", label: "Rota expressa", note: "para resolver rapido" },
  { value: "meio-dia", label: "Meio dia", note: "para comparar melhor" },
  { value: "dia-todo", label: "Dia todo", note: "para lista maior" },
];

const mobilityOptions: Array<{
  value: RouteMobility;
  label: string;
  note: string;
}> = [
  { value: "a-pe", label: "A pe", note: "melhor para a maioria das compras" },
  { value: "carro", label: "Com carro", note: "mais flexibilidade entre polos" },
];

export function CreateRouteBuilder({
  stores,
  initialQuery = "",
}: {
  stores: Store[];
  initialQuery?: string;
}) {
  const [shoppingList, setShoppingList] = useState(initialQuery);
  const [time, setTime] = useState<RouteTime>("expressa");
  const [mobility, setMobility] = useState<RouteMobility>("a-pe");

  const route = useMemo(
    () => buildSuggestedRoute(stores, shoppingList, time, mobility),
    [mobility, shoppingList, stores, time],
  );

  const items = parseShoppingList(shoppingList);

  function appendItem(item: string) {
    setShoppingList((current) => {
      const existingItems = parseShoppingList(current);
      if (existingItems.includes(item)) return current;
      return current.trim() ? `${current.trim()}\n${item}` : item;
    });
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
            Criar minha rota
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            Monte sua lista e receba a ordem mais util.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64705f]">
            Escreva o que voce quer comprar. O Atlas sugere uma sequencia de
            lojas para reduzir caminhada, erro e improviso.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
                Sua lista de compras
              </span>
              <textarea
                value={shoppingList}
                onChange={(event) => setShoppingList(event.target.value)}
                placeholder={"Exemplo:\niPhone\nPerfume\nJBL\nTenis"}
                className="min-h-[180px] w-full rounded-[24px] border border-[#d8ddd3] bg-[#fbfcf8] px-4 py-4 text-sm font-medium text-[#0a0a0a] outline-none placeholder:text-[#7b8478]"
              />
            </label>

            <div>
              <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                Atalhos rapidos
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => appendItem(chip)}
                    className="rounded-full bg-[#eff4e8] px-4 py-2 text-sm font-semibold text-[#4f584b] transition hover:bg-[#dfe8d5]"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[30px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Ajustes da rota
            </p>
            <div className="mt-4 grid gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                  Quanto tempo voce tem
                </p>
                <div className="grid gap-2">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTime(option.value)}
                      className={`rounded-[22px] border px-4 py-3 text-left transition ${
                        time === option.value
                          ? "border-[#d9ff1f] bg-[#f4ffd0]"
                          : "border-black/8 bg-[#f8f9f4] hover:bg-[#f1f4eb]"
                      }`}
                    >
                      <p className="text-sm font-bold text-[#0a0a0a]">
                        {option.label}
                      </p>
                      <p className="text-xs text-[#667064]">{option.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                  Como voce vai circular
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {mobilityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMobility(option.value)}
                      className={`rounded-[22px] border px-4 py-3 text-left transition ${
                        mobility === option.value
                          ? "border-[#d9ff1f] bg-[#f4ffd0]"
                          : "border-black/8 bg-[#f8f9f4] hover:bg-[#f1f4eb]"
                      }`}
                    >
                      <p className="text-sm font-bold text-[#0a0a0a]">
                        {option.label}
                      </p>
                      <p className="text-xs text-[#667064]">{option.note}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] bg-[#0a0a0a] p-5 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.88)]">
            <div className="flex items-center gap-2 text-[#d9ff1f]">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs font-black uppercase tracking-[0.18em]">
                Frontier Smart Route
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
              Sua rota sugerida
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                  Tempo
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  {route.summary.estimatedTime}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                  Perfil
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  {route.summary.routeProfile}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                  Ritmo
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  {route.summary.walkingLevel}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/72">
              {items.length > 0
                ? `A rota foi organizada com base em ${items.length} item(ns) da sua lista e na curadoria das lojas mais uteis para essa compra.`
                : "Adicione itens para gerar uma rota mais precisa. Enquanto isso, o Atlas mostra uma sequencia inicial com lojas fortes para comecar."}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Sequencia sugerida
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
              O proximo passo da sua compra
            </h2>
          </div>
          <div className="rounded-full bg-[#eff4e8] px-3 py-1 text-xs font-semibold text-[#4e584a]">
            {route.stops.length} parada(s)
          </div>
        </div>

        <div className="grid gap-4">
          {route.stops.map((stop, index) => (
            <div
              key={stop.store.id}
              className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9ff1f] text-sm font-black text-[#0a0a0a]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
                        {stop.store.categorySlugs[0].replace("-", " ")}
                      </p>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">
                        {stop.store.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#5f6a5b]">
                    {stop.reason}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6c7668]">
                    {stop.store.shortDescription}
                  </p>

                  {stop.matchedItems.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stop.matchedItems.map((item) => (
                        <span
                          key={`${stop.store.id}-${item}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-3 py-2 text-xs font-semibold text-[#4d564a]"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[220px]">
                  <Link
                    href={`/lojas/${stop.store.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#151515]"
                  >
                    Ver loja
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={stop.store.googleMapsUrl || "/mapa"}
                    target={stop.store.googleMapsUrl ? "_blank" : undefined}
                    rel={stop.store.googleMapsUrl ? "noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eff4e8] px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#dfe8d5]"
                  >
                    <MapPinned className="h-4 w-4" />
                    Abrir no mapa
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
