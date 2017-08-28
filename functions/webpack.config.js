'use strict';
var nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.es6',
    output: {
        filename: './index.js',
        libraryTarget: 'this'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.es6?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.es6', '.js', '.hbs' ]
    },
    plugins: [
        // Copy the templates over.
        new CopyWebpackPlugin([
            { from: 'templates', to: 'templates' }
        ])
    ],
    externals: [nodeExternals()] // <-- Important
};