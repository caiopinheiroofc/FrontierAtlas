import { Lock, ShieldCheck, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { SubscriptionCTA } from "@/components/subscription-cta";
import { SupplierCard } from "@/components/supplier-card";
import { getDefaultUserSubscriptionState } from "@/lib/subscription";
import { getSuppliers } from "@/lib/frontier-data";

export default async function SourcePage() {
  const suppliers = await getSuppliers();
  const subscriptionState = getDefaultUserSubscriptionState();
  return (
    <AppShell
      title="Frontier Business: fornecedores, margem e compra profissional."
      subtitle="Uma camada pensada para empresarios, revendedores e compradores que precisam de mais inteligencia comercial na fronteira."
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <Lock className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">Acesso preparado por plano</h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">A estrutura ja esta pronta para liberar essa camada apenas para usuarios Business, sem refazer o produto depois.</p>
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
        eyebrow="Frontier Business"
        title="Fornecedores iniciais por segmento"
        description="Aqui entram os contatos e atalhos de margem que fazem sentido para atacado, revenda e compra profissional."
      />

      <SubscriptionCTA
        title="Conheca o Frontier Atlas Business"
        description="A camada Business existe para transformar o Atlas em ferramenta comercial, com fornecedores, rotas de atacado e novas oportunidades para quem compra com objetivo de margem."
        plan="BUSINESS"
        buttonLabel="Conhecer Frontier Business"
        userRole={subscriptionState.role}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </AppShell>
  );
}
