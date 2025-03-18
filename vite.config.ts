import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 8600,
    },
    resolve: {
      alias: {
        src: "/src",
        atoms: "/src/atoms",
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        sourcemap: false, // Disable source maps in production
      }
    },
    build: {
      target: 'esnext' //browsers can handle the latest ES features
    }
  }
})
