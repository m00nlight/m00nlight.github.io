---
layout: page
title: "About me"
description: ""
---
{% include JB/setup %}


# My interests

{% highlight prolog %}
is_functional(X) :-
    member(X, [scheme, racket, sml, haskell, scala, erlang, common_lisp,
	       scala, mathematica, fsharp, mozart_oz, r, elisp]).

is_logical(X) :-
    member(X, [prolog, mini_karen, coq]).

is_oop(X) :-
    member(X, [ruby, python, scala, java, cplusplus, effiel]).

i_learned(X) :-
    member(X, [racket, sml, mathematica, fsharp, haskell, scala, common_lisp,
	       mozart_oz, latex, chaos, fractal, complexity_system, analytics,
	       algorithm, machine_learning, prolog]).

i_like(X) :-
    member(X, [scheme,racket, sml, mathematica, haskell, fsharp, mozart_oz,
	       chaos, fractal, prolog, algorithm, competitive_programming,
	       complexity_system,cellular_automata, swimming, music, 
	       mini_karen, esperanto, japanese, sparsed_distributed_memory]).

am_i_a_fan_of_declarative_programming :-
    is_functional(A), i_like(A), i_learned(A),
    is_logical(B), i_like(B), i_learned(B).
%% => true

{% endhighlight %}

# My network

## Social network
+ twitter: [@m00nlight223](http://www.twitter.com/m00nlight223)
+ facebook: [Yushi Wang](https://www.facebook.com/profile.php?id=100010294243968)
+ linkedin: [Yushi Wang](https://www.linkedin.com/in/m00nlight)
+ IRC : m00nlight in various IRC chanels

## Question Answering Site
+ quora : [Yushi Wang](https://www.quora.com/Yushi-Wang-1)
+ stackoverflow : [m00nlight](http://mathematica.stackexchange.com/users/22269/m00nlight)


## Coding
+ github : [m00nlight](https://github.com/m00nlight)
+ bitbucket : [m00nlight](https://bitbucket.org/m00nlight/)

## Competitive Programming
+ hackerrank : [m00nlight](https://www.hackerrank.com/m00nlight)
+ kaggle : [m00nlight](https://www.kaggle.com/m00nlight)
