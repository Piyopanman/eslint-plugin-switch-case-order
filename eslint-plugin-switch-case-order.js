const switchCaseRule = require("./switch-case-order");
const plugin = { rules: { "switch-case-order": switchCaseRule } };
module.exports = plugin;
