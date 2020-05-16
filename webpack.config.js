const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  target : 'node',
  entry  : './src/index.js',
  output : {
    path     : path.resolve(__dirname, 'dist'),
    filename : 'bundle.js',
  },
  module : {
    rules : [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        loader  : 'babel-loader',
      },
    ],
  },
  plugins : [
    new NodemonPlugin(),
  ],
  externals : {
    uws : 'uws',
  },
};
