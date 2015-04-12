---
layout: post
title: "Hello JekyllBootstrap"
description: ""
category: blogging
tags: [blogging]
---
{% include JB/setup %}

Read Read [Jekyll Quick Start][3] for quickly set up a blog on github using
[jekyllbootstrap][1].

# JB made blogging simple

[Jekyll Bootstrap][1] made it much simple to build an modern style of blog
in several minitues. 

## Add math support to your blog.

First, make sure you [upgrade to the default markdown kramdown][2] of github
pages, then add the fowllowing to your jekyllbootstrap theme's `default.html` 
page in `_include/theme/YOUR_THEME` directory

{% highlight javascript %}
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/\
MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
{% endhighlight %}

Now you can use TeX syntax to type in math symbols in your blog. For example,
the following snippe of code will be rendered in TeX

{% highlight latex %}
$$\sum_{n=1}^\infty 1/n^2 = \frac{\pi^2}{6} $$
{% endhighlight %}

$$\sum_{n=1}^\infty 1/n^2 = \frac{\pi^2}{6} $$





[1]: http://jekyllboostrap.com
[2]: https://help.github.com/articles/migrating-your-pages-site-from-maruku/
[3]: http://jekyllbootstrap.com/usage/jekyll-quick-start.html