---
layout: post
title: Debug Jekyll Themes
slug: debug-jekyll-themes
# date element overrides date in title format.
date: 2017-06-15
tag:
  - jekyll
  - lanyon-plus
---

[Jekyll](http://jekyllrb.com) is a static site generator, an open-source tool for creating simple yet powerful websites of all shapes and sizes. From [the project's readme](https://github.com/mojombo/jekyll/blob/master/README.markdown):

<!--more-->

<https://webdesign.tutsplus.com/tutorials/how-to-create-and-publish-a-jekyll-theme-gem--cms-27475>

## How to debug the lanyon-plus theme

```bash
apt-get install ruby
gem install jekyll
gem install bundler

wget https://github.com/dyndna/lanyon-plus/archive/v1.1.0.tar.gz
tar -xzvf v1.1.0.tar.gz

cd v1.1.0.tar.gz/

vi .gemspec
#---.gemspec
source "https://rubygems.org"
gemspec
#---

rm .Gemfile.lock
bundle install
bundle exec jekyll serve --incremental

vi _config.yml
#---_config.yml
baseurl=""
#---
```

## browse to http://localhost:4000/
