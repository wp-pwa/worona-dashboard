/*eslint-disable */
var packageJson = require('./package.json');
var config = require('worona-packages/webpack.dev.js');

module.exports = config(packageJson);
