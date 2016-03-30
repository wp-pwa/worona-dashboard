/*eslint-disable */
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var configs = require('./webpack.config.js');

configs.forEach(function(config){
  var server = new WebpackDevServer(webpack(config), config.devServer);
  server.listen(config.devServer.port, 'localhost', function() {});
  console.log('Listening to "' + config.name + '" in http://localhost:' + config.devServer.port);
});
