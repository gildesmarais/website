---
layout: post
lang: de
title: "Bluetooth Headset mit Pulseaudio"
date: 2009-02-19 20:32:12 +00:00
description: Bluetooth Headset mit Pulseaudio
tags:
  - linux
  - bluetooth
  - audio
---

Wer, wie ich, mit Ubuntu ein Bluetooth-Headset als Soundausgabe nutzen wollte, musste bisher immer umständlich zusätzliche Kernel-Module laden und ggf. noch eine “Umleitung" mit ALSA für den Pulseaudio-Server einrichten.

Seitdem Pulseaudio jedoch Bluetooth-Module mitliefert (ist bei Version 0.9.14, die mit Jaunty Alpha 4 daherkommt, der Fall), ist alles einfacher geworden.

Das nachträgliche Laden dieser Module mit entsprechenden Parametern (entsprechende Kopplung mit dem PC vorausgesetzt) bringt sofort einen “sink" zum Vorschein, der die Ausgabe über das Headset erlaubt.

Dazu folgendes entsprechend ans eigene Headset angepasste im Terminal eingeben:

```
pactl load-module module-bluetooth-device \
      sink_name="gewünschter sink-name" \
      address="MAC-Adresse" \
      profile="a2dp"
```

Ich benutze mein Headset lediglich zur Stereo-Soundausgabe, weswegen es mich nicht sehr stört, dass das Modul module-bluetooth-device bisher nur die Wiedergabe unterstützt und keine Source, sprich einen Mikrophoneingang, bereitstellt.

Lädt man vorher noch das Modul module-bluetooth-discover, erkennt Pulseaudio, wann das Headset an bzw. ausgeschaltet wird.

Wer diese Einstellungen dauerhaft speichern will, bearbeitet mit root-rechten die Datei /etc/pulse/default.pa. Zumindest das Discover-Modul kann man dort schonmal beim Start laden lassen.
