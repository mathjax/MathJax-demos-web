/*************************************************************
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


/**
 * @fileoverview  Configuration file for sample extension that creates
 *                some MathML token elements.
 *
 * @author dpvc@mathjax.org (Davide P. Cervone)
 */

import {Configuration}  from '../node_modules/mathjax-full/js/input/tex/Configuration.js';
import {CommandMap} from '../node_modules/mathjax-full/js/input/tex/SymbolMap.js';
import TexError from '../node_modules/mathjax-full/js/input/tex/TexError.js';

/**
 * This function prevents multi-letter mi elements from being
 *   interpretted as TEXCLASS.OP
 */
function classORD(node) {
  this.getPrevClass(node);
  return this;
}

/**
 *  Convert \uXXXX to corresponding unicode characters within a string
 */
function convertEscapes(text) {
  return text.replace(/\\u([0-9A-F]{4})/gi, (match, hex) => String.fromCharCode(parseInt(hex,16)));
}

/**
 * Allowed attributes on any token element other than the ones with default values
 */
const ALLOWED = {
  style: true,
  href: true,
  id: true,
  class: true
};

/**
 * Parse a string as a set of attribute="value" pairs.
 */
function parseAttributes(text, type) {
  const attr = {};
  if (text) {
    let match;
    while ((match = text.match(/^\s*((?:data-)?[a-z][-a-z]*)\s*=\s*(?:"([^"]*)"|(.*?))(?:\s+|,\s*|$)/i))) {
      const name = match[1], value = match[2] || match[3]
      if (type.defaults.hasOwnProperty(name) || ALLOWED.hasOwnProperty(name) || name.substr(0,5) === 'data-') {
        attr[name] = convertEscapes(value);
      } else {
        throw new TexError('BadAttribute', 'Unknown attribute "%1"', name);
      }
      text = text.substr(match[0].length);
    }
    if (text.length) {
      throw new TexError('BadAttributeList', 'Can\'t parse as attributes: %1', text);
    }
  }
  return attr;
}

/**
 *  The mapping of control sequence to function calls
 */
const MmlMap = new CommandMap('mmlMap', {
  mi: ['mmlToken', 'mi'],
  mo: ['mmlToken', 'mo'],
  mn: ['mmlToken', 'mn'],
  ms: ['mmlToken', 'ms'],
  mtext: ['mmlToken', 'mtext']
}, {
  mmlToken(parser, name, type) {
    const typeClass = parser.configuration.nodeFactory.mmlFactory.getNodeClass(type);
    const def = parseAttributes(parser.GetBrackets(name), typeClass);
    const text = convertEscapes(parser.GetArgument(name));
    const mml = parser.create('node', type, [parser.create('text', text)], def);
    if (type === 'mi') mml.setTeXclass = classORD;
    parser.Push(mml);
  }
});

/**
 * The configuration used to enable the MathML macros
 */
const MmlConfiguration = Configuration.create(
  'mml', {handler: {macro: ['mmlMap']}}
);
