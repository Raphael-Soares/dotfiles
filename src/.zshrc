ZSH="/home/$USER/.oh-my-zsh"
[[ $TERM != "linux" && -z "$TMUX" ]] && sh ~/.config/tmux/tmux-default.sh

# Plugins
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting )
source $ZSH/oh-my-zsh.sh

# Theme 
ZSH_THEME=""
eval "$(starship init zsh)"


# ALIASES
alias ls="eza --icons"
alias ll="eza -ll --icons"
alias ll="eza -a --icons"
alias vim="nvim "
alias vi="vim "
alias please="sudo "


# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

