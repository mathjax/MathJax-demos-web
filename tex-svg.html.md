# [tex-svg.html](https://mathjax.github.io/MathJax-demos-web/tex-svg.html)

This example shows how to use the `tex-svg` component to process a complete HTML page containing TeX notation into math in SVG format.

The key lines are

``` html
  <script>
  MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
    svg: {fontCache: 'global'}
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```

which configures the TeX input jax to include single dollar signs as in-line math delimiters and the SVG output jax to use a global font-path cache, and then loads the `tex-svg` component.  The rest is handled by MathJax automatically.

[Run the example](https://mathjax.github.io/MathJax-demos-web/tex-svg.html)
