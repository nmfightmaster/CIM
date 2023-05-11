import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {                           // This snippet adds a proxy to redirect requests /api requests to localhost:3001/api
    proxy: {
      '/api': "http://localhost:3001"
    }
  }
})
