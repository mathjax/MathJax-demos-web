# [v2-color.html](https://mathjax.github.io/MathJax-demos-web/v2-color.html)

This example illustrates the difference between the behavior of `\color` in v2 and v3.  The default v3 behavior when using the MathJax `input/tex` or `input/tex-full` components (or any of the ones based on them, such as `tex-chtml` or `tex-svg`) is the LaTeX-compatible behavior, not the non-standard v2 behavior.

In addition to illustrating the difference between the two, this example also explains how to get the old v2 behavior, for backward compatibility.

The key lines for doing that are:

``` html
  <script>
  MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      autoload: {
        color: [],            // don't autoload the color extension
        colorv2: ['color']    // autoload v2 color extension
      }
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which tells the `autoload` extension not to autoload the `color` extension, but instead autoload the original `\color` behavior from the `colorV2` extension.

[Run the example](https://mathjax.github.io/MathJax-demos-web/v2-color.html)
