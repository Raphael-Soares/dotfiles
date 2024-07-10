#!/bin/bash

# Verifica se a janela está aberta com app_id "calendar"
if swaymsg -t get_tree | jq -e '.. | select(.nodes? // empty) | select(.app_id? == "org.gnome.Calendar")'; then
	# Se estiver aberta, fecha a janela
	pkill gnome-calendar
else
	# Se não estiver aberta, abre a janela
	swaymsg 'exec gnome-calendar'

fi
