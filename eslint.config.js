"use strict";

// Import the ESLint plugin locally
const eslintPluginExample = require("./eslint-plugin-switch-case-order");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: { "switch-case-order": eslintPluginExample },
    rules: {
      "switch-case-order/switch-case-order": [
        "error",
        "asc",
        { natural: true, caseSensitive: true },
      ],
    },
  },
];
