//
//  Initialize the MathJax startup code
//
require('mathjax3/components/src/startup/lib/startup.js');

//
//  Get the loader module and indicate the modules that
//  will be loaded by hand below
//
const {Loader} = require('mathjax3/mathjax3/components/loader.js');
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
// adjust the mathjax path to be the mathjax3 directory in
// this repository rather than the custom-component directory
// where this file lives.
//
const paths = MathJax.config.loader.paths;
paths.mathjax = paths.mathjax.replace(/\/custom-component$/,'/mathjax3');

//
// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call above)
//
require('mathjax3/components/src/core/core.js');

require('mathjax3/components/src/input/tex-base/tex-base.js');
require('mathjax3/components/src/input/tex/extensions/newcommand/newcommand.js');
require('mathjax3/components/src/input/tex/extensions/action/action.js');
MathJax.config.tex.packages.push('newcommand', 'action'); // add these to the tex packages to register

require('mathjax3/components/src/output/chtml/chtml.js');
require('mathjax3/components/src/output/chtml/fonts/tex/tex.js');

//
// Loading this component will cause all the normal startup operations to be
//   performed when this component is loaded.
//
require('mathjax3/components/src/startup/startup.js');
