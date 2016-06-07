const webpack = require('webpack');

module.exports = {
  entry: {
    server: [
      './src/server.js',
    ],
  },

  externals: [
    /^[a-z\-0-9]+$/,  // Every non-relative module is external
  ],

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: { cacheDirectory: true },
        test: /\.js$/,
      },
      {
        exclude: /node_modules/,
        loader: 'json',
        test: /\.json$/,
      },
    ],
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  output: {
    chunkFilename: '[id].[hash:5]-[chunkhash:7].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: './build',
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  target: 'async-node',
};
