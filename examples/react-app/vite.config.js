import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3002,
    strictPort: true,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['../../dist/clickstream.min.js']
  }
}); 