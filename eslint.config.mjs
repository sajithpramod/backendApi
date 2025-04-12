import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // ✅ Add this for Jest test functions like `beforeAll`, `test`, etc.
      },
    },
    rules: {
      'indent': ['error', 2],
      'max-len': ['warn', { 'code': 100, 'tabWidth': 2, 'ignoreUrls': true }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
  pluginReact.configs.flat.recommended,
]);
