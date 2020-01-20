// Allow es6 style imports
const mrequire = require('@std/esm')(module);
module.exports = mrequire('./main.mjs').default;
