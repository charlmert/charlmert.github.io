---
layout: post
title: "Force Mail Through Panda Email Security"
slug: "force-mail-through-panda"
description: "Prepare to switch over MX records to point to Panda by testing via this method"
category: 
  - views
  - featured
# tags will also be used as html meta keywords.
tags:
  - panda
  - email
  - security
  - postfix
  - generic mapping
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

MX records tells an MTA which server to send mail to be delivered to.
Panda email filter/scanner sits in between the sender and the mail server, intercepts mail to check it and send it on or discard it.
This document will demonstrate how to force postfix to send to a specific MTA, the MTA you will configure your MX records to point to,
namely Panda's MTA.

<!--more-->
### Install postfix, mailutils and test
```bash
sudo apt-get install -fy postfix apt-get mailutils

echo "test" | mail -s "force panda" charlm@company.co.za

tail -f /var/log/mail.log
```

### First round test email headers
```html
Return-Path: <root@office.local>
Delivered-To: charlm@company.co.za
Received: from rs04-pta.za-dns.com
	by rs04-pta.za-dns.com (Dovecot) with LMTP id ARx9G7e1R1ndmQwA2n7kRA
	for <charlm@company.co.za>; Mon, 19 Jun 2017 13:29:59 +0200
Return-path: <root@office.local>
Envelope-to: charlm@company.co.za
Delivery-date: Mon, 19 Jun 2017 13:29:59 +0200
Received: from [196.210.67.166] (port=50417 helo=mail.local)
	by rs04-pta.za-dns.com with esmtp (Exim 4.89)
	(envelope-from <root@office.local>)
	id 1dMusZ-003XXp-5Y
	for charlm@company.co.za; Mon, 19 Jun 2017 13:29:59 +0200
Received: by mail.local (Postfix, from userid 0)
	id 42C35166143; Mon, 19 Jun 2017 13:29:13 +0200 (SAST)
To: charlm@company.co.za
Subject: force panda
Message-Id: <20170619112913.42C35166143@mail.local>
Date: Mon, 19 Jun 2017 13:29:13 +0200 (SAST)
From: root@office.local (root)

test
```

### Forcing Postfix to send to Panda (mx01.mep.pandasecurity.com)

To force our soon to be MX record mail server for a given domain
<http://www.postfix.org/postconf.5.html#transport_maps>

```bash
vi /etc/postfix/main.cf
#---paste---/etc/postfix/main.cf
transport_maps = hash:/etc/postfix/transport
#---

vi /etc/postfix/transport
#---paste---/etc/postfix/transport
company.co.za smtp:[mx01.mep.pandasecurity.com]:25
#---

postmap /etc/postfix/transport

service postfix restart
```

### Send test mail
```bash
echo "test" | mail -s "force panda" charlm@company.co.za
```

### Checking mail.log
```bash
tail -f /var/log/mail.log
Jun 19 14:18:27 mail postfix/smtp[11936]: AFDEB166144: to=<charlm@company.co.za>, relay=mx01.mep.pandasecurity.com[92.54.27.161]:25, delay=3, delays=0.08/0.01/1.4/1.5, dsn=5.0.0, status=bounced (host mx01.mep.pandasecurity.com[92.54.27.161] said: 550-Verification failed for <root@office.local> 550-Unrouteable address 550 Sender verification failed (in reply to RCPT TO command))
```

### Sender verification failed
To fix this we use Postfix Generic Maps
<http://www.postfix.org/postconf.5.html#smtp_generic_maps>

```bash
vi /etc/postfix/main.cf
#---paste---
smtp_generic_maps = hash:/etc/postfix/generic
#---

vi /etc/postfix/generic
#---paste---
root@office.local               charl@gexsa.ltd
#---

postmap /etc/postfix/generic

service postfix restart
```

### Got 451 :Greylisting: please retry later
```bash
Jun 19 14:57:19 mail postfix/smtp[13810]: 5E90B168FC1: to=<charlm@company.co.za>, relay=mx01.mep.pandasecurity.com[92.54.22.75]:25, delay=613, delays=595/0.03/13/4.6, dsn=4.0.0, status=deferred (host mx01.mep.pandasecurity.com[92.54.22.75] said: 451 :Greylisting: please retry later (in reply to RCPT TO command))
Jun 19 15:07:02 mail postfix/qmgr[13429]: 4526F168FBF: from=<root@office.local>, size=300, nrcpt=1 (queue active)
Jun 19 15:07:17 mail postfix/smtp[14095]: 4526F168FBF: to=<charlm@company.co.za>, relay=mx01.mep.pandasecurity.com[92.54.22.76]:25, delay=1512, delays=1497/0.02/1.1/14, dsn=2.0.0, status=sent (250 OK id=1dMwOe-0008Th-Qh)
```

After a while it does eventually send

### Second round test email headers
```html
Return-Path: <SRS0=mj15=5Y=jnz.co.za=charl@mep.pandasecurity.com>
Delivered-To: charlm@company.co.za
Received: from rs04-pta.za-dns.com
	by rs04-pta.za-dns.com (Dovecot) with LMTP id MUJuOMDMR1ktPAAA2n7kRA
	for <charlm@company.co.za>; Mon, 19 Jun 2017 15:08:16 +0200
Return-path: <SRS0=mj15=5Y=jnz.co.za=charl@mep.pandasecurity.com>
Envelope-to: charlm@company.co.za
Delivery-date: Mon, 19 Jun 2017 15:08:16 +0200
Received: from roma.mep.pandasecurity.com ([92.54.22.76]:57435)
	by rs04-pta.za-dns.com with esmtps (TLSv1.2:DHE-RSA-AES128-SHA:128)
	(Exim 4.89)
	(envelope-from <SRS0=mj15=5Y=jnz.co.za=charl@mep.pandasecurity.com>)
	id 1dMwPc-000Acr-Rl
	for charlm@company.co.za; Mon, 19 Jun 2017 15:08:16 +0200
Received: from [196.210.82.87] (helo=mail.local)
	by roma.mep.pandasecurity.com with esmtp (Exim 4.80)
	(envelope-from <charl@jnz.co.za>)
	id 1dMwOe-0008Th-Qh
	for charlm@company.co.za; Mon, 19 Jun 2017 15:07:16 +0200
Received: by mail.local (Postfix, from userid 0)
	id 4526F168FBF; Mon, 19 Jun 2017 14:42:05 +0200 (SAST)
X-Envelope-From: charl@jnz.co.za
To: charlm@company.co.za
Subject: force panda
Message-Id: <20170619124205.4526F168FBF@mail.local>
Date: Mon, 19 Jun 2017 14:42:05 +0200 (SAST)
From: charl@jnz.co.za (root)
X-CTCH-IPCLASS: T3
X-CTCH-RefID: str=0001.0A0B0201.5947CC82.00B8,ss=1,re=0.000,recu=0.000,reip=0.000,cl=1,cld=1,fgs=0
X-CTCH-VOD: Unknown
X-CTCH-Spam: Unknown
X-SPF-Received: 7
X-Spamina-Bogosity: Ham
X-Spamina-History: valid
X-Spamina-Service-Type: pyme
X-Spam-Status: No, score=0.8
X-Spam-Score: 8
X-Spam-Bar: /
X-Ham-Report: Spam detection software, running on the system "rs04-pta.za-dns.com",
 has NOT identified this incoming email as spam.  The original
 message has been attached to this so you can view it or label
 similar future email.  If you have any questions, see
 root\@localhost for details.
 
 Content preview:  test [...] 
 
 Content analysis details:   (0.8 points, 5.0 required)
 
  pts rule name              description
 ---- ---------------------- --------------------------------------------------
 -2.3 RCVD_IN_DNSWL_MED      RBL: Sender listed at http://www.dnswl.org/, medium
                              trust
                             [92.54.22.76 listed in list.dnswl.org]
 -0.0 T_RP_MATCHES_RCVD      Envelope sender domain matches handover relay
                             domain
  0.0 HEADER_FROM_DIFFERENT_DOMAINS From and EnvelopeFrom 2nd level mail
                             domains are different
 -0.0 SPF_PASS               SPF: sender matches SPF record
  0.0 TVD_SPACE_RATIO        No description available.
  3.1 BODY_SINGLE_WORD       Message body is only one word (no spaces)
X-Spam-Flag: NO

test
```
