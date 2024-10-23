ZSH="/home/$USER/.oh-my-zsh"

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

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# PNPM
export PNPM_HOME="/home/raphael/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

