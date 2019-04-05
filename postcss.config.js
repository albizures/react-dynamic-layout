/* eslint-disable import/no-extraneous-dependencies */
const postcssNested = require('postcss-nested');
const atImport = require('postcss-import');

module.exports = {
  plugins: [postcssNested(), atImport()],
};
