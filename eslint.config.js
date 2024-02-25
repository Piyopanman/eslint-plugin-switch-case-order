"use strict";

// Import the ESLint plugin locally
const eslintPluginExample = require("./eslint-plugin-switch-case-order");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    plugins: { "switch-case-order": eslintPluginExample },
    rules: {
      "switch-case-order/switch-case-ascending": "error",
    },
  },
];
