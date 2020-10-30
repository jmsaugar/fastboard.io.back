const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode   : 'development',
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
  resolve : {
    alias : {
      '#utils'     : path.resolve(__dirname, 'src/utils/'),
      '#constants' : path.resolve(__dirname, 'src/constants/'),
      '#services'  : path.resolve(__dirname, 'src/services/'),
    },
    extensions : ['.js'],
  },
  plugins : [
    new NodemonPlugin(),
  ],
  externals : {
    uws : 'uws',
  },
};
