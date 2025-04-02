import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import type { Plugin, PluginOption } from 'vite';

// External dependencies that should not be bundled
const externalDeps = [
  // React and core dependencies
  'react',
  'react-dom',
  'react-router-dom',
  'react-helmet-async',
  'react-intersection-observer',
  'react-error-boundary',
  
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

// Optional dependencies that may not be available
const optionalDeps = [
  '@esbuild/darwin-arm64',
  '@rollup/rollup-darwin-arm64',
  '@img/sharp-darwin-arm64',
  'fsevents'
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  // Filter out plugins that depend on optional dependencies
  const plugins: PluginOption[] = [
    react(),
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
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    compression({
      algorithm: 'gzip',
      ext: '.br',
      threshold: 10240,
      filter: /\.(js|css|html|svg)$/,
      deleteOriginFile: false
    })
  ];

  // Only add visualizer in analyze mode
  if (mode === 'analyze') {
    const visualizerPlugin = visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    });
    plugins.push(visualizerPlugin as unknown as PluginOption);
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@styles': resolve(__dirname, './src/styles'),
        '@utils': resolve(__dirname, './src/utils'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@assets': resolve(__dirname, './src/assets'),
        '@types': resolve(__dirname, './src/types'),
        '@constants': resolve(__dirname, './src/constants'),
        '@context': resolve(__dirname, './src/context'),
        '@services': resolve(__dirname, './src/services'),
        '@layouts': resolve(__dirname, './src/layouts'),
        '@config': resolve(__dirname, './src/config'),
        '@api': resolve(__dirname, './src/api'),
        '@store': resolve(__dirname, './src/store'),
        '@lib': resolve(__dirname, './src/lib'),
        '@features': resolve(__dirname, './src/features'),
        '@shared': resolve(__dirname, './src/shared'),
        '@templates': resolve(__dirname, './src/templates'),
        '@providers': resolve(__dirname, './src/providers'),
        '@middleware': resolve(__dirname, './src/middleware'),
        '@helpers': resolve(__dirname, './src/helpers'),
        '@validators': resolve(__dirname, './src/validators'),
        '@i18n': resolve(__dirname, './src/i18n'),
        '@theme': resolve(__dirname, './src/theme'),
        '@animations': resolve(__dirname, './src/animations'),
        '@icons': resolve(__dirname, './src/icons'),
        '@images': resolve(__dirname, './src/images'),
        '@fonts': resolve(__dirname, './src/fonts'),
        '@data': resolve(__dirname, './src/data'),
        '@mocks': resolve(__dirname, './src/mocks'),
        '@tests': resolve(__dirname, './src/tests'),
        '@docs': resolve(__dirname, './src/docs'),
        '@scripts': resolve(__dirname, './src/scripts'),
        '@workers': resolve(__dirname, './src/workers')
      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: true,
        format: {
          comments: false
        }
      },
      rollupOptions: {
        external: [...externalDeps, ...optionalDeps],
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui': ['framer-motion', 'lucide-react', '@tailwindcss/typography'],
            'pdf': ['jspdf', 'jspdf-autotable', 'html2canvas'],
            'sanity': ['@sanity/client', '@mdx-js/react', '@portabletext/react'],
            'utils': ['validator', 'xss', 'web-vitals']
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true
      },
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/dist/**']
      }
    },
    preview: {
      port: 4173,
      strictPort: true,
      host: true,
      open: true,
      cors: true
    }
  };
});
