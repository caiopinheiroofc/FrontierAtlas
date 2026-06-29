# Frontier Atlas

MVP web do **Frontier Atlas**, produto da **Frontierize Connect**.

O projeto foi desenhado para validar vendas rapidamente com uma experiência mobile-first para quem quer comprar, viajar, empreender ou encontrar fornecedores em Ciudad del Este.

## O que existe nesta V1

- Home com visual de app e missões de compra
- Explorar lojas com filtro simples
- Página individual de loja
- Guias rápidos
- Área `Source` para fornecedores
- Busca global simples
- Dados iniciais locais para validar a navegação antes do banco real

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Lucide React
- Supabase

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Build de produção

```bash
pnpm build
pnpm start
```

## Próximos passos

- conectar Supabase
- migrar dados mockados para banco real
- proteger a área `Source`
- instalar analytics
- publicar na Vercel

## Supabase

1. Copie `.env.example` para `.env.local`
2. Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Rode o schema em `supabase/schema.sql`
4. Alimente as tabelas usando a planilha mestre e o script `import-frontier-data.ts`

Sem essas variáveis, o app continua funcionando com fallback local em `src/lib/data.ts`.
