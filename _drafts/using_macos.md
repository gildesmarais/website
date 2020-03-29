---
layout: post
title: Using macOS
# date: 2020-03-29 13:30:00 +0200
description: "This post documents how I work productively."
---

At the time of writing I use macOS Mojave. I'd love to jump ship to an open OS and window manager, but ... last time I tried none felt finished or polished. I can't afford tools which require high maintenance.

Enable Full Keyboard Access to be able to cancel/confirm system dialogs with space/enter. (System Settings -> Keyboard -> Shortcuts or toggle with <kbd>Ctrl</kbd>+<kbd>F7</kbd>)

I manage the positions of the windows with [Rectangle](https://github.com/rxhanson/Rectangle).
I arrange windows like I'd use a tiling window manager: the windows take the space of the left half/right half/upper right half, etc.). With Rectangle's hotkeys, moving a window to the left half or upper right half is just a key combination press away.

## Default applications

Trying out new tools is a hobby. In this post I just list tools which proved themselves over time and are a staple.

Here's the Applications and tools I keep open all day:

- [iTerm2](https://iterm2.com/)
- [SourceTree](https://www.sourcetreeapp.com/)
- [Dash 4](https://kapeli.com/dash) (haven't updated to version 5 and I do not plan in doing so)

Many applications in the list are free to use. Some are not. If that's the case I bought a license for it.
Support the developers!

## Utilities

- 1Password 6 (non-subscription)
- [Bitbar](https://getbitbar.com/) puts the output of your scripts in your menu bar. Probably worth a more in-depth post.
- [MenuMeters](https://github.com/yujitach/MenuMeters))
- [Itsycal](https://www.mowglii.com/itsycal/)
- [Bartender](https://www.macbartender.com/) hides all unappealing stuff from the menu bar and let it show only what I think is relevant.
- [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) is a Personal firewall for macOS. Think of _snake oil_ or not, I use it to subscribe to [Peter Lowe's block list] to have system wide blocking.
- [ArqBackup](https://www.arqbackup.com/)

Sometimes it's nice to have a GUI instead of cli tool.

- FTPS/SCP/anything: [Transmit](https://www.panic.com/transmit/)
- PostgreSQL: [Postico](https://eggerapps.at/postico/)
- MySQL/MariaDB: [Sequel Pro](https://sequelpro.com/)

I keep code snippets, research results and other notes in a git repository containing mainly Markdown files.
However, I'll check out [FSNotes]() (an nvAlt inspired app), which looks very promising for that.
That repository is in my iCloud Drive and thus I can take notes on my phone, too.

- Apple Calendar & Contact, syncs nicely via CalDAV
- Apple Mail app syncs syncs nicely via IMAP
- [Omnifocus Pro](https://www.omnigroup.com/omnifocus) with its iOS counterpart. Another rock-solid power tool I can't live without. Probably worth a more in-depth post.

## Office

I write my notes in markdown.
For presentations I use `marp` (if you write React and need to demo your code, try `react-mdx`).

I love the concept of spreadsheets. Usually I share those sheets and due to the lack of quality-parity I use G⊙⊙gle Sheets. I'd love to have an equal quality alternative, maybe more minimal than Excel or G⊙⊙gle Sheets, maybe a markdown extension or so?

## Dealing with files in general

The macOS' Finder app is an ironic joke.

I can't find anything with it, it just stands in the way and works bad without moving the cursor. It has nice batch renaming feature tho (select multiple files, File -> Rename n Items. No keyboard shortcut.)

Luckily, there's [Marta](https://marta.yanex.org/), a two pane file manager, like the Norton Commander in the good old days (not the stone age). Has a fuzzy search/lookup relative to `cwd` with <kbd>Ctrl</kbd>+<kbd>P</kbd>.

Dealing with any kind of compressed files with [Keka](https://www.keka.io/en/) is a breeze. Zero hiccups so far, took any archived file I've thrown at it like a champ.

## Dealing with with Images

- Creating SVGs with [Boxy SVG]() is super easy and efficient. Hotkey all the things! `/o/`
- [Gapplin]() creates a non-vector, high quality, image of your SVG.
- [Pixelmator](): just a general image editor I do not use so much.
- [PosteRazor](): print large image files to multiple sheets of paper, cut with margin and glue them together. Tada, now you have your image on dead wood, ready to draw something in with my pencil. (I rarely need it)
- while tools like Trimage and ImageOptim do not change the quality of an image to optimize the file size, [OptImage](https://optimage.app/) does -- unnoticeable. There's still a difference from the before-mentioned two: the file size is usually a massive difference.

## Browsers

As a web developer you can't just use _one_ browser. So I split between "personal browser" and several "development browsers".

I can't really decide ultimately for a one-size-fits-it-all browser. I switch between Chrome, Safari, Firefox or Brave; however the latter seems to win the first 21st century browser wars for me.

My main "personal" browser is and will probably remain Apple's Safari (syncs nicely via iCloud), with Brave playing an increasingly important role in it. I use the TorBrowser sometimes for web surfing and it works well.

My main "development browser" is based on Chromium. That means I develop for the web with it.
Debugging and testing happens in the others.

I tried Firefox every once in a while as main development browser. Even after the big rewrite it's still a memory hog and its developer tools are not really to my liking.
The chromium based developer tools in my experience work smoother and feel more native.

I don't care much about what Microsoft is doing in the browser market.

### Browser extensions

- an adblocker, uBlock origin
- a form fill thing
- [decentraleyes]()
- [privacybadger]()
- [https everywhere]()
- [The Great Suspender]()
- [Stylish]() ... to apply custom styles to any website.

## Alfred

Remember I think taking your hands of the keyboard is a flaw? [Alfred](https://www.alfredapp.com/) let's you get anything done by typing a few characters.
I use it it _all the time_. **All the time**.
I start every app with it. I feel clueless when the launch bar does not show up (happened a few times after rebooting when Alfred wasn't launched yet) and having to start an application by double clicking it in the /Applications folder. Like in the Stone Age.

### Alfred workflows

- [sublime text projects]()
- [sourcetree](https://github.com/yourtion/Alfred_SourceTree)
- [dash]()
- [colors](https://github.com/TylerEich/Alfred-Extras/tree/master/Workflows)
- [unicode symbol search]()
- [deepl]()
- [encode]()
- [caniuse]()

## Sublime Text 

As a software developer I write a lot of code. It's important to use one editor efficiently.
In 2014 I decided to use Sublime Text and bought a license.

I'm still using it as my main editor today and I like it a lot. On remote machine I use `vim` (see Terminal section below).

For navigating files: <kbd>Ctrl</kbd>+<kbd>P</kbd>
For navigating in the active file:  <kbd>Ctrl</kbd>+<kbd>R</kbd>
### Sublime Text Plugins

- [Sidebar Enhancements](https://github.com/titoBouzout/SideBarEnhancements): should ship with Sublime Text
- [Synced Sidebar](https://github.com/TheSpyder/SyncedSideBar)
- [Advanced New File](https://github.com/skuroda/Sublime-AdvancedNewFile)
- [Trailing Spaces](https://github.com/SublimeText/TrailingSpaces)

- [Sublime Linter](https://github.com/SublimeLinter/SublimeLinter) and the contributing packages for the linters I use
- [Emmet](https://github.com/sergeche/emmet-sublime)

- Added a macro to delete the current line on Super+d.
