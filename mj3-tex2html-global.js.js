import { TeX } from './v3/mathjax3/input/tex.js';
import { CHTML } from './v3/mathjax3/output/chtml.js';
import { AbstractMathItem } from './v3/mathjax3/core/MathItem.js';
import { AbstractMathDocument } from './v3/mathjax3/core/MathDocument.js';

let tex = new TeX();
let chtml = new CHTML();

let doc = new AbstractMathDocument(document, { OutputJax: chtml });
chtml.nodes.document = doc.document;
document.head.appendChild(chtml.styleSheet(doc));

window.Typeset = function(string, display) {
  let math = new AbstractMathItem(string, tex);
  math.display = display; // boolean;
  math.setMetrics(16, 8, 1000000, 100000, 1);
  math.compile();
  math.typeset(doc)
  return math.typesetRoot;
};
