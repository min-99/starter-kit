import nextConfig from 'eslint-config-next';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescriptConfig from 'eslint-config-next/typescript';

const eslintConfig = [
  /* Next.js 기본 + Core Web Vitals + TypeScript 규칙 */
  ...nextConfig,
  ...coreWebVitals,
  ...typescriptConfig,
  {
    rules: {
      /* TypeScript 규칙 */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      /* React 규칙 */
      'react/self-closing-comp': 'warn',

      /* 일반 규칙 */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
];

export default eslintConfig;
