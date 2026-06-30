"use client";

import { useMemo, useState } from "react";
import { Footprints, MapPinned, Route, Sparkles } from "lucide-react";

type DemoRouteKey =
  | "rota-curta"
  | "eletronicos"
  | "perfumes"
  | "primeira-viagem";

type DemoPoint = {
  id: string;
  label: string;
  note: string;
  x: number;
  y: number;
  kind: "entry" | "anchor" | "compare" | "support";
};

type DemoRoute = {
  key: DemoRouteKey;
  chip: string;
  title: string;
  description: string;
  stats: [string, string][];
  points: DemoPoint[];
};

const demoRoutes: DemoRoute[] = [
  {
    key: "rota-curta",
    chip: "Rota curta",
    title: "Percurso mais objetivo para resolver o principal",
    description:
      "Ideal para entrar, comprar nas paradas mais fortes e sair sem transformar a travessia num circuito cansativo.",
    stats: [
      ["Caminhada", "mais enxuta"],
      ["Paradas", "4 essenciais"],
      ["Melhor para", "compra rápida"],
    ],
    points: [
      {
        id: "ponte",
        label: "Ponte da Amizade",
        note: "entrada da rota",
        x: 14,
        y: 26,
        kind: "entry",
      },
      {
        id: "paris",
        label: "Shopping Paris",
        note: "base inicial",
        x: 28,
        y: 44,
        kind: "support",
      },
      {
        id: "cell-shop",
        label: "Cell Shop",
        note: "âncora tech",
        x: 43,
        y: 38,
        kind: "anchor",
      },
      {
        id: "shopping-china",
        label: "Shopping China",
        note: "mix premium",
        x: 63,
        y: 52,
        kind: "anchor",
      },
      {
        id: "nissei",
        label: "Nissei",
        note: "fechamento prático",
        x: 78,
        y: 34,
        kind: "compare",
      },
    ],
  },
  {
    key: "eletronicos",
    chip: "Eletrônicos",
    title: "Rota para comparar tecnologia sem andar à toa",
    description:
      "Começa com uma loja forte de confiança e abre espaço para comparação de preço nas paradas com mais chance de fechar compra.",
    stats: [
      ["Foco", "celular e acessórios"],
      ["Dinâmica", "âncora + comparação"],
      ["Melhor para", "tecnologia"],
    ],
    points: [
      {
        id: "ponte-tech",
        label: "Entrada",
        note: "acesso rápido",
        x: 15,
        y: 30,
        kind: "entry",
      },
      {
        id: "cell-tech",
        label: "Cell Shop",
        note: "começo confiável",
        x: 34,
        y: 42,
        kind: "anchor",
      },
      {
        id: "mega-tech",
        label: "Mega Eletrônicos",
        note: "comparação forte",
        x: 53,
        y: 28,
        kind: "compare",
      },
      {
        id: "new-zone-tech",
        label: "New Zone",
        note: "oportunidade",
        x: 65,
        y: 46,
        kind: "compare",
      },
      {
        id: "nissei-tech",
        label: "Nissei",
        note: "fechamento de mix",
        x: 80,
        y: 34,
        kind: "support",
      },
    ],
  },
  {
    key: "perfumes",
    chip: "Perfumes",
    title: "Rota para beleza, presentes e compra premium",
    description:
      "Melhor para começar em uma parada ampla e depois avançar para lojas que refinam a compra sem fazer você cruzar a cidade sem necessidade.",
    stats: [
      ["Foco", "beleza e presentes"],
      ["Melhor fluxo", "premium primeiro"],
      ["Melhor para", "presentear"],
    ],
    points: [
      {
        id: "ponte-perf",
        label: "Entrada",
        note: "travessia",
        x: 14,
        y: 26,
        kind: "entry",
      },
      {
        id: "china-perf",
        label: "Shopping China",
        note: "começo amplo",
        x: 38,
        y: 48,
        kind: "anchor",
      },
      {
        id: "monalisa-perf",
        label: "Monalisa",
        note: "premium e originais",
        x: 55,
        y: 33,
        kind: "anchor",
      },
      {
        id: "sax-perf",
        label: "SAX",
        note: "presentes e moda",
        x: 71,
        y: 48,
        kind: "support",
      },
    ],
  },
  {
    key: "primeira-viagem",
    chip: "Primeira viagem",
    title: "Rota pensada para reduzir improviso logo no começo",
    description:
      "Ajuda quem ainda está pegando o ritmo da cidade a começar por lojas mais previsíveis e com uma ordem mais confortável.",
    stats: [
      ["Foco", "menos erro"],
      ["Leitura", "cidade simplificada"],
      ["Melhor para", "estreia na CDE"],
    ],
    points: [
      {
        id: "ponte-first",
        label: "Ponte da Amizade",
        note: "entrada",
        x: 13,
        y: 24,
        kind: "entry",
      },
      {
        id: "paris-first",
        label: "Shopping Paris",
        note: "base confortável",
        x: 29,
        y: 43,
        kind: "support",
      },
      {
        id: "cell-first",
        label: "Cell Shop",
        note: "tecnologia com confiança",
        x: 45,
        y: 38,
        kind: "anchor",
      },
      {
        id: "china-first",
        label: "Shopping China",
        note: "mix amplo",
        x: 61,
        y: 52,
        kind: "anchor",
      },
      {
        id: "monalisa-first",
        label: "Monalisa",
        note: "perfumes e presentes",
        x: 79,
        y: 35,
        kind: "support",
      },
    ],
  },
];

const pointClasses: Record<DemoPoint["kind"], string> = {
  entry: "bg-white text-[#0a0a0a] border-white/60",
  anchor: "bg-[#d9ff1f] text-[#0a0a0a] border-[#d9ff1f]",
  compare: "bg-[#7dd3fc] text-[#082f49] border-[#7dd3fc]",
  support: "bg-[#fca5a5] text-[#3f0b16] border-[#fca5a5]",
};

export function HomeDemoMap() {
  const [selectedRoute, setSelectedRoute] =
    useState<DemoRouteKey>("rota-curta");

  const route = useMemo(
    () => demoRoutes.find((item) => item.key === selectedRoute) ?? demoRoutes[0],
    [selectedRoute],
  );

  const polyline = route.points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section className="grid gap-5 rounded-[34px] border border-black/6 bg-[#09110c] p-5 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.65)] lg:grid-cols-[1.15fr_0.85fr] lg:p-7">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9ff1f]">
            Mapa demonstrativo
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Veja a lógica da compra antes de sair andando.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            O mapa abaixo mostra os polos mais importantes, a ordem das paradas
            e uma rota exemplo para você entender a cidade com mais clareza.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {demoRoutes.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedRoute(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.key === selectedRoute
                  ? "bg-[#d9ff1f] text-[#0a0a0a]"
                  : "bg-white/7 text-white/78 hover:bg-white/12"
              }`}
            >
              {item.chip}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(9,17,12,0.96),rgba(12,21,16,0.92)),radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,255,31,0.18),transparent_30%)] p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[linear-gradient(to_right,transparent_0%,transparent_9%,rgba(255,255,255,0.08)_10%,transparent_11%),linear-gradient(to_bottom,transparent_0%,transparent_9%,rgba(255,255,255,0.08)_10%,transparent_11%)] bg-[length:64px_64px]" />
          </div>

          <div className="relative h-[330px] rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(217,255,31,0.12),transparent_28%),linear-gradient(180deg,rgba(7,12,10,0.96),rgba(10,16,13,0.88))]">
            <div className="absolute left-[7%] top-[18%] rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
              Ponte / entrada
            </div>
            <div className="absolute left-[33%] top-[64%] rounded-full border border-[#d9ff1f]/25 bg-[#d9ff1f]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d9ff1f]">
              Microcentro
            </div>
            <div className="absolute right-[8%] top-[14%] rounded-full border border-[#7dd3fc]/25 bg-[#7dd3fc]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7dd3fc]">
              Polos principais
            </div>

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <polyline
                points={polyline}
                fill="none"
                stroke="rgba(217,255,31,0.95)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3.2 2.4"
              />
            </svg>

            {route.points.map((point, index) => (
              <div
                key={point.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-black shadow-[0_20px_40px_-20px_rgba(0,0,0,0.75)] ${pointClasses[point.kind]}`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 min-w-[118px] rounded-2xl border border-white/10 bg-[#0e1613]/92 px-3 py-2 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.8)]">
                  <p className="text-sm font-semibold text-white">{point.label}</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                    {point.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-[30px] border border-white/10 bg-white/5 p-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/55">
            Rota exemplo
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">
            {route.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/70">
            {route.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {route.stats.map(([label, value]) => (
            <div
              key={label}
              className="rounded-[22px] border border-white/8 bg-[#0d1411] p-4"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                {label}
              </p>
              <p className="mt-2 text-lg font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-white/8 bg-[#0d1411] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
            O que esse mapa prova
          </p>
          <div className="mt-4 grid gap-3">
            <div className="flex items-start gap-3">
              <Footprints className="mt-0.5 h-4 w-4 text-[#d9ff1f]" />
              <p className="text-sm leading-6 text-white/72">
                A rota não começa pela loja mais famosa, e sim pela ordem que
                reduz caminhada inútil.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Route className="mt-0.5 h-4 w-4 text-[#7dd3fc]" />
              <p className="text-sm leading-6 text-white/72">
                Os polos ajudam a entender quando comparar e quando já vale
                fechar a compra.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-[#fca5a5]" />
              <p className="text-sm leading-6 text-white/72">
                O objetivo não é ver tudo. É acertar mais cedo as paradas com
                mais chance de resolver.
              </p>
            </div>
          </div>
        </div>

        <a
          href="/mapa"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ff1f] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
        >
          <MapPinned className="h-4 w-4" />
          Ver mapa inteligente completo
        </a>
      </div>
    </section>
  );
}
