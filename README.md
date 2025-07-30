# [MathJax-demos-web](https://github.com/mathjax/MathJax-demos-web)
<img class="shield" alt="GitHub release version" src="https://img.shields.io/github/v/release/mathjax/MathJax-demos-web.svg?sort=semver">

A repository with examples using [MathJax version 4](https://github.com/mathjax/MathJax-src) in web pages.

See the [MathJax Node Demos](https://github.com/mathjax/MathJax-demos-node) for examples of how to use MathJax in node applications.  See the [MathJax documentation](https://docs.mathjax.org/) for complete details of how to use MathJax in web browsers and node.

## Samples of MathJax v4

The examples below show how to use and configure MathJax components in your web pages.  The links take you to the live demos; most have a "Show Source" button at the bottom that you can use to see addition explanation and the important section of the source of the HTML document.  The last few examples show how to create your own custom components, custom tex extensions, or customized single-file webpacked versions of MathJax.

### Processing the Whole Page

* [tex-chtml.html](https://mathjax.github.io/MathJax-demos-web/page/tex-chtml.html)
* [tex-mml.html](https://mathjax.github.io/MathJax-demos-web/page/tex-mml.html)
* [tex-svg.html](https://mathjax.github.io/MathJax-demos-web/page/tex-svg.html)
* [mml-chtml.html](https://mathjax.github.io/MathJax-demos-web/page/mml-chtml.html)
* [mml-svg.html](https://mathjax.github.io/MathJax-demos-web/page/mml-svg.html)
* [equation-numbers.html](https://mathjax.github.io/MathJax-demos-web/page/equation-numbers.html)
* [equation-refs.html](https://mathjax.github.io/MathJax-demos-web/page/equation-refs.html)

### Processing User Input

* [tex2chtml.html](https://mathjax.github.io/MathJax-demos-web/input/tex2chtml.html)
* [tex2mml.html](https://mathjax.github.io/MathJax-demos-web/input/tex2mml.html)
* [tex2svg.html](https://mathjax.github.io/MathJax-demos-web/input/tex2svg.html)
* [mml2chtml.html](https://mathjax.github.io/MathJax-demos-web/input/mml2chtml.html)
* [mml2svg.html](https://mathjax.github.io/MathJax-demos-web/input/mml2svg.html)
* [tex-mml2chtml.html](https://mathjax.github.io/MathJax-demos-web/input/tex-mml2chtml.html)
* [tex_mml2svg.html](https://mathjax.github.io/MathJax-demos-web/input/tex-mml2svg.html)

### Interaction

* [reveal-steps.html](https://mathjax.github.io/MathJax-demos-web/interaction/reveal-steps.html)
* [toggle-steps.html](https://mathjax.github.io/MathJax-demos-web/interaction/toggle-steps.html)

### Version 2 Compatibility

* [v2-color.html](https://mathjax.github.io/MathJax-demos-web/v2-support/v2-color.html)
* [v2-script-tags.html](https://mathjax.github.io/MathJax-demos-web/v2-support/v2-script-tags.html)
* [v2-compatibility.html](https://mathjax.github.io/MathJax-demos-web/v2-support/v2-compatibility.html)
* [v2 to v4 Configuration Converter](https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html)

### MathML and Assistive Extensions

* [tex-mml.html](https://mathjax.github.io/MathJax-demos-web/page/tex-mml.html)
* [mml-attribute.html](https://mathjax.github.io/MathJax-demos-web/custom/mml-attribute.html)
* [speech generator lab](https://mathjax.github.io/MathJax-demos-web/speech-generator/convert-with-speech.html) (explores all possible speech options)

### Customization

* [load-mathjax.html](https://mathjax.github.io/MathJax-demos-web/custom/load-mathjax/load-mathjax.html)
* [tex-macros.html](https://mathjax.github.io/MathJax-demos-web/custom/tex-macros.html)
* [customized-load.html](https://mathjax.github.io/MathJax-demos-web/custom/customized-load.html)
* [custom-tex-extension](https://mathjax.github.io/MathJax-demos-web/custom/custom-tex-extension/mml.html)
* [custom-component](https://mathjax.github.io/MathJax-demos-web/custom/custom-component/custom-component.html)
* [custom-build](https://mathjax.github.io/MathJax-demos-web/custom/custom-build/custom-mathjax.html)


## MathJax Component Files

MathJax has the ability to create MathJax "components" that can be dynamically loaded by MathJax as needed.  This allows portions of MathJax to be bundled together into components that include most or all of what you need to run MathJax, but still allows less-used pieces to be loaded on demand later when needed. 

The main goal of these components is to use them for the delivery of MathJax from the CDNs that host MathJax.  This allows you to customize the MathJax components that you use without needing to have every possible combination of parts that anyone would need packaged together as single files.  MathJax provides a number of all-in-one packages that include an input and output jax together with the data for a font to be used; but there are also separate components for the individual input and output jax, fonts, TeX extensions, and so on, so that you can mix-and-match them as needed.  

MathJax components can be used in the browser as well as on the server in `node` applications, so browser and server-side applications can use the same code base and configurations.  Components can be combined together into larger packages, either with other MathJax components, or with your own code, via `webpack`, for example.  

The tools for building components are available so you can create your own custom components that you can serve from your own website if you have special needs not addressed by the versions of MathJax available on CDNs.  For example, authors writing TeX extensions for MathJax can create their own components that can be loaded into MathJax from a different server even if the core MathJax is loaded from a CDN.

Although components are a convenient way of working with MathJax, those writing `node` scripts that use MathJax need not use the components as we have packaged them; they can import MathJax modules into their projects directly.  The [MathJax node demos](https://github.com/mathjax/MathJax-demos-node) repository have examples of how to do this.

## Configuring Components

The component system described above can be configured using a global variable `MathJax` that you set before loading the main MathJax component that you are planning to use.  The `MathJax` variable specifies configuration blocks for the various components, as illustrated in the examples below, and described in more detail in a separate section below.  MathJax will modify this global variable to include the methods and data that it creates during the startup process for your use in your applications.

To configure MathJax, use

``` html
<script>
MathJax = {
  [options]
};
</script>
```

before the `script` tag that loads the MathJax component file you plan to use, where `options` are a list of options that control various parts of MathJax.  The options are grouped into blocks based on the component of MathJax that they affect.  For example, the TeX input jax options are in a blocks called `tex`, and the SVG output jax options are in a block called `svg`.  An example configuration could be

``` html
<script>
MathJax = {
  tex: {
    inlineMath: {'[+]': [['$', '$']]},
    packages: ['base', 'newcommand', 'configMacros']
  },
  svg: {
    fontCache: 'global'
  }
};
</script>
```

The options are listed in detail in the [Configuring MathJax](https://docs.mathjax.org/en/latest/options/index.html) section of the [MathJax Documentation](https://docs.mathjax.org/en/latest).

## Converting from Version 3

The configuration block for MathJax v4 is nearly identical to that for v3, through there are more options available in v4, and a few have been renamed.  Most page authors will not need to change their configurations unless they used one of the renamed options.  Some uses of the `startup.ready()` and `startup.pageReady()` functions may need to be adjusted, however, depending on whether they used or modified any of the internal structures of MathJax.  See the [What's New in MathJax v4](https//docs.mathjax.org/en/latest/upgrade/whats-new-4.0/index.html) section of the documentation for more details, particularly the [Breaking Changes](https//docs.mathjax.org/en/latest/upgrade/whats-new-4.0/breaking.html) section.

## Converting from Version 2

The structure of the MathJax configuration, and many of the names of the options, have changed from version 2 to versions 3 and 4.  For example, there is no longer a `MathJax.Hub.Config()` call, but instead, you use a global `MathJax` variable to set the configuration (this was possible in version 2, but most people used the older `Mathjax.Hub.Config()` approach).

In order to help you move from version 2 to version 3, there is a [configuration converter](https://mathjax.github.io/MathJax-demos-web/configuration-converter/configuration-converter.html) that will take your old version 2 configuration and give you the corresponding version 4 configuration.

Note that not all options from version 2 are available.  Some have been deprecated (like the auto-bold extention), while others no loner apply (like the options controlling previews).

## Obtaining the Components

The component files for these demos are available from several [CDN servers](https://docs.mathjax.org/en/latest/web/start.html#using-mathjax-from-a-content-delivery-network-cdn), which you can access without having to install or download any files.  Just use a link such as

``` html
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
```

to load the latest version (4.x.x) of the `tex-mml-chtml` combined component file from the ``jsdelivr`` CDN.  See the
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

