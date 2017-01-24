const webpackConfig = require('./webpack.config.js');

webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;
webpackConfig.alias = {
  cheerio: 'cheerio/lib/cheerio'
};

webpackConfig.module.loaders = [
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] },
  { test: /\.css?$/, loaders: ['style', 'css'] },
  { test: /\.json$/, loader: 'json' },
  { test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file',
    query: {
      name: 'assets/[name].[hash:8].[ext]'
    }
  }
];

module.exports = config => {
  config.set({
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './tests.webpack.js'
    ],
    preprocessors: {
      './tests.webpack.js': ['webpack', 'sourcemap']
    },
    plugin: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
