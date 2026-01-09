import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwind from "eslint-plugin-tailwindcss" // 1. Plugin importieren
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    // 2. Tailwind-Konfiguration zu extends hinzufügen
    extends: [
      js.configs.recommended,
      reactHooks.configs.recommended,
      reactRefresh.configs.vite,
      ...tailwind.configs["flat/recommended"], // Tailwind Flat Config Regeln
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // 3. Optionale zusätzliche Tailwind-Regeln
      'tailwindcss/classnames-order': 'warn', // Sortiert deine Klassen automatisch
      //'tailwindcss/no-custom-classname': 'off', // Erlaubt eigene CSS-Klassen neben Tailwind
    },
  },
])