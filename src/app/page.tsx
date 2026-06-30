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
      title="As lojas certas, na ordem certa, para você andar menos e comprar melhor."
      subtitle="O Frontier Atlas organiza sua compra em Ciudad del Este com menos volta, menos cansaço e mais clareza sobre onde realmente vale parar."
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
            Monte sua rota de compras com menos caminhada e mais acerto.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/68 sm:text-base">
            Em vez de entrar em qualquer loja e andar sem direção, você começa
            pelo que mais importa: lojas confiáveis, ordem mais inteligente e
            caminhos mais úteis para comprar melhor.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mapa"
              className="rounded-full bg-[#d9ff1f] px-5 py-3 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
            >
              Montar rota inteligente
            </Link>
            <Link
              href="/explorar"
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver lojas certas
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
                  <span className="font-semibold">Menos caminhada</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Você evita desvios e começa pelas paradas que mais resolvem a
                  compra.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <MapPinned className="h-4 w-4" />
                  <span className="font-semibold">Menos erro</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  A rota já te leva primeiro para as lojas mais úteis para o
                  seu tipo de compra.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Route className="h-4 w-4" />
                  <span className="font-semibold">Mais compra certa</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Menos ruído, menos improviso e mais foco no que realmente
                  vale o seu tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Comece por aqui"
          title="A melhor rota depende do seu tempo, da sua compra e da ordem das lojas."
          description="Você não precisa ver tudo. Basta começar pela entrada que mais combina com o que quer resolver hoje."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              Por tempo
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
              Quanto tempo você tem
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              Se a ideia é resolver rápido, a rota precisa cortar caminhada
              desnecessária e priorizar o que tem mais chance de compra.
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
              O que você quer comprar
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              Eletrônicos, perfumes, casa ou games: a ordem das lojas muda
              bastante dependendo do produto que você procura.
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
              Seu jeito de comprar
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5e685b]">
              Primeira viagem, compra rápida, revenda ou compra em família. O
              foco muda, e a rota ideal também.
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
            Rota mais curta
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            Resolva o principal sem andar além do necessário
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5e685b]">
            Ideal para quem quer comprar o essencial com menos volta, menos
            desgaste e mais chance de acertar nas primeiras paradas.
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
            Rota com comparação
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            Compare melhor sem transformar a compra num labirinto
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5e685b]">
            Quando você tem mais tempo, a rota continua importando para evitar
            cansaço à toa e separar melhor cada região da compra.
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
          title="Entradas rápidas para começar pela missão certa"
          description="Essas missões ajudam a transformar uma intenção solta em uma rota mais objetiva desde o começo."
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
          title="As paradas que mais ajudam você a comprar melhor"
          description="Uma seleção mais enxuta das lojas que resolvem mais, cansam menos e fazem mais sentido para começar."
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
          title="Comece por quem mais resolve a sua compra"
          description="Essas são as paradas mais úteis para ganhar tempo, reduzir erro e montar uma rota simples na cidade."
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
          title="O que vale saber antes de sair andando e comprando."
          description="Conteúdos curtos para evitar erro, economizar energia e aproveitar melhor o tempo da sua rota."
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
          title="Tudo já filtrado para você decidir com mais clareza"
          description="As principais categorias já estão organizadas para facilitar busca, comparação e uma rota mais inteligente."
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
            Menos volta, menos cansaço e mais chance de comprar certo.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/74">
            Em vez de abrir dezenas de opções sem contexto, o Frontier Atlas
            destaca as lojas certas, na ordem mais útil, para você fazer uma
            compra mais prática e objetiva.
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
