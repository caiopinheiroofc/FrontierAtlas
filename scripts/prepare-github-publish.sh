#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Execute este script dentro do repositorio git do Frontier Atlas."
  exit 1
fi

DEFAULT_BRANCH="chore/publish-$(date +%Y%m%d-%H%M)"
BRANCH_NAME="${1:-$DEFAULT_BRANCH}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-}"
CREATE_COMMIT="${CREATE_COMMIT:-false}"
PUSH_BRANCH="${PUSH_BRANCH:-false}"

if [ -n "$(git status --porcelain)" ]; then
  CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

  if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "Criando branch de trabalho: $BRANCH_NAME"
    git checkout -b "$BRANCH_NAME"
  else
    echo "Usando branch atual: $CURRENT_BRANCH"
  fi
else
  echo "Nenhuma mudanca local encontrada."
fi

echo "Rodando validacoes do projeto..."
pnpm lint
pnpm build

echo
echo "Resumo das mudancas:"
git status --short

if [ "$CREATE_COMMIT" = "true" ]; then
  if [ -z "$COMMIT_MESSAGE" ]; then
    echo "Defina COMMIT_MESSAGE para criar commit automaticamente."
    exit 1
  fi

  git add -A

  if [ -n "$(git status --porcelain)" ]; then
    git commit -m "$COMMIT_MESSAGE"
    echo "Commit criado com sucesso."
  else
    echo "Nenhuma mudanca para commitar."
  fi
fi

if [ "$PUSH_BRANCH" = "true" ]; then
  ACTIVE_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  git push --set-upstream origin "$ACTIVE_BRANCH"
  echo "Branch enviada: $ACTIVE_BRANCH"
fi

echo
echo "Proximo passo sugerido:"
echo "1. Abra o GitHub Desktop."
echo "2. Revise os arquivos alterados."
echo "3. Faça Commit to main ou na branch criada."
echo "4. Clique em Push origin para atualizar GitHub e Vercel."
