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

is_i_am_a_fan_of_declarative :-
    is_functional(A), i_like(A),
    is_logical(B), i_like(B).
%% => true

{% endhighlight %}