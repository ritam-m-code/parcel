// Vite config for running the React frontend during development.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      // Proxy websocket room traffic to the local collaboration backend.
      '/yjs': {
        target: 'ws://localhost:1234',
        ws: true,
        rewrite: (path) => path.replace(/^\/yjs/, '')
      }
    }
  }
});
