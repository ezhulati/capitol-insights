import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import type { Plugin, PluginOption } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// External dependencies that should not be bundled
const externalDeps = [
  // UI and animation libraries
  'framer-motion',
  'lucide-react',
  '@tailwindcss/typography',
  
  // PDF and image processing
  'jspdf',
  'jspdf-autotable',
  'html2canvas',
  'sharp',
  
  // Sanity and MDX
  '@sanity/client',
  '@mdx-js/react',
  '@portabletext/react',
  
  // Utilities
  'validator',
  'xss',
  'web-vitals'
];

// Node.js built-in modules that should be external
const nodeBuiltins = [
  'fs',
  'path',
  'crypto',
  'util',
  'stream',
  'events',
  'os',
  'child_process'
];

// Platform-specific modules that should be external
const platformModules = [
  // Platform-specific modules
  'fsevents',
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
  
  // Esbuild platform-specific modules
  '@esbuild/darwin-arm64',
  '@esbuild/darwin-x64',
  '@esbuild/linux-arm64',
  '@esbuild/linux-arm',
  '@esbuild/linux-x64',
  '@esbuild/win32-arm64',
  '@esbuild/win32-x64',
  '@esbuild/win32-ia32',
  
  // Sharp platform-specific modules
  '@img/sharp-win32-x64',
  '@img/sharp-darwin-arm64',
  '@img/sharp-darwin-x64',
  '@img/sharp-linux-arm64',
  '@img/sharp-linux-x64'
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  // Filter out plugins that depend on optional dependencies
  const plugins: PluginOption[] = [
    react({
      // Add React-specific options
      babel: {
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Capitol Insights',
        short_name: 'Capitol Insights',
        description: 'Your trusted source for Texas legislative insights and advocacy strategies.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              }
            }
          }
        ]
      }
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as unknown as PluginOption
  ];

  return {
    plugins,
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer()
        ]
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@types': resolve(__dirname, 'src/types'),
        '@constants': resolve(__dirname, 'src/constants'),
        '@context': resolve(__dirname, 'src/context'),
        '@services': resolve(__dirname, 'src/services'),
        '@api': resolve(__dirname, 'src/api')
      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        },
        mangle: {
          safari10: true
        }
      },
      rollupOptions: {
        external: [...nodeBuiltins, ...platformModules],
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
        onwarn(warning, warn) {
          // Skip certain warnings
          if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'THIS_IS_UNDEFINED') {
            return;
          }
          warn(warning);
        }
      },
      // Add error handling for build failures
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      // Ensure proper handling of dynamic imports
      dynamicImportVarsOptions: {
        warnOnError: true
      }
    },
    server: {
      port: 3000,
      open: true,
      host: true
    },
    preview: {
      port: 3000,
      open: true,
      host: true
    }
  };
});
