# [reveal-steps.html](https://mathjax.github.io/MathJax-demos-web/reveal-steps.html)

This example shows how to use the Javascript and CSS ids to display an equation that reveals the steps in a computation one step at a time.  The expression uses the `\cssId` macro to mark the parts of the expression to be revealed, and sets the CSS for those ids to be hidden initially.  A javascript function tied to a button sets the styles for the individual elements to reveal them one at a time.

The expression is given in TeX as

``` latex
\begin{align}
  (x+1)^2
    &= \cssId{Step1}{(x+1)(x+1)}             \\[3px]
    &\cssId{Step2}{ {} = x(x+1) + 1(x+1)}    \\[3px]
    &\cssId{Step3}{ {} = (x^2+x) + (x+1)}    \\[3px]
    &\cssId{Step4}{ {} = x^2 + (x + x) + 1}  \\[3px]
    &\cssId{Step5}{ {} = x^2 + 2x + 1}
\end{align}
```

The key lines of code are

``` html
  <script type="text/javascript">
  //
  //  Use a closure to hide the local variable
  //
  (function () {
    var n = 1;

    //
    //  Make the current step be visible, and increment the step.
    //  If it is the last step, disable the step button.
    //  Once a step is taken, the reset button is made available.
    //
    window.ShowStep = function () {
      document.getElementById("Step" + n++).style.visibility = "visible";
      if (!document.getElementById("Step" + n)) {
        document.getElementById("step").disabled = true;
      }
      document.getElementById("reset").disabled = false;
    }

    //
    //  Enable the step button and disable the reset button.
    //  Hide the steps.
    //
    window.ResetSteps = function () {
      document.getElementById("step").disabled = false;
      document.getElementById("reset").disabled = true;
      var i = 1, step; n = 1;
      while (step = document.getElementById("Step" + i)) {
        step.style.visibility = "hidden";
        i++
      }
    }
  })();
  </script>
```

This example also shows how to prevent the page from being displayed until after MathJax has completed its processing.  That means that there will be no flashing of the unprocessed math before the typeset math is displayed.  This is accomplished with the configuration

``` html
  <script>
  MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
    chtml: {
      displayAlign: 'left'
    },
    startup: {
      ready: function () {
        //
        //  Do the usual startup (which does a typeset)
        //
        MathJax.startup.defaultReady();
        //
        //  When that is all done, un-hide the page
        //
        MathJax.startup.promise.then(function () {
          document.getElementById("hidden").disabled = true;
        });
      }
    }
  };
  </script>
```

which waits for MathJax to finish its initial typesetting, and then disables the stylesheet that is hiding the page body.

[Run the example](https://mathjax.github.io/MathJax-demos-web/reveal-steps.html)
