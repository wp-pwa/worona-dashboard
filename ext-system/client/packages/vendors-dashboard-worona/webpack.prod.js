/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var vendors = require('./src/vendors.json');
var packageJson = require('./package.json');
var worona = packageJson.worona;
var packageName = packageJson.name;
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

module.exports = {
  entry: {
    main: vendors,
  },
  output: {
    path: path.join(__dirname, 'dist', 'prod'),
    filename: 'js/vendors.[chunkhash].js',
    library: 'vendors_dashboard_worona',
    hashDigestLength: 32,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', 'prod', 'vendors-manifest.json'),
      name: 'vendors_dashboard_worona',
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new StatsWriterPlugin({
      filename: '../../package.json',
      fields: ['chunks'],
      transform: function (data) {
        worona.prod.files = [];
        data.chunks.forEach(chunk => chunk.files.forEach((file, index) => {
            const chunkName = chunk.names[index];
            if (chunkName === 'main') {
              worona.prod.main = 'dist/prod/' + file;
            }
            worona.prod.files.push({
              file: packageName + '/dist/prod/' + file,
              hash: chunk.hash,
              chunkName: chunkName });
          }));
        return JSON.stringify(packageJson, null, 2);
      }
    }),
  ],
};
