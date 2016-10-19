/* eslint-disable */
var config = require('yargs').argv;
var plugins = require('./webpack/plugins');
var output = require('./webpack/output');
var loaders = require('./webpack/loaders');

switch (config.type) {
  case 'vendors':
    var pluginsArr = [
      plugins.definePlugin(config),
      plugins.uglifyJsPlugin(config),
      plugins.dedupePlugin(config),
      plugins.occurrenceOrderPlugin(config),
      plugins.dllPlugin(config),
      plugins.fixModuleIdAndChunkIdPlugin(config),
      plugins.statsWriterPlugin(config),
    ].filter(function(plugin) { return typeof plugin !== 'undefined'; });
    module.exports = {
      entry: { main: require('./packages/core-' + config.entrie + '-worona/vendors.json') },
      output: output.vendors(config),
      resolve: { modulesDirectories: ['packages/core-' + config.entrie + '-worona/node_modules'] },
      plugins: pluginsArr,
    };
    break;

  case 'core': // Extensions and Themes.
    var pluginsArr = [
      plugins.definePlugin(config),
      plugins.dllReferencePlugin(config),
      plugins.lodashModuleReplacementPlugin(config),
      plugins.contextReplacementPlugin(),
      plugins.htmlWebpackPlugin(config),
    ].filter(function(plugin) { return typeof plugin !== 'undefined'; });
    var loadersArr = [
      loaders.bundle(config),
      loaders.babel(config),
      loaders.css(config),
      loaders.sass(config),
      loaders.image(config),
      loaders.font(config),
      loaders.locale(config),
      loaders.json(config),
    ].filter(function(loader) { return typeof loader !== 'undefined'; });
    module.exports = {
      entry: { main: [
        'script!systemjs/dist/system.js',
        './packages/' + config.name + '/src/' + config.entrie + '/index.js',
      ] },
      output: output.core(config),
      module: { loaders: loadersArr },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
          'node_modules',
          'packages/core-' + config.entrie + '-worona/node_modules',
        ],
      },
      devtool: '#eval-source-map',
      devServer: {
    		contentBase: 'dist',
    		noInfo: false,
    		inline: true,
        port: 4000,
        historyApiFallback: true,
    	},
      postcss: function() { return [require('postcss-cssnext')()]; },
      stats: { children: false },
      plugins: pluginsArr,
    };
    break;
}
