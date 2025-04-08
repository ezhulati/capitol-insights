/**
 * Replace Resources Page Script
 * 
 * This script replaces the original resources page component with the new Safari-compatible version.
 * It should be run after the page loads to ensure proper functionality in Safari.
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    debug: true,
    originalResourcesPagePath: '/assets/resourcespage-39e9bc03.js',
    newResourcesPagePath: '/assets/resourcespage-new.js'
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
      
      const prefix = '[Resources Page Replacer]';
      console[level](`${prefix} ${message}`);
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
     * Load script dynamically
     * @param {string} src - Script source URL
     * @returns {Promise} Promise that resolves when script is loaded
     */
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        script.onload = () => {
          this.log(`Script loaded: ${src}`);
          resolve();
        };
        script.onerror = (error) => {
          this.log(`Error loading script: ${src}`, 'error');
          reject(error);
        };
        document.head.appendChild(script);
      });
    }
  };
  
  /**
   * Main function to replace the resources page
   */
  async function replaceResourcesPage() {
    // Only run in Safari
    if (!utils.isSafari()) {
      utils.log('Not running in Safari, skipping resources page replacement');
      return;
    }
    
    utils.log('Replacing resources page for Safari compatibility');
    
    try {
      // Check if we're on the resources page
      const isResourcesPage = window.location.pathname.includes('/resources');
      
      if (isResourcesPage) {
        utils.log('Currently on resources page, loading new implementation');
        
        // Load the new resources page script
        await utils.loadScript(CONFIG.newResourcesPagePath);
        
        // Force a refresh of the page content
        setTimeout(() => {
          utils.log('Refreshing page content');
          
          // Dispatch a custom event that our navigation fix script can listen for
          const refreshEvent = new CustomEvent('safariNavigationRefresh', {
            detail: { 
              timestamp: Date.now(),
              path: location.pathname
            }
          });
          document.dispatchEvent(refreshEvent);
          
          // Force layout recalculation
          document.body.style.display = 'none';
          setTimeout(() => {
            document.body.style.display = '';
          }, 0);
        }, 500);
      } else {
        utils.log('Not on resources page, preloading new implementation for faster navigation');
        
        // Preload the new resources page script for faster navigation
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = CONFIG.newResourcesPagePath;
        link.as = 'script';
        document.head.appendChild(link);
        
        // Listen for navigation to resources page
        document.addEventListener('safariNavigationUpdate', (event) => {
          if (event.detail && event.detail.path && event.detail.path.includes('/resources')) {
            utils.log('Navigated to resources page, loading new implementation');
            utils.loadScript(CONFIG.newResourcesPagePath);
          }
        });
      }
      
      utils.log('Resources page replacement setup complete');
    } catch (error) {
      utils.log(`Error replacing resources page: ${error.message}`, 'error');
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceResourcesPage);
  } else {
    replaceResourcesPage();
  }
})();