const MathJax = require("./v3/mathjax3/mathjax.js").MathJax       // MathJax core
const TeX     = require("./v3/mathjax3/input/tex.js").TeX;        // TeX input
const CHTML   = require("./v3/mathjax3/output/chtml.js").CHTML;   // HTML output

//
//  Register the HTML handler
//
const HTMLHandler = require("./v3/mathjax3/handlers/html/HTMLHandler.js").HTMLHandler;
MathJax.handlers.register(new HTMLHandler());

//
//  Initialize mathjax with with a DOM document (e.g., browser, jsdom); other documents are possible
//
const html = MathJax.document(document, {
    InputJax: new TeX({inlineMath: [['$', '$'], ['\\(', '\\)']]}),
    OutputJax: new CHTML({fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.3/mathjax2/css/'})
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
