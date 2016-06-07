/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors_hash = require('../dist/client/dev/vendors/vendors-hash.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    dashboard: [
      'webpack/hot/dev-server',
      path.join(__dirname, 'index.js')
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'dist', 'client', 'dev'),
    publicPath: '/',
    filename: 'core/dashboard.core.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /extension\.js$/,
        loader: 'bundle',
        query: {
          lazy: true,
          name: 'extensions/[1]/[1]',
          regExp: '([\\w\\.]+)\\/[\\w\\.]+$'
        }
      },
      {
        test: /theme\.js$/,
        loader: 'bundle',
        query: {
          lazy: true,
          name: 'themes/[1]/[1]',
          regExp: '([\\w\\.]+)\\/[\\w\\.]+$'
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre'],
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[chunkhash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[chunkhash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[chunkhash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  resolve: {
    modulesDirectories: [
      'themes',
      'extensions',
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'worona': path.join(__dirname, 'worona.js'),
    }
  },
  devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, '..', 'dist', 'client', 'dev'),
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'includes', 'index.dev.html'),
      favicon: path.join(__dirname, 'includes', 'favicon.dev.png'),
      vendors_hash: vendors_hash.vendors.js,
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('../dist/client/dev/vendors/vendors-manifest.json')
    }),
    // new CopyWebpackPlugin([
    //   { from: '**/locales/*.json', to: 'locales', flatten: true },
    // ]),
  ]
};
