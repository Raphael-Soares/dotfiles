ZSH="/home/$USER/.oh-my-zsh"

#Theme
ZSH_THEME=""

#Plugins
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting )
source $ZSH/oh-my-zsh.sh

#Star Ship
 eval "$(starship init zsh)"

alias ls="eza --icons"
alias ll="eza -ll --icons"
alias ll="eza -a --icons"
alias vim="nvim "
alias cat="bat "

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
#[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
