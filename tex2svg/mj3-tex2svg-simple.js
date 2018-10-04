/*************************************************************************
 *
 *  mj3-tex2svg.js
 *
 *  Uses MathJax v3 to convert TeX to SVG within a browser.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

//
//  Load the desired components
//
const MathJax = require('mathjax3/mathjax3/mathjax.js').MathJax       // MathJax core
const TeX     = require('mathjax3/mathjax3/input/tex.js').TeX;        // TeX input
const SVG     = require('mathjax3/mathjax3/output/svg.js').SVG;       // SVG output
const browser = require('mathjax3/mathjax3/adaptors/browserAdaptor').browserAdaptor; // browser DOM

require('mathjax3/mathjax3/input/tex/base/BaseConfiguration.js');
require('mathjax3/mathjax3/input/tex/ams/AmsConfiguration.js');
require('mathjax3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js');
require('mathjax3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js');
require('mathjax3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js');
require('mathjax3/mathjax3/input/tex/braket/BraketConfiguration.js');
require('mathjax3/mathjax3/input/tex/mhchem/MhchemConfiguration.js');
require('mathjax3/mathjax3/input/tex/physics/PhysicsConfiguration.js');
require('mathjax3/mathjax3/input/tex/verb/VerbConfiguration.js');
require('mathjax3/mathjax3/input/tex/cancel/CancelConfiguration.js');
require('mathjax3/mathjax3/input/tex/enclose/EncloseConfiguration.js');

//
//  Register the HTML handler with the browser adaptor
//
require('mathjax3/mathjax3/handlers/html.js').RegisterHTMLHandler(browser());

//
//  Initialize mathjax with a DOM document (e.g., browser, jsdom);
//  other documents are possible, but we use browser document here.
//
const html = MathJax.document(document, {
    InputJax: new TeX({
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        packages: ['base', 'ams', 'noundefined', 'newcommand',
                   'boldsymbol', 'braket', 'mhchem', 'physics',
                   'verb', 'cancel', 'enclose']
    }),
    OutputJax: new SVG()
});

//
//  When the page is ready...
//
window.addEventListener('load', () => {
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
