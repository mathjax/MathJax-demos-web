# [input-tex_mml2svg.html](https://mathjax.github.io/MathJax-demos-web/input-tex_mml2svg.html)

This example shows how to use the `MathJax.TypesetPromise()` function to process user input that is HTML containing delimited TeX expressions and/or MathML tags, allowing for the possibility that the TeX expressions use `\require` to load extensions dynamically, or one is loaded automatically by the `autoload` extension.  The resulting page will have math in SVG format.

The key lines are

``` html
  <script>
  MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
    svg: {fontCache: 'global'},
    startup: {
      ready: function () {
        MathJax.startup.defaultReady();
        document.getElementById('render').disabled = false;
      }
    }
  }
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js"></script>
  <script>
    function convert() {
      //
      //  Get the input (it is HTML containing delimited TeX math
      //    and/or MathML tags
      //
      var input = document.getElementById("input").value.trim();
      //
      //  Disable the render button until MathJax is done
      //
      var button = document.getElementById("render");
      button.disabled = true;
      //
      //  Clear the old output
      //
      output = document.getElementById('output');
      output.innerHTML = input;
      //
      //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
      //  Reset the typesetting system (font caches, etc.)
      //  Typeset the page, using a promise to let us know when that is complete
      //
      MathJax.texReset();
      MathJax.typesetClear();
      MathJax.typesetPromise()
        .catch(function (err) {
          //
          //  If there was an internal error, put the message into the output instead
          //
          output.innerHTML = '';
          output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
        })
        .then(function() {
          //
          //  Error or not, re-enable the render button
          //
          button.disabled = false;
        });
    }
  </script>
```

When the user presses the `Render HTML` button, the `convert()` function above runs.  The comments in the code explain how the conversion process is handled.  Note that the user interface is disabled during the typesetting process, since the conversion is done asynchronously in this example.  This prevents the user from starting a new typeset operation while one is already in progress.

The MathJax configuration shows how you can perform an action once MathJax is loaded and ready to run by setting the `ready()` function in the `startup` configuration block.  In this case, the function does the default ready actions and then enables the render button (which is disabled by default in the HTML that creates the button).  This gives you a user interface that can't be used until MathJax is actually ready to respond.

[Run the example](https://mathjax.github.io/MathJax-demos-web/input-tex_mml2svg.html)
