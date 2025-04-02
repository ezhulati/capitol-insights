# Capitol Insights Website Optimization Guide

This guide provides instructions on how to optimize the Capitol Insights website for better performance, accessibility, and security.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [JavaScript Optimization](#javascript-optimization)
3. [Accessibility Improvements](#accessibility-improvements)
4. [Security Enhancements](#security-enhancements)
5. [Font Loading Optimization](#font-loading-optimization)

## Image Optimization

### Converting Images to WebP Format

The website includes tools to convert JPG images to WebP format, which provides better compression and faster loading times.

1. Run the conversion script:
   ```bash
   npm run convert-images
   ```

2. This will create WebP versions of all JPG images in the `public/images` directory and place them in `public/images/webp`.

### Using the OptimizedImage Component

The `OptimizedImage` component provides WebP images with JPG fallback for browsers that don't support WebP.

1. Find image components that need to be updated:
   ```bash
   npm run find-images
   ```

2. Replace `<img>` tags with `<OptimizedImage>` component:

   Before:
   ```jsx
   <img 
     src="/images/texas-capitol.jpg" 
     alt="The Texas State Capitol building" 
     width={800} 
     height={600} 
   />
   ```

   After:
   ```jsx
   import OptimizedImage from '../components/OptimizedImage';

   <OptimizedImage 
     src="/images/texas-capitol.jpg" 
     alt="The Texas State Capitol building" 
     width={800} 
     height={600} 
   />
   ```

## JavaScript Optimization

### Analyzing JavaScript Bundles

1. Build the project:
   ```bash
   npm run build
   ```

2. Analyze JavaScript bundles:
   ```bash
   npm run analyze-js
   ```

3. This will identify large JavaScript files and potential optimizations.

### Reducing Unused JavaScript

1. Implement code splitting for large components:
   ```jsx
   import { lazy, Suspense } from 'react';

   // Instead of: import LargeComponent from './LargeComponent';
   const LargeComponent = lazy(() => import('./LargeComponent'));

   // Then use with Suspense
   <Suspense fallback={<div>Loading...</div>}>
     <LargeComponent />
   </Suspense>
   ```

2. Use dynamic imports for libraries only needed in specific situations:
   ```jsx
   // Instead of: import { format } from 'date-fns';
   const formatDate = async (date) => {
     const { format } = await import('date-fns');
     return format(date, 'yyyy-MM-dd');
   };
   ```

## Accessibility Improvements

### Color Contrast

The website has been updated with improved color contrast for better accessibility:

- Gold colors have been lightened for better contrast with navy text
- Text colors have been darkened for better contrast with light backgrounds
- Font weights have been increased for better readability

### Font Loading

The website uses a system font stack as fallback for Google Fonts, ensuring text remains readable even if Google Fonts fail to load.

## Security Enhancements

### CodeQL Security Scan

The website includes a GitHub workflow for CodeQL security scanning:

1. The workflow is configured in `.github/workflows/security-scan.yml`
2. It runs automatically on push to the main branch and on pull requests
3. It checks for security vulnerabilities in JavaScript and TypeScript code

### Module Type Consistency

The website uses consistent module types across different directories:

- Root directory: ES modules (`"type": "module"` in package.json)
- Netlify functions: ES modules (`"type": "module"` in netlify/functions/package.json)
- Public directory: CommonJS (`"type": "commonjs"` in public/package.json)

## Font Loading Optimization

The website uses an optimized font loading strategy:

1. Preconnect to Google Fonts domains
2. Load fonts with `font-display: swap` for better performance
3. Use system font stack as fallback
4. Inline critical CSS for faster rendering

## Running All Optimizations

To run all optimization tools:

```bash
npm run optimize
```

This will:
1. Convert images to WebP format
2. Analyze JavaScript bundles for optimization opportunities

## Monitoring Performance

After implementing optimizations, monitor performance using:

1. Lighthouse in Chrome DevTools
2. PageSpeed Insights (https://pagespeed.web.dev/)
3. WebPageTest (https://www.webpagetest.org/)