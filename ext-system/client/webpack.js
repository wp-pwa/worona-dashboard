var webpack = require('webpack');
var config = require('./webpack.dev.js');

var compiler = webpack(config);

compiler.run(function(err, stats) {
    // ...
});
