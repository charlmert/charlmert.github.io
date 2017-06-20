---
layout: post
title: "SSH Tunnel Remote Forwarding"
slug: "ssh-tunnel-remote-forwarding"
description: "Create and ensure a reverse ssh tunnel is connected"
category: 
  - ssh
  - tunnel
  - remote
  - forwarding
# tags will also be used as html meta keywords.
tags:
  - ssh
  - tunnel
  - remote
  - forwarding
show_meta: true
comments: true
mathjax: true
gistembed: true
published: true
noindex: false
nofollow: false
# hide QR code, permalink block while printing.
hide_printmsg: false
# show post summary or full post in RSS feed.
summaryfeed: false
## for twitter summary card with squared image and page description or page excerpt:
# imagesummary: foo.png
## for twitter card with large image:
# imagefeature: "http://img.youtube.com/vi/VEIrQUXm_hY/0.jpg"
## for twitter video card: (active for this page)
#videofeature: "https://www.youtube.com/embed/iG9CE55wbtY"
#imagefeature: "http://img.youtube.com/vi/iG9CE55wbtY/0.jpg"
videocredit: tedtalks
---
### Basic explanation of remote forwarding
```bash
-R 0.0.0.0:12343:localhost:12344 charl@22.23.24.25
```

The office PC has ssh listening on port 12344.

Server with static ip 22.23.24.25 forwards connections from 0.0.0.0:12343 on the *server* to the office PC @port 12344

This command is run from the office PC (like teamviewer)

```bash
# from office PC
ssh -p12344 -o 'ExitOnForwardFailure yes' -fN -v -R 0.0.0.0:12343:localhost:18421 charl@22.23.24.25
```

So from an *ssh terminal on the server* I can reach the office PC.

```bash
# from server
ssh -p 12344 charl@localhost
```

<!--more-->

Or if I use this config

```bash
vi ~/.ssh/config 
Host office.local
    Port 12343
    User charl
	ExitOnForwardFailure yes
```

I can say

```bash
ssh office.local
```

### The watchdog script

Save this on the office PC in /usr/local/src/scripts/watch_ssh_tunnel.sh
```bash
vi /usr/local/src/scripts/watch_ssh_tunnel.sh 
#---paste---watch_ssh_tunnel.sh
#!/bin/bash

if [ $(whoami) != 'root' ]; then
        echo "Must be run as root"
        exit 1
fi

PID=$(ps aux | grep "ssh -p12344 -o 'ExitOnForwardFailure yes' -fN -v -R 0.0.0.0:12343:localhost:18421 charl@22.23.24.25" | grep -v grep | awk '{print $2}')
if [ -z "$PID" ]; then
	echo "restarting tunnel..."
	ssh -p12344 -o 'ExitOnForwardFailure yes' -fN -v -R 0.0.0.0:12343:localhost:18421 charl@22.23.24.25
else
	echo "ok"
fi
#---
```

### The cron schedule
The cron schedule will establish and maintain ssh tunnels. If the connection breaks it will attempt to restart it because we're using "ExitOnForwardFailure yes".

```bash
crontab -e
# add this line to watch ssh tunnels
* * * * * /usr/local/src/scripts/watch_ssh_tunnel.sh 2&>1 > /dev/null
```

### Connecting from outside the server
If I want to connect from outside to my office PC I need to edit this
on the server

```bash
vi /etc/ssh/sshd_config
#---paste---/etc/ssh/sshd_config
GatewayPorts yes
#---
```

Then from *any terminal with access to the server at port 12343* I can

```bash
ssh -p 12343 charl@22.23.24.25
```
