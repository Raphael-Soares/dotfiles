#!/usr/bin/env bash

dir="$HOME/.config/rofi/"
theme='rofi'

## Run
rofi \
    -show drun \
    -theme ${dir}/${theme}.rasi
