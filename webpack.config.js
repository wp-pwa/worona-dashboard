/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
      filename: 'js/[name].core.[hash].js',
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
        {
          test: /\.css$/,
          loaders: ['style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
        },
        {
          test: /\.s[ac]ss$/,
          loaders: ['style', 'css', 'sass']
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "file-loader?name=images/[name].[hash].[ext]"
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[hash].[ext]"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader?name=fonts/[name].[hash].[ext]"
        },
      ],
    },
    resolve: {
      modulesDirectories: [
        options.folder + '/themes',
        options.folder + '/extensions',
        options.folder + '/node_modules',
        'node_modules',
      ],
    },
    devtool: '#eval-source-map',
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
        'vendor', 'js/' + options.name + '.vendor.[hash].js'),
      new HtmlWebpackPlugin({
        template: options.folder + '/src/index.html',
        favicon: options.folder + '/src/favicon.png',
      }),
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
