const PACKAGE = require('mathjax3/components/webpack.common.js');

module.exports = PACKAGE(
    'mml',                                // the package to build
    '../node_modules/mathjax3/mathjax3',  // location of the mathjax3 library
    [                                     // packages to link to
        'components/src/core/lib',
        'components/src/input/tex/lib'
    ],
    __dirname,                            // our directory
    '.'                                   // dist directory
);
