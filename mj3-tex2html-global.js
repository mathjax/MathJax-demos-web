import {TeX} from './v3/mathjax3/input/tex.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {HTMLMathItem} from './v3/mathjax3/handlers/html/HTMLMathItem.js';
import {HTMLDocument} from './v3/mathjax3/handlers/html/HTMLDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

import {ConfigurationHandler} from './v3//mathjax3/input/tex/Configuration.js';
import './v3/mathjax3/input/tex/base/BaseConfiguration.js';
import './v3/mathjax3/input/tex/ams/AmsConfiguration.js';
import './v3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js';

const tex = new TeX({
    packages: ['base', 'ams', 'noundefined']
});
const chtml = new CHTML({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.6/mathjax2/css/'
});

const doc = new HTMLDocument(document, browserAdaptor(), {InputJax: tex, OutputJax: chtml});
document.head.appendChild(chtml.styleSheet(doc));

window.Typeset = function(string, display) {
    let math = new HTMLMathItem(string, tex, display);
    math.setMetrics(16, 8, 80*16, 100000, 1);
    math.compile();
    math.typeset(doc)
    return math.typesetRoot;
};
