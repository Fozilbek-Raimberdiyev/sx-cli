// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    // You can configure the server here, e.g., proxy to your Node.js backend if needed
    proxy: {
      '/api': 'http://localhost:3000' // Example for proxying API requests
    }
  },
  resolve: {
    alias: {
      '@': '/src/ui', // Configure alias to map to your UI folder
    },
  },
});
