---
layout: post
title: "Automatic dataset preliminary analysis in Mathematica"
description: "An automatic dataset analysis tool"
category: mathematica
tags: [mathematica, dataset, tool]
excerpt: This post shows a tool built in Mathematica that can do
         automatic preliminary dataset analysis, and can help me
         to dig into the valuable part in the dataset which may 
         need further analyzing.
---
{% include JB/setup %}

Nowadays, we live in an era of information explosion. And from time
to time, we may need to do some some analysis of these data. Luckily,
we have tools like [Tableau][1] or [Qlik][2] for analyzing and visualizing
these data, but still it is time consuming and even tedious to dig
into the dataset to find out what is worth showing in the visualization.

Be a programmer, I'd like to automate as much as I can in any task(or
in other words I am lazy). So I decide to automate this process, thus
I build a dataset automatic preliminary analysis tool to help me explore
dataset.

Here are some screenshots:

![Abalone dataset]({{site.url}}/assets/images/abalone_dataset_record.gif)

The dataset can be find [here][3]. The tool can basic numerical, category,
correlation visualization, and it can also do cluster analysis in two and
three dimensional space as show in the screenshot.

But it can also do analysis on time series data, as show in the following
screenshots.

![FBI criminal 1994-2013]({{site.url}}/assets/images/FBI_criminal_1994_2013.gif)

![Monthly food price]({{site.url}}/assets/images/Monthly_food_price.gif)

From these visualization, we can see that since 1994, all type of criminals
in US steadily drop. While in the food price example, although generally
it seems that all price has a quite high positive correlation, but in some
specific time period, some price may have different trends, like in the early
90s, the meat price drop significantly while the oil price increase, same for
meat price and sugar price from 1993 to 1995. 

Not only that, it also support geographic entities like cities, countries etc.
For example, the following image show the analysis of cities with more than
500,000 people in US, and do a plot on the map.

![FBI criminal 2013 top cities]({{site.url}}/assets/images/FBI_criminal_top_cities.gif).

It is very clear from the visualization that the mid north part of US has a
a much higher rate of murder like criminal, while the south east part of US
like California has much higher rate of motor vehicle theft.

[1]: https://www.tableau.com
[2]: https://www.qlik.com/us/
[3]: https://archive.ics.uci.edu/ml/datasets/abalone