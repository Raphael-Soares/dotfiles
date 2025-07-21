#!/bin/bash
dconf load /org/gnome/ < config/settings.dconf
echo "Configurações restauradas! Reinicie a sessão."
