import Link from "next/link";
import { ArrowRight, Lock, MapPinned, Radar, Route, Sparkles, Store } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { GuideCard } from "@/components/guide-card";
import { MissionCard } from "@/components/mission-card";
import { SearchInput } from "@/components/search-input";
import { SectionHeading } from "@/components/section-heading";
import { StoreCard } from "@/components/store-card";
import { missions, premiumCollections, weeklyOpportunities } from "@/lib/data";
import { getCategories, getGuides, getStores } from "@/lib/frontier-data";

export default async function Home() {
  const [stores, guides, categories] = await Promise.all([
    getStores(),
    getGuides(),
    getCategories(),
  ]);
  const featuredStores = stores.filter((store) => store.featured).slice(0, 6);
  const quickGuides = guides.slice(0, 4);

  return (
    <AppShell
      title="Planeje suas compras no Paraguai com mais segurança."
      subtitle="Frontier Atlas é uma plataforma digital para comprar melhor, economizar tempo e evitar erros em Ciudad del Este."
    >
      <form action="/buscar" className="rounded-[30px] border border-black/6 bg-white p-4 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        <SearchInput />
      </form>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[34px] bg-[#0a0a0a] p-6 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.9)]">
          <p className="mb-3 inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/72">
            Hero de validação
          </p>
          <h2 className="max-w-xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">
            Se você for hoje ao Paraguai, o Frontier Atlas te ajuda a comprar melhor.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/68 sm:text-base">
            Missões prontas, lojas filtradas, rotas mais seguras e um atalho real para decidir sem perder tempo na fronteira.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/explorar" className="rounded-full bg-[#d9ff1f] px-5 py-3 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]">
              Explorar lojas
            </Link>
            <Link href="/mapa" className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Ver mapa inteligente
            </Link>
            <Link href="/guias" className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Ver guias rápidos
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Atalhos de valor</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Radar className="h-4 w-4" />
                  <span className="font-semibold">Rotas mais curtas</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">Menos improviso, mais decisão rápida nas primeiras horas da viagem.</p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <MapPinned className="h-4 w-4" />
                  <span className="font-semibold">Google Maps pronto</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">Cada loja já nasce com rota prática para abrir no mapa.</p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Lock className="h-4 w-4" />
                  <span className="font-semibold">Source Premium</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">Fornecedores e missões prontas para revenda e compras de nicho.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Missões"
          title="Comece pela sua missão, não pela confusão."
          description="Cada missão organiza o tipo de compra que você quer fazer e reduz a chance de dispersão logo no início do dia."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {missions.map((mission) => (
            <MissionCard key={mission.slug} mission={mission} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Destaques"
          title="Lojas em destaque"
          description="Uma seleção inicial de paradas conhecidas, úteis e fáceis de testar nesta primeira versão do produto."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {featuredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <SectionHeading
            eyebrow="Guias rápidos"
            title="O valor precisa aparecer em menos de 30 segundos."
            description="Conteúdos curtos para orientar a primeira viagem, evitar erros clássicos e deixar a compra mais objetiva."
          />
          <div className="grid gap-4">
            {quickGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[30px] bg-[#0d1810] p-6 text-white shadow-[0_35px_110px_-55px_rgba(39,215,108,0.55)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/74">
              <Sparkles className="h-3.5 w-3.5" />
              Oportunidades da semana
            </p>
            <div className="mt-5 space-y-3">
              {weeklyOpportunities.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <div className="flex items-center gap-2 text-[#0a0a0a]">
              <Store className="h-5 w-5" />
              <h3 className="text-2xl font-black tracking-[-0.03em]">Source Premium</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#647063]">
              Área para fornecedores, contatos de atacado e rotas mais comerciais. Nesta V1 já mostramos a proposta e deixamos o terreno pronto para proteção por senha simples.
            </p>
            <div className="mt-4 space-y-3">
              {premiumCollections.map((item) => (
                <div key={item} className="rounded-2xl bg-[#f6f7f2] p-4 text-sm leading-6 text-[#4c5549]">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/source" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a]">
              Entrar no Source
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <SectionHeading
          eyebrow="Mapa inicial"
          title="Categorias que já estruturam o MVP"
          description="As lojas são cadastradas uma única vez e reaproveitadas em categorias, missões, busca e rotas."
        />
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category.id} className="rounded-full bg-[#eff4e8] px-4 py-2 text-sm font-semibold text-[#4d564a]">
              {category.name}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-[28px] bg-[#0c1510] p-5 text-white shadow-[0_35px_110px_-55px_rgba(39,215,108,0.45)]">
          <div className="flex items-center gap-2 text-[#d9ff1f]">
            <Route className="h-4 w-4" />
            <p className="text-xs font-black uppercase tracking-[0.18em]">Mapa inteligente</p>
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">A cidade agora já pode ser lida por eixos reais de compra.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/74">
            Organizamos as lojas visíveis por polos como Shopping China, Jebai Center, Lai Lai Center e San Blás. Isso transforma o Frontier Atlas em assistência de rota, não só em lista de lugares.
          </p>
          <Link href="/mapa" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d9ff1f] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]">
            Abrir mapa inteligente
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
