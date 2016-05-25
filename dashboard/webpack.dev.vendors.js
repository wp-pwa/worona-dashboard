var path = require('path');
var webpack = require('webpack');
var vendors = require('./vendors.json');

module.exports = {
  entry: {
    vendors: vendors,
  },
  output: {
    path: path.join(__dirname, 'dev', 'vendors'),
    filename: 'dashboard.vendors.js',
    library: 'worona_vendors',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dev', 'vendors', 'vendors-manifest.json'),
      name: 'worona_vendors',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
