import { ArrowUpRight, Truck } from "lucide-react";
import { Supplier } from "@/lib/data";

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.5)]">
      <div className={`mb-4 h-24 rounded-[24px] bg-gradient-to-br ${supplier.accent} p-4 text-white`}>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/74">{supplier.segment}</p>
        <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{supplier.name}</h3>
      </div>
      <p className="text-sm leading-6 text-[#677264]">{supplier.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-[#4d564a]">
        <div className="rounded-2xl bg-[#f6f7f2] px-3 py-2">
          Pedido mínimo: <strong>{supplier.minimumOrder}</strong>
        </div>
        <div className="rounded-2xl bg-[#f6f7f2] px-3 py-2">
          {supplier.sellsWholesale ? "Atacado" : "Varejo"} • {supplier.shipsToBrazil ? "Envia para o Brasil" : "Retirada local"}
        </div>
      </div>
      <p className="mt-4 rounded-2xl bg-[#0a0a0a] px-4 py-3 text-sm leading-6 text-white/84">
        {supplier.frontierNote}
      </p>
      <div className="mt-4 flex gap-3">
        {supplier.whatsapp ? (
          <a
            href={`https://wa.me/${supplier.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-[#27d76c] px-4 py-3 text-center text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#21c25f]"
          >
            WhatsApp
          </a>
        ) : null}
        {supplier.instagramUrl ? (
          <a
            href={supplier.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-black/8 px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#f3f5ef]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <div className="inline-flex items-center justify-center rounded-full border border-black/8 px-4 py-3 text-sm font-semibold text-[#0a0a0a]">
            <Truck className="h-4 w-4" />
          </div>
        )}
      </div>
    </article>
  );
}
