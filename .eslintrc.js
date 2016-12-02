
module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: "airbnb/base",

  plugins: ['react', 'jsx-a11y'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },

  globals: {
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true
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

  rules: {
    "comma-dangle": ["error", "never"],
    "arrow-parens": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "no-shadow": "off",
    "prefer-template": "off",
    "no-unused-expressions": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": "error",
    "no-plusplus": "off",
    "no-param-reassign": "off"
  }
};