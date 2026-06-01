---
title: "How I work, part 3: dotfiles as infrastructure"
date: 2026-03-27
description: "The third part of my 'How I work' series explains why I treat dotfiles as infrastructure instead of a bag of tweaks."
draft: true
language: "en"
---

This is the third part of my "How I work" series. If you missed the earlier posts, start with [part 1](/blog/working-productively) and [part 2](/blog/how-i-work-part-2-the-command-line).

While the second part described the visible layer of my command line environment, this post covers the automation underneath: the system that makes a fresh machine feel like _my_ machine in minutes.

The core idea is straightforward: if a setup matters repeatedly, it shouldn't live in memory. It should be encoded in a repository.

My [dotfiles repository](https://github.com/gildesmarais/dotfiles) is that encoded system. Over time, it stopped being a bag of aliases and became infrastructure. Most people start by collecting snippets and one-off fixes. The critical transition is recognizing when these fragments become part of your daily operating model. At that point, they deserve the same structure and maintenance as production code.

## Dotfiles are not decoration

Dotfiles are often presented as aesthetic customization—fancy prompts or terminal colors.

To me, they are operational code. They define how quickly I can move, how reliably I can rebuild an environment, and how much recurring friction I allow to remain manual.

Once you treat setup as operational code, novelty matters less than stability. I evaluate my configuration against four questions:

- Can I rebuild it on a new machine?
- Can I understand it under time pressure?
- Can I rerun it safely?
- Can I tell which parts are still active?

These are mundane questions, but they are what keep a setup useful over years.

## The progression matters more than the tools

You don't need an elaborate dotfiles setup from day one. In fact, starting with a massive, borrowed configuration usually leads to cargo-cult complexity.

The progression should be organic:

1. You feel recurring friction from a repeated command.
2. You stop relying on shell history or memory.
3. You put the command behind a stable name (an alias or function).
4. You commit it to version control.
5. You document how it fits into your workflow.

This progression makes local configuration a perfect low-stakes training ground. The scope is small, but the design questions are real: what should remain explicit, what deserves abstraction, what makes a safe default, and when a shortcut becomes a formal interface.

## Shell configuration is the first layer

A dependable shell configuration should be legible and boring. In my [`zshrc`](https://github.com/gildesmarais/dotfiles/blob/master/zshrc), I focus on defensive loading—sourcing external tools only if they are actually present on the system.

For example, instead of unconditionally evaluating tool initializations, I wrap them in checks:

```zsh
function command_exists {
  type "$1" >/dev/null 2>&1
}

# setup fzf
if command_exists fzf; then
  eval "$(fzf --zsh)"
fi
```

This prevents the shell from throwing noise or slow-down errors if I haven't bootstrapped a tool yet.

When an alias is no longer sufficient because it needs interactive logic, I use zsh functions. The `fzf_git_switch()` function in my configuration wraps branch-switching into a named action:

```zsh
fzf_git_switch() {
  if [ $# -eq 0 ]; then
    local ref
    ref="$(
      git for-each-ref --format='%(refname:short)' refs/heads refs/remotes |
        rg -v '^origin/HEAD$' |
        fzf
    )" || return 1

    case "$ref" in
      origin/*)
        git switch --track "${ref#origin/}" 2>/dev/null || \
          git switch "${ref#origin/}" 2>/dev/null || \
          git switch -c "${ref#origin/}" --track "$ref"
        ;;
      *)
        git switch "$ref"
        ;;
    esac
  else
    git switch "$@"
  fi
}
alias gco='fzf_git_switch'
```

If run with no arguments, it provides a fuzzy-search interface over local and remote branches. If arguments are passed, it falls back to standard `git switch $@`.

This highlights a key rule for workflow abstractions: do not optimize for cleverness; optimize to preserve consistent, predictable interfaces.

## A `scripts/` directory is where operational knowledge hardens

Aliases save typing; scripts save thought.

Once a task requires arguments, conditional logic, or multiple steps, it belongs in a standalone script in a versioned `scripts/` directory. My repository contains utility scripts for media backups, local servers, and environment configuration:

- `macos-defaults-apply`: machine setup automation.
- `skill`: managing developer environment skills across projects.
- `serve`: quick, zero-config local HTTP serving.
- `find-env-vars-ruby`: parsing codebase variables.

Every script in this directory represents a moment where I stopped copying a command sequence from a notes app and committed it to code. Watching for this threshold prevents you from running an undocumented, manual pipeline by hand.

## System settings count as code

System settings are code that happen to live behind checkboxes. Dock behavior, key repeat rates, and Finder preferences directly impact your daily speed and ergonomics.

My `macos-defaults-apply` script encodes these settings via macOS `defaults` commands. This makes environment preferences reviewable, version-controlled, and safe to rerun during a machine migration. Treating system settings as code ensures your workstation is defined by explicit choices rather than default drifts.

## Reproducibility is the real payoff

The most important file in a dotfiles repository is the `README.md` containing the bootstrap path. It should define the complete flow from a clean OS install to a fully operational system: installing the package manager, cloning the repository, symlinking configurations, and running package bundles.

Customization is convenient, but reproducibility is the real payoff. It turns a machine failure from a stressful memory test into a routine, automated restoration.

This practice sits at the intersection of developer convenience and systems discipline:

- reduce recurring friction
- name the interface
- commit the behavior
- document the bootstrap path
- remove stale complexity

Treating your workstation as a maintained system naturally aligns your local habits with production delivery standards. Whether automating a local workflow or writing a deployment pipeline, the core questions are identical: the system must be versioned, the bootstrap path must be documented, and it must run safely from a clean state.

## Outlook

The first two parts of this series focused on the tools I use. This part covers the system that keeps those tools reproducible and maintainable. By treating your local setup as operational infrastructure, you build the habits that make larger, shared systems easier to trust and run.
