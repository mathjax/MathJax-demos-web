# [custom-component.html](https://mathjax.github.io/MathJax-demos-web/custom-component/custom-component.html)

This example shows how to create a component that combines several of the predefined components into one single custom component that includes exactly the pieces that you want.

The main code for the component is

* [custom-component.js](custom-component.js)

which contains comments describing it in detail.  In order to use the component in your web pages, you must turn this into a MathJax component file, which you do by first defining the component using the file

* [webpack.config.js](webpack.config.js)

which gives the name of the component along with some other data about directories.  The final directory being set to `'.'` means that the component will be placed in the directory with the source file, but with `.min.js` as the extension rather than '.js'.

To make the final component, use the commands

``` bash
npm install
mpn run make-custom-component
```

from the main directory of this repository.  That will create the `custom-component.min.js` file in the `custom-component` directory.

To use this in your own web page, you only need one line:

``` html
  <script src="custom-component.min.js" id="MathJax-script" async></script>
```

(include the path to the `custom-component.min.js` file if needed).  You can still use a MathJax configuration in your web page, or you could put

``` javascript
global.MathJax = {
  ...
};
```

before the first `require()` command in `custom-component.js` to include the configuration in the combined file itself.

[Run the example](https://mathjax.github.io/MathJax-demos-web/custom-component/custom-component.html)
