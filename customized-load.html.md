# [customized-load.html](https://mathjax.github.io/MathJax-demos-web/customized-load.html)

This example shows how to mix-and-match the components that are loaded (if there isn't a combined component that includes what you need).  This is done by setting the `load` array in the `loader` section of you MathJax configuration, as shown below.

The key lines are

``` html
  <script>
  MathJax = {
    loader: {
      load: [
        'input/tex-base', '[tex]/newcommand', '[tex]/action',
        'output/chtml',
        'a11y/explorer'
      ]
    },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      packages: ['base', 'newcommand', 'action']
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js"></script>
```

Here, we specify the 'tex-base' input jax (which is TeX with no extra packages included), and explicitly load the `newcommand` and `action` extensions.  We also load the `chtml` output jax, and the `explorer` assistive technology module.

The TeX configuration registers the loaded packages with the TeX input jax (it is possible to load extensions without initially enabling them).

The expression in the `\texttip` macro from the `action` module to add a tool-tip to part of the quadratic equation; hover the mouse over the discriminant to see.

[Run the example](https://mathjax.github.io/MathJax-demos-web/customized-load.html)
