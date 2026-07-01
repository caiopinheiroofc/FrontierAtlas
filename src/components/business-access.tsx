"use client";

import { Lock, ShieldCheck, Star } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { AuthPanel } from "@/components/auth-panel";
import { SubscriptionCTA } from "@/components/subscription-cta";
import { SupplierCard } from "@/components/supplier-card";
import { type Supplier } from "@/lib/data";

export function BusinessAccess({ suppliers }: { suppliers: Supplier[] }) {
  const { user, effectiveRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="rounded-[30px] border border-black/6 bg-white p-6 text-sm text-[#64705f] shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        Carregando acesso Business...
      </div>
    );
  }

  const hasBusinessAccess = effectiveRole === "BUSINESS";

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <Lock className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">
            Acesso por plano
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">
            O acesso a fornecedores passa a ser liberado por conta cadastrada,
            nao por link aberto.
          </p>
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <ShieldCheck className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">
            Curadoria Frontierize
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">
            Cada fornecedor pode carregar nota interna, pedido minimo e leitura
            comercial para compra profissional.
          </p>
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
          <Star className="h-6 w-6 text-[#0a0a0a]" />
          <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[#0a0a0a]">
            Pensado para crescimento
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#667064]">
            Hoje o cadastro ja organiza o acesso por conta. Depois podemos ligar
            isso ao checkout automatico.
          </p>
        </div>
      </section>

      {!user ? (
        <AuthPanel
          title="Entre para liberar sua area Business"
          description="Cadastre o cliente, faca login e depois libere o plano BUSINESS para essa conta no Supabase."
        />
      ) : null}

      {!hasBusinessAccess ? (
        <SubscriptionCTA
          title="Conheca o Frontier Atlas Business"
          description="A camada Business existe para transformar o Atlas em ferramenta comercial, com fornecedores, rotas de atacado e novas oportunidades para quem compra com objetivo de margem."
          plan="BUSINESS"
          buttonLabel="Conhecer Frontier Business"
          userRole={effectiveRole}
        />
      ) : null}

      <div className={`${hasBusinessAccess ? "" : "pointer-events-none opacity-45"}`}>
        <div className="grid gap-5 lg:grid-cols-2">
          {(hasBusinessAccess ? suppliers : suppliers.slice(0, 2)).map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  );
}
