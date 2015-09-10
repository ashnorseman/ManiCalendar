/**
 * Created by AshZhang on 15/8/24.
 */


'use strict';

var path = require('path'),
    Clean = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    pkg = require('./package.json'),
    ROOT_PATH = path.resolve(__dirname),
    TARGET = process.env.npm_lifecycle_event;


/**
 * Common settings
 */
var common = {
  entry: path.resolve(ROOT_PATH, 'src/app.jsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      description: pkg.description,
      lang: 'zh-CN',
      template: './templates/index.tpl',
      title: 'Mani Calendar'
    })
  ]
};


/**
 * Development environment
 */
if (TARGET === 'start' || !TARGET) {

  module.exports = merge(common, {
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    devtool: 'eval-source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: path.resolve(ROOT_PATH, 'node_modules/normalize.css')
        },
        {
          test: /\.less$/,
          loaders: ['style', 'css', 'less'],
          include: path.resolve(ROOT_PATH, 'src')
        },
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ],
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}


/**
 * Production environment
 */
if (TARGET === 'build') {

  module.exports = merge(common, {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'src/app.jsx'),
      libs: ['react', 'react-router', 'react-dnd', 'whatwg-fetch']
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loader: ExtractTextPlugin.extract('style', 'css!less'),
          includes: [
            path.resolve(ROOT_PATH, 'node_modules/normalize.css'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('style.[contenthash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'libs',
        'libs.[chunkhash].js'
      ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}