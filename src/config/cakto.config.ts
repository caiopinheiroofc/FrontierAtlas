import { type SubscriptionRole } from "@/config/subscription.config";

export type CaktoPlanMatcher = {
  role: Extract<SubscriptionRole, "PRO" | "BUSINESS">;
  productIds: string[];
  productNames: string[];
  keywords: string[];
};

function readList(value: string | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const caktoWebhookConfig = {
  acceptedSecretHeaders: [
    "authorization",
    "x-cakto-secret",
    "x-webhook-secret",
  ],
  approvedStatuses: [
    "approved",
    "paid",
    "completed",
    "complete",
    "confirmed",
    "authorized",
  ] as string[],
  ignoredStatuses: [
    "refunded",
    "chargeback",
    "canceled",
    "cancelled",
    "failed",
    "expired",
  ] as string[],
  plans: [
    {
      role: "PRO",
      productIds: readList(process.env.CAKTO_PRO_PRODUCT_IDS),
      productNames: [
        "frontier atlas pro",
        "plano pro",
      ],
      keywords: ["pro", "atlas pro"],
    },
    {
      role: "BUSINESS",
      productIds: readList(process.env.CAKTO_BUSINESS_PRODUCT_IDS),
      productNames: [
        "frontier atlas business",
        "plano business",
        "frontier business",
      ],
      keywords: ["business", "fornecedor", "atacado", "revenda"],
    },
  ] satisfies CaktoPlanMatcher[],
} as const;
