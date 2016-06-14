/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
// var vendors = require('vendors-dashboard-worona/package.json').worona.dev.main;
// var vendors_file = /^.+\/(.+)\.js$/.exec(vendors)[1];
// var vendors_path = './node_modules/vendors-dashboard-worona/' + vendors;

module.exports = {
  entry: {
    core: [
      path.join(__dirname, 'index.js')
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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  // devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, 'dist', 'dev'),
    // outputPath: path.join(__dirname),
		noInfo: false,
		hot: true,
		inline: true,
    port: 4000,
    // historyApiFallback: true,
	},
  // postcss: function () {
  //   return [require('postcss-cssnext')()];
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'includes', 'index.dev.html'),
    //   favicon: path.join(__dirname, 'includes', 'favicon.dev.png'),
    //   vendors_hash: '/vendors/js/' + vendors_file,
    // }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./vendors/dist/dev/vendors-manifest.json'),
    }),
    // new CopyWebpackPlugin([
    //   { from: vendors_path, to: 'vendors/js', flatten: true },
    // ], {
    //   copyUnmodified: true,
    // }),
  ]
};
