---
layout: post
title: Handling, organizing and playing music
description:
toc: true
---

## Getting music

There are several ways to obtain music nowadays:

1. Rip it from CDs  
  Use [ExactAudioCopy](http://exactaudiocopy.de/) on a window machine with an optical disc reading device (they still exist outside museums)
2. Rip it from vinyl  
  Use a turntable, an analog to digital audio converter and use [Audacity](https://www.audacityteam.org/) to record it. Audacity offers some filters to reduce noise and remove cracks and pops.
3. Download from *web 2.0* websites  
  [youtube-dl](https://github.com/ytdl-org/youtube-dl/) is the swiss-army-knife for downloading from those sites. Check if your local radio stations are supported! :)
4. Some radio stations provide their shows as podcasts.
5. Some DJs run their own podcast to promote themselves.
6. Buy it online.

## Before importing to the library

### Transcode to the desired format

These tools come in handy:

- [ffmpeg](https://ffmpeg.org/) the swiss-army-knife for audio & video en-/trans-/decoding on the command line.
- [XLD](https://tmkk.undo.jp/xld/index_e.html) to transcode audio files, split one file to tracks, etc. 

### Set and clean ID3 tags

- [MusicBrainz Picard](https://picard.musicbrainz.org/) is matching the files  with their accoustic fingerprint against the freedb and sets their tags.
- [mp3tag](https://www.mp3tag.de/) for derive ID3 tags from folder & file name, and fixing ID3/APEv2 tags.  
  Mp3tag is a power tool for mass manipulating and cleaning tags. It's outstanding and works well within wine. Nothing comes close to it and it is the only reason I keep wine installed.  

  Wine is holding me back from upgrading to macOS Catalina as it does not support 64bit-only OSes yet. I'm btw. afraid of the Music.app which comes with macOS Catalina.

## Import to library and organizing

All my music files are managed by iTunes.

### iTunes with iTunes Match

iTunes is really good in dealing with large music collections.
Although iTunes Match is slow sometimes, it only failed me on matching 'clean' versions of lyrically explicit tracks. It's annoying, but since voices annoy me in music it does not affect me much.

#### Restrictions

If you listen to mixes and livesets, you will hit iTunes Match's 2h or 200MB file size limit.
Most of these mixes are distributed as mp3. [`mp3splt`](http://mp3splt.sourceforge.net/) to the rescue!

### Rating music

After the import of new tracks, I start rating the tracks. Over time I've developed a rating schema (on a scale of 0 to 5 stars).

- 0 stars: new to library, needs a rating
- 1 stars: rated, do not keep.
- 2 stars: keep for a reason, but the track is not good
- 3 stars: an average track
- 4 stars: a good track
- 5 stars: a personal favorite track

For rating, I find [Stars](http://www.karelia.com/products/stars/) very useful to rate music via hotkey.

### Make the genre field accurate

I try to set specific genres, if possible and desired.

Instead of "Rock" I'd narrow it down to "Rock/Metal" or even "Rock/Metal/Black", etc.

Few more examples:

- "Drum & Bass/Jump-Up"
- "House/Bass"
- "Pop/Mallorca"
- "Techno/Acid"
- "Techno/Hard"

Tagging something as "pop" is basically avoiding to set a genre. For Pop I started adding the decade like this: "Pop/60", "Pop/70", …, "Pop/00", "Pop/10", "Pop/20"

### Analyze music automatically

- [Mixed in Key](https://mixedinkey.com/) analyses the BPM, key and "energy" of your music.
- [beaTunes](https://www.beatunes.com/en/) analyses and inspects your music library

### Cleaning up the iTunes library with beaTunes

beaTunes not only analyzes the content of each track, but also inspects your library. It detects illogical tags, missing compilation tags, different notations of the same artist, finds duplicates, etc. 

### Creating playlists

With the rated and analyzed tracks we can begin creating smart playlists.

#### Smart playlists

Scaffold a base:

1. create a smart playlists in iTunes for Energy (filter rules depend on your Mixed in Key configuration)
2. create a smart playlists for each possible rating (Stars 0, Stars 1, …)
3. create a smart playlist for "Added date in the last x weeks/months". I have those for 4 weeks and 6 months.

Stars 0 is your "to rate" list.
Stars 1 is your "to remove" list.

Now you can create a smart playlist like:

*Banger tracks*: Track is in Playlist "Energy 8" and "Stars 5".
*Calm popular music*: Genre begins with Pop and is in Playlist "Energy 4" or "Energy 5".
*Hard Techno post 2010*: Genre begins with Techno/Hard and year >= 2010, in Playlist Energy 6, 7, 8, 9.

#### Using beaTunes

In beaTunes you can setup some criteria like "Instrumentation", "Key", "Speed" etc. and let it create a playlist for you based on a seed track selection. That is super nice and the results are good.[^2]
But as time showed, I do not use that feature much. I'm fine with the smart playlists.

## Backup

1. Use [rsync](https://rsync.samba.org/) to sync the local Music folder to my NAS:  
  ```
  rsync --archive --verbose --human-readable \
   --itemize-changes --progress \
   --prune-empty-dirs --delete \
   -e ssh /Users/gil/Music/iTunes my-nas:/mnt/somewhere/backup/Backup_Music
  ```
2. export the playlist with [Doug's Batch Export Playlists](https://dougscripts.com/itunes/scripts/ss.php?sp=batchexportplaylists) script.  
  ⚠️ Make sure to export your *Stars* playlists! iTunes does not save the rating in the files tags!
3. Add the exported playlists to a git repository and commit the changes, push to a remote host.

## Playing

### iTunes

With iTunes match I can listen to my music on any of my  devices.

On desktop, I work with my the smart playlists and the "Column Browser" in the "Song" view mode:

![](/assets/images/posts/2020-04-05-itunes-song-column.png)

### DJ set preparation

[Traktor Pro 3](https://www.native-instruments.com/en/products/traktor/dj-software/traktor-pro-3/) is an industry-proven DJ application. I use it with a [Denon MC 6000](https://duckduckgo.com/?q=Denon+MC+6000&iax=images&ia=images).
Traktor reads my iTunes library.

When creating a DJ set, I have a list of "A tracks" to play. Usually I pick tracks out of that list.
Some mixes may need more preparation. Then I create a plain old playlist in iTunes first and use that in Traktor.

### with MPD and Cantata

scp playlists (with correct url of tracks) to playlists folder of remote mpd
- [Cantata]() to control the MPD
