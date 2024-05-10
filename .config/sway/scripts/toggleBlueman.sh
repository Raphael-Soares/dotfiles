#!/bin/bash



# Verifica se o Pavucontrol está em execução
if pgrep -x "blueman-manager" > /dev/null
then
    # Se estiver em execução, fecha o Pavucontrol
    pkill 'blueman-manager'
else
    # Se não estiver em execução, abre o Pavucontrol
    blueman-applet &
    blueman-manager &
fi
