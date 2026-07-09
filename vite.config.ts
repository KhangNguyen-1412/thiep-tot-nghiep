import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
});
