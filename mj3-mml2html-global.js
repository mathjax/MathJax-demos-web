import {MathML} from './v3/mathjax3/input/mathml.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {HTMLMathItem} from './v3/mathjax3/handlers/html/HTMLMathItem.js';
import {HTMLDocument} from './v3/mathjax3/handlers/html/HTMLDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

const mml = new MathML();
const chtml = new CHTML({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.6/mathjax2/css'
});

const doc = new HTMLDocument(document, browserAdaptor(), {InputJax: mml, OutputJax: chtml});

window.MathJax = {
    Stylesheet: function () {
        return chtml.styleSheet(doc);
    },

    Typeset: function (string, em = 16, ex = 8, cwidth = 80*16) {
        let math = new HTMLMathItem(string, mml);
        math.setMetrics(em, ex, cwidth, 100000, 1);
        math.compile();
        math.typeset(doc);
        return math.typesetRoot;
    }
};
