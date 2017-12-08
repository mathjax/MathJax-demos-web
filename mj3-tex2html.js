// the MathJax core
import  {MathJax} from "./v3/mathjax3/mathjax.js";
// TeX input
import {TeX} from './v3/mathjax3/input/tex.js';

// HTML output
import {CHTML} from "./v3/mathjax3/output/chtml.js";

// handler for HTML documents
import {HTMLHandler} from "./v3/mathjax3/handlers/html/HTMLHandler.js";
MathJax.handlers.register(new HTMLHandler());

const chtmloptions = {
    fontURL:
      'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.2//mathjax2/css/'
  };
// initialize mathjax with with a DOM document (e.g., browser, jsdom); other documents are possible
const html = MathJax.document(window.document, {
    InputJax: new TeX({inlineMath: [['$', '$'], ['\\(', '\\)'] ]}),
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
