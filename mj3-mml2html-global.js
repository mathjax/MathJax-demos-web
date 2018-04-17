import {MathML} from './v3/mathjax3/input/mathml.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {AbstractMathItem} from './v3/mathjax3/core/MathItem.js';
import {AbstractMathDocument} from './v3/mathjax3/core/MathDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

class GenericMathDocument extends AbstractMathDocument {};
class GenericMathItem extends AbstractMathItem {};

const mml = new MathML();
const chtml = new CHTML({
  fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.4/mathjax2/css/'
});

const doc = new GenericMathDocument(document, browserAdaptor(), {InputJax: mml, OutputJax: chtml});
document.head.appendChild(chtml.styleSheet(doc));

window.Typeset = function(string) {
  let math = new GenericMathItem(string, mml);
  math.setMetrics(16, 8, 80*16, 100000, 1);
  math.compile();
  math.typeset(doc);
  return math.typesetRoot;
};
