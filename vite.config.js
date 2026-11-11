import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
