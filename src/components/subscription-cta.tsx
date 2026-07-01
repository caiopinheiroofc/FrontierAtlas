import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Compass, Sparkles } from "lucide-react";
import {
  subscriptionPlans,
  type SubscriptionRole,
} from "@/config/subscription.config";

const iconMap = {
  Compass,
  Sparkles,
  BriefcaseBusiness,
};

export function SubscriptionCTA({
  title,
  description,
  plan,
  buttonLabel,
  checkoutUrl,
  userRole,
}: {
  title: string;
  description: string;
  plan: SubscriptionRole;
  buttonLabel: string;
  checkoutUrl?: string | null;
  userRole: SubscriptionRole;
}) {
  const planConfig = subscriptionPlans[plan];
  const Icon = iconMap[planConfig.icon];
  const isCurrentPlan = userRole === plan;
  const href = checkoutUrl || planConfig.checkoutUrl || "/perfil";

  return (
    <section
      className={`rounded-[30px] bg-gradient-to-br ${planConfig.color} p-5 shadow-[0_25px_80px_-45px_rgba(10,10,10,0.5)]`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
            {planConfig.name}
          </p>
          <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
            {title}
          </h3>
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/78">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {planConfig.benefits.slice(0, 4).map((benefit) => (
          <span
            key={benefit}
            className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold text-white/82"
          >
            {benefit}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/55">
            Checkout externo
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {planConfig.monthlyPrice || "Plano sem cobrança no momento"}
          </p>
        </div>

        {isCurrentPlan ? (
          <div className="rounded-full border border-white/12 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
            Plano atual
          </div>
        ) : (
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white/92"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
