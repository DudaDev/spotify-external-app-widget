// Allow es6 style imports
const mrequire = require('esm')(module);
module.exports = mrequire('./main.js').default;
