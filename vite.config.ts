import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  ...(mode === 'mock' && {
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  }),
}))
