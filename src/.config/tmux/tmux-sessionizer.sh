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
    sessions=$(tmux list-sessions -F "#{session_name}" 2>/dev/null)
    all_dirs=$(find ~/Udesc/ ~/Desktop ~/.config ~/ -mindepth 1 -maxdepth 1 -type d -printf "%f\n")
    if [[ -n "$sessions" ]]; then
        dirs=$(echo "$all_dirs" | grep -v -F -x "$sessions")
    else
        dirs="$all_dirs"
    fi
    
    selected=$( (echo "$sessions"; echo "$dirs") | fzf )
fi

if [[ -z $selected ]]; then
    exit 0
fi

if tmux has-session -t="$selected" 2>/dev/null; then
    tmux switch-client -t "$selected"
else
    dir=$(find ~/Udesc/ ~/Desktop ~/.config ~/ -mindepth 1 -maxdepth 1 -type d -name "$selected" -print -quit)
    tmux new-session -ds "$selected" -c "${dir:-$HOME}"
    tmux switch-client -t "$selected"
fi
