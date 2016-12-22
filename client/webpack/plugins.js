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
    context: path.resolve('packages/vendors-' + config.entrie + '-worona'),
    manifest: require('../dist/vendors-' + config.entrie + '-worona/' + config.entrie + '/' + config.env + '/json/manifest.json'),
  });
};

var dllPlugin = function(config) {
  return new webpack.DllPlugin({
    // context: path.resolve('packages', 'core-' + config.entrie + '-worona'),
    path: path.resolve('..', '..', 'dist', config.name, config.entrie, config.env, 'json', 'manifest.json'),
    name: 'vendors_' + config.entrie + '_worona',
  });
};

var fixModuleIdAndChunkIdPlugin = function() {
  return new FixModuleIdAndChunkIdPlugin();
};

var contextReplacementPlugin = function() {
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/);
}

var statsWriterPlugin = function(config) {
  var output = { files: [] };
  return new StatsWriterPlugin({
    filename: config.name + '/' + config.entrie + '/' + config.env + '/files.json',
    fields: ['assets', 'chunks'],
    transform: function (data) {
      data.assets.forEach(function(asset) {
        if (asset.name !== 'html/index.html') {
          var hash;
          try {
            hash = /\.([a-z0-9]{32})\.\w+?$/.exec(asset.name)[1];
          } catch (error) {
            throw new Error('Hash couldn\'t be extracted from ' + asset.name);
          }
          var filepath = asset.name;
          output.files.push({
            file: filepath,
            filename: /(.+\/)?(.+)$/.exec(asset.name)[2],
            hash: hash,
          });
        }
      });
      data.chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file, index) {
          if (chunk.names[index] === 'main')
            output.main = {
              file: file,
              filename: /(.+\/)?(.+)$/.exec(file)[2],
              hash: chunk.hash,
            };
        });
      });
      return JSON.stringify(output, null, 2);
    }
  });
};

var htmlWebpackPlugin = function(config) {
  var publicPath = config.remote ? 'https://cdn.worona.io/' : 'http://localhost:4000/';
  var vendors = require('../dist/vendors-' + config.entrie + '-worona/' + config.entrie + '/' + config.env + '/files.json')
  return new HtmlWebpackPlugin({
    inject: false,
    title: 'Worona Dashboard (DEV)',
    template: path.resolve('html', 'index.html'),
    favicon: path.resolve('html', 'favicon.png'),
    vendorsFile: vendors.main.file,
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
  statsWriterPlugin: statsWriterPlugin,
  fixModuleIdAndChunkIdPlugin: fixModuleIdAndChunkIdPlugin,
  htmlWebpackPlugin: htmlWebpackPlugin,
  contextReplacementPlugin: contextReplacementPlugin,
};
