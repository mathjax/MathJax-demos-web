# [input-tex2svg.html](https://mathjax.github.io/MathJax-demos-web/input-tex2svg.html)

This example shows how to use the `MathJax.tex2svgPromise()` function to process user input, allowing for the possibility that they use `\require` to load extensions dynamically, or one is loaded automatically by the `autoload` extension.

The key lines are

``` html
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
  <script>
    function convert() {
      //
      //  Get the TeX input
      //
      var input = document.getElementById("input").value.trim();
      //
      //  Disable the display and render buttons until MathJax is done
      //
      var display = document.getElementById("display");
      var button = document.getElementById("render");
      button.disabled = display.disabled = true;
      //
      //  Clear the old output
      //
      output = document.getElementById('output');
      output.innerHTML = '';
      //
      //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
      //  Get the conversion options (metrics and display settings)
      //  Convert the input to SVG output and use a promise to wait for it to be ready
      //    (in case an extension needs to be loaded dynamically).
      //
      MathJax.texReset();
      var options = MathJax.getMetricsFor(output);
      options.display = display.checked;
      MathJax.tex2svgPromise(input, options).then(function (node) {
        //
        //  The promise returns the typeset node, which we add to the output
        //  Then update the document to include the adjusted CSS for the
        //    content of the new equation.
        //
        output.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
      }).catch(function (err) {
        //
        //  If there was an error, put the message into the output instead
        //
        output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
      }).then(function () {
        //
        //  Error or not, re-enable the display and render buttons
        //
        button.disabled = display.disabled = false;
      });
    }
  </script>
```

When the user presses the `Render TeX` button or switches the `display` checkbox, the `convert()` function above runs.  The comments in the code explain how the conversion process is handled.  Note that the user interface is disabled during the typesetting process, since the conversion is done asynchronously in this example.  This prevents the user from starting a new typeset operation while one is already in progress.

[Run the example](https://mathjax.github.io/MathJax-demos-web/input-tex2svg.html)
