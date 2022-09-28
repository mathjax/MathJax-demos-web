# [speech-explorer-tex.html](https://mathjax.github.io/MathJax-demos-web/speech-explorer-tex.html)

This example shows how to enable MathJax's accessibility extension to attach speech to typeset math and enable interactive exploration of expressions.

The key lines are

``` html
  <script>
  MathJax = {
    loader: {load: ['a11y/sre']},
    options: {
      menuOptions: {
        settings: {
          explorer: true,
          assistiveMml: false
        }
      }
    },
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]}
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which causes the `a11y/sre` extension to be loaded, and modifies the menu settings to initialise the interactive explorer on page load. In addition we can switch off the assistive mml extension as it is no longer needed.

[Run the example](https://mathjax.github.io/MathJax-demos-web/speech-explorer-tex.html)
