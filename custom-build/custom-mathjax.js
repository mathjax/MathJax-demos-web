/*************************************************************************
 *
 *  custom-mathjax3.js
 *
 *  A custom build of MathJax version 3 for the browser
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2019 The MathJax Consortium
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
const mathjax     = require('mathjax-full/js/mathjax.js').mathjax;      // MathJax core
const TeX         = require('mathjax-full/js/input/tex.js').TeX;        // TeX input
const MathML      = require('mathjax-full/js/input/mathml.js').MathML;  // MathML input
const browser     = require('mathjax-full/js/adaptors/browserAdaptor.js').browserAdaptor; // browser DOM
const Enrich      = require('mathjax-full/js/a11y/semantic-enrich.js').EnrichHandler;     // semantic enrichment
const Register    = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;      // the HTML handler
const AllPackages = require('mathjax-full/js/input/tex/AllPackages').AllPackages;         // all TeX packages
const Serialize   = require('mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js').SerializedMmlVisitor;  // toMML
const STATE       = require('mathjax-full/js/core/MathItem.js').STATE;

const sreReady    = require('mathjax-full/js/a11y/sre.js').sreReady();    // SRE promise;

//
//  Register the HTML handler with the browser adaptor and add the semantic enrichment
//
Enrich(Register(browser()), new MathML());

//
//  Initialize mathjax with the DOM document.
//
const html = mathjax.document(document, {
  sre: {
    speech: 'deep',                         // deep labels on the enriched MathML
  },
  renderActions: {
    //
    //  Remove the data-semantic-* attributes (and move speech to data-speech)
    //
    simplify: [STATE.ENRICHED + 1, null, (math, doc) => {
      math.root.walkTree(node => {
        const attributes = node.attributes.getAllAttributes();
        if (attributes['data-semantic-speech']) {
          node.attributes.set('data-speech', attributes['data-semantic-speech']);
        }
        delete attributes.xmlns;
        for (const name of Object.keys(attributes)) {
          if (name.substr(0, 14) === 'data-semantic-') {
            delete attributes[name];
          }
        }
      });
    }]
  },
  InputJax: new TeX({
    packages: AllPackages.filter((name) => name !== 'bussproofs'),
    macros: {
      require: ['', 1]      // Make \require a no-op since all packages are loaded
    }
  })
});

//
// Converts internal MathML to serialized string
//
const visitor = new Serialize();

//
//  The user's configuration object
//
const CONFIG = window.MathJax || {};

//
//  The global MathJax object
//
window.MathJax = {
  version: mathjax.version,
  html: html,

  toSpeechMML(tex, display = true) {
    const math = new html.options.MathItem(tex, html.inputJax[0], display);
    math.convert(html, STATE.CONVERT);
    return visitor.visitTree(math.root);
  },

  speechLevel(level) {
    html.options.sre.speech = level;
  }
}

//
// Perform ready function, if there is one
//
if (CONFIG.ready) {
  sreReady.then(CONFIG.ready);
}
