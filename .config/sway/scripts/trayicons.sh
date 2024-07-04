#!/bin/env bash

nm-applet &

DISPLAY= dbus-update-activation-environment DISPLAY; dbus-send --print-reply --dest=org.blueman.Applet /org/blueman/Applet org.blueman.Applet.Activate; dbus-update-activation-environment DISPLAY &
blueman-applet &
