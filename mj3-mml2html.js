// the MathJax core
const MathJax = require("./v3/mathjax3/mathjax.js").MathJax
// MathML input
const MathML = require("./v3/mathjax3/input/mathml.js").MathML;
// HTML output
const CHTML = require("./v3/mathjax3/output/chtml.js").CHTML;

// handler for HTML documents
const HTMLHandler = require("./v3/mathjax3/handlers/html/HTMLHandler.js").HTMLHandler;
MathJax.handlers.register(new HTMLHandler());

const chtmloptions = {
  fontURL:
    'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.2//mathjax2/css/'
};
// initialize mathjax with with a DOM document (e.g., browser, jsdom); other documents are possible
const html = MathJax.document(document, {
    InputJax: new MathML(),
    OutputJax: new CHTML(chtmloptions)
});

window.addEventListener("load", function () {
    console.time('wrapper');
    // process the document
    html.findMath()
        .compile()
        .getMetrics()
        .typeset()
        .updateDocument();
    console.timeEnd('wrapper');
});
