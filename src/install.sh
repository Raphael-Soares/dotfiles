#!/bin/bash

# Define paths
DOTFILES_DIR="$(dirname "$(realpath "$0")")/.."
HOME_DIR="$HOME"
CONFIG_DIR="$HOME/.config"
SRC_CONFIG_DIR="$DOTFILES_DIR/HOME/.config"

# Function to copy and merge directories
copy_and_merge() {
	src="$1"
	dest="$2"

	# Create destination directory if it doesn't exist
	mkdir -p "$dest"

	# Copy and overwrite files
	cp -r "$src/"* "$dest"
}

# Copy .zshrc to home directory
cp "$DOTFILES_DIR/HOME/.zshrc" "$HOME_DIR/.zshrc"

# Merge .config directory
copy_and_merge "$SRC_CONFIG_DIR" "$CONFIG_DIR"

echo "Dotfiles have been installed successfully!"
