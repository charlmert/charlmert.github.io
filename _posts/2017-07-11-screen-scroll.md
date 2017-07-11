---
layout: post
title: "Linux Screen Scroll with Mouse Scroll"
slug: "linux-screen-scroll-with-mouse-scroll"
description: "How to use the mouse to scroll up in a screen session"
category: 
  - linux
  - screen
  - scroll
# tags will also be used as html meta keywords.
tags:
  - linux
  - screen
  - scroll
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
<https://unix.stackexchange.com/questions/40242/scroll-inside-screen-or-pause-output>

This removes the need for having to scroll in copy mode. i.e. CTRL-A ESC

Open ~/.screenrc
```bash
vi ~/.screenrc
```
Paste:
```bash
termcapinfo xterm* ti@:te@
```

Create a new screen session or restart an existing one and you can now scoll up to view history.
