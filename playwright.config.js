import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  webServer: {
    // Serve the production build instead of Vite dev to avoid overlay and missing dev-only files
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4173',
    screenshot: 'only-on-failure',
  },
  reporter: [
    ['html'],
    ['list']
  ],
});
