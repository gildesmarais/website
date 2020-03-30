---
layout: post
lang: de
title: "Nokia E51 als UMTS Modem via Bluetooth unter Ubuntu"
date: 2008-04-05 15:19:47 +00:00
description: Nokia E51 als UMTS Modem via Bluetooth unter Ubuntu nutzen.
---

Nichts ist unmöglich. Nachdem ich gestern ein wenig Zeit hatte, beschreibe ich heute, wie man kabellos unter Ubuntu via Bluetooth per UMTS surft.

Sofern noch nicht geschehen, muss das Handy mit Ubuntu “gepaired" werden. Dazu Ubuntu kurzzeitig auffindbar machen und vom Handy aus den Pairing-Vorgang starten (andersrum geht’s auch). Grundsätzlich sind meine Bluetoothgeräte versteckt und nicht auffindbar, was ich auch jedem empfehle. Leider gibt es viele, die gar nicht wissen, dass sie es bösartigen Hackern extrem einfach machen, ihr Handy aufzufinden und anzugreifen. Besonders an belebten Plätzen wie Bahnhöfen sind viele BT-Geräte auffindbar.

Wenn die beiden Geräte gekoppelt sind, geht’s weiter: Das Handy kurzzeitig auffindbar machen und vom Ubuntu aus mit _hcitool scan_ die BT-Umgebung scannen lassen.

    $ hcitool scan

    Scanning ...

     00:1D:6E:BC:xx:xx Gil

Die MAC-Adresse (`00:1D:6E:BC:xx:xx`) vom eigenen Handy merken. Die wird noch zwei mal gebraucht (wird nachfolgend `<mac>` genannt).  
Jetzt soll Ubuntu das Handy nach den via Bluetooth angebotenen Services durchsuchen. Hierfür kann das Handy schon wieder unsichtbar gemacht werden, da die MAC-Adresse zum Verbinden vollkommen ausreicht.

    $ sdptool browse <mac>

Erzeugt nun eine Menge Text, hier ist nach _Dial Up Networking_ Ausschau  
zu halten. Gebraucht wird aus diesem Abschnitt der _Channel_, auf dem der  
Service angeboten wird. Bei meinem E51 ist das der Channel 2.

     Service Name: Dial-Up Networking
     Service RecHandle: 0x10003
     Service Class ID List:
     "Dialup Networking" (0x1103)
     Protocol Descriptor List:
     "L2CAP" (0x0100)
     "RFCOMM" (0x0003)
     **Channel: 2**

Ein letztes Mal wird die MAC Adresse gebraucht, um die virtuelle serielle Schnittstelle anzulegen. Dazu die `/etc/bluetooth/rfcomm.conf` bearbeiten (bspw. mit: `sudo gedit /etc/bluetooth/rfcomm.conf`) und folgendes hineinschreiben.

     rfcomm0 {
       bind yes;
       device <mac>;
       channel <channel>;
       comment "Nokia E51 BT Dial-Up";
     }

Speichern und danach mit

    sudo /etc/init.d/bluetooth restart

den Bluetooth Dienst neustarten. Jetzt sollte unter `/dev/` ein Gerät (= Datei) namens `rfcomm0` vorhanden sein.

Nun _wvdial_ installieren.

Zum Konfigurieren der Verbindung einfach die Sektion

```
[Dialer Defaults]
```

kopieren und ans Ende der Datei einfügen. Sektionname ändern, bspw. in

`[Dialer bluetooth]`, und als Modem _/dev/rfcomm0_ setzen. Wer die USB Datenkabel Verbindung nicht einrichten will, kann diesen Abschnitt dennoch so kopieren und nutzen, wenn* wvdial* installiert ist.

    [Dialer bluetooth]
    Modem = /dev/rfcomm0
    Baud = 460800
    SetVolume = 0
    Dial Command = ATDT
    FlowControl = NoFlow
    Init1 = ATZ
    Init2 = ATM0
    Username = eplus
    Password = gprs
    Phone = \*99#
    Init3 = AT+CGDCONT=1,"ip","internet.eplus.de"
    Stupid Mode = 1
    Dial Attempts = 3

Nun mit _wvdial bluetooth_ einwählen. Viel Spaß beim kabellosen Surfen.
