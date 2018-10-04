/*************************************************************************
 *
 *  mj3-mml2svg-global.js
 *
 *  Uses MathJax v3 to convert a MathML expression to a SVG tree.
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

import {MathML} from 'mathjax3/mathjax3/input/mathml.js';
import {SVG} from 'mathjax3/mathjax3/output/svg.js';
import {HTMLMathItem} from 'mathjax3/mathjax3/handlers/html/HTMLMathItem.js';
import {HTMLDocument} from 'mathjax3/mathjax3/handlers/html/HTMLDocument.js';
import {browserAdaptor} from 'mathjax3/mathjax3/adaptors/browserAdaptor.js';

//
//  Create the input and output jax
//
const mml = new MathML();
const svg = new SVG();

//
//  Make a new HTML Math Document for the browser document
//
const doc = new HTMLDocument(document, browserAdaptor(), {InputJax: mml, OutputJax: svg});

//
//  The MathJax object
//
window.MathJax = {
    //
    //  Return the stylesheet DOM node
    //
    Stylesheet: function () {
        return svg.styleSheet(doc);
    },

    //
    //  Typeset a MathML expression and return the SVG tree for it
    //
    Typeset: function (string, em = 16, ex = 8, cwidth = 80*16) {
        let math = new HTMLMathItem(string, mml);
        math.setMetrics(em, ex, cwidth, 100000, 1);
        math.compile();
        math.typeset(doc);
        return math.typesetRoot;
    }
};
