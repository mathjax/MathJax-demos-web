import {insert} from '@mathjax/src/js/util/Options.js';

//
// Insert the path to the MathJax distribution, if there isn't one already.
//
insert(MathJax.config, {
  loader: {
    paths: {
      mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-rc.4',
    }
  }
});
