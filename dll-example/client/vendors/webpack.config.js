/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors.json');
var packageJson = require('./package.json');
var worona = packageJson.worona;
var packageName = packageJson.name;
// var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

module.exports = {
  entry: {
    main: vendors,
  },
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    filename: 'js/vendors.dashboard.[chunkhash].js',
    library: '[name]_[hash]',
    hashDigestLength: 32,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', 'dev', 'vendors-manifest.json'),
      name: '[name]_[hash]',
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new StatsWriterPlugin({
    //   filename: '../../package.json',
    //   fields: ['chunks'],
    //   transform: function (data) {
    //     worona.dev.files = [];
    //     data.chunks.forEach(chunk => chunk.files.forEach((file, index) => {
    //         const chunkName = chunk.names[index];
    //         if (chunkName === 'main') {
    //           worona.dev.main = 'dist/dev/' + file;
    //         }
    //         worona.dev.files.push({
    //           file: packageName + '/dist/dev/' + file,
    //           hash: chunk.hash,
    //           chunkName: chunkName });
    //       }));
    //     return JSON.stringify(packageJson, null, 2);
    //   }
    // }),
  ],
};
