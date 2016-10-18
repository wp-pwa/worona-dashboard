/* eslint-disable */
var path = require('path');

var packages = function(config) {
  return {
    path: path.resolve('dist', config.name, config.entrie, config.env),
    publicPath: 'https://cdn.worona.io/packages/dist/' + config.name + '/' + config.entrie + '/' + config.env,
    filename: 'js/' + config.name + '.[chunkhash].js',
    library: config.name.replace('-', '_'),
    libraryTarget: 'commonjs2',
    hashDigestLength: 32,
    chunkFilename: '[name].[chunkhash].js',
  };
};

var core = function(config) {
  return {
    path: path.resolve('dist'),
    filename: config.name + '/' + config.entrie + '/' + config.env + '/js/core-' + config.entrie + '.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  };
};

var vendors = function(config) {
  return {
    path: path.resolve('dist'),
    filename: config.name + '/' + config.entrie + '/' + config.env + '/js/vendors-' + config.entrie + '.[chunkhash].js',
    library: 'vendors_' + config.entrie + '_worona',
    hashDigestLength: 32,
  };
};

module.exports = {
  core: core,
  vendors: vendors,
  packages: packages,
};
