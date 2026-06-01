---
title: "How I work, part 3: dotfiles as infrastructure"
date: 2026-03-27
description: "The third part of my 'How I work' series explains why I treat dotfiles as infrastructure instead of a bag of tweaks."
draft: true
language: "en"
---

This is the third part of my "How I work" series. If you missed the earlier posts, start with [part 1](/blog/working-productively) and [part 2](/blog/how-i-work-part-2-the-command-line).

In the second part I described the command line tools I use. That was the visible layer: shell, package managers, search tools, and editors. This post is about the layer underneath: the part that makes a machine feel like _my_ machine within minutes instead of weeks.

The core idea is simple: if a setup matters repeatedly, I do not want it to live in memory. I want it encoded in a repository.

My [dotfiles repository](https://github.com/gildesmarais/dotfiles) is that encoded system. It contains shell configuration, helper scripts, package installation, and macOS defaults. Over time it stopped being a bag of tweaks and became infrastructure for my own work.

That distinction matters. Many people start by collecting aliases, snippets, and one-off fixes. That is normal. The important next step is to notice when those fragments have become part of your operating model. At that point they deserve structure, names, and maintenance.

This post is intentionally about the framing, not every implementation detail. Shell configuration, custom scripts, and machine setup are each large enough topics on their own.

## Dotfiles are not decoration

Dotfiles are often presented as personality: fancy prompts, exotic aliases, a terminal screenshot with nice colors.

That is not how I think about them.

To me, dotfiles are operational code for a personal machine. They define how quickly I can move, how reliably I can rebuild a setup, and how much recurring friction I allow to remain manual.

That changes the standard. Once something is operational code, I care less about novelty and more about these questions:

- Can I rebuild it on a new machine?
- Can I understand it under time pressure?
- Can I rerun it safely?
- Can I tell which parts are still active?

These are mundane questions. They are also the ones that keep a setup useful over time.

## The progression matters more than the tools

I do not think people should start by building an elaborate dotfiles repository. That usually produces borrowed setups and cargo cult complexity.

The useful progression is much simpler:

1. You repeat a command often enough to feel friction.
2. You stop relying on memory or shell history.
3. You put the command behind a stable name.
4. You commit it to version control.
5. You document how it fits into the wider setup.

That progression is why dotfiles are a good training ground. The scope is small, but the engineering questions are real: what should stay explicit, what deserves abstraction, what makes a safe default, and when a shortcut becomes an interface.

You can practice that locally before you have to make the same decisions in a production system with much higher stakes.

## Shell configuration is the first layer

The first layer is usually the shell. In my case that means [`zshrc`](https://github.com/gildesmarais/dotfiles/blob/master/zshrc).

The goal is not to make the shell impressive. It is to make it dependable. My configuration loads tools only when they exist, keeps `PATH` and completion behavior predictable, and defines a small number of aliases and functions for recurring work.

That sounds basic, which is exactly right. A good shell configuration should be legible and boring enough that you can trust it.

One example is `fzf_git_switch()`. It wraps recurring branch-switching work into a named action. Its value is not that it saves a few keystrokes. Its value is that it encodes intent. I no longer need to remember a sequence. I need to remember what I want done.

That is a good rule for abstractions in general: do not optimize for cleverness, optimize for clear intent.

## A `scripts/` directory is where operational knowledge hardens

Aliases save typing. Scripts save thought.

Once something needs arguments, conditionals, prerequisites, or a sequence of steps, it usually no longer belongs in an alias. It belongs in a script with a name.

That is why my dotfiles repository has a `scripts/` directory. It contains utilities such as:

- `macos-defaults-apply` for machine setup
- `skill` for managing Codex skills across projects
- `serve` for quick local serving
- `find-env-vars-ruby` for focused inspection work

There are also media and backup utilities in there. I like that. A personal tools repository should reflect real work, not an artificially pure software-only world.

The common property is not the domain. It is the threshold: each script exists because a repeated task deserved a stable entry point.

Early in your career, this is a useful threshold to watch for. Whenever you copy the same command out of a note for the third or fourth time, ask whether you are maintaining an undocumented interface by hand.

If the answer is yes, give it a name and move it into code.

## System settings count as code

macOS defaults are a good example of a category many engineers underestimate. They live behind toggles and checkboxes, so they look less serious than shell configuration or scripts. In practice they still affect speed, accuracy, and daily ergonomics.

My `macos-defaults-apply` script captures settings such as Finder visibility, Dock behavior, key repeat, screenshot handling, and trackpad preferences. The important part is not any single setting. It is that these decisions are encoded, reviewable, and safe to apply again.

If a setting affects how I work every day, I do not want to rediscover it manually during the next migration.

That is another transferable lesson. Environment setup is not separate from engineering work. It is part of the system that produces the work. If it affects throughput or cognitive load, it deserves the same questions as any other maintained system:

- Is it reproducible?
- Is it documented?
- Is it safe to rerun?
- Is the current state visible?

## Reproducibility is the real payoff

One of the most important files in the repository is the README.

That is where a private setup turns into a rebuildable system. It defines the bootstrap path: install the package manager, install a few core tools, clone the repository, apply the symlinks, run the package bundle, and follow the remaining manual steps.

This is the real payoff of dotfiles. Customization is nice, but reproducibility is what changes the game. A broken machine becomes an inconvenience instead of a disaster. A new machine becomes a setup exercise instead of a memory test.

For software engineers this should feel familiar. Reliable systems are easier to change than improvised ones. The same is true for a workstation.

But this isn't just about avoiding a memory test during a migration. It sits at the intersection of convenience and discipline:

- reduce recurring friction
- name the interface
- commit the behavior
- document the bootstrap path
- remove stale complexity

Treating your workstation as a maintained system minimizes daily friction. At the same time, it naturally aligns your local habits with broader software delivery standards. Whether you are automating a personal script or designing a deployment pipeline for a team, the core questions are identical: is the setup versioned, is the bootstrap path clear, and can you run it safely from a clean state?

By practicing that discipline locally on a system you use every single day, you build the habits that make shared production systems easier to trust and run.

## Outlook

The first two parts of this series focused on tools and environment. This part focused on why I keep dotfiles at all. If the earlier posts described _what_ I use, this one describes why I treat my setup as a maintained system.

That is enough for one post. The concrete details are better handled only when they are worth writing down precisely.
