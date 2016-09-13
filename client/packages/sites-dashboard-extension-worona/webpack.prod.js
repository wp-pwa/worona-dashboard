/*eslint-disable */
var packageJson = require('./package.json');
var config = require('worona-packages/webpack.prod.js');

module.exports = config(packageJson);
