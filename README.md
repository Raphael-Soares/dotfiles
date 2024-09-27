
# Raphael's Dotfiles

| NOTE: This installation is meant to be on a minimal Arch Linux installation.

## 1. Dependencies

Install dependencies:

```bash
# Pacman dependencies
sudo pacman -S --needed zsh eza stow git curl brightnessctl bluez blueman bluez-utils pipewire-pulse pamixer jq inter-font hyprland hyprshot hyprlock hypridle sassc dart-sass tmux 

# Yay dependencies
yay -S --needed aylurs-gtk-shell ttf-jetbrains-mono-nerd
```

Then install oh-my-zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Then install Starship:

```bash
sh -c "$(curl -fsSL https://starship.rs/install.sh)"
```

Now install the Zsh plugins:

```bash
ZSH_CUSTOM=${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git $ZSH_CUSTOM/plugins/fast-syntax-highlighting
git clone --depth 1 https://github.com/marlonrichert/zsh-autocomplete.git $ZSH_CUSTOM/plugins/zsh-autocomplete
```

## 2. Installation

Clone the project and run the installation script. It will copy the dotfiles to your system:

```bash
git clone https://github.com/Raphael-Soares/dotfiles.git ~/dotfiles
cd ~/dotfiles/src/
./install.sh
```
