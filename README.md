# [mj3-demos](https://github.com/mathjax/mj3-demos)

A repository with examples using [mathjax-v3](https://github.com/mathjax/mathjax-v3).

## NOTE

Mathjax v3 is in beta release. **Do not use this in production** but please test it and report issues at [https://github.com/mathjax/mathjax-v3/issues](https://github.com/mathjax/mathjax-v3/issues)!

## What's Included

This beta version includes two input processors (TeX and MathML) and two output processors (CommonHTML and SVG).  Other input and output processors (e.g., AsciiMath input) will be added in the future.

The current TeX input processor has all the core functionality of the MathJax v2 TeX input, and several of the extensions built in, but some extensions are still to come.  For example, `\unicode`, `\bbox`, and the `color` extension are not yet available.

The CommonHTML and SVG output implement all the MathML elements that they do in v2, but do not yet include support for line breaking (neither automatic nor explicit ones); this will be implemented in a later beta version.  Both output renderers currently only support the MathJax TeX font; other fonts will be added in the future.  

The CommonHTML output currently uses a very large CSS file that encodes the font information needed for all the characters in the MathJax TeX fonts.  This is a preliminary implementation of the font support, which will be updated to reduce the size of the CSS in future versions.

The SVG output currently uses explicit SVG `<path>` elements for the characters it displays, whereas version 2 cached the paths in a common SVG `<defs>` element so that paths didn't have to be repeated in the individual expressions that used them.  This will be implemented in a future version.

The MathJax contextual menu is not yet implemented.

The ability to configure MathJax through a configuration object, as in v2, is limited at the moment.  In version 3, this type of customization is handled through building custom packed versions of MathJax, and that is not yet fully documented.  The configurable demos section listed below give examples of how to configure MathJax v3.

## Sample Loaders

There are three basic examples for each input and output combination. If you wish to use any of the javascript files in your own test pages, you can either download the `.js` file from [https://github.com/mathjax/mj3-demos/](https://github.com/mathjax/mj3-demos/) and host it on your own server, or you can refer to the file from [https://cdn.rawgit.com](https://cdn.rawgit.com), as described below.  You may also want to include [https://cdn.polyfill.io](https://cdn.polyfill.io) to support older browsers.

For example:

    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    <script src="https://cdn.rawgit.com/mathjax/mj3-demos/3.0.0-beta.2/mj3-tex2html-beta.dist.js"></script>


### The single-pass demos

These implement a simple "render the page" setup that implements a single conversion pass when the page is loaded.

* mj3-mml2html-simple.js - [LIVE DEMO](mml2html/mj3-mml2html-simple.html)
* mj3-tex2html-simple.js - [LIVE DEMO](tex2html/mj3-tex2html.html)
* mj3-mml2svg-simple.js - [LIVE DEMO](mml2svg/mj3-mml2svg-simple.html)
* mj3-tex2svg-simple.js - [LIVE DEMO](tex2svg/mj3-tex2svg-simple.html)

Each HTML page includes a number of examples.  The javascript files are intended as examples of how to build a packed version of MathJax.  For a more practical generic packed version, see the next section.


### The configurable demos

These implement a configurable "render the page" setup that is a bit more sophisticated than the ones above.  These can be run more than once, and can be loaded with the `async` attribute.

* mj3-mml2html-beta.js - [LIVE DEMO](mml2html/mj3-mml2html-beta.html)
* mj3-tex2html-beta.js - [LIVE DEMO](tex2html/mj3-tex2html-beta.html)
* mj3-mml2svg-beta.js - [LIVE DEMO](mml2svg/mj3-mml2svg-beta.html)
* mj3-tex2svg-beta.js - [LIVE DEMO](tex2svg/mj3-tex2svg-beta.html)

To configure MathJax, use

    <script>
    MathJaxConfig = {
      [options]
    };
    </script>

before the `script` tag that loads the `mj3-...-beta.js` file, where `options` are a list of options that control various parts of MathJax.  Examples of the possible options are listed below:

    <script>
    MathJaxConfig = {
      elements: ["#id1", "#id2"],  // list of selectors for containers to process
      skipInitialTypeset: true,    // Do/don't typeset when page is loaded
      TeX: {
        packages: ['base'],        // extensions to use
        TagSide: 'right',          // side for \tag macros
        TagIndent: '0.8em',        // amount to indent tags
        MultLineWidth: '85%',      // width of multline environment
        useLabelIds: true          // use label name rather for ids
        tags: 'none',              // or 'ams' or 'all'
        inlineMath: [              // start/end delimiter pairs for in-line math
          ['\\(', '\\)']
        ],
        displayMath: [             // start/end delimiter pairs for display math
          ['$$', '$$'],
          ['\\[', '\\]']
        ],
        processEscapes: true,      // use \$ to produce a litteral dollar sign
        processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
        processRefs: true          // process \ref{...} outside of math mode
      },
      MathML: {
        parseAs: 'html',           // or 'xml'
        forceReparse: false        // Force the MathML to be reparsed? 
                                   //   (e.g., for XML parsing in an HTML document)
      },
      HTML: {
        scale: 1,                  // Global scaling factor for all expressions
        mathmlSpacing: false,      // true for MathML spacing rules, false for TeX rules
        fontURL: 'mathjax2/css',   // The URL where the fonts are found
        skipAttributes: {          // RFDa and other attributes NOT to copy to CHTML output
          'data-my-attr': true     //   e.g., don't coopy this attribute
        },
        exFactor: .5               // default size of ex in em units when ex size can't be determined
      },
      SVG: {
        scale: 1,                  // Global scaling factor for all expressions
        mathmlSpacing: false,      // true for MathML spacing rules, false for TeX rules
        skipAttributes: {          // RFDa and other attributes NOT to copy to CHTML output
          'data-my-attr': true     //   e.g., don't coopy this attribute
        },
        exFactor: .5               // default size of ex in em units when ex size can't be determined
      }
    };
    </script>

These javascript files provide a global `MathJax` object that includes a `MathJax.Typeset()` function that you can call to typeset the page again (e.g., if you have added new math to the page).  You can pass a list of selectors for elements to be processed, or the DOM nodes themselves.  E.g.,

    MathJax.Typeset(".math-container");
    MathJax.Typeset(document.getElementsByTagName("div"));

These files can be loaded with the `async` attribute, but if you do, the page will refresh before MathJax processes the math it contains.  You can also load these files dynamically by creating a `script` tag whose source is set to one of these `.js` files, and inserting it into the page after it is already loaded.

### The single-equation converters

These provide a simple method for rendering individual equations.

* mj3-mml2html-global.js - [LIVE DEMO](mml2html/mj3-mml2html-global.html)
* mj3-tex2html-global.js - [LIVE DEMO](tex2html/mj3-tex2html-global.html)
* mj3-mml2svg-global.js - [LIVE DEMO](mml2svg/mj3-mml2svg-global.html)
* mj3-tex2svg-global.js - [LIVE DEMO](tex2svg/mj3-tex2svg-global.html)

The demo pages provide a text area where you can type MathML or TeX (depending on the demo), and typeset them.  The javascript file provides a `MathJax` object that has the following methods:

* `MathJax.Stylesheet()`, which produces a `style` object that can be inserted into a document to include the styles needed by the CommonHTML or SVG output.  You can append this to the document `head`, as in these examples, or could use
 
        console.log(MathJax.Stylesheet().outerHTML)

    to output the stylesheet as text.

* `MathJax.Typeset(string)` that converts a MathML or TeX string into an HTML DOM node for the typeset math.  This can be inserted into a document, as in the examples, or you can use

        console.log(MathJax.Typeset(string).outerHTML)

     to output the serialized HTML.
     
     The `Typeset()` function takes several optional arguments.  For the TeX version, the second parameter is a boolean that says whether the math is in inline or display mode (display mode is `true`, and the default is `false`, or inline mode).  In both TeX and MathML versions, the next three parameters are numbers that represent the size of an `em` in pixels, the size of an `ex` in pixels, and the container width for the math, in pixels.  (The latter will be used for line breaking, when that is implemented.)
     
* `MathJax.Reset()`, available in the TeX versions, resets the tag and label data.  Passing a number to this method causes automatic tagging to start with that number (rather than 1).

## Building Custom Configurations

* Install NodeJS (8+ recommended) and npm (5.2+).

* Install this repository via npm:

        npm install https://github.com/mathjax/mj3-demos.git

* You may get a few warning messages about `package.json` in the end, but these are normal if you run `npm install` in a directory without a `package.json` file.
* Load any of the HTML files into your browser.

You can use the `.js` files provided here to create your own custom loaders for MathJax, and edit the `webpack.config.js` file to build the combined javascript file needed for use on the web, and then use

    npx webpack

to create the packed `.dist.js` file.

For use with NodeJS, you should be able to import the files from the `mathjax3/mathjax3` directory directly.  See the [mj3-demos-node](https://github.com/mathjax/mj3-demos-node) repository for examples that use NodeJS.

## Webfonts

The `./mathjax2` folder contains the webfonts.  The location is given in the configuration within the driver files when the output object is created. The default location is to load from

    https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.2/mathjax2/css
  
but you can modifiy the location there and run webpack to compile the files needed for your URLs.  The `*-beta.js` files allow you to configure the URL inline within the HTML page that loads them.
