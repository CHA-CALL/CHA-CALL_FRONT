import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  // 0) 무시할 경로
  {
    ignores: ['dist', 'build', 'node_modules', '**/*.min.js'],
  },

  // 1) 모든 JS/JSX 파일 (기본 ESLint 권장)
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      // import 플러그인 규칙(JS에도 적용하고 싶으면 아래 2개를 JS에도 둡니다)
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'no-duplicate-imports': 'off', // import/no-duplicates로 대체
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: true,
      },
    },
  },

  // 2) 모든 TS/TSX 파일 (타입체킹 권장 + 스타일 권장)
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
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // TS 전용 대체/보강 규칙
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
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-undef': 'off',
      'no-duplicate-imports': 'off',
      'import/no-duplicates': 'error',

      'import/newline-after-import': ['error', { count: 1 }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },

  // 3) React 전용(훅/리프레시)
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        // 브라우저 옵저버 전역 (리뷰에서의 globals 보강)
        IntersectionObserver: 'readonly',
        IntersectionObserverInit: 'readonly',
        IntersectionObserverEntry: 'readonly',
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // 4) Node.js 환경 파일들 (config, vite, eslint, storybook 등)
  {
    files: [
      '**/*.config.{js,ts,mjs,cjs}',
      'vite.config.{js,ts}',
      'eslint.config.{js,ts}',
      '.storybook/**/*.{js,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [tseslint.configs.disableTypeChecked],
  },

  // 5) JS 계열 파일에서 타입체킹 비활성화(성능)
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // 6) Prettier와 충돌 방지 (항상 마지막)
  eslintConfigPrettier,
]);
