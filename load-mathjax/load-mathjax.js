(() => {
  //
  // Check for <math> elements and the standard TeX math delimiters
  //
  if (document.body.querySelector('math') ||
      document.body.textContent.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
    //
    // If there isn't already a MathJax configuration, make one
    //
    if (!window.MathJax) {
      window.MathJax = {
        tex: {inlineMath: {'[+]': [['$', '$']]}}
      };
    }
    //
    // Create a script to load MathJax
    //
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-rc.4/tex-mml-chtml.js';
    document.head.appendChild(script);
  }
})();
