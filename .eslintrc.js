
module.exports = {
  root: true,

  parser: 'babel-eslint',

  plugins: ['import', 'react'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  settings: {
    'import/ignore': [
      'node_modules',
      '\\.(json|css|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$',
    ],
    'import/extensions': ['.js'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  }
};