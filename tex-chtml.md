# [tex-chtml.html](https://mathjax.github.io/mj3-demos/tex-chtml.html)

This example shows how to use the `tex-chtml` component to process a complete HTML page containing TeX notation into math using the CommonHTML format.

The key lines are

```
  <script>
  MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]}
  };
  </script>
  <script src="mathjax3/tex-chtml.js" id="MathJax-script" async></script>
```

which configures the TeX input jax to include single dollar signs as in-line math delimiters, and then loads the `tex-chtml` component.  The rest is handled by MathJax automatically.

[Run the example](https://mathjax.github.io/mj3-demos/tex-chtml.html)
