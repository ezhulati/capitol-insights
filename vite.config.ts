import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
// Import required for Vite config
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
  // Analyze bundle in analyze mode
  const analyzeBundle = mode === 'analyze';

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Capitol Insights',
          short_name: 'Capitol Insights',
          description: 'Government Relations and Lobbying Services in Texas',
          theme_color: '#102A43',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'unsplash-images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      analyzeBundle && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        external: [
          'fsevents',
          '@rollup/rollup-win32-x64-msvc',
          '@rollup/rollup-darwin-arm64',
          '@rollup/rollup-darwin-x64',
          '@rollup/rollup-linux-x64-gnu',
          '@rollup/rollup-linux-arm64-gnu',
          '@rollup/rollup-linux-arm-gnueabihf',
          '@rollup/rollup-linux-arm64-musl',
          '@rollup/rollup-linux-arm-musleabihf',
          '@rollup/rollup-linux-riscv64-gnu',
          '@rollup/rollup-linux-riscv64-musl',
          '@rollup/rollup-linux-loongarch64-gnu',
          '@rollup/rollup-linux-powerpc64le-gnu',
          '@rollup/rollup-linux-s390x-gnu',
          '@rollup/rollup-linux-x64-musl',
          '@rollup/rollup-freebsd-arm64',
          '@rollup/rollup-freebsd-x64',
          '@rollup/rollup-win32-arm64-msvc',
          '@rollup/rollup-win32-ia32-msvc',
          '@rollup/rollup-android-arm64',
          '@rollup/rollup-android-arm-eabi',
          '@rollup/rollup-linux-loong64-gnu',
          '@esbuild/darwin-arm64',
          '@esbuild/darwin-x64',
          '@esbuild/linux-arm64',
          '@esbuild/linux-arm',
          '@esbuild/linux-x64',
          '@esbuild/win32-arm64',
          '@esbuild/win32-x64',
          '@esbuild/win32-ia32',
          '@img/sharp-win32-x64',
          '@img/sharp-darwin-arm64',
          '@img/sharp-darwin-x64',
          '@img/sharp-linux-arm64',
          '@img/sharp-linux-x64',
          'node:crypto',
          'fs',
          'path',
          '@radix-ui/react-accordion',
          '@radix-ui/react-dialog',
          '@radix-ui/react-dropdown-menu',
          '@radix-ui/react-navigation-menu',
          '@radix-ui/react-slot',
          '@radix-ui/react-tabs',
          '@radix-ui/react-toast'
        ],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'framer-motion'],
            mdx: ['@mdx-js/react', '@mdx-js/loader'],
            ui: ['lucide-react'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production'
        }
      },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },
    server: {
      open: true,
      host: true,
      port: 3000,
      fs: {
        // Allow serving files from the project root
        allow: ['.']
      }
    },
    preview: {
      port: 4173,
      open: true
    },
    // Reduce build time for large-scale applications
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
      exclude: []
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'content': path.resolve(__dirname, './content')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.md']
    },
  };
});
