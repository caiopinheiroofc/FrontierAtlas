import {
  caktoWebhookConfig,
  type CaktoPlanMatcher,
} from "@/config/cakto.config";
import { type SubscriptionRole } from "@/config/subscription.config";

type JsonRecord = Record<string, unknown>;

export type NormalizedCaktoEvent = {
  eventName: string;
  status: string | null;
  customerEmail: string | null;
  customerName: string | null;
  orderId: string | null;
  transactionId: string | null;
  productId: string | null;
  productName: string | null;
  role: Extract<SubscriptionRole, "PRO" | "BUSINESS"> | null;
  approved: boolean;
  ignored: boolean;
};

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as JsonRecord;
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalize(value: string | null) {
  if (!value) return "";

  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function pickFirstString(...values: unknown[]) {
  for (const value of values) {
    const parsed = asString(value);
    if (parsed) return parsed;
  }

  return null;
}

function getNested(record: JsonRecord | null, ...path: string[]) {
  let current: unknown = record;

  for (const key of path) {
    const currentRecord = asRecord(current);
    if (!currentRecord) return null;
    current = currentRecord[key];
  }

  return current;
}

function getFirstItem(record: JsonRecord | null, key: string) {
  const value = record?.[key];
  if (!Array.isArray(value)) return null;

  const [first] = value;
  return asRecord(first);
}

function matchesPlan(
  matcher: CaktoPlanMatcher,
  productId: string | null,
  productName: string | null,
) {
  const normalizedId = normalize(productId);
  const normalizedName = normalize(productName);

  if (
    normalizedId &&
    matcher.productIds.some((candidate) => normalize(candidate) === normalizedId)
  ) {
    return true;
  }

  if (
    normalizedName &&
    matcher.productNames.some(
      (candidate) => normalize(candidate) === normalizedName,
    )
  ) {
    return true;
  }

  if (
    normalizedName &&
    matcher.keywords.some((candidate) => normalizedName.includes(normalize(candidate)))
  ) {
    return true;
  }

  return false;
}

export function normalizeCaktoEvent(payload: unknown): NormalizedCaktoEvent {
  const root = asRecord(payload);
  const customer = asRecord(root?.customer) || asRecord(getNested(root, "data", "customer"));
  const product =
    asRecord(root?.product) ||
    asRecord(root?.plan) ||
    asRecord(root?.offer) ||
    asRecord(getNested(root, "data", "product")) ||
    asRecord(getNested(root, "data", "plan"));
  const order = asRecord(root?.order) || asRecord(getNested(root, "data", "order"));
  const payment = asRecord(root?.payment) || asRecord(getNested(root, "data", "payment"));
  const firstItem =
    getFirstItem(root, "items") ||
    getFirstItem(order, "items") ||
    getFirstItem(asRecord(root?.data), "items");

  const eventName = pickFirstString(root?.event, root?.type, root?.action) || "unknown";
  const status = pickFirstString(
    root?.status,
    order?.status,
    payment?.status,
    getNested(root, "data", "status"),
  );
  const customerEmail = pickFirstString(
    customer?.email,
    root?.email,
    root?.customer_email,
    order?.customer_email,
    getNested(root, "buyer", "email"),
  );
  const customerName = pickFirstString(
    customer?.name,
    root?.name,
    getNested(root, "buyer", "name"),
  );
  const orderId = pickFirstString(root?.id, order?.id, root?.order_id);
  const transactionId = pickFirstString(
    root?.transaction_id,
    payment?.transaction_id,
    payment?.id,
  );
  const productId = pickFirstString(
    product?.id,
    product?.code,
    firstItem?.id,
    firstItem?.product_id,
    firstItem?.offer_id,
  );
  const productName = pickFirstString(
    product?.name,
    product?.title,
    firstItem?.name,
    firstItem?.title,
    root?.offer_name,
    root?.product_name,
  );

  const matchedPlan =
    caktoWebhookConfig.plans.find((plan) => matchesPlan(plan, productId, productName)) ||
    null;
  const normalizedStatus = normalize(status);

  return {
    eventName,
    status,
    customerEmail,
    customerName,
    orderId,
    transactionId,
    productId,
    productName,
    role: matchedPlan?.role ?? null,
    approved: caktoWebhookConfig.approvedStatuses.includes(normalizedStatus),
    ignored: caktoWebhookConfig.ignoredStatuses.includes(normalizedStatus),
  };
}

export function readWebhookSecret(request: Request) {
  for (const headerName of caktoWebhookConfig.acceptedSecretHeaders) {
    const value = request.headers.get(headerName);
    if (!value) continue;

    if (headerName === "authorization") {
      return value.replace(/^Bearer\s+/i, "").trim();
    }

    return value.trim();
  }

  return null;
}

