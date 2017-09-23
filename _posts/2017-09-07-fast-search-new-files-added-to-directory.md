---
layout: post
title: "Fast Search New Files Added to Directory"
slug: "fast-search-new-files-added-to-directory"
description: "Search newly added files, super fast"
category: 
  - perl
  - regex
  - replace
# tags will also be used as html meta keywords.
tags:
  - perl
  - regex
  - replace
  - multiline
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

Searches a directory for differences and prints only files that have been added for that script run, the next time the script is run it won't print anything if no files were added to the directory.

## Try it out

1st run initializes the db
```bash
mkdir -p /tmp/files
touch /tmp/files/1.mp3
touch /tmp/files/2.mp3
touch /tmp/files/3.mp3
touch /tmp/files/4.mp3

locate_diff --search-dir /tmp/files *.mp3
```

2nd run will print the differences
```bash
touch /tmp/files/5.mp3
touch /tmp/files/6.mp3
touch /tmp/files/7.mp3
touch /tmp/files/8.mp3

locate_diff --search-dir /tmp/files *.mp3
/tmp/files/5.mp3
/tmp/files/6.mp3
/tmp/files/7.mp3
/tmp/files/8.mp3
```

3rd run will print nothing but exit with code 2, no files added
```bash
locate_diff --search-dir /tmp/files *.mp3
echo $?
2
```

## Setup

Place the file in /usr/local/bin

```bash
cd /tmp/
wget https://bitbucket.org/charlmert/locate_diff/raw/65705571589670d57b7f4ec63fe5631c2808d8c0/locate_diff.pl
mv locate_diff.pl /usr/local/bin/locate_diff
chmod +x /usr/local/bin/locate_diff
```

Now just make sure that /usr/local/bin is in your $PATH

```bash
PATH=/usr/local/bin:$PATH
```

## Real World

Directory that needs to chmod o+r to new wav files that enter a directory

Previous implementation took 4 min, 43 seconds to complete

```bash
time chmod o+r -R /opt/backup/audio/customer_001_3_115

real	4m43.067s
user	0m0.619s
sys	0m17.623s
```

New script initialization takes 28 seconds
```bash
time /usr/local/bin/locate_diff --db-file /opt/locate_diff/customer_001_3_115.db --search-dir /opt/backup/audio/customer_001_3_115 *.wav | xargs -I{} chmod o+r {}

real	0m28.092s
user	0m2.570s
sys	0m0.450s
```

Subsequent run to chmod only the new files take 2 seconds
```bash
time /usr/local/bin/locate_diff --db-file /opt/locate_diff/customer_001_3_115.db --search-dir /opt/backup/audio/customer_001_3_115 *.wav | xargs -I{} chmod o+r {}

real	0m2.940s
user	0m2.459s
sys	0m0.317s
```

All chmod runs should now take only about 2 seconds per run depending on the amount of new files
