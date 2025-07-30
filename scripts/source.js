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

window.Colorize = {
  makeTag(name) {
    const tag = document.createElement('code-tag');
    tag.textContent = `<${name}>\n`;
    return tag;
  },

  Script(script) {
    script = script.replace(/( |^)(\/\/.*?)\n/gm, '$1<code-comment>$2</code-comment>\n');
    script = script.replace(/(\/\*[^]*?\*\/)\n/g, '<code-comment>$1</code-comment>\n');
    script = script.replace(/('(?:\.|.)*?')/g, '<code-string>$1</code-string>');
    script = script.replace(/("(?:\.|.)*?")/g, '<code-string>$1</code-string>');
    return script;
  },

  Content(content, isScript = false) {
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
      content = Colorize.Script(content);
    } else {
      content = content.replace(/(&lt;textarea.*?&gt;)/g, '$1\n');
      content = content.replace(/&lt;script&gt;([^]*?)&lt;\/script&gt;/g, (match, script) => {
        script = Colorize.Script(script);
        return `&lt;script&gt;${script}&lt;/script&gt;`;
      });
    }
    return content;
  },

  makePre(node, code, isScript) {
    const pre = document.createElement('pre');
    pre.classList.add('code');
    pre.classList.add('minimum');
    pre.innerHTML = Colorize.Content(code, isScript);
    node.replaceWith(pre);
    return pre;
  },

  makeDetails(node, code, isScript) {
    const pre = this.makePre(node, code, isScript);
    const div = document.createElement('div');
    const details = div.appendChild(document.createElement('details'));
    const summary = details.appendChild(document.createElement('summary'));
    summary.innerHTML = node.getAttribute('src') + ' &nbsp; <i>(click to show/hide code)</i>';
    div.classList.add('indent');
    pre.replaceWith(div);
    details.append(pre);
  },

  Code(container) {
    const nodes = Array.from(container.querySelectorAll('script[type="text/x-colorize-code"]'));
    for (const node of nodes) {
      const text = node.textContent.replace(/^\n/, '');
      this.makePre(node, text, !(['html','shell'].includes(node.className)));
    }
  },

  async Load(container) {
    const nodes = Array.from(container.querySelectorAll('script[type="text/x-load-code"]'));
    for (const node of nodes) {
      const response = await fetch(node.src);
      if (response.ok) {
        const text = await response.text();
        this.makeDetails(node, text, true);
      }
    }
  },

  Source(code) {
    for (const root of ['head', 'body']) {
      const nodes = document[root].querySelectorAll('.show')
      if (!nodes.length) continue;
      code.appendChild(this.makeTag(root));
      for (const node of nodes) {
        const outer = node.classList.contains('outer') || ['SCRIPT', 'STYLE'].includes(node.nodeName);
        const isScript = node.nodeName === 'SCRIPT';
        node.classList.remove('show');
        node.classList.remove('outer');
        if (node.className === '') node.removeAttribute('class');
        const content = Colorize.Content(
          (outer ? node.outerHTML : node.innerHTML).replace(/^\n+/, '').replace(/\n+$/, '')
        );
        const div = document.createElement('div');
        div.innerHTML = `  ${content}\n`; 
        code.append(div);
      }
      code.append(this.makeTag(`/${root}`));
      if (root !== 'body') {
        code.append(document.createElement('hr'));
      }
    }
  }
};

window.Source = {
  top: 0,
  source: null,
  button: null,
  
  Init() {
    const control = document.createElement('div');
    control.id = 'hide-show';
    control.style = 'text-align: right; margin: 1em 0; padding-right: 2em;';
    control.innerHTML = '<input type="button" value="Show Source" onclick="Source.HideShow()" />';
    const button = this.button = control.firstChild;
    const frame = document.querySelector('#frame');
    (frame ?? document.body).append(control);
    
    const source = this.source = document.createElement('div');
    source.id = 'source-frame';
    source.style.display = 'none';
    source.style.overflow = 'hidden';
    if (frame) {
      source.classList.add('minimum');
    }
    document.body.append(source);
    
    this.moveExplains(source);
    
    const code = document.createElement('pre');
    code.className = 'code';
    source.append(code);
    
    Colorize.Source(code);
    Colorize.Code(source);

    Source.addReady();
  },

  moveExplains(source) {
    const explain = document.createElement('div');
    source.append(explain);
    
    const nodes = document.body.querySelectorAll('.explain');
    if (nodes.length) {
      for (let node of nodes) {
        node.classList.remove('explain');
        source.append(node);
      }
    }
  },

  addReady() {
    if (typeof(MathJax) === 'undefined') window.MathJax = {};
    if (!MathJax.startup) MathJax.startup = {};
    const ready = MathJax.startup.ready || (() => MathJax.startup.defaultReady());
    MathJax.startup.ready = async () => {
      await ready();
      if (MathJax.startup?.promise) {
        await MathJax.startup.promise;
      }
      await Colorize.Load(Source.source);
    };
  },

  HideShow() {
    const source = this.source;
    if (source.style.display) {
      Source.top = window.pageYOffset;
      source.style.display = '';
      source.animate(
        [{height: 0}, {height: source.offsetHeight + 'px'}],
        {duration: 300, easing: 'ease-in-out', fill: 'backwards'}
      );
      setTimeout(() => {
        window.scrollTo({top: source.offsetTop - 50, behavior: 'smooth'});
        this.button.value = 'Hide Source';
      }, 300);
    } else {
      window.scrollTo({top: Source.top, behavior: 'smooth'});
      source.animate(
        [{height: source.offsetHeight + 'px'}, {height: 0}],
        {duration: 300, easing: 'ease-in-out', fill: 'backwards'}
      );
      setTimeout(() => {
        source.style.display = 'none';
        this.button.value = 'Show Source';
      }, 290);
    }
  }
};

Source.Init();
