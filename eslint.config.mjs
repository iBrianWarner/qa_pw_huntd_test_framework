import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      js,
      prettier: eslintPluginPrettier,
    },
    extends: ['js/recommended', eslintConfigPrettier],
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    extends: [eslintConfigPrettier],
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-unused-vars': 'error',
      'max-len': [
        'error',
        {
          code: 80,
          comments: 80,
        },
      ],
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'warn',
    },
    ignores: [
      '**/node_modules/*',
      'playwright.config.ts',
      '**/playwright-report/**',
    ],
  },
  tseslint.configs.recommended,
]);
