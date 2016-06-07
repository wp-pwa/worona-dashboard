/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('../../vendors/vendors.json');
var worona = require('./package.json').worona;
var rimraf = require('rimraf');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

var finalPath = path.join(__dirname, '../../../dist', worona.type + 's', worona.slug);
rimraf.sync(finalPath);

module.exports = {
  entry: {
    main: path.join(__dirname, 'extension.js'),
  },
  output: {
    path: finalPath + '/[hash]',
    publicPath: 'https://cdn.worona.io/' + worona.type + 's/' + worona.service + '/' + worona.slug + '/[hash]/',
    filename: worona.type + '.js',
    library: worona.slug,
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[filename]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[filename]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[filename]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('../../../dist/client/prod/vendors/vendors-manifest.json')
    }),
    new StatsWriterPlugin({
      filename: 'stats.json',
      fields: null,
      transform: function (data) {
        return JSON.stringify(data, null, 2);
      }
    }),
    new CopyWebpackPlugin([{ from: 'package.json' }]),
  ]
};
