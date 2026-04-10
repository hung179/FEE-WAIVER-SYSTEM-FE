import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4000,
    open: true,
    proxy: {
    // Proxy backend (Spring Boot)
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },

    // Proxy API địa chỉ
    '/address-api': {
      target: 'https://production.cas.so',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/address-api/, ''),
    },
  },
  },
});
