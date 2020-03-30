---
layout: post
title: Dealing with audio and video
description:
---



- [Audacity](https://www.audacityteam.org/)
- [ffmpeg](https://ffmpeg.org/) the swiss-army-knife for audio & video en-/trans-/decoding.
- [youtube-dl](https://github.com/ytdl-org/youtube-dl/) the swiss-army-knife for leeching from those fancy web2.0 multimedia sites
- [XLD](https://tmkk.undo.jp/xld/index_e.html) to transcode audio files, split to tracks while keep the tags.

## Before importing to the library

- [MusicBrainz Picard](https://picard.musicbrainz.org/)
- [mp3tag](https://www.mp3tag.de/) for fixing id3/apev2 tags. Hands down, mp3tag is a power tool for mass manipulating and cleaning tags. It's outstanding and works well within wine. Nothing comes close to it and it is the only reason I keep wine installed.
Wine is holding me back from upgrading to macOS Catalina as it does not support 64bit-only OSes yet. I'm afraid of the Music.app which comes with macOS Catalina.


## Import to library and organizing

### iTunes with iTunes Match

iTunes is really good in dealing with large music collections.
Although iTunes Match is slow sometimes it only fails me one matching 'clean' versions of lyrically explicit tracks. It's annoying, but since voices annoy me in music it does not affect me much.

- [Stars](http://www.karelia.com/products/stars/): rate music via hotkey

I try to set specific genres, if possible and desired.

"Drum & Bass/Jump-Up"
"House/Bass"
"Rock/Metal"
"Rock/Metal/Black"

Go through 

- [beaTunes](https://www.beatunes.com/en/) analyses and inspects your music library and creates smart playlists according to your criteria, finds duplicates, etc.
- [Mixed in Key](https://mixedinkey.com/) analyses the BPM, key and "power" of your music.

setup smart playlists in iTunes for Energy
setup smart playlists by genre

## Playing

With iTunes match I can listen to my music on any of my  devices.

- [Traktor Pro 3](https://www.native-instruments.com/en/products/traktor/dj-software/traktor-pro-3/) is an industry-proven DJ application. I use it with a [Denon MC 6000](https://duckduckgo.com/?q=Denon+MC+6000&iax=images&ia=images).

### with MPD and Cantata

rsync folder to nas
export playlist with dougs batch export
scp to playlists folder of remote mpd
- [Cantata]() to control the MPD
