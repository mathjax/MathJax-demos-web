# [MathJax-demos-web](https://github.com/mathjax/MathJax-demos-web)
<img class="shield" alt="GitHub release version" src="https://img.shields.io/github/v/release/mathjax/MathJax-src.svg?sort=semver">

A repository with examples using [MathJax version 3](https://github.com/mathjax/mathjax-src) in web pages.

See the [MathJax Node Demos](https://github.com/mathjax/MathJax-demos-node) for examples of how to use MathJax in node applications.  See the [MathJax documentation](https://docs.mathjax.org/) for complete details of how to use MathJax in web browsers and node.

## Samples of MathJax v3

The examples below show how to use and configure MathJax components in your web pages.  The links take you to the documentation for the individual example or to the live demo itself.  The last few examples show how to create your own custom components, custom tex extensions, or customized single-file webpacked versions of MathJax.

### Processing the Whole Page

* [tex-chtml.html](tex-chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/tex-chtml.html))
* [tex-svg.html](tex-svg.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/tex-svg.html))
* [equation-numbers.html](equation-numbers.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/equation-numbers.html))
* [equation-refs.html](equation-refs.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/equation-refs.html))
* [mml-chtml.html](mml-chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/mml-chtml.html))
* [mml-svg.html](mml-svg.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/mml-svg.html))

### Processing User Input

* [input-tex2chtml.html](input-tex2chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-tex2chtml.html))
* [input-tex2svg.html](input-tex2svg.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-tex2svg.html))
* [input-mml2chtml.html](input-mml2chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-mml2chtml.html))
* [input-mml2svg.html](input-mml2svg.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-mml2svg.html))
* [input-tex_mml2chtml.html](input-tex_mml2chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-tex_mml2chtml.html))
* [input-tex_mml2svg.html](input-tex_mml2svg.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-tex_mml2svg.html))
* [input-tex2mml.html](input-tex2mml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/input-tex2mml.html))

### Interaction

* [reveal-steps.html](reveal-steps.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/reveal-steps.html))
* [toggle-steps.html](toggle-steps.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/toggle-steps.html))

### Version 2 Compatibility

* [v2-color.html](v2-color.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/v2-color.html))
* [v2-script-tags.html](v2-script-tags.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/v2-script-tags.html))
* [v2-compatibility.html](v2-compatibility.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/v2-compatibility.html))  
* [v2 to v3 Configuration Converter](https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html)

### MathML and Assistive Extensions

* [tex-mml.html](tex-mml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/tex-mml.html)) 
* [mml-attribute.html](mml-attribute.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/mml-attribute.html))
* [speech-tex-chtml.html](speech-tex-chtml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/speech-tex-chtml.html))
* [speech-explorer-tex.html](speech-explorer-tex.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/speech-explorer-tex.html))

### Customization

* [load-mathjax.html](load-mathjax/load-mathjax.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/load-mathjax/load-mathjax.html))
* [tex-macros.html](tex-macros.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/tex-macros.html))
* [customized-load.html](customized-load.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/customized-load.html))
* [custom-tex-extension](custom-tex-extension/mml.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/custom-tex-extension/mml.html))
* [custom-component](custom-component/custom-component.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/custom-component/custom-component.html))
* [custom-build](custom-build/custom-mathjax.html.md) ([View Demo](https://mathjax.github.io/MathJax-demos-web/custom-build/custom-mathjax.html))

### Speech Output Demo

* [convert-with-speech](speech-generator/convert-with-speech.html)  ([View Demo](https://mathjax.github.io/MathJax-demos-web/speech-generator/convert-with-speech.html)) A lab to explore all possible speech options in MathJax.


## MathJax Component Files

MathJax version 3 has the ability to create MathJax "components" that can be dynamically loaded by MathJax as needed (much as could be done in version 2).  This allows portions of MathJax to be bundled together into components that include most or all of what you need to run MathJax, but still allows less-used pieces to be loaded on demand later when needed.  This is similar to v2's combined configuration files and TeX extensions.  

The main goal of these components is to use them for the delivery of MathJax from the CDNs that host MathJax.  This allows you to customize the MathJax components that you use without having to have (as single files on the CDN) every possible combination of parts that anyone would need packaged together.  We will provide a number of all-in-one packages that include an input and output jax together with the data for a font to be used, but also will provide separate components for the individual input and output jax, fonts, TeX extensions, and so on, so that you can mix-and-match them as needed.  

MathJax components can be used in the browser as well as on the server in `node` applications, so browser and server-side applications can use the same code base and configurations.  Components can be combined together into larger packages, either with other MathJax components, or with your own code, via `webpack`, for example.  

Moreover, the tools for building components are available so that you can create your own custom components that you can serve from your own website if you have special needs not addressed by the CDN.  For example, authors writing TeX extensions for MathJax can create their own components that can be loaded into MathJax from a different server even if the core MathJax is loaded from a CDN.

Although components are a convenient way of working with MathJax, those writing `node` scripts that use MathJax need not use the components as we have packaged them at all; they can continue to import MathJax into their projects directly, as in previous beta versions.

## Configuring Components

The component system described above can be configured using a global variable `MathJax` that you set before loading the main MathJax component that you are planning to use.  The `MathJax` variable specifies configuration blocks for the various components in much the same was as was done in version 2 (this is illustrated in the examples below, and described in more detail in a separate section below).  MathJax will modify this global variable to include the methods and data that it creates during the startup process for your use in your applications.

To configure MathJax, use

``` html
<script>
MathJax = {
  [options]
};
</script>
```

before the `script` tag that loads the MathJax component file you plan to use, where `options` are a list of options that control various parts of MathJax.  The options are grouped into blocks based on the component of MathJax that they affect.  For example, the TeX input jax options are in a blocks called 'tex', and the SVG output jax options are in a block called 'svg'.  An example configuration could be

``` html
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: ['base', 'newcommand', 'configMacros']
  },
  svg: {
    fontCache: 'global'
  }
};
</script>
```

The options are listed in detail in the [Configuring MathJax](https://docs.mathjax.org/en/latest/options/index.html) section of the [MathJax Documentation](https://docs.mathjax.org/en/latest).

## Converting from Version 2

The structure of the MathJax configuration, and many of the names of the options, have changed from version 2 to version 3.  For example, there is no longer a `MathJax.Hub.Config()` call, but instead, you use a global `MathJax` variable to set the configuration (this was possible in version 2, but most people used the older `Mathjax.Hub.Config()` approach).

In order to help you move from version 2 to version 3, there is a [configuration converter](https://mathjax.github.io/MathJax-demos-web/configuration-converter/configuration-converter.html) that will take your old version 2 configuration and give you the corresponding version 3 configuration.

Note that not all options from version 2 are available.  Some have not yet been implemented (like line breaking), while others no loner apply (like the options controlling previews).

## Obtaining the Components

The component files for these demos are available from several [CDN servers](https://docs.mathjax.org/en/latest/web/start.html#using-mathjax-from-a-content-delivery-network-cdn), which you can access without having to install or download any files.  Just use a link such as

``` html
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

to load the latest version (3.x.x) of the `tex-chtml` combined component file from the ``jsdelivr`` CDN.  See the
[documentation](https//docs.mathjax.org/en/latest/index.html#browser-components)
for more details on how to use MathJax in web pages.

Local copies of the MathJax component files can be obtained from the [MathJax Component Repository](https://github.com/mathjax/MathJax).  See its [README file](https://github.com/mathjax/MathJax/README.md) for complete information about how to obtain the files.

## MathJax Resources

* [MathJax Documentation](https://docs.mathjax.org)
* [MathJax Components](https://github.com/mathjax/MathJax)
* [MathJax Source Code](https://github.com/mathjax/MathJax-src)
* [MathJax Web Examples](https://github.com/mathjax/MathJax-demos-web)
* [MathJax Node Examples](https://github.com/mathjax/MathJax-demos-node)
* [MathJax Bug Tracker](https://github.com/mathjax/MathJax/issues)
* [MathJax Users' Group](http://groups.google.com/group/mathjax-users)

