import {
  subscriptionPlans,
  type SubscriptionRole,
} from "@/config/subscription.config";

export type SubscriptionPermission =
  | "smart_routes_unlimited"
  | "smart_routes_free_access"
  | "premium_guides"
  | "companion_full"
  | "frontier_source"
  | "business_content";

export type UserSubscriptionState = {
  role: SubscriptionRole;
  completedSmartRoutes: number;
};

const permissionMatrix: Record<SubscriptionRole, SubscriptionPermission[]> = {
  FREE: ["smart_routes_free_access"],
  PRO: [
    "smart_routes_free_access",
    "smart_routes_unlimited",
    "premium_guides",
    "companion_full",
  ],
  BUSINESS: [
    "smart_routes_free_access",
    "smart_routes_unlimited",
    "premium_guides",
    "companion_full",
    "frontier_source",
    "business_content",
  ],
};

export const FREE_SMART_ROUTE_LIMIT = 2;

export function hasPermission(
  role: SubscriptionRole,
  permission: SubscriptionPermission,
) {
  return permissionMatrix[role].includes(permission);
}

export function canUseSmartRoute(state: UserSubscriptionState) {
  if (hasPermission(state.role, "smart_routes_unlimited")) return true;
  return state.completedSmartRoutes < FREE_SMART_ROUTE_LIMIT;
}

export function getRemainingFreeRoutes(state: UserSubscriptionState) {
  if (hasPermission(state.role, "smart_routes_unlimited")) return Infinity;
  return Math.max(0, FREE_SMART_ROUTE_LIMIT - state.completedSmartRoutes);
}

export function getUpgradePlanForRole(role: SubscriptionRole) {
  if (role === "FREE") return subscriptionPlans.PRO;
  if (role === "PRO") return subscriptionPlans.BUSINESS;
  return subscriptionPlans.BUSINESS;
}

export function getDefaultUserSubscriptionState(): UserSubscriptionState {
  return {
    role: "FREE",
    completedSmartRoutes: 0,
  };
}
