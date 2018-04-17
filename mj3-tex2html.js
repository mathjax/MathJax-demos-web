const MathJax = require("./v3/mathjax3/mathjax.js").MathJax       // MathJax core
const TeX     = require("./v3/mathjax3/input/tex.js").TeX;        // TeX input
const CHTML   = require("./v3/mathjax3/output/chtml.js").CHTML;   // HTML output
const browser = require("./v3/mathjax3/adaptors/browserAdaptor").browserAdaptor; // browser DOM

//
//  Register the HTML handler with the browser adaptor
//
require("./v3/mathjax3/handlers/html.js").RegisterHTMLHandler(browser());

//
//  Initialize mathjax with with a DOM document (e.g., browser, jsdom);
//  other documents are possible, but we use browser document here.
//
const html = MathJax.document(document, {
    InputJax: new TeX({inlineMath: [['$', '$'], ['\\(', '\\)']]}),
    OutputJax: new CHTML({
      fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.4/mathjax2/css/'
    })
});

window.addEventListener("load", function () {
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
