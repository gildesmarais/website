---
title: Fixing NET::ERR_CERT_INVALID errors on macOS Mojave with Let's Encrypt certificates
image: /assets/images/posts/2020-04-01-safari-ssl-cert-invalid.png
description: I was plagued by certificates errors and this is how I fixed it.
tags:
  - macos
---

Recently a weird problem started occurring to me when browsing the web with Safari or Chrome[^1].
These browsers refused to load some sites like stackoverflow.com or letsencrypt.org. Safari complained about the certificate not being standards compliant, while Chromium based browser showed a completely valid certificate chain.

![Safari complaining about a not standards compliant cert](/assets/images/posts/2020-04-01-safari-ssl-cert-invalid.png)

I keep my macOS up to date, scanned it with _ClamAV_ etc, but there was nothing suspicious. So the problem lays somewhere else.
There's a [thread on the Let's Encrpyt community forum](https://community.letsencrypt.org/t/letsencrypt-org-frontpage-net-err-cert-invalid/116707) with someone having the same problem.
While the thread is more a investigation of causes, I just wanted my browsers to work as intended.

## The workaround

1. Use Firefox to download the <q>Let's Encrypt Authority X3 (IdenTrust cross-signed)</q> file directly from [letsencrypt.org/certificates/](https://letsencrypt.org/certificates/)
2. Remove the `.txt` extension from the file name, thus renaming it to `lets-encrypt-x3-cross-signed.pem`.
3. Open _Keychain Access_ (from `/Applications/Utilities`)
4. Select _Login_ in the upper left
5. Select _Certificates_ in the bottom left
6. Drag and drop the certificate in the right-hand side of the Keychain Access window.
   ![Keychain access](/assets/images/posts/2020-04-01-keychain-access.png)
7. Right click on the newly added <q>Let’s Encrypt Authority X3</q> and _Get Info_ (Select and <kbd>⌘</kbd>+<kbd>i</kbd> works fine here, too)
8. Open the _Trust_ part of the certificate
9. Select _Always trust_
   ![Always trust](/assets/images/posts/2020-04-01-trusting-letsencrypt-x3.png)
10. Restart macOS.

## What's the problem?

I'm not 100% sure why macOS renders the system-provided cert invalid.

I assume it has something to do with [Apple's upcoming changes in _Extended KeyUsage_](https://support.apple.com/en-us/HT210176). However, that change is due with macOS 10.15 (macOS Mojave is 10.14).

[^1]: Some browsers, like Firefox, do not rely on the system's certificate management and bring their own. With such a browser you could still browse. Same goes for some command line utilities like _cURL_.
