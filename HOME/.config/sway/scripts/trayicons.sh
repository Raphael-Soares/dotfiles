#!/bin/env bash
DISPLAY= dbus-update-activation-environment DISPLAY; dbus-send --print-reply --dest=org.blueman.Applet /org/blueman/Applet org.blueman.Applet.Activate; dbus-update-activation-environment DISPLAY &
nm-applet &
blueman-applet &