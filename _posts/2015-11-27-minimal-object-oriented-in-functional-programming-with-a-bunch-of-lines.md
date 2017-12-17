---
layout: post
title: "Minimal object oriented in functional programming with a bunch of lines"
description: ""
category: functional programming
tags: [functional programming, object-oriented, programming languages]
excerpt: A lot of programmers with object-oriented background do not understand
         that object-oriented and higher-order function are closely related. In
         this post, I will show that with the power of higher-order function 
         and closure, how can we implement the core concepts of object-oriented
         in less than 100 lines of code
---
{% include JB/setup %}

When I skimmed through the questions on [Quora][1], there are plenty of 
questions about the comparison of object-oriented programming and functional
programming. See [resources section](#resources) for details. And a 
lot of programmers with different background seems do not understand that 
object-oriented and higher-order function are closely related.

This post is just an attempt to show the internal relation of object-oriented
and functional programming. Though a step by step code abstraction, how can 
we implement the core concepts in OO within 50 lines of code in a functional
languages(Racket here).

# Object-oriented programming 101

Since the population of object-oriented programmings of the last decade, I 
think most programmer will more or less know some OO concepts. Here I just 
list some basic concept of OO for a quick review.

In an purely OO languages(like Ruby and Smalltalk), everything is in terms
as follow:

+ All values(the result of evaluating expression) are references to _objects_
+ Given an object, code "communiates with it" by calling its method(message 
  passing).
+ Each object has its own private state. Only the object's methods can directly
  access or update this state(Encapsulation).
+ Every object is an instance of a _class_
+ An object's class determins the object's behavior. The class contains method
  definitions that dictate how an object handles method calls it receives.
+ [Inheritance][3] is maily for code reuse and independent extension of the 
  system.

So the definitions of _classes_  are just like contracts of the different 
categories of objects, when the system is running, there are only objects, 
no classes at all. We can send objects messages, and the objects may change 
its internal states thought method calls. 

# Functional programming 101

The definitions of functional programming vary from first class function 
(even C++11) to purely functional languages like Haskell. 

Since this is not a post talking about functional programming, we only 
use the [less-strick version][2], which means:

+ Function as first class citizen, which means functions can be passed 
  as argument, be returned as result and can be stored(Sometimes refered
  as higher-order function). They are just as normal variables in imperative
  languages
+ Referential transparency, which means give a function the same argument
  it will return the same result(Pure function).
  
This post will show how can one only use higher-order functions and mutalbe 
state to implement the core concept of OO in Scheme/Racket.


# Step by step examples to implement OO concepts

## OO with explict send interface

The first step is to use higher order functions as methods in an object and
store the variables of object in a mutable association lists as the following
code.

```racket
#lang racket

(struct object (vars methods))

(define (assoc-m name xs)
  (cond [(null? xs) #f]
        [(equal? name (mcar (car xs))) (car xs)]
        [else (assoc-m name (cdr xs))]))

(define (get obj field)
  (let ([ptr (assoc-m field (object-vars obj))])
    (if (false? ptr)
        (error "access non exsiting field:" field)
        (mcdr ptr))))

(define (set obj field new-val)
  (let ([ptr (assoc-m field (object-vars obj))])
    (if (false? ptr)
        (error "set non exsiting field:" field)
        (set-mcdr! ptr new-val))))

(define (send obj msg . args)
  (let ([ptr (assoc msg (object-methods obj))])
    (if (false? ptr)
        (error "method not found:" msg)
        ((cdr ptr) obj args))))

;; make one point object
(define p1
  (object (list (mcons 'x 0)
                (mcons 'y 0))
          (list (cons 'get-x (lambda (self args) (get self 'x)))
                (cons 'get-y (lambda (self args) (get self 'y)))
                (cons 'set-x (lambda (self args) (set self 'x (car args))))
                (cons 'set-y (lambda (self args) (set self 'y (car args))))
                (cons 'dist-to-origin
                      (lambda (self args)
                        (let ([x (send self 'get-x args)]
                              [y (send self 'get-y args)])
                          (sqrt (+ (* x x) (* y y)))))))))
```

In the above code, every object is a structure with two fields, `vars` is to 
use to store the variables of a object and `methods` is used to store methods
of the object. The `vars` is a list of mutable cons cells since we need to 
update the value of object, and `methods` is a list of cons cell, because 
objects' functions will not change overtime.

Then we define helper function `assoc-m` which when gived a field name, will
return the mutable cons cell in the list. The `get` and `set` functions are 
just like `get` and `set` method in a OO languages, herein they are just helper
function for every objects. 

Finally we can define a `send` function which send the object a message. We
predefined an object `p1` for test purpose. We can use `p1` like as follows

```racket
> (send p1 'set-x 3)
> (send p1 'set-y 4)
> (send p1 'get-x)
3
> (send p1 'dist-to-origin)
5
```

## Transform to more OO like style using closure and dispatch

The above code actually isn't like an OO languages because the weird `send`
syntax, and normal OO language usually use `obj.method` style of code to 
do message call. We can transform the above code to "more OO like" using 
[closure][4] and dispatch. 

For readers who are not familiar with [closure][4], I will explain a lit 
bit about [closure][4] here. In short, [closure][4] is just a pair which
store a) the function definition and b) the substitution environment when
the function is defined. It is used to implement [lexical scope][5], which
maybe is one of the most important inventions in programming languages. 

With [lexical scope][5], we can verify the correctness of program by 
reading the program instead of debuging it and see the variable after 
each step. For a detailed discussion of closure, I recommend to read 
the book [Let over lambda][6]. 

We can change the `p1` definition to the following style. 

```racket
(define ptx
  (let ([obj (object
              (list (mcons 'x 0)
                    (mcons 'y 0))
              (list (cons 'get-x (lambda (self args) (get self 'x)))
                    (cons 'get-y (lambda (self args) (get self 'y)))
                    (cons 'set-x (lambda (self args) (set self 'x (car args))))
                    (cons 'set-y (lambda (self args) (set self 'y (car args))))
                    (cons 'dist-to-origin
                          (lambda (self args)
                            (let ([x (send self 'get-x args)]
                                  [y (send self 'get-y args)])
                              (sqrt (+ (* x x) (* y y))))))))])
    (lambda (method . args)
      (cond [(equal? method 'get-x) (send obj 'get-x args)]
            [(equal? method 'get-y) (send obj 'get-y args)]
            [(equal? method 'set-x) (send obj 'set-x args)]
            [(equal? method 'set-y) (send obj 'set-y args)]
            [(equal? method 'dist-to-origin) (send obj 'dist-to-origin args)]
            [else (error "undefined method for object ~a" method)]))))
```

We can see from the above code, now the object is stored in a `let` binding, 
and we make `ptx` a function and dispatch different methods to the proper 
`send` operation on the `obj` object. 

Then we can now call the object using the following syntax. 

```racket
> (ptx 'get-x)
0
> (ptx 'set-x 3)
> (ptx 'set-y 4)
> (ptx 'get-x)
3
> (ptx 'dist-to-origin)
5
```

## Add initialization function

The above code still have one serious problems. If I want to produce many
objects, we should copy and paste the body of `ptx` many times. It is totally
a disaster, since we are lazy and believe the DRY(don't repeat yourself)
principle. 

We can abstract the creation of object as something like `initialize` method
in ruby or `__init__` in python. The following are the code.

```racket
(define (new-point [x 0] [y 0])
  (let ([obj (object
              (list (mcons 'x x)
                    (mcons 'y y))
              (list (cons 'get-x (lambda (self args) (get self 'x)))
                    (cons 'get-y (lambda (self args) (get self 'y)))
                    (cons 'set-x (lambda (self args) (set self 'x (car args))))
                    (cons 'set-y (lambda (self args) (set self 'y (car args))))
                    (cons 'dist-to-origin
                          (lambda (self args)
                            (let ([x (send self 'get-x args)]
                                  [y (send self 'get-y args)])
                              (sqrt (+ (* x x) (* y y))))))))])
    (lambda (method . args)
      (cond [(equal? method 'get-x) (send obj 'get-x args)]
            [(equal? method 'get-y) (send obj 'get-y args)]
            [(equal? method 'set-x) (send obj 'set-x args)]
            [(equal? method 'set-y) (send obj 'set-y args)]
            [(equal? method 'dist-to-origin) (send obj 'dist-to-origin args)]
            [else (error "undefined method for object:" method)]))))
```

Now we can use `new-point` to create as many as points as I like. It is the 
same as `new` objects in Ruby or Python. 

```racket
> (define p1 (new-point 3 4))
> (define p2 (new-point 5 12))
> (p1 'get-x)
3
> (p2 'get-x)
5
> (p1 'dist-to-origin)
5
> (p2 'dist-to-origin)
13
```

## A simple attempt to implement inheritance

We still lack one important concept in object-oriented programming:
**inheritance**. A simple approach to handle this is just to add another 
filed in the object structure, which indicate the inheritance relation 
of the current object. If the object does not inherit from anything, 
just give it a default value `false`.  

We need to modify the `send` function accordingly, since now if we can 
not find the proper method to execute, it may be contained in the ancestors'
objects, we need to find them on the chains to the root. The changed code 
is here. 

```racket
(struct object (vars methods father))

(define (send obj msg args)
  (let ([ptr (assoc msg (object-methods obj))])
    (if ptr
        ((cdr ptr) obj args)
        (apply (object-father obj) msg args))))

(define (new-point [x 0] [y 0])
  (let ([obj (object
              (list (mcons 'x x)
                    (mcons 'y y))
              (list (cons 'get-x (lambda (self args) (get self 'x)))
                    (cons 'get-y (lambda (self args) (get self 'y)))
                    (cons 'set-x (lambda (self args) (set self 'x (car args))))
                    (cons 'set-y (lambda (self args) (set self 'y (car args))))
                    (cons 'dist-to-origin
                          (lambda (self args)
                            (let ([x (send self 'get-x args)]
                                  [y (send self 'get-y args)])
                              (sqrt (+ (* x x) (* y y)))))))
              #f)])
    (lambda (method . args)
      (cond [(equal? method 'get-x) (send obj 'get-x args)]
            [(equal? method 'get-y) (send obj 'get-y args)]
            [(equal? method 'set-x) (send obj 'set-x args)]
            [(equal? method 'set-y) (send obj 'set-y args)]
            [(equal? method 'dist-to-origin) (send obj 'dist-to-origin args)]
            [else (error "undefined method for object" method)]))))

(define (new-point-3d [x 0] [y 0] [z 0])
  (let ([obj (object
              (list (mcons 'z z))
              (list (cons 'get-z (lambda (self args) (get self 'z)))
                    (cons 'set-z (lambda (self args) (set self 'z (car args))))
                    (cons 'dist-to-origin
                          (lambda (self args)
                            (let ([x (send self 'get-x args)]
                                  [y (send self 'get-y args)]
                                  [z (send self 'get-z args)])
                              (sqrt (+ (* x x) (* y y) (* z z)))))))
              ;; father object of this object
              (new-point x y))])
    (lambda (method . args)
      (cond [(equal? method 'get-x) (send obj 'get-x args)]
            [(equal? method 'get-y) (send obj 'get-y args)]
            [(equal? method 'get-z) (send obj 'get-z args)]
            [(equal? method 'set-x) (send obj 'set-x args)]
            [(equal? method 'set-y) (send obj 'set-y args)]
            [(equal? method 'set-z) (send obj 'set-z args)]
            [(equal? method 'dist-to-origin) (send obj 'dist-to-origin args)]
            [else (error "unknow method call" method)]))))
```

Now we can create two init function, one for `point` and another for 
`point-3d`. The `point-3d` inherit from the `point` class. We can see 
it from the code. And the `dist-to-origin` procedure is something like 
overwritten method in OO languages. 

```racket
> (define p3d (new-point-3d 2 2 2))
> (p3d 'get-x)
2
> (p3d 'get-y)
2
> (p3d 'dist-to-origin)
3.4641016151377544
> (sqrt (+ 4 4 4))
3.4641016151377544
```

Now the only thing we lack is some syntax sugar to change the domain specific 
OO language to a more familiar OO style like(Ruby code):

```ruby
# encocing: utf-8

class Point

  def initialize(x, y)
    @x = x
    @y = y
  end

  def get_x
    @x
  end

  def get_y
    @y
  end

  def set_x(x)
    @x = x
  end

  def set_y(y)
    @y = y
  end

  def dist_to_origin
    Math.sqrt(@x * @x + @y * @y)
  end
end


ptx = Point.new(3, 4)
puts ptx.dist_to_origin
```

But it is not so important since they're just syntax differences on the 
surface.

# Conclusion

With the above step by step transformation, we can draw the conclusion that 
with the power of higher-order function and closure, we can easily implement
core concepts of OO in functional programming languages with support for 
mutable state. OO is just a natural extension of functional programming with
higher-order function and explicit states. The essential code is less than 
50 lines(excluding the `new` init function). You can find the complete code 
with comments from repository [m00nlight/oo-in-fp][7].


# Resources

+ [Can you explain to a beginner what object-oriented programming is?](https://www.quora.com/Can-you-explain-to-a-beginner-what-object-oriented-programming-is/answer/Yushi-Wang-1)
+ [What does object-oriented programming do better than functional programming](https://www.quora.com/What-does-object-oriented-programming-do-better-than-functional-programming-and-why-is-it-the-most-popular-paradigm-when-everybody-seems-to-say-functional-programming-is-superior)
+ [What are the advantages of Functional Programming over Object-Oriented Programming?](https://www.quora.com/What-are-the-advantages-of-Functional-Programming-over-Object-Oriented-Programming)
+ [What are the differences between OOP programming and functional programming?](https://www.quora.com/What-are-the-differences-between-OOP-programming-and-functional-programming)
+ [Programming languages MOOC on Coursera](https://www.coursera.org/course/proglang)
+ [Paradigms of Computer Programming on Edx](https://courses.edx.org/courses/course-v1:LouvainX+Louv1.2x+4T2015/info)
+ [Concepts, Techniques, and Models of Computer Programming](http://www.amazon.com/Concepts-Techniques-Models-Computer-Programming/dp/0262220695/ref=sr_1_1?ie=UTF8&qid=1448632584&sr=8-1&keywords=concept+techniques+programming+languages)

[1]: http://www.quora.com
[2]: https://wiki.haskell.org/Functional_programming
[3]: https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)
[4]: https://en.wikipedia.org/wiki/Closure_(computer_programming)
[5]: https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping
[6]: http://www.amazon.com/Let-Over-Lambda-Doug-Hoyte/dp/1435712757
[7]: https://github.com/m00nlight/miscellaneous-code/tree/master/oo-in-fp
