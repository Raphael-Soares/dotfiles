#!/bin/bash

# Define paths
DOTFILES_DIR="$(dirname "$(realpath "$0")")/.."
HOME_DIR="$HOME"
CONFIG_DIR="$HOME/.config"
SRC_CONFIG_DIR="$DOTFILES_DIR/HOME/.config"

# Function to rename conflicting files
rename_conflicts() {
    for file in "$1"/*; do
        if [[ -e "$file" ]]; then
            mv "$file" "${file}-old"
        fi
    done
}

# Function to copy and merge directories
copy_and_merge() {
    src="$1"
    dest="$2"

    # Create destination directory if it doesn't exist
    mkdir -p "$dest"

    # Copy and overwrite files
    cp -r "$src/"* "$dest"
}

# Check for flags
if [[ "$1" == "--remove" ]]; then
    # Remove conflicting files
    for file in "$SRC_CONFIG_DIR"/*; do
        if [[ -e "$CONFIG_DIR/$(basename "$file")" ]]; then
            rm -rf "$CONFIG_DIR/$(basename "$file")"
        fi
    done
fi

# Rename conflicting files if they exist
rename_conflicts "$CONFIG_DIR"

# Copy .zshrc to home directory
cp "$DOTFILES_DIR/HOME/.zshrc" "$HOME_DIR/.zshrc"

# Merge .config directory
copy_and_merge "$SRC_CONFIG_DIR" "$CONFIG_DIR"

echo "Dotfiles have been installed successfully!"
