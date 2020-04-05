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
3. Download from _web 2.0_ websites  
   [youtube-dl](https://github.com/ytdl-org/youtube-dl/) is the swiss-army-knife for downloading from those sites. Check if your local radio stations are supported! :)
4. Some radio stations provide their shows as podcasts.
5. Some DJs run their own podcast to promote themselves.
6. Buy it online.

## Before importing to the library

### Transcode to a supported format

These tools come in handy:

- [ffmpeg](https://ffmpeg.org/) the swiss-army-knife for audio & video en-/trans-/decoding on the command line.
- [XLD](https://tmkk.undo.jp/xld/index_e.html) to transcode audio files, split one file to tracks, etc.

### Set and clean ID3 tags

- [MusicBrainz Picard](https://picard.musicbrainz.org/) is matching the files' accoustic fingerprints against freedb and sets their tags accordingly.
- Use [mp3tag](https://www.mp3tag.de/) to derive ID3 tags from folder & file name and fixing ID3/APEv2 tags.  
  Mp3tag is a power tool for mass manipulating and cleaning tags. It's outstanding and works well within wine. Nothing comes close to it and it is the only reason I keep wine installed.

  Wine is holding me back from upgrading to macOS Catalina as it does not support 64bit-only OSes yet. I'm btw. afraid of the Music.app which comes with macOS Catalina.

## Import to library and organizing

All my music files are managed by iTunes. iTunes is really good in dealing with large music collections. I subscribed to iTunes Match to have the music available on all of my devices.

### iTunes Match restrictions

iTunes Match is sometimes slow.

It matches _clean_ versions of lyrically explicit tracks. It's annoying, but since voices annoy me in music and I rarely listen to rap, it does not affect me much. Also I keep the original files instead of replacing them with the matched version.

If you listen to DJ mixes, you will hit iTunes Match's `2h` or `200MB` file size limit.
Most of these mixes are distributed as MP3. [`mp3splt`](http://mp3splt.sourceforge.net/) splits the files evenly without reencoding.

### Rating with a schema

After the import of new tracks, I start rating the tracks. Over time I've developed a rating schema (on a scale of 0 to 5 stars).

- `0 stars`: new to library, needs a rating
- `1 stars`: rated, do not keep.
- `2 stars`: keep for a reason, but the track is not good
- `3 stars`: an average track
- `4 stars`: a good track
- `5 stars`: a personal favorite track

For rating, I find [Stars](http://www.karelia.com/products/stars/) very useful to rate music via hotkey.

### Accurate genre field

I try to set specific genres: Instead of `Rock` I narrow it down to `Rock/Metal` or even `Rock/Metal/Black`. Here are a few other specific examples:

- `Drum & Bass/Jump-Up`
- `House/Bass`
- `Techno/Acid`
- `Techno/Hard`

Tagging something as `Pop` is basically avoiding to set a genre. For `Pop` I started adding the decade like this: `Pop/60`, `Pop/70`, …, `Pop/00`, `Pop/10`, `Pop/20`

### Clean up the iTunes library with beaTunes

[beaTunes](https://www.beatunes.com/en/) not only analyzes the content of each track, but also inspects your library.  
The inspection detects illogical tags, missing compilation tags, different notations of the same artist, finds duplicates, etc.

Go through the results and commit the results.

## Determining the _Key_ and _Energy_ with Mixed in Key

[Mixed in Key](https://mixedinkey.com/) analyses the _key_ and _energy_ of your music.

Create a smart playlist _MiK todo_ which lists all files without Energy or BPM and a rating of greater or equal than 2 stars.

## Creating playlists

With the rated and analyzed tracks we can begin creating smart playlists.

### Smart playlists

Scaffold a base:

1. create a smart playlists in iTunes for Energy (filter rules depend on your Mixed in Key configuration)
2. create a smart playlists for each possible rating (_Stars 0_, _Stars 1_, …)
3. create a smart playlist for _Added in the last x weeks/months_. I have those for 4 weeks and 6 months.

Stars 0 is your "to rate" list.
Stars 1 is your "to remove" list.

Now you can create a smart playlist like:

- _Banger tracks_: Track is in playlist _Energy 8_ and _Stars 5_.
- _Calm popular music_: Genre begins with `Pop` and is in Playlist _Energy 4_ or _Energy 5_.
- _Hard Techno post 2010_: Genre begins with `Techno/Hard` and `year >= 2010`, in playlist _Energy 6, 7, 8, 9_.

### Using beaTunes

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
   ⚠️ Make sure to export your _Stars_ playlists! iTunes does not save the rating in the files tags!
3. Add the exported playlists to a git repository and commit the changes, push to a remote host.

## Playing

### iTunes

With iTunes match I can listen to my music on any of my  devices.

On desktop, I work with my the smart playlists and the "Column Browser" in the "Song" view mode:

![](/assets/images/posts/2020-04-05-itunes-song-column.png)

### DJ set preparation

[Traktor Pro 3](https://www.native-instruments.com/en/products/traktor/dj-software/traktor-pro-3/) is an industry-proven DJ application. I use it with a [Denon MC 6000](https://duckduckgo.com/?q=Denon+MC+6000&iax=images&ia=images).
Traktor reads my iTunes library.

When creating a DJ set, I have a playlist of _A tracks_ to play which acts like a pool of track. Usually I pick tracks out of that pool and go with it.

Some mixes may need more preparation. Then I create a plain old playlist in iTunes first and use that in Traktor.

### with MPD and Cantata

scp playlists (with correct url of tracks) to playlists folder of remote mpd

- [Cantata]() to control the MPD
