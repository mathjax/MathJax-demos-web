/*************************************************************************
 *
 *  source.js
 *
 *  A utility to add a "Show Source" button to the MathJax demo files.
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

(() => {
  const makeTag = (name) => {
    const tag = document.createElement('code-tag');
    tag.textContent = `<${name}>\n`;
    return tag;
  };

  const colorScript = (script) => {
    script = script.replace(/( |^)(\/\/.*?)\n/gm, '$1<code-comment>$2</code-comment>\n');
    script = script.replace(/(\/\*[^]*?\*\/)\n/g, '<code-comment>$1</code-comment>\n');
    script = script.replace(/('(?:\.|.)*?')/g, '<code-string>$1</code-string>');
    script = script.replace(/("(?:\.|.)*?")/g, '<code-string>$1</code-string>');
    return script;
  }

  window.colorizeContent = (content, isScript = false) => {
    if (!isScript) {
      content = content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
    content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    content = content.replace(/(&lt;!--[^]*--&gt;)/g, '<code-comment>$1</code-comment>');
    content = content.replace(/&lt;\/?[a-zA-Z].*?&gt;/g, (tag) => {
      tag = tag.replace(/([^ ]+?)="([^]*?)"/g, '<code-attr>$1="<code-value>$2</code-value>"</code-attr>');
      tag = tag.replace(/="<code-value><\/code-value>"/g, '');
      return `<code-tag>${tag}</code-tag>`;
    });
    if (isScript) {
      content = colorScript(content);
    } else {
      content = content.replace(/(&lt;textarea.*?&gt;)/g, '$1\n');
      content = content.replace(/&lt;script&gt;([^]*?)&lt;\/script&gt;/g, (match, script) => {
        script = colorScript(script);
        return `&lt;script&gt;${script}&lt;/script&gt;`;
      });
    }
    return content;
  };

  const makePre = (node, code, isScript) => {
    const pre = document.createElement('pre');
    pre.classList.add('code');
    pre.classList.add('minimum');
    pre.innerHTML = colorizeContent(code, isScript);
    node.replaceWith(pre);
  }

  window.colorizeCode = () => {
    const nodes = Array.from(document.querySelectorAll('script[type="text/x-colorize-code"]'));
    for (const node of nodes) {
      const text = node.textContent.replace(/^\n/, '');
      makePre(node, text, !node.classList.contains('html'));
    }
  }

  window.loadCode = async () => {
    const nodes = Array.from(document.querySelectorAll('script[type="text/x-load-code"]'));
    for (const node of nodes) {
      const response = await fetch(node.src);
      if (response.ok) {
        const text = await response.text();
        makePre(node, text, true);
      }
    }
  }

  const control = document.createElement('div');
  control.id = 'hide-show';
  control.style = 'text-align: right; margin: 1em 0; padding-right: 2em;';
  control.innerHTML = '<input type="button" value="Show Source" onclick="showSource()" />';
  const button = control.firstChild;
  const frame = document.querySelector('#frame');
  (frame ?? document.body).append(control);
  
  const source = document.createElement('div');
  source.id = 'source-frame';
  source.style.display = 'none';
  source.style.overflow = 'hidden';
  if (frame) {
    source.classList.add('minimum');
  }
  document.body.append(source);
  
  const explain = document.createElement('div');
  source.append(explain);
  
  const nodes = document.body.querySelectorAll('.explain');
  if (nodes.length) {
    for (let node of nodes) {
      node.classList.remove('explain');
      source.append(node);
    }
  }

  const code = document.createElement('pre');
  code.className = 'code';
  source.append(code);
  
  for (const root of ['head', 'body']) {
    const nodes = document[root].querySelectorAll('.show')
    if (!nodes.length) continue;
    code.appendChild(makeTag(root));
    for (const node of nodes) {
      const outer = node.classList.contains('outer') || ['SCRIPT', 'STYLE'].includes(node.nodeName);
      const isScript = node.nodeName === 'SCRIPT';
      node.classList.remove('show');
      node.classList.remove('outer');
      if (node.className === '') node.removeAttribute('class');
      const content = colorizeContent(
        (outer ? node.outerHTML : node.innerHTML).replace(/^\n+/, '').replace(/\n+$/, '')
      );
      const div = document.createElement('div');
      div.innerHTML = `  ${content}\n`; 
      code.append(div);
    }
    code.append(makeTag(`/${root}`));
    if (root !== 'body') {
      code.append(document.createElement('hr'));
    }
  }

  colorizeCode();

  if (typeof(MathJax) === 'undefined') window.MathJax = {};
  if (!MathJax.startup) MathJax.startup = {};
  const ready = MathJax.startup.ready || (() => MathJax.startup.defaultReady())
  MathJax.startup.ready = async () => {
    await ready();
    await MathJax.startup.promise;
    loadCode();
  };

  let oldTop;

  window.showSource = () => {
    if (source.style.display) {
      oldTop = window.pageYOffset;
      source.style.display = '';
      source.animate(
        [{height: 0}, {height: source.offsetHeight + 'px'}],
        {duration: 300, easing: 'ease-in-out', fill: 'backwards'}
      );
      setTimeout(() => {
        window.scrollTo({top: source.offsetTop - 50, behavior: 'smooth'});
        button.value = 'Hide Source';
      }, 300);
    } else {
      window.scrollTo({top: oldTop, behavior: 'smooth'});
      source.animate(
        [{height: source.offsetHeight + 'px'}, {height: 0}],
        {duration: 300, easing: 'ease-in-out', fill: 'backwards'}
      );
      setTimeout(() => {
        source.style.display = 'none';
        button.value = 'Show Source';
      }, 290);
    }
  }
})();
