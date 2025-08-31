// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  [
    // 무시할 파일/폴더 설정
    {
      ignores: ['dist', 'node_modules'],
    },

    // 기본 설정 (모든 파일)
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: [js.configs.recommended],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2022,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },

    // TypeScript 특화 설정
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        // TypeScript 특화 규칙
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',

        // ESLint core 규칙 중 TypeScript에서 불필요한 것들 비활성화
        'no-undef': 'off', // TypeScript에서 처리
        'no-redeclare': 'off', // @typescript-eslint/no-redeclare가 처리
      },
    },

    // React 설정
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        // React Refresh 규칙
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // React Hooks 규칙
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },

    // Node.js 환경 파일들 (config 파일 등)
    {
      files: [
        '**/*.config.{js,ts}',
        'vite.config.ts',
        'eslint.config.js',
        '.storybook/**/*',
      ],
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
      extends: [tseslint.configs.disableTypeChecked],
    },

    // JavaScript 파일에서 타입 체킹 비활성화
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: [tseslint.configs.disableTypeChecked],
    },

    // Prettier와의 충돌 방지 (반드시 마지막에 위치)
    eslintConfigPrettier,
  ],
  storybook.configs['flat/recommended']
);
