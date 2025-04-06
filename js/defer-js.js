/**
 * JavaScript Deferral Script - Safari Compatible Version
 * 
 * This script:
 * 1. Identifies non-critical JavaScript
 * 2. Safely defers loading of these scripts
 * 3. Ensures critical scripts for the resources page are not deferred
 * 4. Improves performance while maintaining compatibility
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    criticalScripts: [
      '/src/main.tsx',
      '/js/meta-fixer.js',
      '/js/image-preload.js',
      '/js/structured-data.js',
      'resourcespage',
      'motion-55a23653.js',
      'react-',
      'vendor-',
      'index-7ca087c8.js',
      'ui-'
    ],
    debug: true,
    skipForReturnVisitors: true
  };
  
  // Utility functions
  const utils = {
    /**
     * Log message with prefix
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    log(message, level = 'log') {
      if (!CONFIG.debug) return;
      
      const prefix = '[JS Defer]';
      console[level](`${prefix} ${message}`);
    },
    
    /**
     * Safely execute function with error handling
     * @param {Function} fn - Function to execute
     * @returns {*} Result of function execution
     */
    safeExecute(fn) {
      try {
        return fn();
      } catch (error) {
        this.log(`Error: ${error.message}`, 'error');
        return null;
      }
    },
    
    /**
     * Check if script is critical
     * @param {string} src - Script source URL
     * @returns {boolean} True if script is critical
     */
    isCriticalScript(src) {
      if (!src) return false;
      
      return CONFIG.criticalScripts.some(criticalSrc => src.includes(criticalSrc));
    },
    
    /**
     * Check if current page is resources page
     * @returns {boolean} True if on resources page
     */
    isResourcesPage() {
      return window.location.pathname.includes('/resources') || 
             document.title.toLowerCase().includes('resource');
    },
    
    /**
     * Detect Safari browser
     * @returns {boolean} True if browser is Safari
     */
    isSafari() {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && 
             ua.indexOf('chrome') === -1 && 
             ua.indexOf('android') === -1;
    },
    
    /**
     * Check if this is a return visitor
     * @returns {boolean} True if this is a return visitor
     */
    isReturnVisitor() {
      return localStorage.getItem('visited') === 'true';
    },
    
    /**
     * Mark as visited for future visits
     */
    markAsVisited() {
      localStorage.setItem('visited', 'true');
    }
  };
  
  // Main functions
  const deferJS = {
    /**
     * Defer non-critical scripts
     */
    deferNonCriticalScripts() {
      // Skip for return visitors if configured
      if (CONFIG.skipForReturnVisitors && utils.isReturnVisitor()) {
        utils.log('Skipping script deferral for return visitor');
        return;
      }
      
      // Skip on resources page in Safari
      if (utils.isResourcesPage() && utils.isSafari()) {
        utils.log('Skipping script deferral on resources page in Safari');
        return;
      }
      
      utils.log('Deferring non-critical scripts');
      
      // Find all script tags
      const scripts = document.querySelectorAll('script[src]');
      utils.log(`Found ${scripts.length} scripts`);
      
      let deferredCount = 0;
      
      scripts.forEach(script => {
        utils.safeExecute(() => {
          const src = script.getAttribute('src');
          
          // Skip critical scripts
          if (utils.isCriticalScript(src)) {
            utils.log(`Skipping critical script: ${src}`);
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
          Array.from(script.attributes).forEach(attr => {
            if (attr.name !== 'src' && attr.name !== 'defer' && attr.name !== 'async') {
              deferredScript.setAttribute(attr.name, attr.value);
            }
          });
          
          // Replace the original script
          script.parentNode.replaceChild(deferredScript, script);
          deferredCount++;
        });
      });
      
      utils.log(`Deferred ${deferredCount} non-critical scripts`);
    },
    
    /**
     * Optimize the motion.js bundle
     */
    optimizeMotionBundle() {
      // Skip on resources page in Safari
      if (utils.isResourcesPage() && utils.isSafari()) {
        utils.log('Loading motion bundle immediately on resources page in Safari');
        this.loadMotionBundle();
        return;
      }
      
      utils.log('Setting up lazy loading for motion bundle');
      
      // Only load motion effects when they're visible
      const handleIntersection = entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            utils.log('Motion element visible, loading motion bundle');
            this.loadMotionBundle();
            
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
      const motionElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-right');
      
      if (motionElements.length > 0) {
        utils.log(`Found ${motionElements.length} motion elements to observe`);
        motionElements.forEach(el => observer.observe(el));
      } else {
        utils.log('No motion elements found, loading motion bundle immediately');
        this.loadMotionBundle();
      }
    },
    
    /**
     * Load the motion bundle
     */
    loadMotionBundle() {
      utils.safeExecute(() => {
        // Safari compatibility fix: Use script tag instead of dynamic import
        const script = document.createElement('script');
        script.src = '/assets/motion-55a23653.js';
        script.type = 'module';
        
        script.onload = () => {
          utils.log('Motion effects loaded successfully');
        };
        
        script.onerror = err => {
          utils.log(`Failed to load motion effects: ${err}`, 'error');
        };
        
        document.head.appendChild(script);
      });
    },
    
    /**
     * Initialize the script
     */
    init() {
      utils.log('Initializing JavaScript deferral');
      utils.log(`Browser: ${utils.isSafari() ? 'Safari' : 'non-Safari'}`);
      utils.log(`Page: ${utils.isResourcesPage() ? 'Resources' : 'Other'}`);
      
      // Mark as visited for future visits
      utils.markAsVisited();
      
      // Run main functions
      this.deferNonCriticalScripts();
      this.optimizeMotionBundle();
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => deferJS.init());
  } else {
    deferJS.init();
  }
})();
