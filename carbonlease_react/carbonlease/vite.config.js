import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      '/ws-stomp': {
        target: 'http://localhost:80',
        ws: true,
        changeOrigin: true,
      }
    }
  },
})
