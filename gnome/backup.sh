#!/bin/bash
mkdir -p config
dconf dump /org/gnome/ > config/settings.dconf
gsettings get org.gnome.shell enabled-extensions > config/extensions.txt
echo "Backup concluído!"
