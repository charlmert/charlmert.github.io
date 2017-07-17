---
layout: post
title: "Replace Block of Text in Files"
slug: "replace-block-of-text-in-files"
description: "Replace block of text in files without complicated multiline regex"
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
Get the utility here
<https://github.com/charljmert/replace_block>

e.g. to remove the following lines from a file:

file1.php

```php
    echo "code before";

    for ($i = 0; ($i < 10); $i++) {
        echo "this code is everywhere. I want to remove all of it from the code base";
    }

    echo "code after";
```

### You want to end up with
file1.php

```php
    echo "code before";
    echo "code after";
```

<!--more-->

### 1. Create a file called code.txt and place the following in it

Note the empty lines just before and after the "for" and closing "}".
These lines will be removed as well.

code.txt

```php

    for ($i = 0; ($i < 10); $i++) {
        echo "this code is everywhere. I want to remove all of it from the code base";
    }

```

### 2. Run the following command on file1.php

```bash
# Replace only from file1.php
./replace_block.pl code.txt ./ --search "file1.php"

# Perform block replace on all php files in "/home/user/directory" recursively.
./replace_block.pl code.txt /home/user/directory --search "*.php"

# If you want to convert your code.txt to regex and save it to a regex file
./replace_block.pl code.txt --convert > code_regex.txt

# You can then use the above code_regex.txt directly using --raw-regex
./replace_block.pl code.txt /home/user/directory --search "*.php" --raw-regex

# You can also edit the code_regex.txt file to make your pattern more flexible
vim code_regex.txt
```

### You will end up with
file1.php

```php
    echo "code before";
    echo "code after";
```
