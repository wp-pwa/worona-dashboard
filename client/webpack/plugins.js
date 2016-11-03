/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FixModuleIdAndChunkIdPlugin = require('fix-moduleid-and-chunkid-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var definePlugin = function(config) {
  var nodeEnv = config.env === 'dev' ? 'development' : 'production';
  return new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(nodeEnv) } });
};

var lodashModuleReplacementPlugin = function() {
  return new LodashModuleReplacementPlugin({
    currying: true,
    flattening: true,
    placeholders: true,
    collections: true,
  });
};

var uglifyJsPlugin = function(config) {
  if (config.env === 'prod')
    return new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } });
};

var dedupePlugin = function(config) {
  if (config.env === 'prod')
    return new webpack.optimize.DedupePlugin();
};

var occurrenceOrderPlugin = function(config) {
  if (config.env === 'prod')
    return new webpack.optimize.OccurrenceOrderPlugin();
};

var extractTextPlugin = function(config) {
  if (config.env === 'prod')
    return new ExtractTextPlugin('css/' + config.name + '.[contenthash].css');
};

var dllReferencePlugin = function(config) {
  return new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('../dist/vendors-' + config.entrie + '-worona/' + config.entrie +
      '/' + config.env + '/json/manifest.json'),
  });
};

var dllPlugin = function(config) {
  return new webpack.DllPlugin({
    path: path.resolve('dist', config.name, config.entrie, config.env, 'json', 'manifest.json'),
    name: 'vendors_' + config.entrie + '_worona',
  });
};

var fixModuleIdAndChunkIdPlugin = function() {
  return new FixModuleIdAndChunkIdPlugin();
};

var contextReplacementPlugin = function() {
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/);
}

var htmlWebpackPlugin = function(config) {
  var publicPath = config.remote ? 'https://cdn.worona.io/' : 'http://localhost:4000/';
  return new HtmlWebpackPlugin({
    inject: false,
    title: 'Worona Dashboard (DEV)',
    template: path.resolve('html', 'index.html'),
    favicon: path.resolve('html', 'favicon.png'),
    vendorsFile: 'vendors-' + config.entrie + '-worona/' + config.entrie + '/' + config.env + '/js/vendors-dashboard.js',
    devServer: 'http://localhost:4000',
    window: {
      publicPath: publicPath,
      __worona__: { [config.env]: true, remote: config.location === 'remote' },
    },
    appMountId: 'root',
    minify: { preserveLineBreaks: true, collapseWhitespace: true },
  });
};

module.exports = {
  definePlugin: definePlugin,
  lodashModuleReplacementPlugin: lodashModuleReplacementPlugin,
  uglifyJsPlugin: uglifyJsPlugin,
  dedupePlugin: dedupePlugin,
  occurrenceOrderPlugin: occurrenceOrderPlugin,
  extractTextPlugin: extractTextPlugin,
  dllReferencePlugin: dllReferencePlugin,
  dllPlugin: dllPlugin,
  fixModuleIdAndChunkIdPlugin: fixModuleIdAndChunkIdPlugin,
  htmlWebpackPlugin: htmlWebpackPlugin,
  contextReplacementPlugin: contextReplacementPlugin,
};
