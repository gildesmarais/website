---
title: "How I work, part 2: the command line"
date: 2020-09-11
description: "The 'How I work' post series documents how I work. This part is about working productively on the command line."
showcaseOrder: 2
tags:
  - macos
  - programming
  - reference
  - software
---

This is the second part of my "How I work" series. In case you missed it, [read the first part here](/blog/working-productively). In this part I describe the tools I use on the command line.

I keep the configuration of most tools inside a [dotfiles](https://github.com/gildesmarais/dotfiles) repository. This setup lets me sync my configuration between machines. To manage the dotfiles, I use [rcm](https://github.com/thoughtbot/rcm) and version them with [git](https://git-scm.com/).

While most tools do one thing well, chaining them with pipes (`|`) or redirecting their output (`>`, `<`) makes the command line powerful and efficient. Need only a part of the output? Pipe it to `awk` and extract what you need.

Although I like green characters on a dark background scrolling by, they need to get out of the way quickly. I clear the scrollback buffer with <kbd>Cmd</kbd>+<kbd>K</kbd> often.

![A screenshot of iTerm2 running ZSH and homebrew](../../assets/images/posts/2020-09-11-command-line.webp)

## ZSH and its configuration

[zsh](https://www.zsh.org/) is my shell of choice. I started with the oh-my-zsh configuration framework years ago and switched to [prezto](https://github.com/sorin-ionescu/prezto/) recently. The main reason was the time it took to start a new session. With prezto the startup time improved noticeably. It comes with an auto-suggestion feature out of the box, so it saves you some typing later.

My [`.zshrc`](https://github.com/gildesmarais/dotfiles/blob/master/zshrc) contains many aliases to save me some typing on recurring tasks. Some configuration options stand out, and I'll describe what they do in the next sections.

### Move the cursor _by words_ with <kbd>Alt</kbd> + arrow keys

To use <kbd>Alt</kbd>+<kbd>←</kbd> and <kbd>Alt</kbd>+<kbd>→</kbd> to jump words with the cursor, add this to your `.zshrc`:

```sh
bindkey "^[^[[C" forward-word
bindkey "^[^[[D" backward-word
```

### `history` + `!` = 💕

`history` lists recent commands. Each line has a prefixed number. Type that number with an exclamation mark, for example `!1729`, and hit space to expand it to that command.

I search the history with `history | grep foobar` often. To make things easier, I've set up an alias for it:

```sh
alias hgrep="history | grep"
```

You can also search using <kbd>Ctrl</kbd>+<kbd>R</kbd> or run `history | sk` (see below for `sk`).

### Navigation between directories

Beside `cd` and `cd ..` (in zsh you can omit `cd` and type just `..` or even `….`), I use `pushd` and `popd` to move back and forth between directories.

Whenever I create a new directory with `mkdir -p ~/whatever/foo/bar/baz`, I change to it directly with `cd $_`.

### `z`: jump between recently visited directories

[ZSH-z](https://github.com/agkozak/zsh-z) lets you jump between directories you've visited recently. It fuzzy matches and switches to the most-used path.

`z foobar` changes the working directory to e.g. `/Users/gil/projects/foobar/`.

## Version and package managers

Since I write code, I need to install the environment to run that code in. Because every project has its own needs, one globally installed version rarely works. I used [rvm](https://rvm.io/) and [nvm](https://github.com/nvm-sh/nvm) before switching to asdf-vm.

- [asdf-vm](https://asdf-vm.com/): a version manager for multiple installed versions of programming languages.

Since I work with Ruby and NodeJS a lot, I need their package managers, too:

- [bundler](https://bundler.io/)
- [yarn](https://yarnpkg.com/)

I don't bother installing software manually on my machine. Homebrew exists, and I can find almost anything to `brew install`.

- [homebrew](https://brew.sh/): macOS package management, including the installation of GUI applications (so-called casks).

## Standard tools

What follows is a list of tools I use with a short description. Most of them are installable with Homebrew out of the box. Try `brew search foobar`.

### Finding files, content or directories

- `find` (the [GNU coreutils](https://www.gnu.org/software/coreutils/) one, please): finds files and directories by their name, type, etc.
- [mc](https://midnight-commander.org/): good old Midnight Commander, a two-pane file manager.
- [rg](https://github.com/BurntSushi/ripgrep): super fast search for files containing your query.
- [skim](https://github.com/lotabout/skim): a (general purpose) fuzzy finder.

### Create, read, manipulate, save and delete files

- `echo`, `touch`, `grep`, `cat`, `tail`, `less`, `more`, `man`, `rm`: goes without saying.
- [jq](https://stedolan.github.io/jq/): a cli JSON processor. Mostly I'm piping output into it to pretty print.
- [ncdu](https://dev.yorhel.nl/ncdu): NCurses Disk Usage. Finds large files and directories and lets you delete them inside the convenient UI.
- [pup](https://github.com/EricChiang/pup): what `jq` is for JSON, `pup` is for HTML.
- [rpl](https://github.com/kcoyner/rpl/): replaces text inside files with another text (useful when I forget the inline edit options of `grep`)
- [vim](https://www.vim.org/): my default editor on remote machines. I don't know how to quit other editors like `emacs`. `¯\_(ツ)_/¯`

### Miscellaneous

The following tools are also in my toolbox. I file them under Miscellaneous because the number would not justify categories on their own in this post. That does not mean I use them less; most are invaluable.

These are helpful when dealing with (not only) remote systems:

- [ansible](https://www.ansible.com/): automates the setup of new systems.
- [htop](https://htop.dev/): an interactive process viewer. One of the first things I install.
- [ssh](https://www.openssh.com/): a protocol that allows you to connect to remote servers securely.
- [rsync](https://rsync.samba.org/): synchronizes files quickly (supports binary deltas).
- [tmux](https://github.com/tmux/tmux): a terminal window multiplexer.

Sometimes you want to download something or need to make raw HTTP requests:

- [aria2](https://aria2.github.io/): universal download utility (HTTP, FTP, BitTorrent, magnet, …).
- [curl](https://curl.haxx.se/): for HTTP requests and debugging them. I can't work without it.
- [youtube-dl](https://youtube-dl.org/): download video and audio (not only from YouTube).

Using [ffmpeg](https://ffmpeg.org/) with `youtube-dl` illustrates the power of the command line. Basic example:

```sh
youtube-dl -f bestaudio --exec 'ffmpeg -i {} {}.mp3 && rm {}'
```

## Outlook

That's it for the second part. The third part will cover the GUI applications I use on macOS. Stay tuned.
