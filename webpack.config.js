/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var exports = function(options) {
  return {
    name: options.name,
    entry: {
      [options.name]: [
        'webpack/hot/dev-server',
        path.join(__dirname, options.folder, 'src', 'index.js')
      ],
      vendor: options.vendor,
    },
    output: {
      path: path.join(__dirname, options.folder, 'dev'),
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
          loader: "file-loader?name=images/[name].[hash].[ext]"
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[hash].[ext]"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader?name=fonts/[name].[hash].[ext]"
        },
        {
          test: /\.json/,
          loader: "json-loader"
        }
      ],
    },
    resolve: {
      modulesDirectories: [
        options.folder + '/themes',
        options.folder + '/extensions',
        options.folder + '/node_modules',
        'node_modules',
      ],
      extensions: ['', '.js', '.jsx'],
    },
    devtool: '#eval-source-map',
    devServer: {
  		contentBase: path.join(__dirname, options.folder, 'dev'),
  		noInfo: false,
  		hot: true,
  		inline: true,
      port: options.port,
      historyApiFallback: true,
  	},
    postcss: function () { return [
      require('postcss-cssnext')(),
    ];},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor', 'js/' + options.name + '.vendor.[hash].js'),
      new HtmlWebpackPlugin({
        template: options.folder + '/src/index.html',
        favicon: options.folder + '/src/favicon.png',
      }),
    ]
  };
}

module.exports = [
  exports({
    name: 'dashboard',
    folder: 'worona-dashboard-client',
    vendor: [
      // React
      'react',
      'react-dom',
      'react-router',
      // Redux
      'redux',
      'react-redux',
      'react-router-redux',
      // Other
      'fastclick',
      'velocity-react',
    ],
    port: 4000,
  }),
  exports({
    name: 'app',
    folder: 'worona-app-client',
    vendor: [],
    port: 5000,
  })
];
