import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import vitestGlobals from 'eslint-plugin-vitest-globals'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['eslint.config.js', 'vite.config.js', 'testSetup.js', 'dist/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
      'import/no-dynamic-require': 'error',
      'import/no-nodejs-modules': 'error',
    },
  },
])
