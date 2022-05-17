# [tex-mml.html](https://mathjax.github.io/MathJax-demos-web/tex-mml.html)

This example shows how to process a complete HTML page containing TeX notation into math in MathML format.  It should only be used with browsers that have native support for MathML, but illustrates one way to get a replacement for the version 2 NativeMML output, which has not been ported to version 3.

The key lines are

``` html
  <style>
  mjx-container[display="block"] {
    display: block;
    margin: 1em 0;
  }
  </style>
  <script>
  MathJax = {
    //
    //  Load only TeX input and the contextual menu
    //
    loader: {load: ['input/tex', 'ui/menu']},
    //
    //  When page is ready:
    //    disable the assistive-mathml menu item
    //    render the document
    //
    startup: {
      pageReady() {
        MathJax.startup.document.menu.menu.findID('Accessibility', 'AssistiveMml').disable();
        MathJax._.mathjax.mathjax.handleRetriesFor(() => MathJax.startup.document.render());
      }
    },
    //
    //  Use dollar signs for in-line delimiters in addition to the usual ones
    //
    tex: {inlineMath: {'[+]': [['$', '$']]}},
    //
    //  Override the usual typeset render action with one that generates MathML output
    //
    options: {
      menuOptions: {
        settings: {
          assistiveMml: false
        }
      },
      renderActions: {
        assistiveMml: [],  // disable assistive mathml
        typeset: [150,
          (doc) => {for (math of doc.math) {MathJax.config.renderMathML(math, doc)}},
          (math, doc) => MathJax.config.renderMathML(math, doc)
        ]
      }
    },
    //
    // The action to use for rendering MathML
    //
    renderMathML(math, doc) {
      math.typesetRoot = document.createElement('mjx-container');
      math.typesetRoot.innerHTML = MathJax.startup.toMML(math.root);
      math.display && math.typesetRoot.setAttribute('display', 'block');
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js"></script>
```

which sets up a new `renderAction` that replaces the usual typeset one (due to the priority of 150).  This new action uses the `MathJax.startup.toMML()` function to convert the internal math items into serialized MathML, and then inserts that into a `mjx-container` element that it sets as the `typesetRoot` of the math item.  This will be put into the page automatically by a later `renderAction` that updates the page.

The menu item for the assistive MathML extension is turned off by default (to prevent it from loading), and the `ready()` function is used to disable the menu item so it can't be turned on.  Since we are producing MathML directly, there is no need for it.

The `<style>` element sets up CSS so that the `mjx-container` will be set as a separate line with space above and below it when the math is a displayed equation.

Finally, the `pageReady()` function in the `startup` section is set so that the page will be rendered when it first becomes available.  This is needed because there is no `MathJax.typeset()` or `MathJax.typesetPromise()` in this case, since no output jax is loaded.

[Run the example](https://mathjax.github.io/MathJax-demos-web/tex-mml.html)
