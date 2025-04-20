import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true
      },
      include: '**/*.svg?react'
    })
  ],
  base: '/test-cocktail/', // Имя репозитория GitHub
})
