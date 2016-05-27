/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var vendors = require('./vendors.json');

module.exports = {
  entry: {
    vendors: vendors,
  },
  output: {
    path: path.join(__dirname, '../../dist/client/prod/vendors'),
    filename: 'dashboard.vendors.[hash].js',
    library: 'worona_vendors',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../../dist/client/prod/vendors/vendors-manifest.json'),
      name: 'worona_vendors',
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin({
      filename: 'vendors-hash.json',
      path: path.join(__dirname, '../../dist/client/prod/vendors'),
    }),
  ],
};
