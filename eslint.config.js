// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import tanstackQuery from '@tanstack/eslint-plugin-query';

const { browser: browserGlobals, node: nodeGlobals } = globals;

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      'storybook-static',
      '*.config.js',
      '*min.js',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
        IntersectionObserver: 'readonly',
        IntersectionObserverInit: 'readonly',
        IntersectionObserverEntry: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //중복 Import 안돼용
      'no-duplicate-imports': 'error',
      //콘솔은 확인 뒤 지웁시당
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      //공백 금지
      'no-multiple-empty-lines': 'error',
      //정의 안 한 변수 사용 x
      'no-undef': 'error',
      //들여쓰기는 Prettier가 관리
      // indent: ['error', 2],
      // 쓸데없는 공백 없애기
      'no-trailing-spaces': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      // TanStack Query rules
      ...tanstackQuery.configs.recommended.rules,
    },
  },
  storybook.configs['flat/recommended']
);
