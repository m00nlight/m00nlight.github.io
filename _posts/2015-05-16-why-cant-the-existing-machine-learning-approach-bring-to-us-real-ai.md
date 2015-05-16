---
layout: post
title: "Why can't the existing machine learning approach bring to us real AI"
description: "My thought about artificial intelligence"
category: miscellaneous
tags: [machine learning, artificial intelligence, thought]
---
{% include JB/setup %}


The last week, I spent a lot of spare time on doing program challenge 
problem on [hackerrank][1], mainly focus on the artificial intelligence
(machine learning) domain. Although the process was quite interesting and
rewarding, it also strengthened my doubt about whether the current machine
learning approach will bring us true AI in the future.

Here are some reason why I am not optimistic about nowadays' machine learning
approach.

# Feature engineering is crucial in machine learning.

> Coming up with features is difficult, time-consuming, requires expert 
> knowledge. “Applied machine learning” is basically feature engineering.
> -- [Andrew Ng][7]

[Feature engineering][2] use the domain knowledge of the data by the 
programmer, it is actually *human intelligence*, not *artificial 
intelligence*.

In some problems on [hackerrank][1], some features would yield quite good
result while some other features may produce very poor result. And combine 
features sometimes will reduce accuracy of learning algorithm. So you can 
not rely on improving the algorithm performance by thinking more and more
features.

# Different learning algorithms have large gaps in result

Even with the same features, different machine learning algorithm can 
produce results which have huge difference. On one problem, only change
the classification algorithm will improve the accuracy around 20%.

Although we can use some automated method to do the algorithm selection 
of learning process, it is still some kind of *human intelligence* instead
of *artificial intelligence*.


# More data normally beats better algorithm

From [this blog post][3], the professor Anand Rajaraman showed some good 
example that by adding more independent data usually beats fine-tuning 
algorithm. 

In fact, high quality data is another key to successful learning algorithm.
Although we want to develop learning algorithm can learn pattern from the
data, but normally more data will speak for themselves.

# Will deep learning be a major breakthrough in AI?

Nowadays, [deep learning][4] is extremely hot. A lot of people seemed 
quite optimistic about that deep learning will lead us to true artificial
intelligence. 

Although I think in some sense, deep learning's distributed representation
and automatic feature learning are more useful than the traditional 
statistic learning approach. I still suspect whether it can bring us true
AI in the near future.

Though I believe that human's memory is in some distributed form, but 
I don't think it is of the style deep learning represent it. I don't 
believe that the human neuron **store the real value of something**, and
use some so complex algorithm like [gradient descent][5] to learn the 
representation of something.

# Conclusion

> Essential, all models are wrong, but some are useful -- [George Box][6]

I think we're still very far away from true artificial intelligence. Although
with more and more data and new methods like [deep learning][4] we can do a 
lot of things more useful using the machine learning approach, it is actually
 not true intelligence.

We have already experienced two fanaticism period of artificial intelligence
, one in 1960s and another 1980s. Now it is like the on going third one. 
But we should clearly recognize that we still know very little about 
what is intelligence of human and where it came from. Sometimes, the bigger
the expectation, the bigger disappointment.

I think machine learning can still do a lot of useful things for human. Just
do not get your hopes too high that machine learning can produce true AI 
in the near future. The world that robots rule the world will still in the
film longer than we think. :)

To bring us true artificial intelligence may require breakthroughs in 
different fields like neuroscience, philosophy, computer science etc. 
Even though someone may argue that the airplane is not like a bird, but 
it can fly, I want to remind them that the aerodynamics which make bird
and airplane flying is the same, and we human have already extensive 
knowledge about that. So it should be the same for artificial intelligence,
we can not expected too much when we actually know very little about the 
knowledge behind intelligence.



[1]: http://www.hackerrank.com
[2]: http://en.wikipedia.org/wiki/Feature_engineering
[3]: http://anand.typepad.com/datawocky/2008/03/more-data-usual.html
[4]: http://en.wikipedia.org/wiki/Deep_learning
[5]: http://en.wikipedia.org/wiki/Gradient_descent
[6]: http://en.wikipedia.org/wiki/George_E._P._Box
[7]: http://en.wikipedia.org/wiki/Andrew_Ng
