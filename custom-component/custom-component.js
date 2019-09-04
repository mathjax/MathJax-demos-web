//
//  Initialize the MathJax startup code
//
require('mathjax-full/components/src/startup/lib/startup.js');

//
//  Get the loader module and indicate the modules that
//  will be loaded by hand below
//
const {Loader} = require('mathjax-full/js/components/loader.js');
Loader.preLoad(
    'loader', 'startup',
    'core',
    'input/tex-base',
    '[tex]/newcommand',
    '[tex]/action',
    'output/chtml', 'output/chtml/fonts/tex.js'
);

//
// Because the root URL will be determined from the URL of the
// combined file we load into the web pasge (this file), we
// adjust the mathjax path to be the CDN instead of this directory.
//
const paths = MathJax.config.loader.paths;
paths.mathjax = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5';

//
// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call above)
//
require('mathjax-full/components/src/core/core.js');

require('mathjax-full/components/src/input/tex-base/tex-base.js');
require('mathjax-full/components/src/input/tex/extensions/newcommand/newcommand.js');
require('mathjax-full/components/src/input/tex/extensions/action/action.js');
MathJax.config.tex.packages.push('newcommand', 'action'); // add these to the tex packages to register

require('mathjax-full/components/src/output/chtml/chtml.js');
require('mathjax-full/components/src/output/chtml/fonts/tex/tex.js');

//
// Loading this component will cause all the normal startup operations to be
//   performed when this component is loaded.
//
require('mathjax-full/components/src/startup/startup.js');
