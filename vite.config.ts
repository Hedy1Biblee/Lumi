import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: './', // generate relative asset paths for static hosting
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Removed injecting GEMINI_API_KEY into the frontend bundle for security.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});