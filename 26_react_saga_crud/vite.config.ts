import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/26_react_saga_crud/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Optimize the bundle size by minimizing the output code.
      output: {
        // Remove the "export *" statements from the output.
        exports: 'named',
      },
    },
  }
})
