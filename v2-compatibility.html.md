# [v2-compatibility.html](https://mathjax.github.io/MathJax-demos-web/v2-compatibility.html)

This example shows how to set up MathJax version 3 to act somewhat more like MathJax version 2.

The main actions are to return the `\color` macro to the non-standard version-2 behavior, and to modify the `\require` macro to convert the version-2 TeX extension names into the corresponding version-3 names.

In addition, this example also defines versions of

* MathJax.Hub.Queue()
* MathJax.Hub.Typeset()
* MathJax.Callback()

that you may be able to use to keep custom code that uses these version 2 features working.  It also defines

* MathJax.Hub.Register.StartupHook()
* MathJax.Hub.Register.MessageHook()
* MathJax.Hub.Register.LoadHook()
* MathJax.Hub.Config()

to generate error messages and looks for 

``` html
<script type="text/x-mathjax-config">
...
</script>
```

blocks, which are no longer supported, in order to alert you to the need to convert these to version 3 by hand.

You should use the [configuration converter](https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html) to help convert your version 2 configuration to a comparable version 3 configuration.

[Run the example](https://mathjax.github.io/MathJax-demos-web/v2-compatibility.html)
