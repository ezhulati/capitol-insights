import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import type { Plugin, PluginOption } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Node.js built-in modules that should be external
const nodeBuiltins = [
  'fs',
  'path',
  'crypto',
  'util',
  'stream',
  'events',
  'os',
  'child_process',
  'buffer',
  'process',
  'querystring',
  'url',
  'zlib',
  'http',
  'https',
  'net',
  'tls',
  'dns',
  'dgram',
  'punycode',
  'readline',
  'repl',
  'string_decoder',
  'sys',
  'timers',
  'tty',
  'vm'
];

// Platform-specific modules that should be external
const platformModules = [
  // Rollup platform-specific modules
  /^@rollup\/rollup-(darwin|linux|win32|freebsd|android)-(arm64|arm|x64|ia32|powerpc64le|s390x|riscv64|loongarch64|loong64)-(gnu|musl|msvc|eabi)$/,
  
  // Esbuild platform-specific modules
  /^@esbuild\/(darwin|linux|win32|android)-(arm64|arm|x64|ia32)$/,
  
  // Sharp platform-specific modules
  /^@img\/sharp-(darwin|linux|win32)-(arm64|x64)$/,
  
  // Other platform-specific modules
  'detect-libc',
  'node-gyp',
  'node-pre-gyp',
  'node-sass',
  'sass',
  'fibers',
  'canvas',
  'sqlite3',
  'bcrypt',
  'node-gyp-build',
  'node-gyp-build-optional-package',
  'node-gyp-build-tools',
  'node-gyp-build-optional-package-tools',
  'node-gyp-build-optional-package-tools-darwin',
  'node-gyp-build-optional-package-tools-linux',
  'node-gyp-build-optional-package-tools-win32'
];

// Optional dependencies that should be external
const optionalDeps = [
  // PDF and image processing
  'jspdf',
  'jspdf-autotable',
  'html2canvas',
  'sharp',
  'pdfkit',
  'puppeteer',
  
  // Sanity and MDX
  '@sanity/client',
  '@mdx-js/react',
  '@portabletext/react',
  
  // UI and animation
  'framer-motion',
  'lucide-react',
  
  // Utilities
  'validator',
  'xss',
  'web-vitals'
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  // Filter out plugins that depend on optional dependencies
  const plugins: PluginOption[] = [
    react({
      // Add React-specific options with enhanced handling for router constants
      babel: {
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          // Add transform for React Router constants
          '@babel/plugin-transform-runtime'
        ]
      },
      // Ensure proper handling of CommonJS/ESM interop
      jsxImportSource: 'react'
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
    esbuild: {
      // Add specific handling for React Router constants
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Fix for "Unexpected identifier 'POP'" error
      define: {
        "process.env.NODE_ENV": JSON.stringify(mode)
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
        external: [
          ...nodeBuiltins,
          ...platformModules,
          ...optionalDeps,
          // Add regex patterns for dynamic imports
          /^@rollup\/rollup-/,
          /^@esbuild\//,
          /^@img\/sharp-/
          // Removed external entries for main.js and assets/index.js which were preventing proper bundling
        ],
        output: {
          // Simplified output path configuration for more reliable bundling
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[ext]'
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
