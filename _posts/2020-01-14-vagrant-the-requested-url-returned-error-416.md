---
layout: post
title: "Vagrant: The requested URL returned error: 416"
slug: "2020-01-14-vagrant-the-requested-url-returned-error-416"
description: "Manually bring a vagrant box up"
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

When vagrant up fails with

```bash
An error occurred while downloading the remote file. The error
message, if any, is reproduced below. Please fix this error and try
again.

The requested URL returned error: 416
```

There are some easy fixes to try first like removing the temp directory

```bash
rm -frv .vagrant/
```

Also when vagrant does not support virtualbox 6.1
https://github.com/oracle/vagrant-boxes/issues/178

For me the vagrant command wouldn't download the vagrant boxes but when pasting the link in the browser it downloaded fine so

1. Edit the following file to print the path/name of the box
/opt/vagrant/embedded/gems/2.2.6/gems/vagrant-2.2.6/lib/vagrant/action/builtin/box_add.rb

Add a new line below line 547 and add the print line like so:
Also comment out line 464, see below:

```ruby
454             env[:ui].detail(I18n.t(
455               translation,
456               url: display_url))
457             if File.file?(d.destination)
458               print('File: ' + d.destination) # here
459               env[:ui].info(I18n.t("vagrant.actions.box.download.resuming"))
460             end
461           end
462           
463           begin
464             #d.download!  # and here
465           rescue Errors::DownloaderInterrupted
466             # The downloader was interrupted, so just return, because that
467             # means we were interrupted as well.
468             @download_interrupted = true
469             env[:ui].info(I18n.t("vagrant.actions.box.download.interrupted"))
470           end
```


2. Get the url and destination path

```bash
vagrant up
==> box: Box file was not detected as metadata. Adding it directly...
==> box: Adding box 'debian/stretch64' (v0) for provider: 
    ----- URL below
    box: Downloading: https://vagrantcloud.com/debian/boxes/stretch64/versions/9.9.1/providers/virtualbox.box
    ----- DESTINATION PATH below
    File: /Users/charl/.vagrant.d/tmp/boxb51a9fcbf3390db1588948222e354b3b37145ec6==> box: Box download is resuming from prior download progress
    -----
    box: Download redirected to host: vagrantcloud-files-production.s3.amazonaws.com
An error occurred while downloading the remote file. The error
message, if any, is reproduced below. Please fix this error and try
again.

The requested URL returned error: 416
```

3. Download the box manually

wget -c url -O path

You will be able to run the command again and it will resume the download, hence -c

```bash
wget -c "https://vagrantcloud.com/debian/boxes/stretch64/versions/9.9.1/providers/virtualbox.box" -O /Users/charl/.vagrant.d/tmp/boxb51a9fcbf3390db1588948222e354b3b37145ec6
```

When done, download completed, you can do a vagrant up again.
