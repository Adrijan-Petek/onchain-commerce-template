import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    coverage: {
      exclude: [
        '**.js',
        '**.ts',
        '**/**.stories.**',
        '**/*Svg.tsx',
        '**/types.ts',
        '.next/**',
        'public/**',
        'node_modules/**',
      ],
      reportOnFailure: true,
      thresholds: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '.next/**', 'public/**'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
