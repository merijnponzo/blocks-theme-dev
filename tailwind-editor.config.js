/*
  Styles should only be generated from theme.json
*/
const config = require("./tailwind/config.default.js");
const safelist = require("./tailwind/safelist.js");



const defConfig = config.config;
defConfig.safelist = safelist.safelist;
module.exports = { ...defConfig };
