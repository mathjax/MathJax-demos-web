/*************************************************************************
 *
 *  mj3-tex2svg-beta.js
 *
 *  Uses MathJax v3 to convert TeX to SVG within the browser.
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
//  Get the input and output jax configurations from the user
//
const MathJaxConfig = window.MathJaxConfig || {};

const texConfig = Object.assign({
    packages: ['base', 'ams', 'noundefined', 'newcommand',
               'boldsymbol', 'braket', 'mhchem', 'physics',
               'verb', 'cancel', 'enclose']
}, MathJaxConfig.TeX || {});

const svgConfig = Object.assign({}, MathJaxConfig.HTML || {});

//
//  Initialize mathjax with a DOM document.
//
const html = MathJax.document(document, {
    InputJax: new TeX(texConfig),
    OutputJax: new SVG(svgConfig)
});

//
//  The global MathJax object
//
window.MathJax = {
    version: MathJax.version,
    html: html,

    //
    //  Process the document
    //
    Typeset: function(...elements) {
        this.html.findMath(elements.length ? {elements} : {})
                 .compile()
                 .getMetrics()
                 .typeset()
                 .updateDocument()
                 .clear();
    }
}

//
//  Do the initial typesetting
//
if (!MathJaxConfig.skipInitialTypeset) {
    //
    //  If the window is already loaded, just call Typeset()
    //  Otherwise, set an event listener and run Typeset() when DOM is loaded
    //
    if (document.readyState && document.readyState !== 'loading') {
        window.MathJax.Typeset(...(MathJaxConfig.elements || []));
    } else {
        window.addEventListener('DOMContentLoaded',
            () => window.MathJax.Typeset(...(MathJaxConfig.elements || [])), false);
    }
}
