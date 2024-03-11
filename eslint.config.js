const eslintPluginRecommended = require("eslint-plugin-eslint-plugin/configs/recommended");

module.exports = [
  eslintPluginRecommended,
  {
    languageOptions: { sourceType: "commonjs" },
    files: ["**/*.js"],
    rules: {
      "eslint-plugin/require-meta-docs-description": "error",
      "eslint-plugin/require-meta-docs-description": [
        "error",
        { pattern: "^(Enforce|Require|Disallow)" },
      ],
    },
  },
];
