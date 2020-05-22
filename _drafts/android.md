---
layout: post
toc: true
---

I bought an Android telephone [recently]({% post_url 2020-05-12-installing-lineageos-on-a-new-android-phone %}) as tinkering device.

i decided to take a look outside over apple's garden fence and maybe cut some ties. a concrete first step has already been taken: i [ditched 1Password in favor of Bitwarden]({}).

This post documents my experiences and thoughts while diving into the other side.

# motivation

i create graphical user interfaces every day. i can not only use ios to create UIs. my knowledge would not be diverse. these GUIs were then created from my non-diverse knowledge. i don't want to build [a soap dispenser that only gives soap to white people](https://invidio.us/watch?v=WHynGQ9Vg30), because the engineering team wasn't diverse.

i have always spurned Material design (google's android design framework). i still find it ugly. it's very good to use, tho...

PWA:

bei android sind progressive web apps gut supported. theshrine wird dann offline nutzbar werden. das is unter ios noch gar nich möglich, find ich aber sehr fein. hab festgestellt, dass das logo auch viel klein angezeigt wird. ich hätte es ohne testen auf nem droiden nie gemerkt :)

# der gerät

bin auch von dem gerät überrascht... 2018er modell, kostet jetzt noch so ~170. da kriegt man viel telefon für. der akku hält lange (bei wenig nutzung ca 5 tage).

konnte gestern noch schön rumfrickeln und 'yes, i know i'm voiding my warranty by unlocking' bei motorola wegklicken :D

ausgewählt weil bootloader entlockbar ist.

# Observations from a long-term iOS user

hab mich vorher noch nie mit android beschäftigt. viele konzepte und implementierungen weichen von ios ab und sind auch nich verkehrt. einige dinge, die man bei ios vermisst (standardapps einstellen...), sind systemseitig vorgesehen und gut integriert.

dafür fehlt aber cal+carddav out of the box. und was google versucht einem während der installation aufs telefon zu drücken is fragwürdig: "we're going to install our office apps" - ein cancel nicht möglich, nur OK.

erstmal überraschend: keinen guten mail(imap) client out of the box, der nicht von google stammt. kein cal+carddav support systemseitig. beides kann man nachinstallieren und das system entsprechend nachrüsten. K9-Mail und davX5 erledigen das für mich.

im nachhinein nicht überraschend: google will halt die nutzung seiner services möglichst einfach machen und installiert die gleich vor. man könnte es auch weniger wohlwollend formulieren, was google da vor hat. für die dann entstehende behauptung hätte ich aber keine belege, sondern nur gefühle. in der IT welt ist das vorinstallieren von eigenen standardanwendungen auch nichts neues. das macht ganze aber nicht weniger verachtenswert, wenn es um marktanteile geht.
ich hoffe gegen die laufen verfahren beier eu wegen missbrauch der marktstellung. ich hoffe die EU verklagt google dazu schon.

die android tastatur tippt sich super. ich vertippe mich wesentlich seltener als auf einer ios tastatur. standardmäßig gibt das gerät ein haptisches feedback beim drücken einer taste. das konnte ich nicht ertragen und musste es ausstellen. iOS muss wirklich aufholen, insb. auch die Wortvorschläge sind unglaublich unpassend. Tippt man dann noch in verschiedenen Sprachen, dann ist die iOS Tastatur keine Hilfe, sondern steht im Weg herum.

Android comes with Alarm clock sounds which truely reassemble an alarm clock...

Shared clipboard mit macOS und iOS ist sehr praktisch. Das vermisse ich bereits jetzt.

# Adblocking

Google does not allow any adblocker on their Playstore. Surprise, they make money by selling ads.

To install one which e.g. works by manipulating the `/etc/hosts` file you (naturally) need root access.

On iOS you can at least have Safari block ads natively via its [Web Content Filter](https://developer.apple.com/documentation/devicemanagement/webcontentfilter). This can't provide ads and tracking blocking in apps and thus adblocking just works on websites.

There's a loophole: an app could provide a VPN on localhost, redirect all traffic through it and the VPN blocks connections according to a domain list. [Lockdown](https://github.com/confirmedcode/Lockdown-iOS) does that.[^1]

# Exceptional apps

Some people told me one reason they'd never switch to Android is that some apps on iOS are exceptional. No counter-parts on Android would exist. That's true[^2].

But it's also true the other way around. For example, the offical Kodi android app, "Kore" is way ahead of any iOS Kodi app. It's very easy to use, has well thought out features and lacks nothing to control your Kodi. Since I have the Anroid device, I haven't used the Kodi iOS apps any more.

Also, there are Twitter and Mastodon clients (Twidere and Tusky) which do not need to hide from Twitterific[^3] **at all**. It's amazing to see such quality open source apps.

# Different feature sets between iOS and Android apps

Some apps have a different set of features on the different platforms.
In one case, Geizhals, I rarely use the Android app because of that. It's UX is _not good_ and it could do a better job when scrolling through the results. The iOS app solves this better, although not perfect.

As counter-example I'd mention the Klack app. The Android version is more polished than it's iOS counterpart.

This leads me to a conclusion: if you need an app for your product, it is probably wise to utilize Flutter or React Native to get you up and running. If you can't do that (or decide against it), be very strict with features which should be available on any platform and sync their release schedule.

# Getting paid for Android apps

As a developer I also look with a seller's eye on the option of earning money with apps.

On the Google Playstore you can, as in the Apple App Store, sell your app.

I sincerely hope that people realize that depending on a few companies for all _information technology things_ is bad. One of the first things is to stop using Google products and find (and pay for) alternatives.[^4]

The FDroid store is a store exclusively for free open source software. It hence does not provide any payment or subscription integration. They do audit every app and mention potential problems resulting of non-free app _behaviour_.

As a developer you'd need to figure out a way to have people pay for your app (if you want to sell it in the first place).

While browsing on FDroid, I felt I'd time travel back to 1990s or 2000s, when shareware was a thing. Shareware means hou distribute your app (for a fixed amount of time or with a limited feature set) and to unlock all features, you have to enter a license key.[^5]

The aforementioned Klack app does that: when you buy it via the AppStore, you get a license key which is valid for 1 year and can be used on 5 devices.

Most developers publish their app on the PlayStore and on alternative stores. Some try it with the shareware approach, others just provide their apps for free on FDroid and sell it on the Playstore[^6].

die app-entwickler verkaufen lizenzkeys, weil der store keine möglichkeit zur generiereung anderer einnahmenquellen bietet

ich wünsche mir, dass sich das ökosystem entwickelt und es gelänge einen nicht-google appstore aufzustellen, in dem entwickler geld für ihre arbeit realisieren können.
andererseits fürchte ich, dass android user kein geld für apps ausgeben wollen und entsprechend kein markt existiert.

interessanterweise ist Overcast von marco arment geschrieben, der das wirtschaftlich frei gemacht hat. der hat da diverse bezahlmodelle durch (ich hab "gl¨ck" dass ich früh mal gekauft habe und seitdem keine werbung for life habe) und auch drüber geschrieben. es scheint sich zu lohnen.
was overcast auszeichnet is das automatisierte überspringen von stillen momenten in podcasts, sowie .. die verbesserung der sprachqualität in podcasts. und das is phänomenal gut gemachtes DSP.

es is halt auch häufig zu sehen, dass es n trinkgeld-geben button gibt und die devs dann anerkunneng kriegen

# degoogle

I installed microgapps, but nonetheless I try to cut as much connections to Google as possible. The term in the android community for that is _degoogle_. Several guides to _degoogle_ exist, although some aren't updated for Lineage 17.1 yet.

- [How to deGoogle LineageOS in 2019](https://www.reddit.com/r/degoogle/comments/cldohl/how_to_degoogle_lineageos_in_2019/)

# Worries

What worries me is that the LineageOS team had to stop their nightly builds at the end of April due to a bug which could put your device in a boot loop. Last time I checked on 17<sup>th</sup> May, there aren't any new builds.

Also the Lineage infrastucture has been hacked by exploiting an RCE in Saltstack. The recovery was done within a day or two and I'm thankful for that.

What I seriously dislike is the communication: you can't find any official information about those two incidents on the official website. You have to [dig on Reddit](https://www.reddit.com/r/LineageOS/comments/gbdlzx/lineageos_downloads/fp6081b/) and with a bit of luck you find a developer on Twitter stating the status in a conversation somewhere[^7].
The official website has a link to their status page (good, they have one!) but it doesn't reveal any information or pointer where to look for updates.

I know everyone working on LineageOS is doing it in their spare time, so I won't demand much. I'm sure many LineageOS devs know that handling such incidents in such a way is not state of the art.

I'm looking forward to the two post mortems (boot loop with syncing problems and the hack of via Saltstack RCE) and the conclusions drawn out of it!

The _stats_ page (where people who opted-in to report their installation information) is also down. A web archive version from 2020-04-07 shows [1,727,755 active LineageOS installations](https://web.archive.org/web/20200407093110/http://stats.lineageos.org/).
It's not that LineageOS is a little side project any more... Maybe the organization is overdue for a "level up"?

# Lineage OS

ansonsten is lineage os ja ein guter anfang. wie alles in der open source welt is nur weniges wirklich vollumfänglich umgesetzt.

# Closing

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
