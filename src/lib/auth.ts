import { type SubscriptionRole } from "@/config/subscription.config";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  role: SubscriptionRole;
};

export function normalizeSubscriptionRole(value?: string | null): SubscriptionRole {
  if (value === "PRO" || value === "BUSINESS") return value;
  return "FREE";
}
