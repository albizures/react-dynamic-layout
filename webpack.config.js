const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [];
let devtool;
let entry;
let devServer;
let externals = [];

const modules = {
  preLoaders: [{
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/
  }],
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    { test: /\.json$/, loader: 'json' },
    { test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'assets/[name].[hash:8].[ext]'
      }
    }
  ]
};
const output = {
  path: './build',
  publicPath: '/',
  filename: 'index.js'
};

if (isProd) {
  output.libraryTarget = 'umd';
  output.library = 'ReactDynamicLayout';
  entry = {
    index: './src'// ,
    // vendor: ['react', 'classnames']
  };
  externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    classnames: {
      root: 'classnames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames'
    }
  };
} else {
  entry = [
    require.resolve('react-dev-utils/webpackHotDevClient.js'),
    './examples/index.js'
  ];
  devtool = 'cheap-module-source-map';
  plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'examples', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    new ExtractTextPlugin('[name].css')
  );
  devServer = {
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  };
  modules.loaders.push(
    { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!stylus') }
  );
}

module.exports = {
  devtool,
  entry,
  output,
  externals,
  module: modules,
  plugins,
  devServer
};
