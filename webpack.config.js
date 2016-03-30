/*eslint-disable */
var path = require('path');
var webpack = require('webpack');

var exports = function(options) {
  return {
    name: options.name,
    entry: {
      [options.name]: [
        'webpack/hot/dev-server',
        path.join(__dirname, options.folder, 'src', 'index.js')
      ],
      vendor: options.vendor,
    },
    output: {
      path: path.join(__dirname, options.folder, 'dev'),
      publicPath: '/',
      filename: '[name].core.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
            presets: ['react-hmre'],
          },
          exclude: /(node_modules)/,
        },
      ]
    },
    resolve: {
      modulesDirectories: [
        options.folder + '/themes',
        options.folder + '/extensions',
        options.folder + '/node_modules',
        'node_modules',
      ],
    },
    devServer: {
  		contentBase: path.join(__dirname, options.folder, 'dev'),
  		noInfo: true,
  		hot: true,
  		inline: true,
      port: options.port,
  	},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor', options.name + '.vendor.js'),
    ]
  };
}

module.exports = [
  exports({
    name: 'dashboard',
    folder: 'worona-dashboard-client',
    vendor: ['react', 'react-dom', 'redux', 'react-redux'],
    port: 4000,
  }),
  exports({
    name: 'app',
    folder: 'worona-app-client',
    vendor: [],
    port: 5000,
  })
];
