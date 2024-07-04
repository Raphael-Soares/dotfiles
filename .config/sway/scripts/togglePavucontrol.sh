#!/bin/bash

# Verifica se o Pavucontrol está em execução
if pgrep -x "pavucontrol" > /dev/null
then
    # Se estiver em execução, fecha o Pavucontrol
    pkill pavucontrol
else
    # Se não estiver em execução, abre o Pavucontrol
    pavucontrol &
fi
