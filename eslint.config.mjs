import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';

const config = [
  {
    ignores: ['coverage/**', '.next/**', 'public/**', 'node_modules/**'],
  },
  ...next,
  prettier,
  {
    files: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
