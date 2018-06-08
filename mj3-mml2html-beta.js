const MathJax = require('./v3/mathjax3/mathjax.js').MathJax       // MathJax core
const MathML  = require('./v3/mathjax3/input/mathml.js').MathML;  // MathML input
const CHTML   = require('./v3/mathjax3/output/chtml.js').CHTML;   // HTML output
const adaptor = require('./v3/mathjax3/adaptors/browserAdaptor').browserAdaptor; // browser DOM

//
//  Register the HTML handler with the browser adaptor
//
require('./v3/mathjax3/handlers/html.js').RegisterHTMLHandler(adaptor());

//
//  Get the input and output jax configurations from the user
//
const MathJaxConfig = window.MathJaxConfig || {};

const mmlConfig = Object.assign({}, MathJaxConfig.MathML || {});
const htmlConfig = Object.assign({
  fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.6/mathjax2/css'
}, MathJaxConfig.HTML || {});

//
//  Initialize mathjax with a DOM document.
//
const html = MathJax.document(document, {
    InputJax: new MathML(mmlConfig),
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
