/*eslint-disable */
var webpack = require('webpack');
var packageJson = require('./package.json');
var createConfig = require('worona-packages/webpack.prod.js');

var config = createConfig(packageJson)

config.plugins.push(
  // Only include en and es from moment languages in the final bundle.
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/)
);

module.exports = config;
