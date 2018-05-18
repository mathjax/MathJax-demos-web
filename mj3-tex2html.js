const MathJax = require('./v3/mathjax3/mathjax.js').MathJax       // MathJax core
const TeX     = require('./v3/mathjax3/input/tex.js').TeX;        // TeX input
const CHTML   = require('./v3/mathjax3/output/chtml.js').CHTML;   // HTML output
const browser = require('./v3/mathjax3/adaptors/browserAdaptor').browserAdaptor; // browser DOM

const {ConfigurationHandler} = require('./v3//mathjax3/input/tex/Configuration.js');
require('./v3/mathjax3/input/tex/base/BaseConfiguration.js');
require('./v3/mathjax3/input/tex/ams/AmsConfiguration.js');
require('./v3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js');

//
//  Register the HTML handler with the browser adaptor
//
require('./v3/mathjax3/handlers/html.js').RegisterHTMLHandler(browser());

//
//  Initialize mathjax with with a DOM document (e.g., browser, jsdom);
//  other documents are possible, but we use browser document here.
//
const html = MathJax.document(document, {
    InputJax: new TeX({
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        packages: ['base', 'ams', 'noundefined']
    }),
    OutputJax: new CHTML({
        fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.6/mathjax2/css/'
    })
});

window.addEventListener('load', () => {
    console.time('wrapper');

    //
    //  Process the document
    //
    html.findMath()
        .compile()
        .getMetrics()
        .typeset()
        .updateDocument();

    console.timeEnd('wrapper');
});
