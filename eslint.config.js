import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactPlugin.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.configs.recommended,
      'plugin:tailwindcss/recommended',
      'eslint-config-prettier',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
])
