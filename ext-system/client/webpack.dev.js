/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors/package.json').worona.dev.main;
var vendors_file = /^.+\/(.+\.js)$/.exec(vendors)[1];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    core: [
      'webpack/hot/dev-server',
      path.join(__dirname, 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    publicPath: '/',
    filename: 'core/js/core.dashboard.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  },
  module: {
    loaders: [
      {
        test: /extensions\/.+\/src\/index\.js$/,
        loader: 'bundle-loader',
        query: {
          lazy: true,
          name: 'extensions/[1]/js/[1]',
          regExp: 'extensions\\/([\\w\\.]+)'
        }
      },
      {
        test: /themes\/.+\/src\/index\.js$/,
        loader: 'bundle-loader',
        query: {
          lazy: true,
          name: 'themes/[1]/js/[1]',
          regExp: 'themes\\/([\\w\\.]+)'
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
    extensions: ['', '.js', '.jsx'],
    alias: {
      'worona': path.join(__dirname, 'worona.js'),
    }
  },
  // devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, 'dist', 'dev'),
    outputPath: path.join(__dirname),
		noInfo: false,
		hot: true,
		inline: true,
    port: 4000,
    https: true,
    historyApiFallback: true,
	},
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html', 'index.dev.html'),
      favicon: path.join(__dirname, 'src/html', 'favicon.dev.png'),
      vendors_file: '/vendors/js/' + vendors_file,
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./vendors/dist/dev/vendors-manifest.json'),
    }),
    new CopyWebpackPlugin([
      { from: './vendors/' + vendors, to: 'vendors/js', flatten: true },
    ], {
      copyUnmodified: true,
    }),
  ]
};
