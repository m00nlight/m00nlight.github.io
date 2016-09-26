---
layout: page
title: m00nlight's Adventures in Functional & Logical Programming
tagline: homepage
---
{% include JB/setup %}


<div class="posts">
  {% for post in site.posts %}
    <div class="post-entry">
      <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      <span class="date">{{ post.date | date_to_string }}</span>
      <p>
        {{ post.excerpt }}
        <a class="read-more" href="{{ BASE_PATH }}{{ post.url }}"
           style="font-size:11px">
          Read more &raquo;
        </a>
      </p>
    </div>
  {% endfor %}
</div>
