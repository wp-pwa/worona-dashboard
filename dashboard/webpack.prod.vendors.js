var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors.json');

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.join(__dirname, 'prod', 'vendors'),
    filename: 'dashboard.vendors.[hash].js',
    library: 'worona_vendors',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'prod', 'vendors', 'vendors-manifest.json'),
      name: 'worona_vendors',
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
