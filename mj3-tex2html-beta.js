//
//  Load the desired components
//
const MathJax = require('./v3/mathjax3/mathjax.js').MathJax       // MathJax core
const TeX     = require('./v3/mathjax3/input/tex.js').TeX;        // TeX input
const CHTML   = require('./v3/mathjax3/output/chtml.js').CHTML;   // HTML output
const browser = require('./v3/mathjax3/adaptors/browserAdaptor').browserAdaptor; // browser DOM

require('./v3/mathjax3/input/tex/base/BaseConfiguration.js');
require('./v3/mathjax3/input/tex/ams/AmsConfiguration.js');
require('./v3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js');
require('./v3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js');
require('./v3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js');

//
//  Register the HTML handler with the browser adaptor
//
require('./v3/mathjax3/handlers/html.js').RegisterHTMLHandler(browser());

//
//  Get the input and output jax configurations from the user
//
const MathJaxConfig = window.MathJaxConfig || {};

const texConfig = Object.assign({
    packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol']
}, MathJaxConfig.TeX || {});

const htmlConfig = Object.assign({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.6/mathjax2/css'
}, MathJaxConfig.HTML || {});

//
//  Initialize mathjax with a DOM document.
//
const html = MathJax.document(document, {
    InputJax: new TeX(texConfig),
    OutputJax: new CHTML(htmlConfig)
});

//
//  Process the document
//
window.MathJax = {
    version: MathJax.version,
    html: html,

    Typeset: function(...elements) {
        this.html.findMath(elements.length ? {elements} : {})
                 .compile()
                 .getMetrics()
                 .typeset()
                 .updateDocument()
                 .clear();
    }
}

//
//  Do the initial typesetting
//
if (!MathJaxConfig.skipInitialTypeset) {
    //
    //  If the window is already loaded, just call Typeset()
    //  Otherwise, set an event listener and run Typeset() when DOM is loaded
    //
    if (document.readyState && document.readyState !== 'loading') {
        window.MathJax.Typeset(...(MathJaxConfig.elements || []));
    } else {
        window.addEventListener('DOMContentLoaded',
            () => window.MathJax.Typeset(...(MathJaxConfig.elements || [])), false);
    }
}
