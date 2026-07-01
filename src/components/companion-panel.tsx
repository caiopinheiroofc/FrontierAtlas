"use client";

import { CheckCircle2, MapPinned, ShoppingBag, Utensils } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { AuthPanel } from "@/components/auth-panel";
import { SubscriptionCTA } from "@/components/subscription-cta";

const timeline = [
  {
    title: "Voce chegou na fronteira",
    description:
      "Hora de abrir sua rota e começar pelas paradas com maior chance de resolver a compra.",
    icon: MapPinned,
  },
  {
    title: "Primeira loja da missao",
    description:
      "Comece pelo ponto que mais concentra itens da sua lista para reduzir desvio logo no inicio.",
    icon: ShoppingBag,
  },
  {
    title: "Pausa curta e reorganizacao",
    description:
      "Uma pausa estrategica ajuda a revisar o que ja foi resolvido antes da segunda metade da rota.",
    icon: Utensils,
  },
  {
    title: "Fim da rota e retorno",
    description:
      "Feche a viagem com a sensacao de caminho completo, nao de busca aleatoria.",
    icon: CheckCircle2,
  },
];

export function CompanionPanel() {
  const { user, effectiveRole, loading } = useAuth();
  const hasProAccess = effectiveRole === "PRO" || effectiveRole === "BUSINESS";

  if (loading) {
    return (
      <div className="rounded-[30px] border border-black/6 bg-white p-6 text-sm text-[#64705f] shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        Carregando Companion...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!user ? (
        <AuthPanel
          title="Entre para acompanhar sua viagem"
          description="Com login, o cliente passa a ter acesso ligado ao proprio cadastro e o Companion pode evoluir junto com o plano."
        />
      ) : null}

      {!hasProAccess ? (
        <SubscriptionCTA
          title="Finalize a viagem com o Companion completo"
          description="No Pro, o Companion evolui para uma camada mais rica de acompanhamento da rota, ajudando o usuario a continuar a compra com menos atrito."
          plan="PRO"
          buttonLabel="Desbloquear Frontier Atlas Pro"
          userRole={effectiveRole}
        />
      ) : null}

      <section className={`grid gap-4 ${hasProAccess ? "" : "pointer-events-none opacity-45"}`}>
        {(hasProAccess ? timeline : timeline.slice(0, 2)).map(
          ({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className="rounded-[28px] border border-black/6 bg-white p-5 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.38)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff4e8] text-[#0a0a0a]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
                    Etapa {index + 1}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#0a0a0a]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#62705f]">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ),
        )}
      </section>
    </div>
  );
}
