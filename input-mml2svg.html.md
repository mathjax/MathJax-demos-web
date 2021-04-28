# [input-mml2svg.html](https://mathjax.github.io/MathJax-demos-web/input-mml2svg.html)

This example shows how to use the `MathJax.mathml2svg()` function to process user input in MathML format, producing SVG output.

The key lines are

``` html
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-svg.js"></script>
  <script>
    function convert() {
      //
      //  Get the MathML input string, and clear any previous output
      //
      var input = document.getElementById("input").value.trim();
      output = document.getElementById('output');
      output.innerHTML = '';
      //
      //  Convert the MathMl to an HTML node and append it to the output
      //
      output.appendChild(MathJax.mathml2svg(input));
      //
      //  Then update the document to include the adjusted CSS for the
      //    content of the new equation.
      //
      MathJax.startup.document.clear();
      MathJax.startup.document.updateDocument();
    }
  </script>
```

When the user presses the `Render MathML` button, the `convert()` function above runs.  The comments in the code explain how the conversion process is handled.  Unlike the similar TeX examples, this example uses synchronous processing, rather than a promise-based one, since there is no equivalent to the `\require` macro in MathML input to cause an extension to be dynamically loaded.  That also means it is unnecessary to disable the render button, since the `convert()` function will complete before any other user interaction can take place.

[Run the example](https://mathjax.github.io/MathJax-demos-web/input-mml2svg.html)
