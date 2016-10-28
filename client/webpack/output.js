/* eslint-disable */
var path = require('path');

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
};
