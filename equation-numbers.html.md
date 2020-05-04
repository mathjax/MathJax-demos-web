# [equation-numbers.html](https://mathjax.github.io/MathJax-demos-web/equation-numbers.html)

This example shows how to use the `tex-chtml` component to process a complete HTML page containing TeX notation with automatic equation numbers.

The key lines are

``` html
  <script>
  MathJax = {
    tex: {
      tags: 'ams'  // should be 'ams', 'none', or 'all'
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which configures the TeX input jax to include automatic tags for equations in AMS environments that call for them.  The math on the page includes examples of starred environments (that tells MathJax not to number those equations), and of the use of `\notag` to prevent a tag on an equation, and `\tag{}` to override the default tag number.

[Run the example](https://mathjax.github.io/MathJax-demos-web/equation-numbers.html)
