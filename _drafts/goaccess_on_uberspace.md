---
layout: post
tags:
  - linux
  - software
---

uberspace web log access enable
touch ~/bin/stats

#!/bin/bash

mkdir -p ~/tmp/goaccess
mkdir -p ~/html/stats

goaccess --agent-list \
 --db-path=~/tmp/goaccess
--keep-db-files \
 --load-from-disk \
 --config-file ~/etc/goaccess.conf \
 --log-file ~/logs/webserver/access_log \
 --output ~/html/stats/index.html

chmod +x ~/bin/stats

touch ~/html/stats/.htaccess

```
AuthType Basic
AuthName "Stats"
AuthUserFile "/var/www/virtual/<username>/html/stats/.htpasswd"
Require valid-user
Order allow,deny
Allow from all
```

htpasswd -bc ~/html/stats/.htpasswd "username" "password"

~/bin/stats

check all works

automatic generation
crontab -e

0 \* \* \* \* \$HOME/bin/stats >/dev/null 2>&1
