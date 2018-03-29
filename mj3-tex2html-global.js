import {TeX} from './v3/mathjax3/input/tex.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {AbstractMathItem} from './v3/mathjax3/core/MathItem.js';
import {AbstractMathDocument} from './v3/mathjax3/core/MathDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

class GenericMathDocument extends AbstractMathDocument {};
class GenericMathItem extends AbstractMathItem {};

const tex = new TeX();
const chtml = new CHTML({
  fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.3/mathjax2/css/'
});

const doc = new GenericMathDocument(document, browserAdaptor(), {OutputJax: chtml});
document.head.appendChild(chtml.styleSheet(doc));

window.Typeset = function(string, display) {
  let math = new GenericMathItem(string, tex, display);
  math.setMetrics(16, 8, 1000000, 100000, 1);
  math.compile();
  math.typeset(doc)
  return math.typesetRoot;
};
