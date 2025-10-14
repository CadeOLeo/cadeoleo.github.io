import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: '/index.html',
        en: '/index_en.html',
      },
    },
  },
  test: {
    globals: true,
  },
});
