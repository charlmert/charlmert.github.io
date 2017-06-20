---
layout: post
title: "LVM Metadata Repair"
date: "2017-06-15"
slug: "lvm-metadata-repair"
description: "Reparing a corrupt LVM Metadata Volume"
category: 
  - views
  - featured
# tags will also be used as html meta keywords.
tags:
  - lvm
  - metadata
  - thin
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

We had a real issue on our Proxmox (LVM Thin). Our metadata usage was up to 99.6% and it was causing all sorts of disk issues as well as the incorrect disk usage being reported. 

<!--more-->

* TOC
{:toc}

## 1. Check metadata health run "lvs -a" on the proxmox host
```bash
lvs -a
LV              VG   Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
data            pve  twi-aotz--   2.61t             60.01  2.55                            
[data_tdata]    pve  Twi-ao----   2.61t                                                    
[data_tmeta]    pve  ewi-ao----   4.00g                                                    
[lvol0_pmspare] pve  ewi-------   4.00g                                                    
repaired        pve  -wi-a-----   2.10g                                                    
root            pve  -wi-ao----  96.00g                                                    
swap            pve  -wi-ao----   8.00g                                                    
vm-100-disk-1   pve  Vwi-aotz-- 300.00g data        98.92                                  
vm-100-disk-2   pve  Vwi-aotz-- 900.00g data        100.00                                 
vm-101-disk-1   pve  Vwi-aotz-- 200.00g data        65.82                                  
vm-102-disk-1   pve  Vwi-aotz-- 300.00g data        3.19                                   
vm-103-disk-1   pve  Vwi-aotz-- 300.00g data        89.18                                  
vm-103-disk-2   pve  Vwi-a-tz-- 220.00g data        0.00                                   
```

2.55% metadata usage is really healthy, we went from 99.6% to 2.55% usage after much googling.
99.6% metadata usage caused the thin volume to become "suspended". See 
```bash
lvdisplay /dev/mapper/pve-data | grep "LVM Status"
```

**suspended** is a good thing, you don't want your thin provisioned disks to be active while performing metadata swap
if you just want to grow your metadata it's ok for your disks to be active but if this fails you'll have to perform a swap

Other symptoms
some other symptoms were that disks were behaving badly, seemingly broken and unresponsive filesystems
and on windows almost as if a virus was chowing up disk reads/writes.

Please note that the mentioned symptoms might have nothing to do with the metadata as not enough investigation was done to arrive at those conclusions.

We did see an incorrect thin pool size available being reported as 2.6T of 2.7T usage after adding 900G to the thin pool
We were expecting to see about 1.5T usage of 2.8T. This was all corrected after swapping out the metadata

First thing to try is to extend metadata volume size.
See 
```bash
lvdisplay /dev/mapper/pve-data
```
to find the correct device e.g. in our case data_tmeta
<https://forum.proxmox.com/threads/is-default-install-lvm2-thin-pool-metadata-size-appropriate.31627/>

Add 1G to metadata
```bash
lvextend -L+1G pve/data_tmeta
```

If the above command failed for any reason or you still see high usage percentages (see lvs -a), in our case 99.6% usage even after growing the 
metadata to 2G, it might be needed to swap out the metadata completely. 

This can be achieved by:

## 2. Making sure thin volumes are not active
### 2.1 If you can, boot into single user mode
(before qemu/kvm starts) as the thin lvm volumes cannot be active (lvchange -an "to deactivate volumes will fail if volumes are active"). In our case they were being used by the kvm process.

Google on how to change grub init params to boot into single user mode OR rather from another live boot iso such that the kvm doesn't get started and the 
thin volumes don't become active or used by another process.

### 2.2 If you don't want to boot into single user mode you could try and deactivate the volumes manually via
List the thin volumes which belong to pve/data thin pool
```bash
lvdisplay | grep -iE "lv pool name.*data" -B6 | grep -i "lv path"
  LV Path                /dev/pve/vm-100-disk-1
  LV Path                /dev/pve/vm-101-disk-1
  LV Path                /dev/pve/vm-103-disk-1
  LV Path                /dev/pve/vm-103-disk-2
  LV Path                /dev/pve/vm-100-disk-2
  LV Path                /dev/pve/vm-102-disk-1
```
Deactivate them 1 by 1
```bash
lvchange -an -v /dev/pve/vm-100-disk-1
lvchange -an -v /dev/pve/vm-101-disk-1
```

If the above commands fail it's highly recommended that you boot into single user mode on the proxmox machine itself.

To find the process use this
(https://serverfault.com/questions/266697/cant-remove-open-logical-volume)
find major,minor number
```bash
dmsetup info -c | grep vm-100
```

Find process actively using the volume
```bash
lsof | grep "major,minor"
```

In our case (don't have the output with me) but it reported that the kvm process was the culprit

Once the thin volumes are deactivated "LVM Status ... NOT available" you may continue to repair the broken metadata into a new volume and swap the existing metadata out on the thin pool with this new repaired volume.

## 3. Creating a temporary volume (pve/repaired_01). This will be the new metadata volume for the pve/data thin pool

Just out of interrest, when the thin volume is suspended you can't create thin volumes off it.
We failed to create lvm on "suspended" thin volume "pve/data": (the command below fails)

```bash
lvcreate -V4G -T pve/data --name repaired_01
```

This command should succeed (creating a "non thin pool" thin volume)
created lvm successfully outside of the pve/data thin volume in the pve volume group:

```bash
lvcreate -an -Zn -L4G --name repaired_01 pve
```

Activate this volume (so you can find it in /dev/mapper/pve-repaired_01)
```bash
vgchange -ay pve
```

## 4. Dumping the repaired metadata using thin_dump -r (repair) -f xml (xml format) to dump reparied metadata to an xml file
```bash
thin_dump -r -f xml /dev/mapper/pve-data_tmeta > /root/tmeta.xml
```

## 5. Restore the repaired metadata onto the pve/repaired lvm from the xml dump using thin_restore
```bash
thin_restore -i /root/tmeta.xml -o /dev/mapper/pve-repaired_01
```

## 6. Perform the metadata swap
<https://www.redhat.com/archives/linux-lvm/2014-October/msg00032.html>
```bash
lvconvert --thinpool pve/data --poolmetadata /dev/mapper/pve-repaired_01
```

This command safely swaps out the metadata with the new repaird volume for the thin pool "pve/data" as specified by --thinpool pve/data
please note that the --thinpool does "NOT" refer to the metadata but the actual thin pool, in our case "pve/data"
the new metadata volume being /dev/mapper/pve-repaired_01

## 7. Reboot machine 
```bash
init 6
```
Worked for us, machine rebooted, boot log showed that the new metadata volume was now in use and all the thin volumes came online as expected

## Notes:
<https://www.redhat.com/archives/lvm-devel/2013-October/msg00050.html>
Changes were made to ensure that an active pool won't have it's metadata swapped out.
See pool_is_active, also "Cannot convert pool %s/%s with active thin volumes.".
So it's very important to de-activate the thin pool before doing anything with it's metadata.

<https://www.redhat.com/archives/linux-lvm/2016-February/msg00007.html>
we are aware of "lvconvert --repair" and that it performs some of this in a single step but there had been some blogs indicating that this corrupted their data.
See <https://unix.stackexchange.com/questions/351921/lvm-how-to-recover-lvm-thin-pool-volume-after-failed-repair>
that seemed way too risky so we opted to swap it out manually or with more emphasis on the details.
