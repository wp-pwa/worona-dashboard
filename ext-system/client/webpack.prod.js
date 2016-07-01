/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');
var vendors = require('./packages/vendors-dashboard-worona/package.json').worona.prod.main;
var vendors_file = /^.+\/(.+\.js)$/.exec(vendors)[1];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    core: [
      path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    publicPath: config.publicPath + '/',
    filename: 'packages/core-dashboard-worona/dist/prod/js/core.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  },
  module: {
    loaders: [
      {
        test: /packages\/.+-worona\/src\/index\.js$/,
        loader: 'bundle-loader',
        query: {
          lazy: true,
          name: 'packages/[1][2]/dist/prod/js/[1]',
          regExp: 'packages\\/([\\w]+)([\\w\\-]+)'
        },
        exclude: /(core-dashboard-worona|vendors-dashboard-worona)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
        exclude: /(node_modules)/,
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
        loader: 'file-loader',
        query: {
          name: 'packages/[1]/dist/prod/images/[name].[hash].[ext]',
          regExp: 'packages\\/([^\\/]+)\\/',
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'packages/[1]/dist/prod/fonts/[name].[hash].[ext]',
          regExp: 'packages\\/([^\\/]+)\\/',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'packages/[1]/dist/prod/fonts/[name].[hash].[ext]',
          regExp: 'packages\\/([^\\/]+)\\/',
        },
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
  devServer: {
		contentBase: path.join(__dirname, 'dist', 'prod'),
    outputPath: path.join(__dirname),
		noInfo: false,
		hot: false,
		inline: false,
    port: 4000,
    https: true,
    compress: true,
    historyApiFallback: true,
	},
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'includes', 'index.prod.html'),
      favicon: path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'includes', 'favicon.prod.png'),
      vendors_file: config.publicPath + '/packages/vendors-dashboard-worona/dist/prod/js/' + vendors_file,
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./packages/vendors-dashboard-worona/dist/prod/vendors-manifest.json'),
    }),
    new CopyWebpackPlugin([
      { from: './packages/vendors-dashboard-worona/' + vendors, to: 'packages/vendors-dashboard-worona/dist/prod/js', flatten: true },
    ], {
      copyUnmodified: true,
    }),
  ],
};
