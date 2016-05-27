/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('../../vendors.json');
var worona = require('./package.json').worona;
// var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    [worona.namespace]: [
      path.join(__dirname, 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '..', '..', 'dist'),
    publicPath: '/',
    filename: '[name]/js/[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[hash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: vendors.map(function(vendor){
    return { [vendor]: 'var window.worona_vendors["' + vendor + '"]' };
  }),
  // devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, '..', '..', 'dist', worona.namespace),
		noInfo: false,
		hot: true,
		inline: true,
    port: 4000,
    historyApiFallback: true,
	},
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    // new CopyWebpackPlugin([
    //   { from: '**/locales/*.json', to: 'locales', flatten: true },
    // ]),
  ]
};
