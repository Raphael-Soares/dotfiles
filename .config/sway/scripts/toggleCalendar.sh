#!/bin/bash

# Verifica se a janela está aberta com app_id "calendar"
if swaymsg -t get_tree | jq -e '.. | select(.nodes? // empty) | select(.app_id? == "calendar")'; then
    # Se estiver aberta, fecha a janela
    swaymsg '[app_id="calendar"] kill'
else
    # Se não estiver aberta, abre a janela
    swaymsg 'exec alacritty --class=calendar --title=Calendar -e calcurse'
fi
