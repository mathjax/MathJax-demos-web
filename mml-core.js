/*************************************************************************
 *
 *  mml-core.js
 *
 *  A utility for converting mathvariant attributes to instead use
 *  uncode Math Alphanumeric characters directly.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2025 The MathJax Consortium
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

export const MmlCore = {

  /**
   * The numeric ranges for numbers, uppercase alphabet, lowercase alphabet,
   * uppercase Greek, and lowercase Greek, with optional remapping of some
   * characters into the (relative) positions used in the Math Alphanumeric block.
   */
  ranges: [
    [0x30, 0x39],
    [0x41, 0x5A],
    [0x61, 0x7A],
    [0x391, 0x3A9, {0x3F4: 0x3A2, 0x2207: 0x3AA}],
    [0x3B1, 0x3C9, {0x2202: 0x3CA, 0x3F5: 0x3CB, 0x3D1: 0x3CC,
                    0x3F0: 0x3CD, 0x3D5: 0x3CE, 0x3F1: 0x3CF, 0x3D6: 0x3D0}],
  ],

  /**
   * The starting values for numbers, Alpha, alpha, Greek, and greek for the variants
   */
  variants: {
    bold: [0x1D7CE, 0x1D400, 0x1D41A, 0x1D6A8, 0x1D6C2],
    italic: [0, 0x1D434, 0x1D44E, 0x1D6E2, 0x1D6FC, {0x68: 0x210E}],
    'bold-italic': [0, 0x1D468, 0x1D482, 0x1D71C, 0x1D736],
    script: [0, 0x1D49C, 0x1D4B6, 0, 0, {
      0x42: 0x212C, 0x45: 0x2130, 0x46: 0x2131, 0x48: 0x210B, 0x49: 0x2110,
      0x4C: 0x2112, 0x4D: 0x2133, 0x52: 0x211B, 0x65: 0x212F, 0x67: 0x210A,
      0x6F: 0x2134,
    }],
    'bold-script': [0, 0x1D4D0, 0x1D4EA, 0, 0],
    fraktur: [0, 0x1D504, 0x1D51E, 0, 0, {
      0x43: 0x212D, 0x48: 0x210C, 0x49: 0x2111, 0x52: 0x211C, 0x5A: 0x2128,
    }],
    'bold-fraktur': [0, 0x1D56C, 0x1D586, 0, 0],
    'double-struck': [0x1D7D8, 0x1D538, 0x1D552, 0, 0, {
      0x43: 0x2102, 0x48: 0x210D, 0x4E: 0x2115, 0x50: 0x2119, 0x51: 0x211A,
      0x52: 0x211D, 0x5A: 0x2124,
      0x393: 0x213E, 0x3A0: 0x213F, 0x3B3: 0x213D, 0x3C0: 0x213C,
    }],
    'sans-serif': [0x1D7E2, 0x1D5A0, 0x1D5BA, 0, 0],
    'bold-sans-serif': [0x1D7EC, 0x1D5D4, 0x1D5EE, 0x1D756, 0x1D770],
    'sans-serif-italic': [0, 0x1D608, 0x1D622, 0, 0],
    'sans-serif-bold-italic': [0, 0x1D63C, 0x1D656, 0x1D790, 0x1D7AA],
    monospace: [0x1D7F6, 0x1D670, 0x1D68A, 0, 0],
    '-tex-calligraphic': [0, 0x1D49C, 0x1D4B6, 0, 0, {
      0x42: 0x212C, 0x45: 0x2130, 0x46: 0x2131, 0x48: 0x210B, 0x49: 0x2110,
      0x4C: 0x2112, 0x4D: 0x2133, 0x52: 0x211B, 0x65: 0x212F, 0x67: 0x210A,
      0x6F: 0x2134,
    }, '\uFE00'],
    '-tex-bold-calligraphic': [0, 0x1D4D0, 0x1D4EA, 0, 0, {}, '\uFE00'],
    '-tex-mathit': [0, 0x1D434, 0x1D44E, 0x1D6E2, 0x1D6FC, {0x68: 0x210E}],
  },

  /**
   * Styles to use for characters that can't be translated.
   */
  variantStyles: {
    bold: 'font-weight: bold',
    italic: 'font-style: italic',
    'bold-italic': 'font-weight; bold; font-style: italic',
    'script': 'font-family: cursive',
    'bold-script': 'font-family: cursive; font-weight: bold',
    'sans-serif': 'font-family: sans-serif',
    'bold-sans-serif': 'font-family: sans-serif; font-weight: bold',
    'sans-serif-italic': 'font-family: sans-serif; font-style: italic',
    'sans-serif-bold-italic': 'font-family: sans-serif; font-weight: bold; font-style: italic',
    'monospace': 'font-family: monospace',
    '-tex-mathit': 'font-style: italic',
  },

  /**
   * Convert mathvariants to Unicode MathAlphanumerics.
   *
   * @param {MmlNode} root   The internal-format math node whose tree is
   *                         to be processed
   */
  unicodeVariants(root) {
    if (!document.querySelector('#mmlcore').checked) return;
    //
    // Walk the MathML tree for token nodes with mathvariant attributes.
    //
    root.walkTree((node) => {
      if (!node.isToken || !node.attributes.isSet('mathvariant')) return;
      //
      // Get the variant and the unicode characters of the element.
      //
      const variant =
            node.attributes.get('data-mjx-variant') ?? node.attributes.get('mathvariant');
      const text = [...node.getText()];
      //
      // Skip the only valid case in MathML-Core and any invalid variants.
      //
      if (variant === 'normal' && node.isKind('mi') && text.length === 1) return;
      node.attributes.unset('mathvariant');
      node.attributes.unset('data-mjx-mathvariant');
      if (!Object.hasOwn(this.variants, variant)) return;
      //
      // Get the variant data.
      //
      const start = this.variants[variant];
      const remap = start[5] || {};
      const modifier = start[6] || '';
      //
      // Convert the text of the child nodes.
      //
      let converted = true;
      for (const child of node.childNodes) {
        if (child.isKind('text')) {
          converted &= this.convertText(child, start, remap, modifier);
        }
      }
      //
      // If not all characters were converted, add styles, if possible,
      // but not when it would already be in italics.
      //
      if (!converted &&
          !(['italic', '-tex-mathit'].includes(variant) && text.length === 1 && node.isKind('mi'))) {
        this.addStyles(node, variant);
      }
    });
  },

  /**
   *  Convert the content of a text node to Math Alphanumerics.
   *
   * @param {MmlNode} node     The text node to convert
   * @param {number[]} start   The starting positions for the character classes
   *                           for this variant
   * @param {object} remap     Special character remapping
   * @param {string} modifier  The modifier character to add (for Calligraphic)
   * @returns {boolean}        True if all characters were able to be converted
   */
  convertText(node, start, remap, modifier) {
    //
    // Get the text.
    //
    const text = [...node.getText()]
    //
    // Loop through the characters in the text.
    //
    let converted = 0;
    for (let i = 0; i < text.length; i++) {
      const C = text[i].codePointAt(0);
      //
      // Check if the character is in one of the ranges.
      //
      for (const j of [0, 1, 2, 3, 4]) {
        const [m, M, map = {}] = this.ranges[j];
        if (!start[j]) continue;
        if (C < m) break;
        //
        // Set the new character based on the remappings and
        // starting location for the range.
        //
        if (map[C]) {
          text[i] = String.fromCodePoint(map[C] - m + start[j]) + modifier;
          converted++;
          break;
        } else if (remap[C] || C <= M) {
          text[i] = String.fromCodePoint(remap[C] || C - m + start[j]) + modifier;
          converted++;
          break;
        }
      }
    }
    //
    // Put back the modified text content.
    //
    node.setText(text.join(''));
    //
    // Return true if all characters were converted, false otherwise.
    //
    return converted === text.length;
  },

  /**
   * Add styles when conversion isn't possible.
   *
   * @param {MmlNode} node     The element to get the styles
   * @param {string} variant   The variant for that node
   */
  addStyles(node, variant) {
    let styles = this.variantStyles[variant];
    if (styles) {
      if (node.attributes.hasExplicit(styles)) {
        styles = node.attributes.get('style') + ' ' + styles;
      }
      node.attributes.set('style', styles);
    }
  },
};
