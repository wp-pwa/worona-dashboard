/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors.json');
var packageJson = require('../package.json');
var worona = packageJson.worona;
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var FixModuleIdAndChunkIdPlugin = require('fix-moduleid-and-chunkid-plugin');

module.exports = {
  entry: {
    vendors: vendors,
  },
  output: {
    path: path.join(__dirname, '..', 'dist', 'dev'),
    filename: 'vendors/vendors.[chunkhash].js',
    library: 'vendors_dashboard_worona',
    hashDigestLength: 32,
  },
  resolve: {
    modulesDirectories: [
      '../../node_modules',
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'dist', 'dev', 'vendors', 'vendors-manifest.json'),
      name: 'vendors_dashboard_worona',
      context: path.join(__dirname, '..', '..', '..'),
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new FixModuleIdAndChunkIdPlugin(),
    new StatsWriterPlugin({
      filename: '../../package.json',
      fields: ['chunks'],
      transform: function (data) {
        worona.dev = worona.dev || {};
        worona.dev.vendors = { files: [] };
        data.chunks.forEach(chunk => chunk.files.forEach((file, index) => {
            const chunkName = chunk.names[index];
            if (chunkName === 'vendors') {
              worona.dev.vendors.main = packageJson.name + '/dist/dev/' + file;
            }
            worona.dev.vendors.files.push({
              file: packageJson.name + '/dist/dev/' + file,
              hash: chunk.hash,
              chunkName: chunkName });
          }));
        return JSON.stringify(packageJson, null, 2);
      }
    }),
  ],
};
