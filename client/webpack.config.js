var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: path.resolve(__dirname, 'src/app.js'),

  // Tell Weback to output our bundle to ./dist/bundle.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'build')
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'bower_components')
    ]
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'babel-loader',
          'polymer-webpack-loader'
        ]        
      },

      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  // Enable the Webpack dev server which will build, serve, and reload our
  // project on changes.
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 80,
    historyApiFallback: true
  },
  plugins: [
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      inject: false
    }),
    // This plugin will copy files over for us without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015.
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
    
      {
        from: path.resolve(__dirname, 'media'),
        to: 'media/'
      },

      {
        from: path.resolve(__dirname, 'src', 'banner.json'),
        to: 'banner.json'
      }
    ])
  ]
};