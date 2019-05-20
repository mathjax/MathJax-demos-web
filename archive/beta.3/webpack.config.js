const path = require('path');
const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

const PLUGINS = function () {
    return [
        // NOTE: for minifcation
        new Uglify({
            uglifyOptions: {
                ie8: true
            }
        }),
        // NOTE: to disable asyncLoad()
        new webpack.NormalModuleReplacementPlugin(
            /AsyncLoad\.js/,
            function (resource) {
                resource.request = resource.request.replace(/AsyncLoad/,"AsyncLoad-disabled");
            }
        )
    ]
};

const MODULE = function () {
    return {
        // NOTE: for babel transpilation
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};

//
//  Create a configuration for a distribution file
//
const CONFIG = function (name) {
    const dir = __dirname + '/' + name.replace(/-.*/,'');
    return {
        name: name,
        entry: dir + '/mj3-' + name + '.js',
        output: {
            path: dir,
            filename: 'mj3-' + name + '.dist.js'
        },
        module: MODULE(),
        plugins: PLUGINS(),
        performance: {
            hints: false
        },
        mode: 'production'
    };
}

//
//  The four main configurations
//
const mml2htmlsimple = CONFIG('mml2html-simple');
const tex2htmlsimple = CONFIG('tex2html-simple');
const mml2htmlglobal = CONFIG('mml2html-global');
const tex2htmlglobal = CONFIG('tex2html-global');
const mml2htmlbeta   = CONFIG('mml2html-beta');
const tex2htmlbeta   = CONFIG('tex2html-beta');

const mml2svgsimple = CONFIG('mml2svg-simple');
const tex2svgsimple = CONFIG('tex2svg-simple');
const mml2svgglobal = CONFIG('mml2svg-global');
const tex2svgglobal = CONFIG('tex2svg-global');
const mml2svgbeta   = CONFIG('mml2svg-beta');
const tex2svgbeta   = CONFIG('tex2svg-beta');

//
//  Compile all configurations
//
module.exports = [
    mml2htmlsimple,
    mml2htmlglobal,
    mml2htmlbeta,

    tex2htmlsimple,
    tex2htmlglobal,
    tex2htmlbeta,

    mml2svgsimple,
    mml2svgglobal,
    mml2svgbeta,

    tex2svgsimple,
    tex2svgglobal,
    tex2svgbeta
];

// OR compile one configuration, e.g.,:
// module.exports = tex2html;
