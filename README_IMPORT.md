# Frontier Atlas Import

Este pacote foi criado para centralizar o cadastro operacional do Frontier Atlas e facilitar a futura importacao para o Supabase.

## Arquivos

- `frontier-atlas-master-data.xlsx`
- `frontier-atlas-master-data.csv`
- `import-frontier-data.ts`

## Como preencher

1. Use a aba correta para cada tipo de entidade:
   - `stores`
   - `suppliers`
   - `restaurants`
   - `hotels`
   - `exchange_houses`
   - `parking`
   - `categories`
   - `collections`
2. Mantenha os `slug` em minusculo, sem acento e com hifen.
3. Para campos booleanos, use:
   - `TRUE`
   - `FALSE`
   - `to_verify` quando ainda nao houver certeza
4. Para campos com multiplos valores, use virgula:
   - `Cartao,Dinheiro,Dolar`
   - `Apple,Samsung,Xiaomi`
5. Para contatos ou links ainda nao validados, deixe vazio ou use `to_verify`.
6. Use `status` apenas com estes valores:
   - `active`
   - `draft`
   - `review`
   - `inactive`

## Como o CSV mestre funciona

O arquivo `frontier-atlas-master-data.csv` e um consolidado unico com a coluna `entity_type`.

Exemplo:

- `stores`
- `suppliers`
- `restaurants`
- `hotels`
- `exchange_houses`
- `parking`
- `categories`
- `collections`

O script de importacao usa `entity_type` para separar as linhas e mandar cada bloco para a tabela correspondente no Supabase.

## Ordem recomendada de operacao

1. Atualizar a planilha `.xlsx`
2. Exportar novamente o `.csv` mestre se houver mudancas estruturais
3. Revisar `status`, `slug` e campos `to_verify`
4. Rodar o importador no ambiente do projeto

## Como importar no Supabase

1. Instale a dependencia caso ainda nao exista:

```bash
pnpm add @supabase/supabase-js
```

2. Defina as variaveis de ambiente:

```bash
export SUPABASE_URL="https://SEU-PROJETO.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="SUA_SERVICE_ROLE_KEY"
```

3. Rode o script:

```bash
pnpm exec tsx import-frontier-data.ts ./frontier-atlas-master-data.csv
```

Ou, se preferir com Node/ts-node no seu setup:

```bash
npx tsx import-frontier-data.ts ./frontier-atlas-master-data.csv
```

## Regras de importacao

- `to_verify` e strings vazias sao transformadas em `null`
- `TRUE` e `FALSE` sao transformados em booleanos
- cada linha entra na tabela conforme `entity_type`
- o script ignora colunas que nao pertencem ao schema do tipo correspondente

## Observacao importante

Este pacote foi montado para escalar. A ideia e enriquecer os dados primeiro e integrar banco depois, sem perder consistencia estrutural.

## Extracao automatica do Compras Paraguai

Existe um coletor dedicado para as lojas listadas em `https://www.comprasparaguai.com.br/lojas/`.

Ele gera:

- `outputs/compras-paraguai/compras-paraguai-stores-raw.json`
- `outputs/compras-paraguai/compras-paraguai-stores-frontier.json`
- `outputs/compras-paraguai/compras-paraguai-stores-frontier.csv`

Como rodar:

```bash
pnpm extract:compras-paraguai
```

Se quiser testar poucas lojas primeiro:

```bash
pnpm extract:compras-paraguai --limit=5
```

Importante:

- o CSV gerado sai no formato de `stores` do Frontier Atlas
- os itens entram como `draft` por seguranca editorial
- contatos e regras comerciais ainda devem ser revisados antes de publicar
