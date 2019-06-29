module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'airbnb/base',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
