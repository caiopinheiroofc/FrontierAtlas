import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { SubscriptionCTA } from "@/components/subscription-cta";
import { subscriptionPlans } from "@/config/subscription.config";
import {
  getDefaultUserSubscriptionState,
  getRemainingFreeRoutes,
} from "@/lib/subscription";

export default function PerfilPage() {
  const subscriptionState = getDefaultUserSubscriptionState();
  const currentPlan = subscriptionPlans[subscriptionState.role];
  const remainingRoutes = getRemainingFreeRoutes(subscriptionState);

  return (
    <AppShell
      title="Seu plano, seus limites e seus proximos desbloqueios."
      subtitle="Uma area simples para o usuario entender o que ja tem hoje e o que ganha ao continuar com o Frontier Atlas."
    >
      <SectionHeading
        eyebrow="Perfil"
        title="Assinatura"
        description="Aqui a assinatura aparece como parte natural da experiencia, sem interromper o uso do produto."
      />

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
            Plano atual
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#0a0a0a]">
            {currentPlan.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#65705f]">
            {currentPlan.description}
          </p>
          <div className="mt-5 rounded-[24px] bg-[#eff4e8] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#74806f]">
              Uso gratuito restante
            </p>
            <p className="mt-2 text-lg font-bold text-[#0a0a0a]">
              {remainingRoutes} rota(s) inteligente(s)
            </p>
          </div>
          <div className="mt-5 grid gap-2">
            {currentPlan.benefits.slice(0, 5).map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl bg-[#f7f8f3] px-4 py-3 text-sm font-semibold text-[#4e584a]"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SubscriptionCTA
            title="Desbloqueie o Frontier Atlas Pro"
            description="Quando a rota inteligente vira ferramenta de compra de verdade, o Pro entra como continuacao natural com uso ilimitado, Companion e guias premium."
            plan="PRO"
            buttonLabel="Desbloquear Frontier Atlas Pro"
            userRole={subscriptionState.role}
          />

          <SubscriptionCTA
            title="Conheca o Frontier Atlas Business"
            description="Para revendedores e compradores profissionais, a camada Business libera fornecedores, oportunidades comerciais e inteligencia de atacado."
            plan="BUSINESS"
            buttonLabel="Conhecer Frontier Business"
            userRole={subscriptionState.role}
          />
        </div>
      </section>
    </AppShell>
  );
}
