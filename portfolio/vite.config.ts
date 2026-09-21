import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// GitHub Pages repo name - change this to your actual repo name
const REPO_NAME = 'portfolio'

export default defineConfig({

  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: `/${REPO_NAME}/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } as any,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
            if (id.includes('@react-three') || id.includes('three')) return 'vendor-r3f'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'vendor-form'
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})