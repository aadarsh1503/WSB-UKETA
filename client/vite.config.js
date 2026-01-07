import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build', 
    sourcemap: true, 
    minify: 'esbuild',
  },
  // FIX: Move proxy inside the 'server' block
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})