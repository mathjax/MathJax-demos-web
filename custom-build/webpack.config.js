const PACKAGE = require('mathjax-full/components/webpack.common.js');

module.exports = PACKAGE(
    'custom-mathjax',                     // the package to build
    '../node_modules/mathjax-full/js',    // location of the MathJax js library
    [],                                   // packages to link to
    __dirname,                            // our directory
    '.'                                   // dist directory
);
