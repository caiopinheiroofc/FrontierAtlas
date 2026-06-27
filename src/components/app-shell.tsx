import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,255,31,0.12),_transparent_35%),linear-gradient(180deg,#09110c_0%,#0b0f0d_28%,#f4f5ef_28%,#f4f5ef_100%)] text-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09110c]/88 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-white sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d9ff1f] text-sm font-black tracking-[0.18em] text-[#0a0a0a]">
              FA
            </div>
            <div>
              <p className="text-sm font-black tracking-[0.18em] uppercase">Frontier Atlas</p>
              <p className="text-xs text-white/60">O mapa inteligente da fronteira</p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 xl:flex">
            <Link className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/8 hover:text-white" href="/explorar">
              Explorar
            </Link>
            <Link className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/8 hover:text-white" href="/guias">
              Guias
            </Link>
            <Link className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/8 hover:text-white" href="/source">
              Source
            </Link>
            <Link className="rounded-full bg-[#d9ff1f] px-4 py-2 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c7ef17]" href="/buscar">
              Buscar
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-32 pt-6 sm:px-6">
        <section className="rounded-[32px] bg-[#09110c] px-5 py-6 text-white shadow-[0_30px_100px_-45px_rgba(39,215,108,0.65)] sm:px-7 sm:py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#27d76c]" />
                MVP pronto para validar vendas
              </p>
              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/68 sm:text-base">{subtitle}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buscar"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white/90"
              >
                <Search className="h-4 w-4" />
                Buscar agora
              </Link>
              <Link
                href="/source"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Source Premium
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {children}
      </main>

      <BottomNav />
    </div>
  );
}
