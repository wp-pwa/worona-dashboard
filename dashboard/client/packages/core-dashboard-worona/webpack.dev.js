/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var packageJson = require('./package.json');
var worona = packageJson.worona;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    publicPath: 'https://cdn.worona.io/packages/core-dashboard-worona/dist/dev/',
    filename: 'js/core.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  },
  module: {
    loaders: [
      {
        test: /packages\/.+-worona\/src\/index\.js$/,
        loader: 'ignore-loader',
        exclude: /(core-dashboard-worona)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre'],
        },
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
          name: 'images/[name].[hash].[ext]',
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'fonts/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },
      {
        test: /locales\/.+\.json$/,
        loader: 'bundle-loader',
        query: {
          name: 'locales/[name]',
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '../..',
      manifest: require('./dist/dev/vendors/vendors-manifest.json'),
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new HtmlWebpackPlugin({
      filename: 'html/index.html',
      inject: false,
      title: 'Worona Dashboard (DEV)',
      template: path.join(__dirname, 'html', 'index.html'),
      vendorsFile: 'https://cdn.worona.io/packages/core-dashboard-worona/' + worona.dev.vendors.main,
      appMountId: 'root',
      window: { __worona__: { remote: true } },
      minify: { preserveLineBreaks: true, collapseWhitespace: true },
    }),
    new StatsWriterPlugin({
      filename: '../../package.json',
      fields: ['chunks'],
      transform: function (data) {
        worona.dev = worona.dev || {};
        worona.dev.files = [ worona.dev.vendors.files[0] ];
        data.chunks.forEach(chunk => chunk.files.forEach((file, index) => {
            const chunkName = chunk.names[index];
            if (chunkName === 'main') {
              worona.dev.main = 'dist/dev/' + file;
            }
            worona.dev.files.push({
              file: packageJson.name + '/dist/dev/' + file,
              hash: chunk.hash,
              chunkName: chunkName });
          }));
        return JSON.stringify(packageJson, null, 2);
      }
    }),
    new CopyWebpackPlugin([{ from: 'html/favicon.png', to: 'html/favicon.png' }]),
  ],
};
