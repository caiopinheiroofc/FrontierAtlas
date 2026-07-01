# Cakto Webhook Setup

Este guia prepara o Frontier Atlas para liberar automaticamente os planos `PRO` e `BUSINESS` depois do pagamento.

## 1. Rodar o schema no Supabase

Atualize o banco com o arquivo:

- `supabase/schema.sql`

Isso cria:

- tabela `profiles`
- tabela `subscription_webhook_events`

## 2. Configurar variáveis no projeto

Preencha estas variáveis no ambiente da Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CAKTO_WEBHOOK_SECRET`
- `CAKTO_PRO_PRODUCT_IDS`
- `CAKTO_BUSINESS_PRODUCT_IDS`

Exemplo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-anon-key
SUPABASE_SERVICE_ROLE_KEY=seu-service-role-key
CAKTO_WEBHOOK_SECRET=segredo-super-forte
CAKTO_PRO_PRODUCT_IDS=pro-mensal,pro-anual
CAKTO_BUSINESS_PRODUCT_IDS=business-mensal,business-anual
```

## 3. Configurar webhook na Cakto

URL do webhook:

```txt
https://seu-dominio.com/api/cakto/webhook
```

Segredo:

- usar o mesmo valor de `CAKTO_WEBHOOK_SECRET`

Header aceito:

```txt
Authorization: Bearer SEU_SEGREDO
```

Tambem funciona:

```txt
x-cakto-secret: SEU_SEGREDO
```

## 4. Logica da liberacao

O sistema faz isso automaticamente:

1. recebe o evento
2. valida o segredo
3. identifica o email do comprador
4. identifica o produto comprado
5. traduz o produto para `PRO` ou `BUSINESS`
6. atualiza o campo `role` na tabela `profiles`

## 5. Regra importante

O cliente precisa usar no pagamento o mesmo email do cadastro no Frontier Atlas.

Se ele pagar antes de criar a conta:

- o evento fica salvo em `subscription_webhook_events`
- o plano nao sobe sozinho naquele momento

## 6. Como testar

Use o payload de exemplo:

- `docs/cakto-webhook-sample.json`

E envie para:

```txt
POST /api/cakto/webhook
```

Com segredo correto no header.

## 7. Resultado esperado

Se tudo estiver certo:

- o perfil do usuario muda para `PRO` ou `BUSINESS`
- o evento fica registrado
- o acesso premium passa a funcionar no site

## 8. Consulta rapida no Supabase

Ver perfis:

```sql
select id, email, role, updated_at
from profiles
order by updated_at desc;
```

Ver eventos de webhook:

```sql
select id, provider, customer_email, matched_role, processing_status, created_at
from subscription_webhook_events
order by created_at desc;
```

