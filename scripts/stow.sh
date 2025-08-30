#!/usr/bin/env bash
pwd
stow -d --adopt * .dotfiles/src -t ~ .
