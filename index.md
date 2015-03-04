---
layout: page
title: Welcome to my blog
tagline: homepage
---
{% include JB/setup %}

Welcome to my blog. This blog is mainly used to record my learning and thought.

From the name of blog, maybe you can guess I am a fan of functional programming
languages. But I am not advocator of Lisp. In fact, I am interested in 
different programming paradises, like functional programming, logic 
programming, object-oriented programming, you name it. 


I am also inspired and interested by some non-mainstream topics in artificial
intelligence and math, like [sparse distributed memory][1] and [fractal][2].


I hope you will find my blog helpful :).

    
## Blog Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; 
<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


[1]: http://en.wikipedia.org/wiki/Sparse_distributed_memory
[2]: http://en.wikipedia.org/wiki/Fractal
