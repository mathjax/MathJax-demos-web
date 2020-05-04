# [toggle-steps.html](https://mathjax.github.io/MathJax-demos-web/toggle-steps.html)

This example shows how to use the `\toggle` macro (which produce MathML `<maction>` elements) to display an equation that reveals the steps in a computation one step at a time.  This is similar to the [reveal-steps.html](reveal-steps.html) example, but this one does not require any javascript.

The expression is given in TeX as

``` latex
$$
\require{action}
\def\longest{x(x+1) + 1(x+1)}
\def\click{\rlap{\enclose{roundedbox}{\small\text{next step}}}\hphantom{\longest}}
\def\={\phantom{ {}={} }}
(x+1)^2
\toggle
  {\begin{aligned}[t]& = \click\end{aligned}}
  {\begin{aligned}[t]& = (x+1)(x+1)\\[3px]&\=\click\end{aligned}}
  {\begin{aligned}[t]& = (x+1)(x+1)\\[3px]& = x(x+1) + 1(x+1)\\&\=\click\end{aligned}}
  {\begin{aligned}[t]& = (x+1)(x+1)\\[3px]& = x(x+1) + 1(x+1)\\[3px]& = (x^2+x) + (x+1)\\[3px]&\=\click\end{aligned}}
  {\begin{aligned}[t]& = (x+1)(x+1)\\[3px]& = x(x+1) + 1(x+1)\\[3px]& = (x^2+x) + (x+1)\\[3px]& = x^2 + (x + x) + 1\\[3px]&\=\click\end{aligned}}
  {\begin{aligned}[t]& = (x+1)(x+1)\\[3px]& = x(x+1) + 1(x+1)\\[3px]& = (x^2+x) + (x+1)\\[3px]& = x^2 + (x + x) + 1\\[3px]& = x^2 + 2x + 1\end{aligned}}
\endtoggle
$$
```

which is a sequence of expressions that each has one more line of the expansion than the previous version, enclosed in a `\toggle` so that clicking on the math will cycle through the expressions one after the other.  It also defines a `\click` macro to introduce the button for moving to the next step (though the user can actually click anywhere on the expression to do that).  Some effort is made to ensure that the expressions all have the same width (using `\rlap` and `\hphantom`), so that the previously displayed expressions don't move around as new lines are revealed.

[Run the example](https://mathjax.github.io/MathJax-demos-web/toggle-steps.html)
