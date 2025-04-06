/**
 * Safari Resources Page Diagnostic Script
 * 
 * This script helps diagnose why the resources page isn't loading in Safari.
 * It logs key events, checks for errors, and monitors the DOM for changes.
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    debugMode: true,
    checkInterval: 500, // ms
    maxChecks: 20,      // 10 seconds total
    selectors: {
      resourcesPage: '[class*="resource"], h1:contains("Resources"), [data-page="resources"]',
      resourceItems: '.resource-card, [class*="card"], [class*="resource-item"]',
      reactRoot: '#root'
    }
  };
  
  // State
  let checkCount = 0;
  let resourcesPageDetected = false;
  let resourceItemsDetected = false;
  
  // Utility functions
  const utils = {
    /**
     * Log message with timestamp
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    log(message, level = 'log') {
      if (!CONFIG.debugMode) return;
      
      const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
      const prefix = '[Safari Diagnostic]';
      console[level](`${prefix} [${timestamp}] ${message}`);
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
     * Check if element exists using various selector methods
     * @param {string} selector - CSS selector
     * @returns {boolean} True if element exists
     */
    elementExists(selector) {
      try {
        // Try standard querySelector first
        if (document.querySelector(selector)) {
          return true;
        }
        
        // For complex selectors like :contains
        if (selector.includes(':contains')) {
          const parts = selector.split(':contains');
          const baseSelector = parts[0];
          const textToFind = parts[1].replace(/[()'"]/g, '').trim();
          
          const elements = document.querySelectorAll(baseSelector || '*');
          return Array.from(elements).some(el => 
            el.textContent.includes(textToFind)
          );
        }
        
        return false;
      } catch (error) {
        this.log(`Error checking for element ${selector}: ${error.message}`, 'error');
        return false;
      }
    },
    
    /**
     * Get current URL path
     * @returns {string} Current URL path
     */
    getCurrentPath() {
      return window.location.pathname;
    },
    
    /**
     * Check if current page is resources page
     * @returns {boolean} True if current page is resources page
     */
    isResourcesPage() {
      const path = this.getCurrentPath();
      return path.includes('/resources') || 
             document.title.toLowerCase().includes('resource') ||
             this.elementExists(CONFIG.selectors.resourcesPage);
    },
    
    /**
     * Check for JavaScript errors
     * @returns {Array} Array of error messages
     */
    checkForErrors() {
      // We can't access past errors, but we can set up a listener for future errors
      window.addEventListener('error', (event) => {
        this.log(`JavaScript error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`, 'error');
      });
      
      // Check for console errors by overriding console.error
      const originalConsoleError = console.error;
      console.error = (...args) => {
        this.log(`Console error: ${args.join(' ')}`, 'error');
        originalConsoleError.apply(console, args);
      };
    },
    
    /**
     * Check React rendering status
     * @returns {string} React rendering status
     */
    checkReactStatus() {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        return 'React root element not found';
      }
      
      if (rootElement.children.length === 0) {
        return 'React root element is empty';
      }
      
      return `React root contains ${rootElement.children.length} child elements`;
    },
    
    /**
     * Check for network issues
     */
    checkNetworkIssues() {
      // Monitor fetch and XMLHttpRequest
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        utils.log(`Fetch request: ${args[0]}`);
        return originalFetch.apply(this, args)
          .then(response => {
            utils.log(`Fetch response: ${response.url} - ${response.status}`);
            return response;
          })
          .catch(error => {
            utils.log(`Fetch error: ${error.message}`, 'error');
            throw error;
          });
      };
      
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(...args) {
        this.addEventListener('load', function() {
          utils.log(`XHR response: ${args[1]} - ${this.status}`);
        });
        this.addEventListener('error', function() {
          utils.log(`XHR error: ${args[1]}`, 'error');
        });
        utils.log(`XHR request: ${args[1]}`);
        return originalOpen.apply(this, args);
      };
    },
    
    /**
     * Check for script loading issues
     */
    checkScriptLoading() {
      const scripts = document.querySelectorAll('script[src]');
      this.log(`Found ${scripts.length} scripts on the page`);
      
      scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src.includes('resource') || src.includes('assets/')) {
          this.log(`Important script: ${src} (${script.async ? 'async' : 'sync'}, ${script.defer ? 'defer' : 'not deferred'})`);
        }
      });
    },
    
    /**
     * Monitor DOM changes
     */
    monitorDOMChanges() {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if resources page elements were added
            if (this.isResourcesPage() && !resourcesPageDetected) {
              resourcesPageDetected = true;
              this.log('Resources page detected in DOM');
            }
            
            // Check if resource items were added
            const resourceItems = document.querySelectorAll(CONFIG.selectors.resourceItems);
            if (resourceItems.length > 0 && !resourceItemsDetected) {
              resourceItemsDetected = true;
              this.log(`Resource items detected: ${resourceItems.length} items`);
            }
          }
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  };
  
  // Main diagnostic function
  function runDiagnostic() {
    const isSafari = utils.isSafari();
    utils.log(`Running diagnostic in ${isSafari ? 'Safari' : 'non-Safari'} browser`);
    
    // Initial checks
    utils.log(`Current URL: ${window.location.href}`);
    utils.log(`Document readyState: ${document.readyState}`);
    utils.log(`Is resources page: ${utils.isResourcesPage()}`);
    
    // Set up error monitoring
    utils.checkForErrors();
    
    // Check network issues
    utils.checkNetworkIssues();
    
    // Monitor DOM changes
    utils.monitorDOMChanges();
    
    // Periodic checks
    const intervalId = setInterval(() => {
      checkCount++;
      
      utils.log(`Check #${checkCount} - Document readyState: ${document.readyState}`);
      utils.log(utils.checkReactStatus());
      
      if (document.readyState === 'complete') {
        utils.checkScriptLoading();
        
        // Check for resources page elements
        const isResourcesPage = utils.isResourcesPage();
        utils.log(`Is resources page: ${isResourcesPage}`);
        
        if (isResourcesPage) {
          const resourceItems = document.querySelectorAll(CONFIG.selectors.resourceItems);
          utils.log(`Resource items found: ${resourceItems.length}`);
          
          if (resourceItems.length === 0) {
            utils.log('No resource items found, checking for errors');
            
            // Check for specific React errors
            if (window.React && window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
              utils.log('React is loaded');
            } else {
              utils.log('React might not be properly loaded', 'warn');
            }
          }
        }
      }
      
      // Stop checking after max checks
      if (checkCount >= CONFIG.maxChecks) {
        clearInterval(intervalId);
        utils.log('Diagnostic complete');
        
        // Final summary
        utils.log(`Final status - Resources page detected: ${resourcesPageDetected}`);
        utils.log(`Final status - Resource items detected: ${resourceItemsDetected}`);
        
        if (!resourcesPageDetected) {
          utils.log('ISSUE: Resources page was never detected in the DOM', 'error');
        } else if (!resourceItemsDetected) {
          utils.log('ISSUE: Resource items were never detected in the DOM', 'error');
        }
      }
    }, CONFIG.checkInterval);
  }
  
  // Run diagnostic when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runDiagnostic);
  } else {
    runDiagnostic();
  }
})();
