---
layout: post
toc: true
---

I bought an Android telephone [recently]({% post_url 2020-05-12-installing-lineageos-on-a-new-android-phone %}) as tinkering device.

i decided to take a look outside over apple's garden fence and maybe cut some ties. a concrete first step has already been taken: i [ditched 1Password in favor of Bitwarden]({}).

This post documents my experiences and thoughts while diving into the other side.

## Motivation

i create graphical user interfaces every day. i can not only use ios to create UIs. my knowledge would not be diverse. these GUIs were then created from my non-diverse knowledge. i don't want to build a GUI which is equivalent to a [soap dispenser that only dispenses to white hands](https://invidio.us/watch?v=WHynGQ9Vg30).


PWA:

bei android sind progressive web apps gut supported. theshrine wird dann offline nutzbar werden. das is unter ios noch gar nich möglich, find ich aber sehr fein. hab festgestellt, dass das logo auch viel klein angezeigt wird. ich hätte es ohne testen auf nem droiden nie gemerkt :)

## The device

I'm quite surprised by the Motorola G6 Plus. It's a 2018 modell. It costs about 170€ now. You'll get a lot of phone. The battery lasts (for me as iOS user) unusually long (about 5 days with little use).

I have chosen this device, because:

1. its bootloader is unlockable
2. LineageOS supports the device officially
3. i could buy an unused "shipping return" for even less.

To unlock the bootloader, you need to go to a Motorola website and enter some device information. You will receive the unlock key by mail after clicking 'yes, i know i'm voiding my warranty by unlocking'.
This feeling of uncertainty when playing with hardware and flashing things is simply unique.

## Observations from a long-term iOS user

I learned that tapping 7 times on a button makes you a developer (on Android). My thought was: wow, what have I been doing all the years if it's that easy. ;)

I've never dealt with Android before. Many concepts and implementations differ from ios and are not wrong. Some things I miss in iOS (setting standard apps...) are provided by the system and their customization is well integrated.

Cal- and CardDAV is missing out of the box. What Google tries to press on the phone during the installation is questionable: "we're going to install our office apps" - a cancellation is not possible, pressing OK the only possible action.
Also, there is no non-google email client installed. All three essential can be installed and the system can be upgraded accordingly. K9-Mail and davX5 do that for me.

in retrospect not surprising: Google wants to make the use of its services as easy as possible and installs them right away. one could also formulate this behaviour less benevolently...

in the IT world, pre-installing your own standard applications is nothing new. that doesn't make it any less despicable when it comes to gaining market share.
i hope the EU is taking action against the ongoing proceedings for abuse of market position.

The android keyboard provides a great typing experience. I mistype much less than on an iOS keyboard. By default the keyboard gives a haptic feedback when pressing a key. I couldn't stand that long and had to turn it off.
iOS' system keyboard really has to catch up, especially the word suggestions are incredibly inappropriate. If you type in different languages, the iOS keyboard is no help, it just gets in the way. Probably there aren't many Apple developers from a non-English speaking background working on the keyboard.

Android comes with alarm clock sounds which truly reassemble an alarm clock... some things are easy to get right (but are apparently hard to implement).

I have always spurned Material design (Google's design framework). I still find it ugly. it's very good to use, tho... and it starts to feel normal to me.

Shared clipboard with macOS and iOS is very practical. I miss that already when working with the Android.

### Adblocking

Google does not allow any adblocker on their Playstore. Surprise, they make money by selling ad views.

To install one which e.g. works by manipulating the `/etc/hosts` file you (naturally) need root access.

On iOS you can at least have Safari block ads natively via its [Web Content Filter](https://developer.apple.com/documentation/devicemanagement/webcontentfilter). This can't provide ads and tracking blocking in apps and thus adblocking just works on websites. There's a loophole: an app could provide a VPN on localhost, redirect all traffic through it and the VPN blocks connections according to a domain list. [Lockdown](https://github.com/confirmedcode/Lockdown-iOS) does that.[^1]I couldn't find something like that on Android and I also don't want to root the device just yet.

### "degoogle"

I installed [microG](https://microg.org/) (a [prototypefund funded project](https://prototypefund.de/project/microg/)), but nonetheless I try to cut as much connections to Google as possible. The term in the Android community for that is _degoogle_. Several guides to _degoogle_ exist, although some aren't updated for Lineage 17.1 yet:

- [How to deGoogle LineageOS in 2019](https://www.reddit.com/r/degoogle/comments/cldohl/how_to_degoogle_lineageos_in_2019/)

### Exceptional iOS apps

Some people told me one reason they'd never switch to Android is that some apps on iOS are exceptional. No counter-parts on Android would exist. That's true[^2].
But it's also true the other way around. For example, the offical Kodi android app, "Kore" is way ahead of any iOS Kodi app. It's very easy to use, has well thought out features and lacks nothing to control your Kodi. Since I have the Anroid device, I haven't used the Kodi iOS apps any more. There are also Twitter and Mastodon clients (Twidere and Tusky) which do not need to hide from Twitterific[^3] **at all**. It's amazing to see such quality open source apps.

### Different feature sets between iOS and Android apps

Some apps have a different set of features on the different platforms.
In one case, Geizhals, I rarely use the Android app because of that. It's UX is _not good_ and it could do a better job when scrolling through the results. The iOS app solves this better, although not perfect.

As counter-example I'd mention the Klack app. The Android version is more polished than it's iOS counterpart.

This leads me to a conclusion: if you need an app for your product, it is probably wise to utilize Flutter or React Native to get you up and running. If you can't do that (or decide against it), be very strict with features which should be available on any platform and sync their release schedule.

## Getting paid for Android apps

As a developer I also look with a seller's eye on the option of earning money with apps. On the Google Playstore you can, as in the Apple App Store, sell your app. The [FDroid](https://f-droid.org/) store is a store exclusively for free open source software. It does not provide any payment or subscription integration. They audit every app and mention potential problems resulting of non-free app _behaviour_.

As a developer you'd need to figure out a way to have people pay for your app (if you want to sell it in the first place) if you want to avoid Google taking its cut.

While browsing on FDroid the first time, I felt I'd time travel back to 1990s or 2000s, when shareware was a thing. Shareware means you distribute your app freely (for a fixed amount of time or with a limited feature set) and to unlock all features, you have to enter a license key.[^5]

The aforementioned Klack app does that: when you buy it via the AppStore, you get a license key which is valid for 1 year and can be used on 5 devices. Most developers publish their app on the PlayStore and on alternative stores. Some try it with the shareware approach, others just provide their apps for free on FDroid and sell it on the Playstore[^6].

The app developers sell license keys, because (i assume) the store does not offer the possibility to generate other sources of income. I wish the ecosystem develops a non-google store where developers can earn money for their work. On the other hand, I fear that Android users per se don't want to spend (much) money for apps and therefore the market is inexistent. Often you can see that there is a tip button and the devs get recognition. Those buttons sprout widely in the open source economy.

I sincerely hope that people realize that depending on a few companies for all _information technology things_ is bad. One of the first things is to stop using Google products and find (and pay for) alternatives.[^4]


## Lineage OS reliability worries

What worries me is that the LineageOS team had to stop their nightly builds at the end of April due to a bug which could put your device in a boot loop. Last time I checked on 17<sup>th</sup> May, there weren't any new builds.

Also the Lineage infrastucture has been hacked by exploiting an RCE in Saltstack end of April 2020. The recovery was done within a day or two and I'm thankful for that timely recovery.

What I seriously dislike is the communication: you can't find any official information about those two incidents on the official website. You have to [dig on Reddit](https://www.reddit.com/r/LineageOS/comments/gbdlzx/lineageos_downloads/fp6081b/) and with a bit of luck you find a developer on Twitter stating the status in a conversation somewhere[^7].
The official website has a link to their status page (good, they have one!) but it doesn't reveal any information or pointer where to look for updates.

I know everyone working on LineageOS is doing it in their spare time, so I won't demand much. I'm sure many LineageOS devs know that handling such incidents in such a way is not state of the art. I'm looking forward to the two post mortems (boot loop with syncing problems and the hack of via Saltstack RCE) and the conclusions drawn out of it.

The _stats_ page (where people who opted-in to report their installation information) is also down since May 3<sup>rd</sup>. A web archive version from 2020-04-07 shows [1,727,755 active LineageOS installations](https://web.archive.org/web/20200407093110/http://stats.lineageos.org/). It's not that LineageOS is a little side project any more... Maybe the organization is overdue for a "level up"?

Apart from that LineageOS is a well matured beginning.

## Closing

bin positiv von android überrascht. der fdroid is voll mit privacy fokussierten tools. ganz inspirierend, aber mit apps kannst da kein geld verdienen :D

richard m. s. findet es sicher toll.

ein wechsel auf android ist weiterhin ausgeschlossen. da sind einige blocker und ich denke ohne größere änderungen im anrdoid-os-projekt wird es nichts nich passieren, dass die abgebaut werden.

[^1]: You'll be surprised how apps are filled with trackers and analytics. :|
[^2]: I personally think of [Omnifocus (a getting things done / todo app)](https://www.omnigroup.com/omnifocus), [Calendars 5 by Readdle](https://readdle.com/calendars5), [Overcast (podcast client with superb DSP)](https://overcast.fm/) and [Apollo (a reddit client)](https://apolloapp.io/).
[^3]: Not much love for Tweetbot from my side anymore. I'd not consider it exceptional. Finding good Mastodon apps on iOS is tricky (and they are not free).
[^4]: Did you know that Google/Alphabet, Facebook etc. even lay submarine communication cables? A starting poiint: [maps of cables](https://commons.wikimedia.org/wiki/Category:Maps_of_submarine_communication_cables). German/French: [Mit offenen Karten: Seekabel - Der unsichtbare Krieg](https://www.arte.tv/de/videos/078191-009-A/mit-offenen-karten/)
[^5]: I remember putting 10DM in an envelope and send it via snail mail to the author. A week later or so, I received an email with the license key.
[^6]: I.e. the [SimpleMobileTools](https://simplemobiletools.github.io/).
[^7]: I can't refind it. :shrug: There's an [official tweet](https://twitter.com/LineageAndroid/status/1256821056100163584) about the incident.
