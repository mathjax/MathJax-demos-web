# [v2-script-tags.html](https://mathjax.github.io/MathJax-demos-web/v2-script-tags.html)

This example shows how to process a complete HTML page containing MathJax version 2 styled `<script>` tags (that store the math content in the page).  In version 2, these `<script>` tags are generated automatically by the `tex2jax` or other pre-processors, but they could also be created by other software that generates the page so as to avoid the need for the pre-processing step.

MathJax version 3 does not look for such `<script>` tags itself, but you can implement it yourself, as in this example.

The key lines are

``` html
  <script>
  MathJax = {
    options: {
      renderActions: {
        find: [10, function (doc) {
          for (const node of document.querySelectorAll('script[type^="text/tex"]')) {
            const display = !!node.type.match(/; *mode=display/);
            const math = new doc.options.MathItem(node.textContent, doc.inputJax[0], display);
            const text = document.createTextNode('');
            node.parentNode.replaceChild(text, node);
            math.start = {node: text, delim: '', n: 0};
            math.end = {node: text, delim: '', n: 0};
            doc.math.push(math);
          }
        }, '']
      }
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which set up a `renderAction` that replaces the usual page-search action (the `find` action at priority 10) with one that searches for `<script>` tags with `type="math/tex"` (or `type="math/tex; mode=display"`), and creates the needed `MathItem` instances for them.  The `<script>` tags are replaced by empty text nodes, and the math item refers to these for its starting and ending locations.

[Run the example](https://mathjax.github.io/MathJax-demos-web/v2-script-tags.html)
