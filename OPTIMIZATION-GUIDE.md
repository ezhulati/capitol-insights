# Capitol Insights Website Optimization Guide

This guide provides comprehensive instructions for optimizing the Capitol Insights website for better performance, accessibility, and user experience.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [JavaScript Optimization](#javascript-optimization)
3. [CSS Optimization](#css-optimization)
4. [Font Loading Optimization](#font-loading-optimization)
5. [Performance Monitoring](#performance-monitoring)

## Image Optimization

Images are often the largest assets on a website. Optimizing them can significantly improve loading times and reduce bandwidth usage.

### Converting Images to WebP Format

WebP images are typically 25-35% smaller than JPEG or PNG images with similar visual quality.

1. Run the image conversion script:
   ```bash
   node convert-images-to-webp.js
   ```

2. This script will:
   - Scan the `/public/images` and `/src/assets/images` directories
   - Convert JPG, JPEG, and PNG images to WebP format
   - Keep the original files as fallbacks for browsers that don't support WebP
   - Report file size savings

### Using the OptimizedImage Component

Replace standard `<img>` tags with the `OptimizedImage` component for automatic WebP usage with fallbacks.

1. Find image components that should be replaced:
   ```bash
   node find-image-components.js
   ```

2. Replace `<img>` tags with `OptimizedImage` components:
   ```jsx
   // Before
   <img src="/images/texas-capitol.jpg" alt="Texas Capitol" />

   // After
   <OptimizedImage 
     src="/images/texas-capitol.jpg" 
     alt="Texas Capitol" 
     loading="lazy"
     objectFit="cover"
   />
   ```

3. Import the component in each file where it's used:
   ```jsx
   import OptimizedImage from '../components/OptimizedImage';
   ```

### Properly Sizing Images

Ensure images are not larger than needed for their display size:

1. Specify width and height attributes on all images to prevent layout shifts
2. Use responsive images with appropriate sizes:
   ```jsx
   <OptimizedImage 
     src="/images/texas-capitol.jpg" 
     alt="Texas Capitol" 
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
     width={800}
     height={600}
   />
   ```

3. Consider creating multiple sizes of important images for different viewports

## JavaScript Optimization

Reducing JavaScript size and improving execution can significantly enhance performance.

### Analyzing Bundle Size

1. Run the JavaScript optimization script:
   ```bash
   node optimize-js.js
   ```

2. This script will:
   - Analyze bundle sizes to identify large dependencies
   - Find unused imports and variables
   - Suggest code splitting opportunities
   - Provide recommendations for reducing JavaScript size

### Implementing Code Splitting

Code splitting allows you to load JavaScript only when needed:

1. Use React.lazy() for route-based code splitting:
   ```jsx
   import React, { Suspense } from 'react';
   
   // Instead of: import HomePage from './pages/HomePage';
   const HomePage = React.lazy(() => import('./pages/HomePage'));
   
   // In your router
   <Suspense fallback={<div>Loading...</div>}>
     <HomePage />
   </Suspense>
   ```

2. Prioritize splitting these components:
   - Pages that aren't part of the initial view
   - Large components like charts or complex forms
   - Admin sections or authenticated areas
   - Modal content that isn't immediately visible

### Reducing Unused JavaScript

1. Remove unused imports and variables:
   ```bash
   npx eslint --ext .js,.jsx,.ts,.tsx src/ --fix
   ```

2. Use specific imports instead of importing entire libraries:
   ```jsx
   // Instead of: import lodash from 'lodash';
   import { debounce, throttle } from 'lodash';
   ```

3. Consider smaller alternatives for large dependencies

## CSS Optimization

Optimizing CSS can improve rendering performance and reduce blocking time.

### Critical CSS Extraction

1. Identify and inline critical CSS for above-the-fold content:
   - Use the existing `/public/css/critical.css` file
   - Keep it under 14KB for optimal first-render performance

2. Load non-critical CSS asynchronously:
   ```html
   <link rel="preload" href="/src/index.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/src/index.css"></noscript>
   ```

### Reducing Unused CSS

1. Use PurgeCSS to remove unused Tailwind classes:
   ```js
   // In tailwind.config.js
   module.exports = {
     purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     // ...
   }
   ```

2. Consider extracting component-specific styles to reduce the global CSS bundle

## Font Loading Optimization

Fonts can significantly impact performance and user experience.

### Optimizing Font Loading

1. Use the current font loading strategy with system font fallbacks:
   ```css
   body {
     font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }
   ```

2. Use `font-display: swap` to prevent invisible text during font loading:
   ```css
   @font-face {
     font-family: 'Inter';
     font-style: normal;
     font-weight: 400;
     font-display: swap;
     src: url('/fonts/inter-regular.woff2') format('woff2');
   }
   ```

3. Preload critical fonts:
   ```html
   <link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
   ```

## Performance Monitoring

Regularly monitor performance to identify and address issues.

### Lighthouse Audits

Run Lighthouse audits in Chrome DevTools to measure:
- Performance
- Accessibility
- Best Practices
- SEO

Focus on these key metrics:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.8s

### Web Vitals Monitoring

Use the existing web vitals reporting in the application:

```jsx
// In main.tsx
import { reportWebVitals } from './utils/analytics.ts';

reportWebVitals((metric) => {
  // Send to analytics in production
  if (process.env.NODE_ENV !== 'development') {
    console.log(metric);
  }
});
```

Consider sending these metrics to a monitoring service for tracking over time.

## Implementation Checklist

- [ ] Convert key images to WebP format
- [ ] Replace standard img tags with OptimizedImage component
- [ ] Implement code splitting for large pages
- [ ] Remove unused JavaScript and CSS
- [ ] Optimize font loading strategy
- [ ] Set up performance monitoring
- [ ] Run Lighthouse audits before and after changes to measure improvement

## Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [WebP Images Guide](https://web.dev/serve-images-webp/)
- [JavaScript Loading Optimization](https://web.dev/fast/#optimize-your-javascript)