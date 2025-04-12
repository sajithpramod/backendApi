import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 👇 Indentation (2 spaces)
      "indent": ["error", 2],

      // 👇 Maximum line length (e.g., 100 characters)
      "max-len": ["warn", { "code": 100, "tabWidth": 2, "ignoreUrls": true }],

      // 👇 Enforce semicolons
      "semi": ["error", "always"],

      // 👇 Use single quotes
      "quotes": ["error", "single"],

      // 👇 No trailing spaces
      "no-trailing-spaces": "error",

      // 👇 Newline at the end of file
      "eol-last": ["error", "always"],
    },
  },
  pluginReact.configs.flat.recommended,
]);
