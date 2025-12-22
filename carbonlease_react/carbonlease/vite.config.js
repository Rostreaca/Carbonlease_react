import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      '/ws-stomp': {
        target: 'http://localhost:80',
        ws: true,
        changeOrigin: true,
      }
    }
  }
})
