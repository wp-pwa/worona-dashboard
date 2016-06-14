/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors/package.json').worona.prod.main;
var vendors_file = /^.+\/(.+)\.js$/.exec(vendors)[1];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    core: [
      path.join(__dirname, 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    publicPath: '/',
    filename: 'core/js/dashboard.core.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  },
  module: {
    loaders: [
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
    modulesDirectories: [
      'themes',
      'extensions',
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
		contentBase: path.join(__dirname, 'dist', 'prod'),
		noInfo: true,
		hot: false,
		inline: true,
    port: 4000,
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
      template: path.join(__dirname, 'src', 'index.prod.html'),
      favicon: path.join(__dirname, 'src', 'favicon.prod.png'),
      vendors_file: '/vendors/js/' + vendors_file,
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./vendors/dist/prod/vendors-manifest.json'),
    }),
    new CopyWebpackPlugin([
      { from: './vendors/' + vendors, to: 'vendors/js', flatten: true },
    ], {
      copyUnmodified: true,
    }),
  ]
};
