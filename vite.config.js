import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'three-vendor'
            }

            if (
              id.includes('framer-motion') ||
              id.includes('react-dom') ||
              id.includes('/react/')
            ) {
              return 'react-vendor'
            }

            if (id.includes('gsap') || id.includes('lenis')) {
              return 'motion-vendor'
            }
          }

          return undefined
        },
      },
    },
  },
})
