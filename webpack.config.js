const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient.js'),
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders : [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style','css!stylus') },
      { test: /\.css?$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'assets/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    new ExtractTextPlugin("[name].css")
  ],
  devServer: {
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
};