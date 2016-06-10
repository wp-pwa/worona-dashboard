/*eslint-disable */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var vendors = require('../../vendors/vendors.json');
var packageJson = require('./package.json');
var worona = packageJson.worona;
var packageName = packageJson.name;
var rimraf = require('rimraf');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

rimraf.sync('./dist');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'https://cdn.worona.io/packages/' + packageName + '/dist/',
    filename: 'js/index.[chunkhash].js',
    library: packageName,
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
        loader: 'file-loader?name=images/[name].[chunkhash].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[chunkhash].[ext]',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[chunkhash].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json-loader?name=jsons/[name].[chunkhash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('../../../dist/client/prod/vendors/vendors-manifest.json'),
    }),
    new StatsWriterPlugin({
      filename: '../package.json',
      fields: ['chunks'],
      transform: function (data) {
        packageJson.worona.files = [];
        data.chunks.forEach(chunk => chunk.files.forEach((file, index) => {
            const chunkName = chunk.names[index];
            if (chunkName === 'main') {
              packageJson.main = 'dist/' + file;
            }
            worona.files.push({
              file: packageName + '/dist/' + file,
              hash: chunk.hash,
              chunkName: chunkName,
            });
          }));
        return JSON.stringify(packageJson, null, 2);
      }
    })
  ]
};
