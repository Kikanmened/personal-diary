import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // Node 25+ enables experimental webstorage by default, which shadows
    // jsdom's localStorage unless disabled.
    execArgv: ['--no-experimental-webstorage'],
  },
})
