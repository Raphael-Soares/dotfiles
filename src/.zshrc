ZSH="/home/$USER/.oh-my-zsh"

# Plugins
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting eza docker nvm)
source $ZSH/oh-my-zsh.sh

ZSH_THEME=""
eval "$(starship init zsh)"

alias vim="nvim "
alias vi="vim"

zstyle ':omz:plugins:eza' 'icons' yes
zstyle ':omz:plugins:nvm' lazy yes

