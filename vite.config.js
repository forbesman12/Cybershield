import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and core libraries
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          
          // Split heavy animation libraries
          'animation-vendor': ['framer-motion', 'gsap'],
          
          // Split mapping libraries
          'maps-vendor': ['leaflet', 'react-leaflet', '@react-google-maps/api'],
          
          // Split form and UI libraries
          'ui-vendor': ['react-datepicker', 'react-icons', 'react-slick'],
          
          // Split other utility libraries
          'utils-vendor': ['axios', 'aos', 'react-helmet-async', 'react-intersection-observer', 'react-spring', 'react-transition-group']
        },
      },
    },
  },
})
