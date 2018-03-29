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
  return {
    name: name,
    entry: './mj3-' + name + '.js',
    output: {
        path: __dirname,
        filename: 'mj3-' + name + '.dist.js'
    },
    module: MODULE(),
    plugins: PLUGINS()
  }
}

//
//  The four main configurations
//
const mml2html = CONFIG('mml2html');
const tex2html = CONFIG('tex2html');
const mml2htmlglobal = CONFIG('mml2html-global');
const tex2htmlglobal = CONFIG('tex2html-global');

//
//  Compile all four
//
module.exports = [mml2html, tex2html, mml2htmlglobal, tex2htmlglobal];

// OR compile one configuration, e.g.,:
// module.exports = tex2html;
