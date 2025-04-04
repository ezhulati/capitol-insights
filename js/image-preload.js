/**
 * Image Preload and WebP Support Script
 * 
 * This script:
 * 1. Detects WebP support in the browser
 * 2. Preloads critical images
 * 3. Adds WebP support class to the HTML element
 * 4. Ensures WebP images are properly loaded
 */

(function() {
  // Detect WebP support
  function checkWebpSupport(callback) {
    var webp = new Image();
    webp.onload = function() { callback(webp.height === 1); };
    webp.onerror = function() { callback(false); };
    webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }

  // Preload critical images
  function preloadCriticalImages() {
    var images = [
      '/images/approach-capitol.webp',
      '/images/texas-capitol.webp',
      '/images/capitol-background.webp',
      '/images/texture-background.webp'
    ];

    // Fallback images for browsers that don't support WebP
    var fallbackImages = [
      '/images/approach-capitol.jpg',
      '/images/texas-capitol.jpg',
      '/images/capitol-background.jpg',
      '/images/texture-background.jpg'
    ];

    // Check WebP support and preload appropriate images
    checkWebpSupport(function(hasWebpSupport) {
      // Add WebP support class to HTML element
      document.documentElement.classList.add(hasWebpSupport ? 'webp' : 'no-webp');
      
      // Preload images
      var imagesToPreload = hasWebpSupport ? images : fallbackImages;
      
      imagesToPreload.forEach(function(src) {
        var link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.type = hasWebpSupport ? 'image/webp' : 'image/jpeg';
        document.head.appendChild(link);
      });
    });
  }

  // Fix background images if WebP is not supported
  function fixBackgroundImages(hasWebpSupport) {
    if (!hasWebpSupport) {
      // Create a style element
      var style = document.createElement('style');
      style.textContent = `
        .bg-capitol { background-image: url('/images/capitol-background.jpg') !important; }
        .bg-texture { background-image: url('/images/texture-background.jpg') !important; }
      `;
      document.head.appendChild(style);
    }
  }

  // Ensure picture elements use the right source
  function fixPictureElements() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhancePictureElements);
    } else {
      enhancePictureElements();
    }
    
    function enhancePictureElements() {
      // Find all picture elements
      var pictures = document.querySelectorAll('picture');
      
      pictures.forEach(function(picture) {
        // Ensure WebP source is first
        var sources = picture.querySelectorAll('source');
        var webpSource = Array.from(sources).find(function(source) {
          return source.type === 'image/webp';
        });
        
        if (webpSource && webpSource !== sources[0]) {
          picture.insertBefore(webpSource, sources[0]);
        }
        
        // Add loading="lazy" to img if not already present
        var img = picture.querySelector('img');
        if (img && !img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
  }

  // Initialize
  checkWebpSupport(function(hasWebpSupport) {
    fixBackgroundImages(hasWebpSupport);
    preloadCriticalImages();
    fixPictureElements();
    
    // Add data attribute to body for CSS targeting
    document.body.setAttribute('data-webp-support', hasWebpSupport ? 'true' : 'false');
  });
})();