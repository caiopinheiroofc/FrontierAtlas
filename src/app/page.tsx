import Link from "next/link";
import { ArrowRight, Route, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { GuideCard } from "@/components/guide-card";
import { MissionCard } from "@/components/mission-card";
import { SearchInput } from "@/components/search-input";
import { SectionHeading } from "@/components/section-heading";
import { missions } from "@/lib/data";
import { getGuides, getStores } from "@/lib/frontier-data";

export default async function Home() {
  const [stores, guides] = await Promise.all([getStores(), getGuides()]);

  const quickGuides = guides.slice(0, 3);
  const popularRoutes = missions.filter((mission) =>
    ["primeira-viagem", "eletronicos", "perfumes", "revenda", "casa", "games"].includes(
      mission.slug,
    ),
  );
  const highlightedStores = stores.slice(0, 3);

  return (
    <AppShell
      title="Planeje sua compra, siga uma rota inteligente e ande menos em Ciudad del Este."
      subtitle="O Frontier Atlas organiza o próximo passo da sua compra para você perder menos tempo, reduzir erro e decidir mais rápido onde realmente vale parar."
    >
      <form
        action="/buscar"
        className="rounded-[30px] border border-black/6 bg-white p-4 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]"
      >
        <SearchInput placeholder="Busque um produto, loja ou oportunidade" />
      </form>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[34px] bg-[#0a0a0a] p-6 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.9)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9ff1f]">
            Frontier Smart Route
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">
            Escolha uma rota pronta ou crie a sua em menos de um minuto.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
            Você não precisa descobrir a cidade sozinho. O Atlas organiza a
            sequência, destaca as paradas mais úteis e te ajuda a comprar com
            mais lógica.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/mapa"
              className="rounded-[28px] bg-[#d9ff1f] px-5 py-4 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
            >
              <span className="block text-xs uppercase tracking-[0.16em] text-[#506000]">
                Rota pronta
              </span>
              <span className="mt-1 block text-base font-black">
                Usar uma rota pronta
              </span>
            </Link>
            <Link
              href="/buscar"
              className="rounded-[28px] border border-white/12 bg-white/6 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <span className="block text-xs uppercase tracking-[0.16em] text-white/55">
                Lista inteligente
              </span>
              <span className="mt-1 block text-base font-black">
                Criar minha rota
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
              O que o Atlas resolve
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Route className="h-4 w-4" />
                  <span className="font-semibold">Ordem mais inteligente</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  O app mostra por onde começar para você resolver mais cedo o
                  que realmente importa.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold">Menos erro de decisão</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  Você evita entrar em lojas aleatórias e ganha mais clareza
                  sobre onde vale parar.
                </p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#0a0a0a]">
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-semibold">Mais confiança</span>
                </div>
                <p className="text-sm leading-6 text-[#667064]">
                  O foco deixa de ser ver tudo e passa a ser comprar melhor com
                  menos improviso.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#eff4e8] p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.32)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6a7263]">
              Comece em segundos
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#0a0a0a]">
                  1. Diga o que quer comprar
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#0a0a0a]">
                  2. Veja a ordem mais útil
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#0a0a0a]">
                  3. Abra a loja no mapa e siga
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Rotas populares"
          title="Comece por uma missão pronta"
          description="Essas rotas aceleram a decisão para quem quer sair do zero com menos dúvida."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {popularRoutes.map((mission) => (
            <MissionCard key={mission.slug} mission={mission} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Dicas rápidas"
          title="Pouca leitura, mais acerto na rota"
          description="Antes de sair andando, estas dicas ajudam a economizar energia e evitar erro logo no começo."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {quickGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <SectionHeading
          eyebrow="Apoio rápido"
          title="Três paradas fortes para orientar sua decisão"
          description="Se você ainda está se situando, estas referências ajudam a entender onde normalmente começam muitas compras."
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {highlightedStores.map((store) => (
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
        <div className="mt-6 rounded-[28px] bg-[#0c1510] p-5 text-white shadow-[0_35px_110px_-55px_rgba(39,215,108,0.45)]">
          <div className="flex items-center gap-2 text-[#d9ff1f]">
            <Route className="h-4 w-4" />
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Próximo passo
            </p>
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">
            O objetivo não é ver tudo. É acertar a próxima parada.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/74">
            O Frontier Atlas existe para reduzir caminhada, reduzir tempo e
            organizar a compra com uma sequência mais útil desde o começo.
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
