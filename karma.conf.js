const webpackConfig = require('./webpack.config.js');

webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;
webpackConfig.alias = {
  cheerio: 'cheerio/lib/cheerio'
};

module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './test/tests.webpack.js'
    ],
    preprocessors: {
      './test/tests.webpack.js': ['webpack', 'sourcemap']
    },
    plugin: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
