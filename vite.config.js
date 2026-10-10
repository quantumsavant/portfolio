import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // react, react-dom and framer-motion load from esm.sh via the importmap
      // in index.html (keeps each deploy file small enough for the upload API)
      external: [/^react($|\/)/, /^react-dom($|\/)/, 'framer-motion'],
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
})
