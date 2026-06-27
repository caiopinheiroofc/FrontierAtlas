import { Lock, ShieldCheck, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { SupplierCard } from "@/components/supplier-card";
import { suppliers } from "@/lib/data";

export default function SourcePage() {
  return (
    <AppShell
      title="Source: fornecedores e atalhos de margem."
      subtitle="Uma prévia funcional da área premium com contatos segmentados para atacado, revenda e compras mais estratégicas."
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <Lock className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Pronto para senha simples</h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">Nesta V1 a área já comunica valor e pode ser protegida depois da compra sem reestruturar o app.</p>
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <ShieldCheck className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Curadoria Frontierize</h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">Cada fornecedor pode carregar nota interna, contexto de compra mínima e leitura comercial.</p>
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <Star className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Pensado para expansão</h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">Login, assinatura e favoritos entram depois sem desmontar a estrutura do MVP.</p>
        </div>
      </section>

      <SectionHeading
        eyebrow="Source"
        title="Fornecedores iniciais por segmento"
        description="Aqui já existem cards com nome, segmento, pedido mínimo, envio para o Brasil e observações estratégicas."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </AppShell>
  );
}
