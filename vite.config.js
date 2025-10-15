import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  root: 'dev',
  publicDir: '../assets',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'dev/index.html'),
        en: resolve(__dirname, 'dev/index_en.html'),
      },
    },
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '../',
      filename: 'service-worker.js',
      injectManifest: {
        swSrc: '../service-worker.js',
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
