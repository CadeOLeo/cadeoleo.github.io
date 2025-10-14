import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setup.js'],
    exclude: ['test/e2e/**', 'node_modules/**'],
    include: ['test/**/*.test.js', 'test/**/*.spec.js'],
  },
});
