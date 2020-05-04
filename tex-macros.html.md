# [tex-macros.html](https://mathjax.github.io/MathJax-demos-web/tex-macros.html)

This example shows how to predefine TeX macros for use in a web page in two different ways:  either using the MathJax configuration to define them, or by embedding them in a hidden math expression.

The key lines are

``` html
  <script>
  MathJax = {
    tex: {
      macros: {
        RR: '{\\bf R}',                    // a simple string replacement
        bold: ['\\boldsymbol{#1}',1] ,     // this macro has one parameter
        ddx: ['\\frac{d#2}{d#1}', 2, 'x'], // this macro has an optional parameter that defaults to 'x'
        abc: ['(#1)', 1, [null, '\\cba']]  // equivalent to \def\abc#1\cba{(#1)}
      }
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

for the first method, and

```
<div style="display:none">
\(
  \def\<#1>{\left<#1\right>}
  \newcommand{\CC}{\mathbf{C}}
\)
</div>
```

for the second.  The comments in the first code block indicate how to interpret the arrays used to define the individual macros.  The definitions in the second code block are 

[Run the example](https://mathjax.github.io/MathJax-demos-web/tex-macros.html)
