# [input-tex2mml.html](https://mathjax.github.io/MathJax-demos-web/input-tex2mml.html)

This example shows how to use the `MathJax.tex2mmlPromise()` function to process user input, allowing for the possibility that they use `\require` to load extensions dynamically, or one is loaded automatically by the `autoload` extension.

The key lines are

``` html
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js"></script>
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
      output.innerHTML = '<pre></pre>';
      //
      //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
      //  Convert the input to CommonHTML output and use a promise to wait for it to be ready
      //    (in case an extension needs to be loaded dynamically).
      //
      MathJax.texReset();
      MathJax.tex2mmlPromise(input, {display: display.checked}).then(function (mml) {
        //
        //  The promise returns the serialized MathML, and we add that
        //  to the <pre> element in the output.
        //
        output.firstChild.appendChild(document.createTextNode(mml));
      }).catch(function (err) {
        //
        //  If there was an error, put the message into the output instead
        //
        output.firstChild.appendChild(document.createTextNode(err.message));
      }).then(function () {
        //
        //  Error or not, re-enable the display and render buttons
        //
        button.disabled = display.disabled = false;
      });
    }
  </script>
```

When the user presses the `Convert TeX` button or switches the `display` checkbox, the `convert()` function above runs.  The comments in the code explain how the conversion process is handled.  Note that the user interface is disabled during the conversion process, since the conversion is done asynchronously in this example.  This prevents the user from starting a new conversion operation while one is already in progress.

[Run the example](https://mathjax.github.io/MathJax-demos-web/input-tex2mml.html)
