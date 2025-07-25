import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward anything that starts with /api to the Express server
      "/api": "http://localhost:4000",
    },
  },

})
