const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.js'],
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  prettierRecommended,
  {
    rules: {
      'no-console': 'warn',
    },
  },
];
