const path = require('path');
// const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'main': './src/js/main.js'
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site', 'js'),
    publicPath: '_site/js/'
  },
};