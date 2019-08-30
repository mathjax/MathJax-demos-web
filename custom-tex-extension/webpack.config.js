const PACKAGE = require('mathjax-full/components/webpack.common.js');

module.exports = PACKAGE(
    'mml',                                // the package to build
    '../node_modules/mathjax-full/js',    // location of the MathJax js library
    [                                     // packages to link to
        'components/src/core/lib',
        'components/src/input/tex-base/lib'
    ],
    __dirname,                            // our directory
    '.'                                   // dist directory
);
