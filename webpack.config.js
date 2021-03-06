var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

// 環境情報から状態を判定
var PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: "./js/index.jsx",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader?name=images/[name].[ext]',
      }
    ]
  },
  plugins: PROD ? [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ] : [
    new ExtractTextPlugin('style.css'),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^.*$/,
          to: '/index.html',
        }
      ]
    }
  },
  devtool: PROD ? 'source-map' : 'inline-source-map'
};
