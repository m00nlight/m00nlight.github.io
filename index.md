---
layout: page
title: m00nlight's Adventures in Functional & Logical Programming
tagline: homepage
---
{% include JB/setup %}

    
## Blog Posts

<ul class="posts">
  {% for post in site.posts %}
    <li> 
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      <span style="float:right">{{ post.date | date_to_string }}</span> 
      <p>
        {{ post.excerpt }} 
        <a href="{{ BASE_PATH }}{{ post.url }}"> Read more &raquo;</a>
      </p>
    </li>
  {% endfor %}
</ul>


[1]: http://en.wikipedia.org/wiki/Sparse_distributed_memory
[2]: http://en.wikipedia.org/wiki/Fractal
