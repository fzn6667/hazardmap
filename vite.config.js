import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hazardmap/', // <--- Yeh line lazmi add karni hai (aapki repo ka naam north4 hai)
  server: {
    watch: {
      usePolling: true, // Yeh file watcher error ko fix kar dega
    },
  },
})
