/* eslint-disable */
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var bundle = function(config) {
  return {
    test: new RegExp('packages\/.+-worona\/src\/' + config.entrie + '\/index\.js$'),
    loader: 'bundle-loader',
    query: {
      lazy: true,
      name: '[1][2]/' + config.entrie + '/' + config.env + '/js/[1]',
      regExp: 'packages\\/(.+)(-worona)\\/',
    },
    exclude: new RegExp('core-' + config.entrie + '-worona'),
  };
};

var babel = function(config) {
  return {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: new RegExp('node_modules'),
  };
};

var css = function(config) {
  if (config.env === 'dev' || config.type === 'core') {
    return {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
      ],
    };
  } else {
    return {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader?modules',
        'postcss-loader',
      ]),
    };
  }
};

var sass = function(config) {
  if (config.env === 'dev' || config.type === 'core') {
    return {
      test: /\.s[ac]ss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    };
  } else {
    return {
      test: /\.s[ac]ss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'sass-loader',
      ]),
    };
  }
};

var image = function(config) {
  return {
    test: /\.(png|jpg|gif)$/,
    loader: 'file-loader',
    query: {
      name: '[1]/' + config.entrie + '/' + config.env + '/images/[name].[hash].[ext]',
      regExp: 'packages\\/([^\\/]+)\\/',
    },
  };
}

var font = function(config) {
  return {
    test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
    query: {
      name: '[1]/' + config.entrie + '/' + config.env + '/fonts/[name].[hash].[ext]',
      regExp: 'packages\\/([^\\/]+)\\/',
    },
  };
}

var locale = function(config) {
  return {
    test: /locales\/.+\.json$/,
    loader: 'bundle-loader',
    query: {
      name: '[1]/' + config.entrie + '/' + config.env + '/locales/[name]',
      regExp: 'packages\\/([^\\/]+)\\/',
    },
  };
};

var json = function(config) {
  return {
    test: /\.json$/,
    loader: 'json-loader',
  };
};

module.exports = {
  babel: babel,
  css: css,
  sass: sass,
  image: image,
  font: font,
  locale: locale,
  json: json,
  bundle: bundle,
};
