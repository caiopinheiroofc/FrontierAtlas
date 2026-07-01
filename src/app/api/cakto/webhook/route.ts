import { NextResponse } from "next/server";
import { getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { normalizeCaktoEvent, readWebhookSecret } from "@/lib/cakto";

export const runtime = "nodejs";

async function logWebhookEvent(params: {
  payload: unknown;
  providerEvent: ReturnType<typeof normalizeCaktoEvent>;
  processingStatus: string;
  errorMessage?: string | null;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  const eventsTable = supabase.from("subscription_webhook_events") as unknown as {
    insert: (value: Record<string, unknown>) => Promise<unknown>;
  };

  await eventsTable.insert({
    provider: "cakto",
    event_name: params.providerEvent.eventName,
    event_status: params.providerEvent.status,
    customer_email: params.providerEvent.customerEmail,
    matched_role: params.providerEvent.role,
    external_order_id: params.providerEvent.orderId,
    external_transaction_id: params.providerEvent.transactionId,
    processing_status: params.processingStatus,
    error_message: params.errorMessage ?? null,
    payload: params.payload,
    processed_at: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json(
      { ok: false, error: "Supabase admin nao configurado." },
      { status: 500 },
    );
  }

  const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Webhook da Cakto sem segredo configurado." },
      { status: 500 },
    );
  }

  const providedSecret = readWebhookSecret(request);
  if (!providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Assinatura do webhook invalida." },
      { status: 401 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload invalido." },
      { status: 400 },
    );
  }

  const normalized = normalizeCaktoEvent(payload);

  if (normalized.ignored) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "ignored",
    });

    return NextResponse.json({ ok: true, ignored: true });
  }

  if (!normalized.approved) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "waiting_payment",
    });

    return NextResponse.json({ ok: true, waiting: true });
  }

  if (!normalized.customerEmail) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "missing_email",
      errorMessage: "Email do cliente nao encontrado no payload.",
    });

    return NextResponse.json(
      { ok: false, error: "Email do cliente nao encontrado." },
      { status: 400 },
    );
  }

  if (!normalized.role) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "unmatched_plan",
      errorMessage: "Plano nao mapeado para PRO ou BUSINESS.",
    });

    return NextResponse.json(
      { ok: false, error: "Plano recebido ainda nao foi mapeado." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase admin indisponivel." },
      { status: 500 },
    );
  }

  const profilesTable = supabase.from("profiles") as unknown as {
    update: (value: Record<string, unknown>) => {
      eq: (column: string, value: string) => {
        select: (columns: string) => Promise<{
          data: Array<{ id: string; email: string; role: string }> | null;
          error: { message: string } | null;
        }>;
      };
    };
  };

  const { data: updatedProfiles, error } = await profilesTable
    .update({
      role: normalized.role,
      updated_at: new Date().toISOString(),
    })
    .eq("email", normalized.customerEmail)
    .select("id,email,role");

  if (error) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "update_error",
      errorMessage: error.message,
    });

    return NextResponse.json(
      { ok: false, error: "Nao foi possivel atualizar o plano." },
      { status: 500 },
    );
  }

  if (!updatedProfiles || updatedProfiles.length === 0) {
    await logWebhookEvent({
      payload,
      providerEvent: normalized,
      processingStatus: "profile_not_found",
      errorMessage: "Cliente pagou, mas ainda nao existe cadastro com esse email.",
    });

    return NextResponse.json(
      {
        ok: true,
        pendingSignup: true,
        message: "Pagamento recebido, mas o cadastro ainda nao existe no Supabase.",
      },
      { status: 202 },
    );
  }

  await logWebhookEvent({
    payload,
    providerEvent: normalized,
    processingStatus: "upgraded",
  });

  return NextResponse.json({
    ok: true,
    upgraded: true,
    email: normalized.customerEmail,
    role: normalized.role,
  });
}
