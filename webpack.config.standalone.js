/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MODE = process.env.MODE;
var plugins = [];
var devtool = 'eval';
var cssLoader = (MODE === 'production') ? ExtractTextPlugin.extract('css-loader') : 'style-loader!css-loader';
var sassLoader = (MODE === 'production') ? ExtractTextPlugin.extract('css-loader!sass-loader') : 'style-loader!css-loader!sass-loader';

if(MODE === 'production') {
  plugins = plugins.concat([
    new ExtractTextPlugin('bundle.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {comments: false},
      mangle: true
    })
  ]);
} else {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()]);
}

module.exports = {
  entry: './src/standalone',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.min.js',
    publicPath: '/static/'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: cssLoader },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      { test: /\.scss$/, loader: sassLoader }
    ]
  }
};
