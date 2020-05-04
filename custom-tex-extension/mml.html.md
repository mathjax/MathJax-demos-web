# [mml.html](https://mathjax.github.io/MathJax-demos-web/custom-tex-extension/mml.html)

This example shows how to create a custom TeX extension that defines new TeX commands implemented by javascript functions.

The commands implemented by this example provide the ability to generate MathML token elements from within TeX by hand.  This allows more control over the content and attributes of the elements produced.  The macros are `\mi`, `\mo`, `\mn`, `\ms`, and `\mtext`, and they each take an argument that is the text to be used as the content of the corresponding MathML element.  The text is not further processed by TeX, but the extension does convert sequences of the form `\uNNNN` (where the N's are hexadecimal digits) into the corresponding unicode character; e.g., `\mi{\u2460}` would produce U+2460, a circled digit 1.

The main code for the extension is

* [mml.js](mml.js)

which contains comments describing it in detail.  In order to use the extension in your web pages, you must turn this into a MathJax component file, which you do by first defining the component using the file

* [webpack.config.js](webpack.config.js)

which gives the name of the component, the other components that this extension will draw on (so that only the needed files will be included in this component), along with some other data about directories.  The final directory being set to `'.'` means that the component will be placed in the directory with the source file, but with `.min.js` as the extension rather than '.js'.

To make the final component, use the commands

```
npm install
npm run make-custom-tex-extension
```

from the main directory of this repository.  That will create the `mml.min.js` file in the `custom-tex-extension` directory.

To use this in your own web page, the key lines are

``` html
  <script>
  MathJax = {
    loader: {
      load: ['[custom]/mml.min.js'],
      paths: {custom: '.'}
    },
    tex: {
      packages: {'[+]': ['mml']}
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

This asks the loader to load the custom extension file, and defines the `[custom]` path to be the directory relative to the `mml.html`  example file (`mml.min.js` is in the same directory).  The tex component is configured to add the `mml` package to the other packages already there by default.  Finally, the `tex-chtml` component is loaded, and MathJax does the rest.

The expressions in the example file illustrate the use of the custom macros.  For example

``` latex
$$abc + \mi{abc} \mo{++} x ++ y$$
```
    
shows the difference between `abc`, which produces three separate `mi` elements internally, each containing one letter, and `\mi{abc}`, which produces one `mi` element containing three letters.  The latter will be in upwrite letters (as the default variant for `mi` elements depends on the number of characters in the content).  View the MathML source to see the difference.

Similarly the difference between `\mo{++}` and `++` is the number of `mo` elements and the length of their content.  `\mo{++}` produces `<mo>++</mo>` while `++` produces `<mo>+</mo><mo>+</mo>`.  Note the difference in output for these two: the TeX spacing rules for `x ++ y` means that it will be spaced as `x + +y`, while `x \mo{++} y` will be `x ++ y`.

The expression

``` latex
\mi[mathvariant="bold"]{A}
```

produces a bold A via `<mi mathvariant="bold">A</mi>`.

There are additional example equations in the HTML file.

[Run the example](https://mathjax.github.io/MathJax-demos-web/custom-tex-extension/mml.html)
