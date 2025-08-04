#!/usr/bin/env bash


export FZF_DEFAULT_OPTS=$'
  --color=fg:#404344,fg+:#c7b89d,bg:#1a1d1e,bg+:#1a1d1e
  --color=hl:#7daea3,hl+:#7daea3,info:#404344
  --color=prompt:#ec6b64,spinner:#ec6b64
  --color=border:#1a1d1e,input:#ec6b64,label:#1a1d1e
  --border=block
  --border-label="\e[41m Sessionizer \e[0m " 
  --prompt="  "
  --pointer=""
  --marker=""
  --separator=""
  --scrollbar=""
  --layout=reverse
  --padding=1
  --info=right
  --tmux center,50%,40%
  --bind="tab:down,shift-tab:up"'

if [[ $# -eq 1 ]]; then
   selected=$1
else
    selected=$(find ~/Desktop ~/.config ~/ -mindepth 1 -maxdepth 1 -type d | fzf)
fi

if [[ -z $selected ]]; then
    exit 0
fi

selected_name=$(basename "$selected" | tr . _)

if ! tmux has-session -t=$selected_name 2> /dev/null; then
    tmux new-session -ds $selected_name -c $selected
fi

tmux switch-client -t $selected_name

