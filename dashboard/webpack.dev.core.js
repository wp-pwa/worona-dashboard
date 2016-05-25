/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'dashboard': [
      'webpack/hot/dev-server',
      path.join(__dirname, 'src', 'index.js')
    ],
  },
  output: {
    path: path.join(__dirname, 'dev'),
    publicPath: '/',
    filename: 'js/[name].core.[hash].js',
  },
  module: {
    loaders: [
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
        loader: 'file-loader?name=[name].[ext]!json-loader'
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
  devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, 'dev'),
		noInfo: false,
		hot: true,
		inline: true,
    port: 4000,
    historyApiFallback: true,
	},
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      favicon: path.join(__dirname, 'src', 'favicon.png'),
    }),
    new CopyWebpackPlugin([
      { from: '**/locales/*.json', to: 'locales', flatten: true },
    ]),
  ]
};
