# [tex-chtml.html](https://mathjax.github.io/MathJax-demos-web/tex-chtml.html)

This example shows how to use the `tex-chtml` component to process a complete HTML page containing TeX notation into math using the CommonHTML format.

The key lines are

``` html
  <script>
  MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]}
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which configures the TeX input jax to include single dollar signs as in-line math delimiters, and then loads the `tex-chtml` component.  The rest is handled by MathJax automatically.

[Run the example](https://mathjax.github.io/MathJax-demos-web/tex-chtml.html)
