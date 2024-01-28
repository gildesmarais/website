---
title: "Using Bitwarden"
description: A new password manager, self-hosted.
tags:
  - linux
  - decentralize
---

Today I've setup my personal [Bitwarden](https://bitwarden.com/) instance and migrated from 1Password to it.[^1]

If you already have a securely setup and monitored server, [setting up Bitwarden is a fairly simple task](https://help.bitwarden.com/article/install-on-premise/).

I skipped the SSL certs generation during the installation and put Bitwarden behind a reverse proxy afterwards. NGINX is the reverse proxy and handles SSL/TLS connections facing clients.

1Password exports your passwords in their own file format, which Bitwarden can import. I lost all tags and attachments of my credentials. So there is some manual work to fully migrate.

I've been happy with 1Password. I was still using their old version which I bought years ago. However, clients for the old 1Password version started to crash on macOS. That's why I needed to decide which way to go:

1. stay with 1Password and subscribe to their app
2. install and maintain Bitwarden on my private server, which is maintained by myself in my spare time.

Usually it makes no financial sense to maintain something you rely on yourself. I went with 2 nonetheless, let's hope it's a smooth ride.

[^1]: That includes installing their app on all my (macOS, iOS and Android) devices.
