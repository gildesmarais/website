---
layout: post
title: Using a shell
# description: "This post documents how I work productively."
tags:
  - software
---

The real work is done in the terminal.

- [zsh](https://www.zsh.org/) is my shell of choice.
- [rcm](https://github.com/thoughtbot/rcm) to setup my [dotfiles](https://github.com/gildesmarais/dotfiles)

My `.zshrc` is stuffed with aliases. Find its in my [dotfiles](https://github.com/gildesmarais/dotfiles). Some things stand out and I'll describe them below.

## `zsh`: move cursor _by words_ with Alt + arrow left/right key

To use Alt+ ← and Alt + → to jump words with cursor, add this to your `.zshrc`

```sh
bindkey "^[^[[C" forward-word
bindkey "^[^[[D" backward-word
```

## `zsh`: using `!` and `history` to repeat commands

`history` gives a list of recent commands. Each command is prefixed by a number. In zsh you can prefix the number with an exclamation mark, e.g. `!1729`,. to expand that command.

I search the history with `history | grep NEEDLE` often. To make things a bit easier, I've setup an alias for it:

```sh
alias hgrep="history | grep"
```

## `zsh`: jump between frequently visited directories with `ZSH-z`

[`ZSH-z`](https://github.com/agkozak/zsh-z) is a tool to jump between directories you visited recently and frequenctly. It's fuzzy-matching and super helpful.

Beside that I use `popd` and `pushd` to move back/forth between directories.

## Version and package managers

- [homebrew](https://brew.sh/) macOS package management

- [rvm](https://rvm.io/)
- [bundler](https://bundler.io/)
- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)

If I'd setup my machine again, I'd ditch `rvm` and `nvm` in favor of [`asdf`](https://github.com/asdf-vm/asdf).

## Files and directories

- [rg](https://github.com/BurntSushi/ripgrep): super fast searching files.
- find: (the one from [GNU coreutils](https://www.gnu.org/software/coreutils/), please)
- [mc](https://midnight-commander.org/): good old Midnight Commander
- [ncdu](https://dev.yorhel.nl/ncdu): NCurses Disk Usage. Find large directories and delete them from inside the UI.

## Read, manipulate and save files

- [cURL](https://curl.haxx.se/): for HTTP requests and debugging those. I couldn't work without it.
- [aria2](https://aria2.github.io/): universal download utility

- [jq](https://stedolan.github.io/jq/): a cli JSON processor. Mostly I'm piping outputs into it.
- [pup](https://github.com/EricChiang/pup): what jq is for JSON, pup is for HTML
- vim: is my default editor on remote machines. I don't know how to quit other editors. `¯\_(ツ)_/¯`

## Misc

- ansible
- htop
- ssh
- tmux
- rsync
