import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginJs from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import plugin from '@typescript-eslint/eslint-plugin';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

const { configs: tsConfigs } = plugin;
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);
const projectTsConfig = path.resolve(currentDirPath, 'tsconfig.json');

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      js,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tsEslintPlugin,
      import: importPlugin,
    },
    extends: [
      'js/recommended',
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      eslintConfigPrettier,
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: projectTsConfig,
    },
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
      ...playwright.configs['flat/recommended'].rules,
      'no-unused-vars': 'error',
      'max-len': ['error', { code: 80, comments: 80 }],
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'warn',
    },
    ignores: [
      '**/node_modules/*',
      'playwright.config.ts',
      '**/playwright-report/**',
    ],
  },
  tsConfigs.recommended,
]);
