# Bundle Optimization Guide

This guide explains how to optimize the JavaScript and CSS bundles for the Capitol Insights website to improve performance and address Lighthouse issues.

## Overview

The Lighthouse report identified several performance issues:

1. **Serve images in next-gen formats** (4.12s savings)
2. **Properly size images** (1.22s savings)
3. **Reduce unused JavaScript** (0.3s savings)
4. **Eliminate render-blocking resources** (0.15s savings)

We've already addressed the image issues by:
- Converting JPG images to WebP format
- Using the OptimizedImage component
- Updating background images in tailwind.config.js

This guide focuses on addressing the JavaScript and CSS optimization issues.

## JavaScript Bundle Optimization

The `optimize-bundle.js` script analyzes the Vite build output and optimizes the JavaScript bundles by:
- Removing unused code
- Eliminating console.log statements
- Removing comments and whitespace
- Creating a critical CSS file for faster initial rendering

### Usage

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the bundle optimizer:
   ```bash
   npm run optimize:bundle
   ```

3. Or use the combined command:
   ```bash
   npm run build:optimized
   ```

### What It Does

1. Finds and optimizes target JavaScript bundles (motion.js, index.js)
2. Creates a critical CSS file with essential styles
3. Updates index.html to:
   - Inline critical CSS for faster rendering
   - Load the main CSS file asynchronously

## Manual Optimization Techniques

In addition to the automated script, consider these manual optimizations:

### 1. Code Splitting

Split large components into smaller chunks that can be loaded on demand:

```jsx
// Before
import LargeComponent from './LargeComponent';

// After
import { lazy, Suspense } from 'react';
const LargeComponent = lazy(() => import('./LargeComponent'));

// Usage
<Suspense fallback={<div>Loading...</div>}>
  <LargeComponent />
</Suspense>
```

### 2. Tree Shaking

Ensure you're using ES modules and import only what you need:

```jsx
// Bad (imports everything)
import * as Utils from './utils';

// Good (imports only what's needed)
import { specificFunction } from './utils';
```

### 3. Preload Critical Resources

Add preload links for critical resources:

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/capitol-background.webp" as="image" type="image/webp">
```

### 4. Defer Non-Critical JavaScript

Use the defer attribute for non-critical scripts:

```html
<script src="/assets/non-critical.js" defer></script>
```

## Monitoring Performance

After implementing these optimizations, monitor performance using:

1. Lighthouse in Chrome DevTools
2. WebPageTest.org
3. Google PageSpeed Insights

## Continuous Improvement

Performance optimization is an ongoing process:

1. Regularly run Lighthouse audits
2. Monitor bundle sizes with `npm run analyze`
3. Review and optimize new components and features
4. Consider implementing a performance budget

## Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)