import {TeX} from './v3/mathjax3/input/tex.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {HTMLMathItem} from './v3/mathjax3/handlers/html/HTMLMathItem.js';
import {HTMLDocument} from './v3/mathjax3/handlers/html/HTMLDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

import './v3/mathjax3/input/tex/base/BaseConfiguration.js';
import './v3/mathjax3/input/tex/ams/AmsConfiguration.js';
import './v3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js';
import './v3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js';
import './v3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js';

const tex = new TeX({
    packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol']
});
const chtml = new CHTML({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css'
});

const doc = new HTMLDocument(document, browserAdaptor(), {InputJax: tex, OutputJax: chtml});

window.MathJax = {
    Stylesheet: function () {
        return chtml.styleSheet(doc);
    },

    Typeset: function(string, display, em = 16, ex = 8, cwidth = 80*16) {
        let math = new HTMLMathItem(string, tex, display);
        math.setMetrics(em, ex, cwidth, 100000, 1);
        math.compile();
        math.typeset(doc)
        return math.typesetRoot;
    }
};
