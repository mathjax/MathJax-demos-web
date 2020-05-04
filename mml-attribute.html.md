# [mml-attribute.html](https://mathjax.github.io/MathJax-demos-web/mml-attribute.html)

This example shows how to automatically generate a `data-mathml` attribute on the HTML output for each math expression that contains the serialized MathML version of the expression.  It also adds a `data-original` attribute that gives the original form of the expression (i.e., the original TeX or MathML markup).  These attributes could be picked up by other tools that may need access to the mathematics after it has been converted to HTML or SVG tags.

The key lines are

``` html
 <script>
  MathJax = {
    startup: {
      ready: function () {
        //
        //  Do the usual startup ready actions (create document, input/output jax, etc).
        //
        MathJax.startup.defaultReady();
        const toMML = MathJax.startup.toMML;
        //
        //  Add a post-filter to the output jax to add the extra attributes
        //
        MathJax.startup.output.postFilters.add((args) => {
          const math = args.math, node = args.data;
          const original = (math.math ? math.math :
                            math.inputJax.processStrings ? '' : math.start.node.outerHTML);
          node.setAttribute('data-original', original);
          node.setAttribute('data-mathml', toMML(math.root).replace(/\n\s*/g, ''));
        });
      }
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which uses the `startup.ready()` function to do the normal startup, then attaches a post-filter to the output jax that looks up the original format of the math, sets that `data-original` attribute to that, and uses the `startup.toMML()` function to set the `data-mathml` attribute to the serialized MathML for the expression using the internal.

[Run the example](https://mathjax.github.io/MathJax-demos-web/mml-attribute.html)
