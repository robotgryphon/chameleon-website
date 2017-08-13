var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './index.es6',
    output: {
        filename: '../functions/index.js'
    },

    resolve: {
        extensions: [ '.es6', '.js', '.html' ]
    },

    module: {
        rules: [
            {
                test: /\.es6?$/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        // This plugin will copy files over for us without transforming them.
        // That's important because the custom-elements-es5-adapter.js MUST
        // remain in ES2015.
        new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, 'templates'),
            to: 'templates/'
        }
        ])
    ]
}