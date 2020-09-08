---
layout: post
title: "How I work, part 2: the shell"
toc: true
# description: "This post documents how I work productively."
tags:
  - software
  - reference
  - programming
---

This is the second part of the "how I work" series.
[Read the first part here]({% post_url 2020-04-10-working-productively %}).

In this part I will document with which tools I work inside a terminal. [zsh](https://www.zsh.org/) is my shell of choice. Recently I switched from oh-my-zsh to [prezto](https://github.com/sorin-ionescu/prezto) as configuration framework.

I keep the configuration of most tools inside a so-called [dotfiles](https://github.com/gildesmarais/dotfiles) repository. To use them on my machines, I use [rcm](https://github.com/thoughtbot/rcm).

## ZSH configuration

My [`.zshrc`](https://github.com/gildesmarais/dotfiles/blob/master/zshrc) is stuffed with aliases.

Some configuration options stand out and I'll describe what they do in the next sections.

### Move the cursor _by words_ with <kbd>Alt</kbd> + arrow keys

To use <kbd>Alt</kbd>+<kbd>←</kbd> and <kbd>Alt</kbd>+<kbd>→</kbd> to jump words with cursor, add this to your `.zshrc`

```sh
bindkey "^[^[[C" forward-word
bindkey "^[^[[D" backward-word
```

### Using `!` and `history` to repeat commands

`history` gives a list of recent commands. Each command is prefixed by a number. In zsh you can prefix the number with an exclamation mark, e.g. `!1729`,. to expand that command.

I search the history with `history | grep NEEDLE` often. To make things a bit easier, I've setup an alias for it:

```sh
alias hgrep="history | grep"
```

You can also _search_ using <kbd>Ctrl</kbd>+<kbd>R</kbd>. Or use `history | sk` (see below for sk).

### Navigate between directories

Beside `cd`, `cd ..` (in zsh you can type just `..` or even `....`), I use `popd` and `pushd` to move back and forth between directories.

Whenever I create a new directory with `mkdir -p ~/whatever/foo/bar/baz` I like to change to it directly with `cd $_`.

#### `zsh-z`: jump between frequently visited directories

[`ZSH-z`](https://github.com/agkozak/zsh-z) is a tool to jump between directories you visited recently and frequently. It's fuzzy-matching those paths and super helpful.

`z foobar` changes the to the directory matching `foobar`.

## Version and package managers

Since I write code I need to install the environment to run that code in. As every project has its own requirements it's not suitable to go with one globally installed version.

- [asdf vm](https://asdf-vm.com/): a version manager to manage multiple installed versions of programming languages

I've used [rvm](https://rvm.io/) and [nvm](https://github.com/nvm-sh/nvm) before switching to asdf.

Since I work with Ruby and NodeJS a lot, I need their package managers, too:

- [bundler](https://bundler.io/)
- [yarn](https://yarnpkg.com/)

I don't bother to install software manually, since Homebrew for macOS exists.

- [homebrew](https://brew.sh/): macOS package management, also handles installation of GUI applications (so-called casks)

## List of my default toolbox

What follows is a listing of tools I use with a short description. Most of the tools can be installed with homebrew directly. Try `brew search NAME`.

### Finding files, content or directories

- find: (the one from [GNU coreutils](https://www.gnu.org/software/coreutils/), please) finds files and directories by their name, type, etc.
- [mc](https://midnight-commander.org/): good old Midnight Commander, a two paned file manager
- [rg](https://github.com/BurntSushi/ripgrep): super fast searching files.
- [skim](https://github.com/lotabout/skim): a (general purpose) fuzzy finder

### Create, read, manipulate, save and delete files

- echo, touch, grep, cat, tail, less, more, man, rm: goes without saying.
- using `cmd &`, `jobs`, `fg`, `bg` and `wait` is `nice`, too ;)
- [jq](https://stedolan.github.io/jq/): a cli JSON processor. Mostly I'm piping output into it to pretty print.
- [ncdu](https://dev.yorhel.nl/ncdu): NCurses Disk Usage. Finds large files and directories and deletes them from inside the UI.
- [pup](https://github.com/EricChiang/pup): what jq is for JSON, pup is for HTML
- [rpl](https://github.com/kcoyner/rpl/): replaces text inside files with another text (useful when I forgot the inline edit options of grep once again)
- [vim](https://www.vim.org/): is my default editor on remote machines. I don't know how to quit other editors like emacs. `¯\_(ツ)_/¯`

### Miscellaneous

- [ansible](https://www.ansible.com/): automatizes the setup of new machines.
- [aria2](https://aria2.github.io/): universal download utility
- [cURL](https://curl.haxx.se/): for HTTP requests and debugging those. I can't work without it.
- [ffmpeg](https://ffmpeg.org/): de-, en- and transcodes basically everything to whatever you want.
- [htop](https://htop.dev/): the system monitor
- [make](https://www.gnu.org/software/make/): a build tool which is widely available
- [rsync](https://rsync.samba.org/): synchronize files quickly (supports binary deltas)
- [ssh](https://www.openssh.com/): SSH is a protocol which allows you to connect to remote servers securely
- [tmux](https://github.com/tmux/tmux): terminal window multiplexer
- [youtube-dl](https://youtube-dl.org/): download video and audio (not only from youtube)
