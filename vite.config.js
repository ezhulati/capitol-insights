import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in development or production
  base: '/',
  
  // Configure the server
  server: {
    port: 3000,
    open: true, // Open browser on server start
    cors: true, // Enable CORS
  },
  
  // Configure build
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  
  // Handle assets
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  
  // Plugins
  plugins: [],
});