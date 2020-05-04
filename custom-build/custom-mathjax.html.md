# [custom-mathjax.html](https://mathjax.github.io/MathJax-demos-web/custom-build/custom-mathjax.html)

This example shows how to create a completely custom build of MathJax 3 that does not use the predefined MathJax components at all.  This example provides commands to convert a TeX string to a speech string for that expression (and does no other typesetting).  It also provides a command to set the speech level to use (`shallow`, `deep`, or `none`).

The main code for the build is

* [custom-mathjax.js](custom-mathjax.js)

which contains comments describing it in detail.  In order to use the component in your web pages, you must package it into a single file using webpack.  Although this build does not use any of the MathJax component files, you can still use the component building tools to make it easy to create the combined file.  You do that by first defining the component using the file

* [webpack.config.js](webpack.config.js)

which gives the name of the combined file along with some other data about directories.  The final directory being set to `'.'` means that the combined file will be placed in the directory with the source file, but with `.min.js` as the extension rather than '.js'.

To make the actual combined file, use the commands

``` bash
npm install
npm run make-custom-build
```

from the main directory of this repository.  That will create the `custom-mathjax.min.js` file in the `custom-build` directory.

To include this in your own web page, you only need one line:

``` html
  <script src="custom-mathjax.min.js" async></script>
```

(include the path to the `custom-mathjax.min.js` file if needed).

Our custom MathJax build creates a `MathJax` global variable that includes the commands `toSpeechMML()` and `speechLevel()`.  The example HTML file uses these to convert user-provided TeX expressions and displays MathML node trees with the attached speech strings.

The key code in the HTML page is

``` html
  <script>
    function convert() {
      var input = document.getElementById("input").value.trim();
      var display = document.getElementById("display").checked;
      output = document.getElementById('output').firstChild;
      output.innerHTML = '';
      const mml = MathJax.toSpeechMML(input, display);
      output.appendChild(document.createTextNode(mml));
    }
    function changeLevel(level) {
      MathJax.speechLevel(level);
      convert();
    }
  </script>
```

The `convert()` function gets the user input, clears the output area, converts the TeX input string to a MathML string with speech attached, and displays that in the output area.

The `changeLevel()` function sets the speech level and reconverts the input.  This is attached to a menu that is used to select the level.

The custom MathJax build includes the ability to provide a `ready()` function that is called when MathJax has initialized itself and is ready to process math.  The example HTML file takes advantage of that to enable the user interface elements (which are initially disabled so that the user can't press them until MathJax is ready).  The code for that is

``` html
  <script>
    MathJax = {
      ready: function () {
        document.getElementById("display").disabled = false;
        document.getElementById("level").disabled = false;
        document.getElementById("render").disabled = false;
        convert();
      }
    };
  </script>
```

This enables the interface, and also converts the math that is in the user-entry area automatically when the page is ready.

[Run the example](https://mathjax.github.io/MathJax-demos-web/custom-build/custom-mathjax.html)
