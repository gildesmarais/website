---
title: "Bluetooth Headset mit Pulseaudio"
date: 2009-02-19
description: Bluetooth Headset mit Pulseaudio unter Ubuntu einrichten.
language: de
tags:
  - linux
  - bluetooth
---

Wer, wie ich, unter Ubuntu ein Bluetooth-Headset als Soundausgabe nutzen wollte, musste bisher umständlich zusätzliche Kernel-Module laden und gegebenenfalls eine "Umleitung" mit ALSA für den Pulseaudio-Server einrichten.

Seitdem Pulseaudio jedoch Bluetooth-Module mitliefert (ab Version 0.9.14, die mit Jaunty Alpha 4 ausgeliefert wurde), ist alles einfacher geworden.

Das nachträgliche Laden dieser Module mit passenden Parametern (nach der Kopplung mit dem PC) bringt sofort einen "Sink" zum Vorschein, der die Ausgabe über das Headset erlaubt.

Dazu folgendes entsprechend ans eigene Headset angepasste im Terminal eingeben:

```
pactl load-module module-bluetooth-device \
      sink_name="gewünschter sink-name" \
      address="MAC-Adresse" \
      profile="a2dp"
```

Ich benutze mein Headset lediglich zur Stereo-Soundausgabe. Daher stört es mich nicht, dass das Modul module-bluetooth-device bisher nur die Wiedergabe unterstützt und keine Source, sprich keinen Mikrofoneingang, bereitstellt.

Lädt man vorher das Modul module-bluetooth-discover, erkennt Pulseaudio, wann das Headset ein- oder ausgeschaltet wird.

Wer diese Einstellungen dauerhaft speichern will, bearbeitet mit Root-Rechten die Datei `/etc/pulse/default.pa`. Zumindest das Discover-Modul lässt sich dort beim Start laden.
