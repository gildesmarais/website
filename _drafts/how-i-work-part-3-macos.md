---
layout: post
title: "How I work, part 3: macOS"
description: "The 'How I work' post series documents how I work. This third part is about working  productively with macOS."
toc: true
tags:
  - macos
  - programming
  - reference
  - reference
  - software
---

<!-- link to part 1 environement and 2 cli -->

At the time of writing I use macOS Mojave. I'd love to jump ship to an open OS and window manager, but ... last time I tried none felt finished or polished. I can't afford tools which require high maintenance. Thus macOS it is.
This post starts from the OS and moves up to window management and finally to some applications with a GUI.

Let's dig in!

## macOS System settings

<!-- Scroll through https://github.com/drduh/macOS-Security-and-Privacy-Guide -->

## The first macOS start

- set English ABC Extended keyboard layout
- change the suggested username to my first name
- do not send analytics and opt for privacy-focus settings
- enable dark mode
- setup "tap to click"
- fast tracking speed
- set scroll direction to "not natural"
- cursor: fast key repeat rate, short delay until repeat
- Enable Full Keyboard Access (more on that below)
- turn off / really quiet "alert volume" for system sounds
- show volume in menu bar
- display -> resolution -> scaled -> more space; untick "show mirroring options in the menu bar"
- change computername to something not identifying under Sharing -> Computer Name
- security&privacy: turn Firewall on
- remove everything from the dock except Safari, Mail, iTunes/Music and Calendar
- make the dock as small as possible, turn on hiding
- press <kbd>Fn</kbd> twice and disable Dictation
- install all available system updates

When that first sprint is done, I adjust the OS to my liking even more...

### Correcting the "taking screenshots" workflow

As developer I take screenshots quite often. A picture says more than thousand words.

Cmd+Shift+3 captures the whole screen.
Cmd+Shift+4 activates the capture mode and space screenshots just the window below the cursor. You can alternatively select an area of the screen with your mouse and have that captured.

Since some macOS versions there's an innovate and most of the time useless feature: it ask you what to do with the screenshot _before saving it_.[^1]

Turn that time-wasting behavior off:

```
<!-- TODO: add cmd -->
```

The screenshot then appears directly as a file on your Desktop after capturing. That would cause chaos quickly. Change the default location to store screenshots to `~/Desktop/Screenshots` with:

```
# Save screenshots to the ~/Desktop/Screenshots, create directory if it does not exist
mkdir -p "${HOME}/Desktop/Screenshots"
defaults write com.apple.screencapture location -string "${HOME}/Desktop/Screenshots"

# Disable shadow in screenshots
defaults write com.apple.screencapture disable-shadow -bool true

```

Drag the Screenshots folder from your Desktop into your Dock (i place it left to the Trash). Right click on it, set View to Fan and sort by Date Added.

<!-- TODO: add screenshot of the fan -->

![A folder in fan mode in the macOS dock](/assets/images/posts/screenshots_fan.jpg)

This way you won't need to Cmd+F11 back to your desktop or navigate in the Finder to that folder. Just drag it from the fan and drop it wherever you need it.
And if you click on it, Preview opens where you can annotate.

If you're building a application where people communicate you really need to have an drag-and-dropable uploader.

### Handle all system dialogs with Space ⊻ [Enter|Tab]

Enable Full Keyboard Access to be able to cancel/confirm system dialogs with space/enter. (System Settings -> Keyboard -> Shortcuts or toggle with <kbd>Ctrl</kbd>+<kbd>F7</kbd>)

<kbd>⏎</kbd> presses the colored button, usually that means OK.
<kbd>space</kbd> presses the outlined button, usually that means cancel.

If there's more than two buttons, Tab switches the focus.

### Setup "drag windows with three fingers"

System Settings -> Accessibility -> Pointer Controls -> Trackpad Options

Enable dragging, select "three finger drag".

Now when the cursor is above a window and you touch the trackpad with 3 fingers, it moves the window. Sometimes I use a window as a ruler, e.g. when vertically alinging some HTML boxes, etc.

### Locking the user session

While standing up I move the cursor with one swift movement to the bottom left corner. There's a 'hot corner' setup in macOS to lock itself (when returning, my watch unlocks the system automatically <3).

Set it up under:

1. System Settings -> Desktop & Screen Saver -> Screen Saver -> Hot Corner
2. System Settings -> Security & Privacy -> General -> require password _immediately_.

![Rectangle Hotkeys](/assets/images/posts/hot_corner.jpg)

### Speed up / disable animations

```
defaults write com.apple.finder DisableAllAnimations -bool true
defaults write NSGlobalDomain NSWindowResizeTime .001
defaults write com.apple.Dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -int 0
killall Finder
```

And more .. https://github.com/gildesmarais/dotfiles/blob/master/scripts/macosx_defaults.sh

https://robservatory.com/speed-up-your-mac-via-hidden-prefs/

## Window management

Let's switch from operating system layer to window management.

### Window placement with Rectangle

I manage the positions of the windows with [Rectangle](https://github.com/rxhanson/Rectangle).
With it I arrange windows like a tiling window manager would: the windows take the space of the left half/right half/upper right half, etc.
With Rectangle's hotkeys, moving a window to the left half or upper right half is just a key combination press away.

I also move windows to another screen with it.

<details>
  <summary>Click here to see my Rectangle configuration</summary>

  <!-- TODO: rename Screenshot of shortcut settings to match post -->
  <img alt="Rectangle Hotkeys" src="/assets/images/posts/rectangle_1.jpg">
  <img alt="Rectangle Settings" src="/assets/images/posts/rectangle_2.jpg">
</details>

### Switching between applications and their windows

Cmd - Tab ⌘ - ↹ brings up the application switcher.
Keep on holding Cmd.

Press Tab to choose the next application.
Press Shift+Tab to choose the previous application.
You can also use arrow left/right.

So far, so good. But an application has multiple windows, right? I want to switch to these directly!

When in the Cmd-Tab application switcher, select the app, but do not switch to it. Instead, keep on holding Cmd and press 1 (or arrow up/down).
Tada, all windows of the application will present themselves.
From here you can navigate with the right/left arrow keys. When you've found the window you want to activate, press Return.

When you're already inside the application, press Cmd+` to switch through it's windows. With a non-US keyboard layout you might want to remap that to Cmd+< in System Settings, Keyboard, Shortcuts, Keyboard, Move focus to the next window.

And what if a window has multiple tabs, like a browser? Try Alt+1, Alt+2, ... to directly address them.

### Systemwide hotkeys inside an application

On macOS, each application's menubar is fixed at the top of the screen. It's not sitting inside the application window. That means you only see the menubar of the foremost application of that screen.

While each application has its own hotkeys, some hotkeys exist systemwide and thus in every application (if applicable).

Pressing Cmd+, opens the application's preferences.

Cmd+? (that means Cmd+Shift+/ on an international keyboard layout, Cmd+Shift+ß on a German one) opens the help Menu in the menu bar and focuses the text input field. Start typing and one of the greatest macOS features comes to live:

<!-- TODO: animated gif -->

Note that the keyboard shortcut stands to the right of the menu item. Remember that for reoccurring tasks and avoid the Help-detour.

## GUI Applications

Trying out new applications is a hobby. In this part I'll solely list tools which proved themselves over time and are a fixture in my toolbox.

Many applications I mention are free to use. Some are not. If that's the case I bought a license for it. If it's free or opensource, I sometimes donate money or my time to fix/implement something in it. Support the developers!

I work a lot inside a shell. In this post I'll leave the shell out as I covered it in the second part of this post series.

<!-- TODO: link to post -->

So, with the focus set on GUI applications, let's dig in.

### Development

- [Sublime Text 3]()
- [iTerm2](https://iterm2.com/)
- [SourceTree](https://www.sourcetreeapp.com/)
- [Dash](https://kapeli.com/dash)

### Alfred and its workflows

Remember I think taking your hands of the keyboard is a flaw from part 1?

<!-- TODO: make link to blog post, anchor: strain -->

[Alfred](https://www.alfredapp.com/) let's you get a lot of things done by typing a few characters.
I use it it _all the time_. **All the time**.
I start every app with it. I feel clueless when it does not show up (happened a few times after rebooting when Alfred wasn't launched yet) and having to start an application by double clicking it in the `/Applications` folder. Like in the Stone Age.

My alfred hotkey is <kbd>⌘</kbd> + <kbd>Space</kbd>
For that you've got to remove the Spotlight Search shortcut under Keyboard -> Shortcuts -> Spotlight first.
One of the most used core functions beside launching workflows is the clipboard manager.

#### Alfred workflows

- [sublime text projects]()
- [sourcetree](https://github.com/yourtion/Alfred_SourceTree)
- [dash]() comes with Dash (see Preferences -> Integrations)
- [colors](https://github.com/TylerEich/Alfred-Extras/tree/master/Workflows)
- [unicode symbol search]()
- [dict.cc]()
- [encode]()
- [caniuse]()
- [my own workflows](https://github.com/gildesmarais/alfred_workflows)

I depend on Omnifocus for managing personal tasks.
https://github.com/rhydlewis/search-omnifocus

<!-- link to https://github.com/learn-anything/alfred-workflows -->

### Utilities

<!-- TODO: add bitwarden post url -->

- [Bitwarden](): recently migrated away from 1Password <!-- (TODO: post link) -->
- [Bitbar](https://getbitbar.com/) puts the output of any executable in your menu bar. Great for uptime monitoring of websites.
- [MenuMeters](https://github.com/yujitach/MenuMeters):
- [Itsycal](https://www.mowglii.com/itsycal/):
- ~~[Bartender](https://www.macbartender.com/)~~ [Dozer](https://github.com/Mortennn/Dozer/): hides all unappealing stuff from the menu bar and let it show only what I think is relevant.
- [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html): is a Personal firewall for macOS. Think of _snake oil_ or not, I use it to subscribe to [Peter Lowe's block list] to have system wide blocking.
  <!-- - [ArqBackup](https://www.arqbackup.com/) -->
- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12): keeps the mac+screen awake
- [Pennywise](https://github.com/kamranahmedse/pennywise): a floating window for everything
- [VLC](): the media player
- [Stars by Karelia](): rate songs in iTunes via hotkey
- [wine](): to emulate windows
- [onyx](): to configure macOS ... go through all tabs and disable all animations
- [Xcode]():

* While screenshots are sometimes more efficient in communication than writing, a screen recording is even better.  
  [GifCapture](https://github.com/onmyway133/GifCapture) replaced the previously used LiceCap.
* [Transmit](https://www.panic.com/transmit/): FTPS/SCP/anything
* [Postico](https://eggerapps.at/postico/): PostgreSQL management GUI tool
  Serious warning: avoiding your business logic by fiddling in the database will cause trouble (sooner or later).

* Apple Calendar & Contact, syncs nicely via CalDAV and CardDAV
* Apple Mail app syncs syncs nicely via IMAP with my mailbox.org accounts
* [MailTrackerBlocker](https://github.com/apparition47/MailTrackerBlocker): blocks tracking images in mails
* [Omnifocus Pro](https://www.omnigroup.com/omnifocus) with its iOS counterpart.  
  Another rock-solid power tool I can't live without. Probably worth a more in-depth post.

### Taking notes, keeping code snippets

I keep code snippets, research results and other notes in Markdown files, which are kept in a git repository. It uses a loose file structure (e.g. dev/ruby/rails/active_foobar/baz.md).

On top of these files it I start [gollum](https://github.com/gollum/gollum) sometimes. It brings all to life, it looks quite nice and let's me browse the files history without working with git directly.[^2] It even offers a search interface (although it's quicker to search on the cli with rg/sk)

The repository is synced in my iCloud Drive and thus I can read and take notes on my phone, too.

### Office

Usually I write my notes in Markdown with Sublime Text. I don't explicitly know which flavour of Markdown I'm writing nor do I have a favorite one. I just start writing and structure my thoughts with headlines first.[^3]

I love the concept of spreadsheets. Usually I share those sheets with colleagues and due to the lack of quality-parity I use G⊙⊙gle Sheets. I'd love to have an equal quality alternative, maybe more minimal than Excel or G⊙⊙gle Sheets, maybe a markdown extension or so?

- LibreOffice: a word processor or an (offline) spreadsheet, even more.
- [`marp`](https://github.com/marp-team/marp/) to generate a fullscreen presentation out of Markdown files.[^4]
- [Marked2](): to preview Markdown files.

### Finances

I use no banking software on my Mac. I use the bank's online website in a private browser tab.
I'm not a friend of budgeting or double-accounting software for personal finances.

To track expenses I wrote my own expense tracking web application. It supports sharing expense lists with others. I use it predominantly on my smartphone.

If you're invested in the stock market, I recommend [Portfolio Performance](https://www.portfolio-performance.info/) (open-source, offline-only, Java app (yup)). It scrapes the PDF documents your broker sends you and mines all the data to from them.
It's Java (can't stress it enough) and thus you can use it on any basically any computer.

### Browsers

As a web developer you can't just use _one_ browser. I split between "personal browser" and several "development browsers".

I can't really decide ultimately for a one-size-fits-it-all browser. I switch between Chrome, Safari, Firefox or Brave; however the latter seems to win the first 21st century browser wars for me.

My main "personal" browser is and will probably remain Apple's Safari (syncs nicely via iCloud, the reader view is ace), with Brave playing an increasingly important role in it. I use the TorBrowser sometimes for web surfing and it works well.

My main "development browser" is something based on Chromium. That means I develop for the web with it.
Debugging and testing happens in the others, of course, too.

I tried Firefox every once in a while as main development browser. Even after the big rewrite it's still a memory hog and its developer tools are not really to my liking. The chromium based developer tools work smoother and feel more native in my experience.

I don't care much about what Microsoft is doing in the browser market.[^5] Although I will need to rethink about my position when seeing Edge's rising market share.

#### Browser extensions

Every browser is different. Some extensions might not be available everywhere. In general I install these extensions:

- an adblocker, preferably uBlock origin
- a form fill thing for manual webdev software testing
- [decentraleyes]()
- [privacy possum](https://github.com/cowlicks/privacypossum)
- [https everywhere]()
- [The Great Suspender]()
- [Privacy Redirect]()
- [NoScript]() which comes preinstalled in TorBrowser for good reasons

#### Bookmarklets

Bookmarklets sit like a bookmark in your bookmark bar, but they execute Javascript on click.

- [tota11y](https://khan.github.io/tota11y/)
- [GhostCSS](https://blog.wernull.com/2013/04/debug-ghost-css-elements-causing-unwanted-scrolling/): a real time saver to find overflowing boxes.
- [Ben Ward's enhanced Pinboard "Pin"](https://gist.github.com/BenWard/801657)

### Dealing with files in general

The macOS' Finder app is an ironic joke. Apple does not seem to care much about it.[^6]
I can't _find_ anything with it, it just stands in the way. It's barely usable with a keyboard. The (unchangeable) hotkeys are weird (Return to start renaming?! What?). To work effectively with it you have to move the cursor. Instant disqualification.[^7]

Luckily, there's [Marta](https://marta.yanex.org/), a two pane file manager, like the Norton Commander in the good old days (not the stone age). It has a fuzzy search/lookup relative to `cwd` with <kbd>Ctrl</kbd>+<kbd>P</kbd>.

Dealing with any kind of compressed files with [Keka](https://www.keka.io/en/) is a breeze. Zero hiccups so far, took any archived file I've thrown at it like a champ.

For everything else there are non-GUI tools (read: the shell) which probably excel at dealing with files.

<!-- TODO: add link to shell post -->

Note: I wrote about dealing with audio files in a separate blog post.

<!-- TODO: add link to audio post -->

### Images

- [Boxy SVG](): Creating SVGs with it is super easy and efficient. Hotkey all the things! `/o/` And it saves clean SVG.
- [Gapplin]() creates a non-vector, high quality, image of your SVG.
- [Pixelmator](): just a general image editor I do not use so much.
- [PosteRazor](): print large image files to multiple sheets of paper, cut with margin and glue them together. Tada, now you have your image on dead wood, ready to draw something in with a pencil. (I rarely need it)
- while tools like Trimage and ImageOptim do not change the quality of an image to optimize the file size, [OptImage](https://optimage.app/) does -- unnoticeable. There's still a difference from the before-mentioned two: the file size is usually a massive difference.

### Sublime Text

As a software developer I write a lot of code. It's important to use one editor efficiently.
In 2014 I decided to use Sublime Text and bought a license.

I'm still using it as my main editor today and I like it a lot. On remote machines I use `vim`, but I know how to quit `nano`, too.

- For navigating files: <kbd>Ctrl</kbd>+<kbd>P</kbd>
- For navigating in the active file: <kbd>Ctrl</kbd>+<kbd>R</kbd>
- Multiline editor: <kbd>Ctrl</kbd>+<kbd>Shift</kbd> and <kbd>↑</kbd> or <kbd>↓</kbd>

#### Sublime Text Plugins

- [Sidebar Enhancements](https://github.com/titoBouzout/SideBarEnhancements): should ship with Sublime Text
- [Synced Sidebar](https://github.com/TheSpyder/SyncedSideBar)
- [Advanced New File](https://github.com/skuroda/Sublime-AdvancedNewFile)
- [Trailing Spaces](https://github.com/SublimeText/TrailingSpaces)

- [Sublime Linter](https://github.com/SublimeLinter/SublimeLinter) and the contributing packages for the linters I use
- [Emmet](https://github.com/sergeche/emmet-sublime)

#### Delete current line with Super+d

Probably I got used to this by using Eclipse IDE when writing Java back in the days.
vim also deletes the line when pressing <kbd>d</kbd>. Here's how to have it in Sublime Text, too.

Add this to your key bindings:

```json
{
  "keys": ["super+d"],
  "command": "run_macro_file",
  "args": {
    "file": "res://Packages/Default/Delete Line.sublime-macro"
  }
}
```

## Outlook

In case you need more inspiration on cool macOS apps, check these two lists:

- https://github.com/serhii-londar/open-source-mac-os-apps
- https://github.com/iCHAIT/awesome-macOS

I'm thinking of ditching iTerm2 for Alacritty and tmux.

[^1]: On an iOS device it makes perfect sense IMHO. But on macOS it's just annoying. Another badly executed try to make macOS behave like i[pad]OS. _shaking head_
[^2]: `git log -p dev/imagemagick.md` and multiple `git show deadc0de`, `git show baddcafe` etc. isn't really nice to navigate.
[^3]: You can even [generate Mindmaps from Markdown](https://github.com/dundalek/markmap).
[^4]: If you write web components and need to demo them, try [`mdx`](https://github.com/mdx-js/mdx).
[^5]: That's a lie, I look forward to the official [end of support of the IE11](https://death-to-ie11.com/).
[^6]:

(pos: 17) [John Siracusa: <q>About the Finder…</q>
published 17 (seventeen!!) years ago](https://arstechnica.com/gadgets/2003/04/finder/)

[^7]: Finder has nice batch renaming feature tho (select multiple files, File -> Rename _n_ Items). _Naturally_, no keyboard shortcut for this useful feature.
