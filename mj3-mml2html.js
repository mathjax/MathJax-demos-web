/*************************************************************************
 *
 *  mj3-mml2html.js
 *
 *  Uses MathJax v3 to convert MathML to HTML within a browser.
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

const MathJax = require('./v3/mathjax3/mathjax.js').MathJax       // MathJax core
const MathML  = require('./v3/mathjax3/input/mathml.js').MathML;  // MathML input
const CHTML   = require('./v3/mathjax3/output/chtml.js').CHTML;   // HTML output
const adaptor = require('./v3/mathjax3/adaptors/browserAdaptor').browserAdaptor; // browser DOM

//
//  Register the HTML handler with the browser adaptor
//
require('./v3/mathjax3/handlers/html.js').RegisterHTMLHandler(adaptor());

//
//  Initialize mathjax with with a DOM document (e.g., browser, jsdom);
//  other documents are possible, but we use browser document here.
//
const html = MathJax.document(document, {
    InputJax: new MathML(),
    OutputJax: new CHTML({
        fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css'
    })
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
