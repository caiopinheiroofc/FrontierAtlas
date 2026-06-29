import Link from "next/link";
import { ArrowRight, MapPinned, Radar, Route } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { GuideCard } from "@/components/guide-card";
import { MissionCard } from "@/components/mission-card";
import { SearchInput } from "@/components/search-input";
import { SectionHeading } from "@/components/section-heading";
import { StoreCard } from "@/components/store-card";
import { missions } from "@/lib/data";
import { getEssentialStores, getPriorityStores } from "@/lib/essential-stores";
import { getCategories, getGuides, getStores } from "@/lib/frontier-data";

export default async function Home() {
  const [stores, guides, categories] = await Promise.all([
    getStores(),
    getGuides(),
    getCategories(),
  ]);

  const featuredStores = getPriorityStores(stores, 6);
  const essentialStores = getEssentialStores(stores).slice(0, 4);
  const quickGuides = guides.slice(0, 4);
  const essentialMissions = missions.filter((mission) =>
    ["primeira-viagem", "eletronicos", "perfumes", "revenda"].includes(
      mission.slug,
    ),
  );

  return (
    <AppShell
      title="Sua rota inteligente de compras em Ciudad del Este."
      subtitle="O Frontier Atlas resume as lojas mais importantes e organiza rotas simples para quem quer comprar bem em 1 dia ou em 3 dias."
    >
      <form
        action="/buscar"
        className="rounded-[30px] border border-black/6 bg-white p-4 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]"
      >
        <SearchInput />
      </form>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[34px] bg-[#0a0a0a] p-6 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.9)]">
          <h2 className="max-w-xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">
            Menos lojas, menos voltas e mais clareza para comprar na CDE.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/68 sm:text-base">
            A gente foca no essencial: principais lojas, rotas curtas e
            orientação simples para turista, primeira viagem e compra
            objetiva.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mapa"
              className="rounded-full bg-[#d9ff1f] px-5 py-3 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
            >
              Ver rotas principais
            </Link>
            <Link
              href="/explorar"
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver lojas essenciais
            </Link>
            <Link
              href="/guias"
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver guias rápidos
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Atalhos de valor
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Radar className="h-4 w-4" />
                  <span className="font-semibold">Compra de 1 dia</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Foco nas lojas principais para resolver rápido o que mais
                  vale a pena.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <MapPinned className="h-4 w-4" />
                  <span className="font-semibold">Compra de 3 dias</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Mais tempo para comparar, dividir a compra por região e
                  evitar correria.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Route className="h-4 w-4" />
                  <span className="font-semibold">Lojas essenciais</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Menos ruído e mais prioridade nas paradas que realmente
                  ajudam a compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Entradas"
          title="Escolha como quer montar sua rota"
          description="O produto comeca por tres perguntas simples: quanto tempo voce tem, o que quer comprar e que tipo de viagem voce vai fazer."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Por tempo
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
              1 dia ou 3 dias
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              A forma mais direta para turista: rota curta para resolver o
              essencial ou rota longa para comparar com calma.
            </p>
            <Link
              href="/mapa"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white"
            >
              Ver rotas por tempo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Por produto
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
              O que voce quer comprar
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              Entre por eletronicos, perfumes, casa ou games e veja primeiro
              as lojas que mais ajudam nessa compra.
            </p>
            <Link
              href="/explorar?mission=eletronicos"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-5 py-3 text-sm font-semibold text-[#0a0a0a]"
            >
              Ver rotas por produto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Por perfil
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
              Seu tipo de viagem
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              Primeira viagem, compra rapida, revenda ou compra em familia. O
              foco muda e a rota tambem.
            </p>
            <Link
              href="/explorar?mission=primeira-viagem"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-5 py-3 text-sm font-semibold text-[#0a0a0a]"
            >
              Ver rotas por perfil
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
            Rota de 1 dia
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            Resolver o principal sem perder tempo
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5e685b]">
            Ideal para quem vai e volta no mesmo dia, com foco em eletrônicos,
            perfumes e lojas de confiança.
          </p>
          <Link
            href="/mapa"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white"
          >
            Abrir rota curta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
            Rota de 3 dias
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            Comprar com mais comparação e calma
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5e685b]">
            Melhor para quem quer dividir a compra por regiões, comparar
            melhor e explorar mais categorias sem pressa.
          </p>
          <Link
            href="/explorar"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eff4e8] px-5 py-3 text-sm font-semibold text-[#0a0a0a]"
          >
            Ver lojas da rota longa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Missões"
          title="As missões mais úteis para a maioria das viagens"
          description="Começamos pelo essencial para ajudar quem precisa comprar bem em pouco tempo."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {essentialMissions.map((mission) => (
            <MissionCard key={mission.slug} mission={mission} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Lojas principais"
          title="As lojas que mais ajudam a compra"
          description="Uma seleção mais enxuta das paradas mais úteis para turista, primeira viagem e compras rápidas."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {featuredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <SectionHeading
          eyebrow="Lojas essenciais"
          title="Um atalho para quem quer começar pelo que mais importa"
          description="Essas sao as paradas mais importantes para montar uma rota simples e eficiente na cidade."
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {essentialStores.map((store) => (
            <div key={store.id} className="rounded-[24px] bg-[#f6f7f2] p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#74806f]">
                {store.categorySlugs[0].replace("-", " ")}
              </p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">
                {store.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5e685b]">
                {store.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Guias rápidos"
          title="O que você precisa saber antes de sair comprando."
          description="Conteúdos curtos para economizar tempo, evitar erro e aproveitar melhor 1 ou 3 dias de compra."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {quickGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <SectionHeading
          eyebrow="Categorias"
          title="O essencial já organizado"
          description="As principais categorias já estão prontas para facilitar busca, comparação e rota."
        />
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category.id}
              className="rounded-full bg-[#eff4e8] px-4 py-2 text-sm font-semibold text-[#4d564a]"
            >
              {category.name}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-[28px] bg-[#0c1510] p-5 text-white shadow-[0_35px_110px_-55px_rgba(39,215,108,0.45)]">
          <div className="flex items-center gap-2 text-[#d9ff1f]">
            <Route className="h-4 w-4" />
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Sua rota inteligente
            </p>
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">
            A cidade foi resumida no que mais importa para comprar.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/74">
            Em vez de abrir dezenas de opções, o Frontier Atlas destaca os
            eixos mais úteis e as paradas mais necessárias para uma viagem
            mais enxuta.
          </p>
          <Link
            href="/mapa"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d9ff1f] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
          >
            Abrir mapa inteligente
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
