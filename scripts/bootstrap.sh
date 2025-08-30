#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/.dotfiles"

if [ ! -d "$REPO_DIR" ]; then
  echo "[*] Clonando dotfiles..."
  git clone https://github.com/seuuser/dotfiles.git "$REPO_DIR"
else
  echo "[*] Repositório já existe, atualizando..."
  git -C "$REPO_DIR" pull --ff-only
fi

echo "[*] Rodando stow.sh..."
bash "$REPO_DIR/scripts/stow.sh"
