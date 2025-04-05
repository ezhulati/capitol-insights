/**
 * JavaScript Deferral Script
 * 
 * This script:
 * 1. Identifies non-critical JavaScript
 * 2. Defers loading of these scripts
 * 3. Reduces main thread work
 * 4. Improves Time to Interactive
 */

(function() {
  // Configuration
  const criticalScripts = [
    '/src/main.tsx',
    '/js/meta-fixer.js',
    '/js/image-preload.js',
    '/js/structured-data.js'
  ];
  
  // Detect if this is a first visit or a return visit
  const isReturnVisitor = localStorage.getItem('visited') === 'true';
  
  // Mark as visited for future visits
  localStorage.setItem('visited', 'true');
  
  // Function to defer non-critical scripts
  function deferNonCriticalScripts() {
    // Only run this optimization for first-time visitors
    if (isReturnVisitor) return;
    
    // Find all script tags
    const scripts = document.querySelectorAll('script[src]');
    
    scripts.forEach(function(script) {
      const src = script.getAttribute('src');
      
      // Skip critical scripts
      if (criticalScripts.some(function(criticalSrc) { return src.includes(criticalSrc); })) {
        return;
      }
      
      // Skip scripts that already have defer or async
      if (script.hasAttribute('defer') || script.hasAttribute('async')) {
        return;
      }
      
      // Create a new deferred script
      const deferredScript = document.createElement('script');
      deferredScript.src = src;
      deferredScript.defer = true;
      
      // Copy other attributes
      Array.from(script.attributes).forEach(function(attr) {
        if (attr.name !== 'src' && attr.name !== 'defer' && attr.name !== 'async') {
          deferredScript.setAttribute(attr.name, attr.value);
        }
      });
      
      // Replace the original script
      script.parentNode.replaceChild(deferredScript, script);
    });
  }
  
  // Function to optimize the motion.js bundle
  function optimizeMotionBundle() {
    // Only load motion effects when they're visible
    const handleIntersection = function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Safari compatibility fix: Use script tag instead of dynamic import
          var script = document.createElement('script');
          script.src = '/assets/motion-55a23653.js';
          script.type = 'module';
          script.onload = function() {
            console.log('Motion effects loaded');
          };
          script.onerror = function(err) {
            console.error('Failed to load motion effects:', err);
          };
          document.head.appendChild(script);
          
          // Disconnect the observer once loaded
          observer.disconnect();
        }
      });
    };
    
    // Create an intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px', // Load a bit before the element is visible
      threshold: 0.1
    });
    
    // Observe elements that use motion effects
    document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-right')
      .forEach(function(el) { observer.observe(el); });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    deferNonCriticalScripts();
    optimizeMotionBundle();
  }
})();
