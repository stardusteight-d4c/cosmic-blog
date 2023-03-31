import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@globals': fileURLToPath(new URL('./src/components/@globals', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/@interfaces', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
    },
  },
})