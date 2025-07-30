/*************************************************************************
 *
 *  custom-mathjax.js
 *
 *  A custom build of MathJax version 4 for the browser
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2019-2025 The MathJax Consortium
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
// Load the desired components.
//
import {mathjax} from '@mathjax/src/js/mathjax.js';      // MathJax core
import {TeX} from '@mathjax/src/js/input/tex.js';        // TeX input
import {MathML} from '@mathjax/src/js/input/mathml.js';  // MathML input
import {browserAdaptor} from '@mathjax/src/js/adaptors/browserAdaptor.js'; // browser DOM
import {SpeechHandler} from '@mathjax/src/js/a11y/speech.js';              // speech generation
import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';      // the HTML handler
import {SerializedMmlVisitor} from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';  // toMML
import {STATE} from '@mathjax/src/js/core/MathItem.js';

//
// Load the Te4X extensions to use.
//
import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
import '@mathjax/src/js/input/tex/textmacros/TextMacrosConfiguration.js';


//
// Register the HTML handler with the browser adaptor and add the speech generation.
//
SpeechHandler(RegisterHTMLHandler(browserAdaptor()), new MathML());

//
//  Initialize mathjax with the DOM document.
//
const html = mathjax.document(document, {
  worker: {
    path: 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-rc.4/sre',
    maps: 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-rc.4/sre/mathmaps',
  },
  renderActions: {
    typeset: [150, null, (math, doc) => renderMathML(math, doc)]
  },
  InputJax: new TeX({
    packages: ['base', 'ams', 'newcommand', 'textmacros']
  })
});

//
// Converts internal MathML to serialized string
//
const visitor = new SerializedMmlVisitor();
const toMML = (node) => visitor.visitTree(node, html);

//
// A function to typeset the math as MathML (so speech can be attached).
//
let mathItem;
function renderMathML(math, doc) {
  mathItem = math; // save  to be able to access this later.
  const adaptor = doc.adaptor;
  const mml = toMML(math.root);
  math.typesetRoot = adaptor.firstChild(adaptor.body(adaptor.parse(mml, 'text/html')))
}

//
//  The user's configuration object.
//
const CONFIG = window.MathJax?.config || window.MathJax || {};

//
//  The global MathJax object
//
window.MathJax = {
  version: mathjax.version,   // the MathJax version
  html: html,                 // in case the caller needs the MathDocument

  //
  // Create a serialized MathML verson of the TeX expression with speech/Braille labels.
  //
  async toSpeechMML(tex, options) {
    //
    // Merge the caller's options into the default options.
    //
    options = Object.assign({
      display: true,
      latex: false,
      speech: true,
      braille: true,
      entities: true,
    }, options);
    //
    // Set the document options for speecha dn Braille.
    //
    Object.assign(html.options, {
      enableSpeech: options.speech,
      enableBraille: options.braille,
    });
    //
    // Convert the TeX string to a DOM tree.
    //
    const node = await html.convertPromise(tex, {display: options.display});
    //
    // Transfer the speech and Braille.
    //
    const adaptor = html.adaptor;
    const speech = adaptor.getAttribute(node, 'data-semantic-speech-none');
    const braille = adaptor.getAttribute(node, 'data-semantic-braille');
    if (speech) {
      mathItem.root.attributes.set('aria-label', speech);
    }
    if (braille) {
      mathItem.root.attributes.set('aria-braillelabel', braille);
    }
    //
    // Remove any data-semantic, data-latex, or aria-label attributes, if
    // if desired.
    //
    mathItem.root.walkTree((node) => {
      const attributes = node.attributes.getAllAttributes();
      for (const key of Object.keys(attributes)) {
        if (key.startsWith('data-semantic') ||
            (!options.latex && key.startsWith('data-latex')) ||
            key === 'aria-level') {
          delete attributes[key];
        }
      }
    });
    //
    // Serialize the result, and return it.
    //
    let mml = toMML(mathItem.root).replace(/<math (.*?)>/, (_, attr) => {
      attr = attr.replace(/( .+?=".*?")/g, '\n $1');
      return `<math ${attr}>`;
    });
    if (!options.entities) {
      mml = mml.replace(/&#x(.*?);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
    }
    return mml;
  },
}

//
// Perform ready function, if there is one.
//
if (CONFIG.startup?.ready) {
  CONFIG.startup.ready();
}
