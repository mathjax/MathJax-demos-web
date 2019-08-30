(function () {
  if (document.body.querySelector('math') ||
      document.body.textContent.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: {'[+]': [['$', '$']]}
        }
      };
    }
    var script = document.createElement('script');
    script.src = 'mathjax3/tex-mml-chtml.js';
    document.head.appendChild(script);
  }
})();
