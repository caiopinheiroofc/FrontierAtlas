"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { AuthPanel } from "@/components/auth-panel";
import { SubscriptionCTA } from "@/components/subscription-cta";
import { subscriptionPlans } from "@/config/subscription.config";
import { getRemainingFreeRoutes } from "@/lib/subscription";

export function ProfilePanel() {
  const { user, profile, loading, signOut, effectiveRole } = useAuth();

  if (loading) {
    return (
      <div className="rounded-[30px] border border-black/6 bg-white p-6 text-sm text-[#64705f] shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        Carregando seu acesso...
      </div>
    );
  }

  if (!user) {
    return (
      <AuthPanel
        title="Entre para liberar seu acesso"
        description="Cada cliente pode ter acesso liberado por conta. Assim conseguimos ativar FREE, PRO ou BUSINESS para cada cadastro."
      />
    );
  }

  const currentPlan = subscriptionPlans[effectiveRole];
  const remainingRoutes = getRemainingFreeRoutes({
    role: effectiveRole,
    completedSmartRoutes: 0,
  });

  return (
    <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
          Conta ativa
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#0a0a0a]">
          {profile?.full_name || user.email}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#64705f]">{user.email}</p>

        <div className="mt-5 rounded-[24px] bg-[#eff4e8] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#74806f]">
            Plano atual
          </p>
          <p className="mt-2 text-lg font-bold text-[#0a0a0a]">
            {currentPlan.name}
          </p>
        </div>

        {effectiveRole === "FREE" ? (
          <div className="mt-4 rounded-[24px] bg-[#f7f8f3] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#74806f]">
              Rotas gratuitas
            </p>
            <p className="mt-2 text-lg font-bold text-[#0a0a0a]">
              {remainingRoutes} rota(s) disponíveis
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white"
          >
            Sair
          </button>
          <Link
            href="/companion"
            className="rounded-full bg-[#eff4e8] px-5 py-3 text-sm font-semibold text-[#0a0a0a]"
          >
            Abrir Companion
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <SubscriptionCTA
          title="Desbloqueie o Frontier Atlas Pro"
          description="Quando a rota inteligente vira ferramenta de compra de verdade, o Pro entra como continuacao natural com uso ilimitado, Companion e guias premium."
          plan="PRO"
          buttonLabel="Desbloquear Frontier Atlas Pro"
          userRole={effectiveRole}
        />

        <SubscriptionCTA
          title="Conheca o Frontier Atlas Business"
          description="Para revendedores e compradores profissionais, a camada Business libera fornecedores, oportunidades comerciais e inteligencia de atacado."
          plan="BUSINESS"
          buttonLabel="Conhecer Frontier Business"
          userRole={effectiveRole}
        />
      </div>
    </section>
  );
}
