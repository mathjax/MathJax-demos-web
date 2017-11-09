const path = require('path');

const Uglify = require("uglifyjs-webpack-plugin");

const mmlhtml = {
    name: 'mml2html',
    entry: './mj3-mml2html.js',
    output: {
        path: __dirname,
        filename: 'mj3-mml2html.dist.js'
    },
    module: {
        // NOTE for babel transpilation
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
    },
    plugins: [
        // NOTE for minifcation
        new Uglify({
                    uglifyOptions: {
                        ie8: true
                    }
                }
        )
    ]
}
const texhtml =
{
    name: 'tex2html',
    entry: './mj3-tex2html.js',
    output: {
        path: __dirname,
        filename: 'mj3-tex2html.dist.js'
    },
    module: {
        // NOTE for babel transpilation
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
    },
    plugins: [
        // NOTE for minifcation
        new Uglify({
                    uglifyOptions: {
                        ie8: true
                    }
                }
        )
    ]
}
const mml2htmlglobal =
{
    name: 'global',
    entry: './mj3-mml2html-global.js',
    output: {
        path: __dirname,
        filename: 'mj3-mml2html-global.dist.js'
    },
    module: {
        // NOTE for babel transpilation
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
    },
    plugins: [
        // NOTE for minifcation
        new Uglify({
                    uglifyOptions: {
                        ie8: true
                    }
                }
        )
    ]
}
const tex2htmlglobal =
{
    name: 'global',
    entry: './mj3-tex2html-global.js',
    output: {
        path: __dirname,
        filename: 'mj3-tex2html-global.dist.js'
    },
    module: {
        // NOTE for babel transpilation
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
    },
    plugins: [
        // NOTE for minifcation
        new Uglify({
                    uglifyOptions: {
                        ie8: true
                    }
                }
        )
    ]
}

module.exports = [mmlhtml, texhtml, mml2htmlglobal, tex2htmlglobal];
// OR to compile one configuration:
module.exports = texhtml;
