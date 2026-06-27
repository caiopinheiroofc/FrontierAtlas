import Link from "next/link";
import { MapPinned } from "lucide-react";
import { FrontierScore } from "@/components/frontier-score";
import { Store } from "@/lib/data";

export function StoreCard({ store }: { store: Store }) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-black/6 bg-white shadow-[0_25px_80px_-50px_rgba(10,10,10,0.55)]">
      <div className={`relative h-36 bg-gradient-to-br ${store.coverAccent} p-5 text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_30%)]" />
        <div className="relative flex h-full items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              {store.categorySlugs[0].replace("-", " ")}
            </p>
            <h3 className="max-w-[14rem] text-2xl font-black tracking-[-0.04em]">{store.name}</h3>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/18 bg-white/10 text-lg font-black backdrop-blur">
            {store.logoText}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <p className="text-sm leading-6 text-[#5c655a]">{store.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {store.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-[#eff4e8] px-3 py-1 text-xs font-semibold text-[#4d564a]">
              {tag}
            </span>
          ))}
        </div>
        <FrontierScore score={store.score} compact />
        <div className="flex gap-3">
          <Link
            href={`/lojas/${store.slug}`}
            className="flex-1 rounded-full bg-[#0a0a0a] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
          >
            Ver detalhes
          </Link>
          <a
            href={store.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-black/8 px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#f3f5ef]"
          >
            <MapPinned className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
