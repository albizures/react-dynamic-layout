const postcssNested = require('postcss-nested');
const atImport = require('postcss-import');

module.exports = {
  plugins: [postcssNested(), atImport()],
};
