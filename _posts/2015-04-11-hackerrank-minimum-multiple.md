---
layout: post
title: "HackerRank Minimum Multiple"
description: "Haskell implementation of segment tree structure"
category: functional programming
tags: [functional programming, algorithm, data structure]
---
{% include JB/setup %}


# HackerRank Minimum Multiple

## Problem statment

The origin statment of the problem can be found [here][5].

In short, this problem ask you to do two operations on an array, one is to 
query the [least common multipler(lcm)][1] of an range [l, r], and another is 
to update one value of the array. 


Since the maximum length of the array is $$ 5 \times 10^4 $$, an naive 
$$ O(n^2) $$ algorithm will definitively not acceptable. So we need to find
more efficient way to do the query and update operations.

## Segment Tree

The solution is to use a structure called [segment tree][2] to make the query
and update operations run in $$ O(log{n}) $$ time complexity.

[Segment tree][2] is often used in scenario of efficient range query and 
update. The following is an example of segment tree. 

![segment tree instance](http://goo.gl/nZuxFi)

In [segment tree][2], all the leaf nodes store the information of the segment
value, and the internal node store the result of a range `[l, r]`. 

The pseudo codes of query and update are:

{% highlight text %}
function query(f, l, r, root):
	if l <= root.left and root.right <= r:
		return root.val
	else if r <= root.leftChild.right:
		return query(f, l, r, root.leftChild)
	else if l >= root.rightChild.left:
		return query(f, l, r, root.rightChild)
	else:
		return f(query(f, l, r, root.leftChild),
			query(f, l, r, root.rightChild))

function update(f, idx, newVal, root):
	if idx <= root.left and root.right <= idx:
		root.val = newVal
	else if idx <= root.leftChild.right:
		root.val = f(newVal, root.val)
		update(f, idx, newVal, root.leftChild)
	else:
		root.val = f(newVal, root.val)
		update(f, idx, newVal, root.rightChild)

{% endhighlight %}

At first glance, the running time of `query` is not explicit $$ O(log{n}) $$. 
But you can find the proof from the [stackoverflow answer][3], which shows 
that the running time of the `query` function is actually $$ O(log{n}) $$.


## Solution

Then the solution is trival. We use an segment tree to store the lcm 
information. The node cover range `[l, r]` is the lcm of the elements in 
`array[l..r]`. So both the update and query operator can be done in $$ 
O(log{n}) $$.

The following is a [least common multiple][1] segment tree example.

![lcm-segment-tree]({{site.url}}/assets/images/lcm-segtree.svg)

The circle nodes are leaf nodes and store the numbers in the array, and the 
rectangle nodes store range lcm information as described in the brackets in
the node.

Here is the haskell code of the [segment tree][2] structure

{% highlight haskell %}
data SegTree =
    Node {
      val                   :: Integer
    , left, right           :: Int
    , leftChild, rightChild :: SegTree
    } |
    Leaf {
      val         :: Integer
    , left, right :: Int
    }

initSegTree :: Int -> SegTree
initSegTree n = aux 0 (n - 1)
    where aux l r
              | l == r = Leaf {val = -1, left = l, right = r}
              | otherwise =
                  let mid = (l + r) `div` 2
                  in Node { val = -1, left = l, right = r
                          , leftChild = aux l mid
                          , rightChild = aux (succ mid) r
                          }


query :: (Int, Int) -> SegTree -> Integer
query range@(l, r) root
    | r < left root = 1
    | l > right root = 1
    | l <= left root && right root <= r = val root
    | otherwise =
        lcm (query range (leftChild root)) (query range (rightChild root))


update :: Int -> Integer -> SegTree -> SegTree
update idx newVal root
    | left root <= idx && idx <= right root =
      case root of
        Leaf {} -> root {val = newVal }
        _ -> root {val = lcm newVal (val root),
                 leftChild = lChild, rightChild = rChild }
    | otherwise = root
    where
      lChild = update idx newVal $ leftChild root
      rChild = update idx newVal $ rightChild root
{% endhighlight %}

In fact, since [haskell][4] is an pure functional languages, it should
be a little trival to do programming related with states in it. But since
the character of programming contests problems. We do not need to use 
state manipulation in [haskell][4] to get the problem accept, we can just
use purely functional style to do the `query` and `update` operators using 
`fold` in [haskell][4].

The following code is related with solving the problem.

{% highlight haskell %}
processQueries
  :: [(Char, Int, Int)] -> SegTree -> [Integer] -> [Integer]
processQueries [] _ acc = reverse acc
processQueries (('Q', l, r):q) root acc =
    let ans = (query (l, r) root) `mod` modulo
    in processQueries q root (ans : acc)
processQueries ((_, idx, value):q) root acc =
    let oldVal = query (idx, idx) root
        newVal = oldVal * (fromIntegral value)
        nroot = update idx newVal root
    in processQueries q nroot acc

solve :: Int -> [Integer] -> [(Char, Int, Int)] -> [Integer]
solve n arr queries = processQueries queries tree []
    where
      tree = foldl' (\ root (idx, v) -> update idx v root)
             (initSegTree n)
             (zip [0..] arr)
{% endhighlight %}

The only thing one should notice is that the depth limit of stack on 
[HackerRank][6] is quite small. So we need to avoid too deep recursive
call, and use the strick version of `foldl'` call  in the `solve` function, 
and also avoid explicit recursive call in `processQueries`, but to optimize
the function as an [tail recursive call][7].

The full code can be found [here][8].


[1]: http://en.wikipedia.org/wiki/Least_common_multiple
[2]: http://en.wikipedia.org/wiki/Segment_tree
[3]: http://goo.gl/mM3Pyp
[4]: https://www.haskell.org/
[5]: https://www.hackerrank.com/challenges/minimum-multiple
[6]: https://www.hackerrank.com/
[7]: http://en.wikipedia.org/wiki/Tail_call
[8]: http://goo.gl/MmW19X
