import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 8080,
    allowedHosts: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false
  }
})
