const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      'eslint.config.js',
      'node_modules/**',
      'dist/**',
      'frontend/**',
      'e2etests/**',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 0,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
