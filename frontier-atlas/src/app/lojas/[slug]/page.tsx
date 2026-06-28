import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, Instagram, MapPinned, Store, Wallet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { FrontierScore } from "@/components/frontier-score";
import { SectionHeading } from "@/components/section-heading";
import { StoreCard } from "@/components/store-card";
import { averageScore, getRelatedStores, getStoreBySlug } from "@/lib/data";

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const related = getRelatedStores(store);

  return (
    <AppShell
      title={store.name}
      subtitle={store.shortDescription}
    >
      <section className={`overflow-hidden rounded-[34px] bg-gradient-to-br ${store.coverAccent} p-6 text-white shadow-[0_35px_110px_-55px_rgba(10,10,10,0.85)]`}>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/72">
              {store.city}, {store.country}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{store.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{store.fullDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {store.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Score final</p>
                <p className="mt-2 text-4xl font-black tracking-[-0.05em]">{averageScore(store.score)}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/12 bg-white/10 text-lg font-black">
                {store.logoText}
              </div>
            </div>
            <div className="space-y-3 text-sm text-white/84">
              <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-3">
                <MapPinned className="h-4 w-4" />
                {store.address}
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-3">
                <Clock3 className="h-4 w-4" />
                {store.openingHours}
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-3">
                <Wallet className="h-4 w-4" />
                {store.paymentMethods.join(" • ")}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={store.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-[#d9ff1f] px-4 py-3 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16]"
              >
                Abrir no Google Maps
              </a>
              {store.instagramUrl ? (
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-3"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <FrontierScore score={store.score} />
          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <SectionHeading
              eyebrow="Análise"
              title="Nossa leitura rápida"
              description={store.reviewSummary}
            />
            <div className="mt-5 space-y-3 text-sm leading-6 text-[#4f5950]">
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <strong className="text-[#0a0a0a]">Vale a pena?</strong>
                <p className="mt-2">{store.worthIt}</p>
              </div>
              <div className="rounded-2xl bg-[#f6f7f2] p-4">
                <strong className="text-[#0a0a0a]">Estacionamento</strong>
                <p className="mt-2">{store.parkingInfo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Produtos recomendados</p>
            <div className="mt-4 space-y-3">
              {store.recommendedProducts.map((product) => (
                <div key={product} className="rounded-2xl bg-[#f6f7f2] px-4 py-3 text-sm font-medium text-[#4f5950]">
                  {product}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Links úteis</p>
            <div className="mt-4 grid gap-3">
              {store.websiteUrl ? (
                <a
                  href={store.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-[#f6f7f2] px-4 py-3 text-sm font-semibold text-[#0a0a0a]"
                >
                  Site oficial
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              {store.instagramUrl ? (
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-[#f6f7f2] px-4 py-3 text-sm font-semibold text-[#0a0a0a]"
                >
                  Instagram
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              {store.whatsapp ? (
                <a
                  href={`https://wa.me/${store.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-[#f6f7f2] px-4 py-3 text-sm font-semibold text-[#0a0a0a]"
                >
                  WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Categorias</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {store.categorySlugs.map((category) => (
                <span key={category} className="rounded-full bg-[#eff4e8] px-3 py-2 text-sm font-semibold text-[#4d564a]">
                  {category.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Parecidas"
          title="Lojas para comparar na mesma rota"
          description="A ideia aqui é manter a decisão ativa, não te prender em uma única parada."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {related.map((relatedStore) => (
            <StoreCard key={relatedStore.id} store={relatedStore} />
          ))}
        </div>
        <Link href="/explorar" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a]">
          <Store className="h-4 w-4" />
          Voltar para explorar todas
        </Link>
      </section>
    </AppShell>
  );
}
