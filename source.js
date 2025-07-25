(() => {
  const control = document.createElement('div');
  control.style = 'text-align: right; margin: 1em 0; padding-right: 2em;';
  control.innerHTML = '<input type="button" value="Show Source" onclick="showSource()" />';
  const button = control.firstChild;
  document.body.append(control);
  
  const source = document.createElement('div');
  source.style.display = 'none';
  source.style.overflow = 'hidden';
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
    code.appendChild(document.createTextNode(`<${root}>\n`));
    for (const node of nodes) {
      const outer = node.classList.contains('outer') || ['SCRIPT', 'STYLE'].includes(node.nodeName);
      node.classList.remove('show');
      node.classList.remove('outer');
      if (node.className === '') node.removeAttribute('class');
      let content = (outer ? node.outerHTML : node.innerHTML).replace(/^\n+/, '').replace(/\n+$/, '');
      if (node.nodeName === 'SCRIPT') {
        content = content.replace(/=""/g, '');
      } else {
        content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      }
      code.append(document.createTextNode('  ' + content + '\n'));
    }
    code.append(document.createTextNode(`</${root}>\n`));
    if (root !== 'body') {
      code.append(document.createElement('hr'));
    }
  }

  let oldTop;

  window.showSource = () => {
    if (source.style.display) {
      oldTop = window.pageYOffset;
      source.style.display = '';
      source.animate([{height: 0}, {height: source.offsetHeight + 'px'}], {duration: 300, easing: 'ease-in-out', fill: 'backwards'});
      setTimeout(() => {
        window.scrollTo({top: source.offsetTop - 50, behavior: 'smooth'});
        button.value = 'Hide Source';
      }, 300);
    } else {
      window.scrollTo({top: oldTop, behavior: 'smooth'});
      source.animate([{height: source.offsetHeight + 'px'}, {height: 0}], {duration: 300, easing: 'ease-in-out', fill: 'backwards'});
      setTimeout(() => {
        source.style.display = 'none';
        button.value = 'Show Source';
      }, 290);
    }
  }
})();
