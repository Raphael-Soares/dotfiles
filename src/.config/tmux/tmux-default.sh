#!/usr/bin/env bash

# Cria a sessão "default" se não existir
tmux has-session -t default 2>/dev/null || tmux new-session -d -s default

# Verifica se há alguma sessão ativa
sessions=$(tmux list-sessions 2>/dev/null | awk -F: '{print $1}')

if [ -n "$sessions" ]; then
  # Conecta na última sessão usada
  tmux attach-session
else
  # Garante fallback na sessão default
  tmux attach-session -t default
fi
