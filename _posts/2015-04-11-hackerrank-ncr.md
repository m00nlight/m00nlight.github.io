---
layout: post
title: "Hackerrank nCr"
description: ""
category: algorithm
tags: [algorithm, hackerrank, number theory]
---
{% include JB/setup %}

# nCr

## Problem

The problem can be found [here][5]. The statement of this problem is extremely
simple, in short, you need to calculate the $$ {n \choose r} \bmod M $$ 
where M is 142857.


## Lucas Theorem

If 142857 is a prime number, then we can just use the [Lucas theorem][1]
to solve it. However, $$ 142857 =  3^3 \times 11 \times 13 \times 37 $$, 
that is why the problem is marked as an expert level problem in hackerrank.


The core idea of using [Lucas theorem][1] to calculate $$ {n \choose r} 
\bmod P $$ where P is a prime number is to represent $$ n! $$ as $$ a 
\times P^e $$ where a is relative prime to P. To calculate the representation
of $$ n! $$, we can group $$ 1 \times 2 \times \cdots \times n $$ of P 
elements each, so it can be expressed as $$ (1 \times 2 \cdots \times (P -1))
\times P \times ((P+1) $$ $$ \times $$ $$ (P+2) \cdots \times (2P - 1)) \times
$$ $$ 2P \cdots $$, so that $$ 1 \times 2 \times \cdots \times (P - 1) $$ is 
relative prime to P, and each group mod P is of the same result.

And then use [Wilson theorem][1] which said that $$ (P - 1)! \equiv -1 
(\bmod P) $$. We can finally get the solution to calculate $$ n! = a \times 
P^e $$. The python code as follow:

{% highlight python %}
def fact_mod(n, p, facts):
    """
    Type :: (Int, Int, [Int]) -> (Int, Int)
    Suppose n! = a * p^e (mod p), then the function return (a mod p, e)
    facts is i!(mod p) for 0 <= i < p, use Lucas theory

    >>> facts = gen_fact_mod_prime(7)
    >>> fact_mod(5, 7, facts)
    (1, 0)

    >>> fact_mod(15, 7, facts)
    (2, 2)
    """
    if (n == 0): return (1, 0)
    (a, e) = fact_mod(n // p, p, facts)
    e += n // p

    if (n // p % 2 != 0): return (a * (p - facts[n % p]) % p, e)
    return (a * facts[n % p] % p, e)
{% endhighlight %}

Notice the tricky in the last two line of the above code. Since $$ (P - 1)! =
1 (\bmod P) $$, so if the number of group is even, then the result is just 
`facts[n % p] % p`, otherwise is `-facts[n % p] % p`, which is equivelent to 
`(p - facts[n % p]) % p`. 

And then we can express $$ {n \choose r} = {n! \over {r! \times (n - r)!}}$$, 
calculate $$ n! = a_1 \times P^{e_1} $$, $$ k! = a_2 \times P^{e_2} $$ and
$$ (n - k)! = a_3 \times P^{e_3} $$. Then if $$ e_1 > e_2 + e_3 $$, $$ {n 
\choose k} $$ must be zero mod P, otherwise, the result should be `a1 * modinv
(a2 * a3, P)` where `modinv` is the modulo inverse function.

{% highlight python %}
def comb_mod(n, k, p):
    """
    Type :: (Int, Int, Int) -> Int
    Return C(n, k) mod p, p is a prime number.

    >>> comb_mod(5, 3, 7)
    3

    >>> comb_mod(6, 2, 7)
    1
    """

    if n < 0 or k < 0 or n < k: return 0
    facts = gen_fact_mod_prime(p)
    a1, e1 = fact_mod(n, p, facts)
    a2, e2 = fact_mod(k, p, facts)
    a3, e3 = fact_mod(n - k, p, facts)
    if (e1 > e2 + e3):
        return 0
    else:
        return a1 * modinv(a2 * a3 % p, p) % p
{% endhighlight %}


## Generalize to this Problem

We can use very similar idea to calculate $$ n! \bmod P^a $$ for $$a\ge1$$. Let
$$ b = max \{i | n! \bmod P^i == 0, i \in \mathcal{N} \}  $$, then we need 
to calculate largest divisors of $$ n! $$ relative prime to $$ P^a $$.

This time we group $$ 1 \times 2 \cdots \times n $$ into group each has $$P^a$$
items. We first pre calculate the array `facts[0..P^a]`, `facts[i]` is the 
largest divisors of $$ i! $$ relative prime to $$ P^a $$ mod $$ P^a $$. Then 
we can use the same strategy when calculate $$ n! \bmod P^a $$. 

{% highlight python %}
def comb_mod2(n, r, m, pa, facts1):
    """
    Type :: (Int, Int, Int) -> Int
    m is of form p^a, and n is very large
    """
    p, a = pa

    def n_fact_fact(n):
        if n is 0 or n is 1:
            return 1
        elif n < m:
            return facts1[n] * n_fact_fact(n // p) % m
        else:
            a = facts1[m - 1]
            b = facts1[n % m]
            c = n_fact_fact(n // p)
            # print 'n = %d a = %d b = %d c = %d' % (n, a, b, c)
            return pow(a, n // m, m) * b * c % m

    def get_power(n, p):
        ret = 0
        while n > 0:
            ret += n // p
            n //= p
        return ret
    b = get_power(n, p) - get_power(r, p) - get_power(n - r, p)

    if b >= a: return 0

    m1 = n_fact_fact(n)
    m2 = n_fact_fact(r)
    m3 = n_fact_fact(n - r)

    return (p ** b) * m1 * modinv_table[(m2, m)] * modinv_table[(m3, m)] % m
{% endhighlight %}

The above code is just to calculate $$ {n \choose r} \bmod P^a $$. The
function `n_fact_fact` is just to calculate the largest divisor of $$ n! $$ 
mod $$ P^a $$ which is relative to $$ P^a $$. And `get_power` is to get the
largest number of b such that $$ {n \choose r} \equiv 0 (\bmod P^b) $$.

Finally, we can use [Chinese Remainder Theorem][3] to solve the problem. 
Since $$ 142857 =  3^3 \times 11 \times 13 \times 37 $$, we can calculate 
$$ {n \choose r} \bmod 3^3 $$, $$ {n \choose r} \bmod 11 $$, $$ {n \choose r} 
\bmod 13 $$ and $$ {n \choose r} \bmod 37 $$, and the modulo numbers are 
relative prime to each other, so we can use it to finally get the answer.


You can find the whole solution in C++ and Python [here][4].

[1]: http://en.wikipedia.org/wiki/Lucas%27_theorem
[2]: http://en.wikipedia.org/wiki/Wilson%27s_theorem
[3]: http://en.wikipedia.org/wiki/Chinese_remainder_theorem
[4]: http://goo.gl/XBrhTM
[5]: https://www.hackerrank.com/challenges/ncr
