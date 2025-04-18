/**
 * Section Swap Script - v2.0 - Enhanced Safari Compatibility
 * 
 * This script safely swaps the "Need Customized Research or Analysis?" section 
 * with the "Subscribe to Legislative Updates" section on the resources page.
 * It uses a more robust approach that works in all browsers, with special
 * optimizations for Safari. It integrates with the Safari Navigation Fix script.
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    sectionTitles: {
      subscribe: 'Subscribe to Legislative Updates',
      research: 'Need Customized Research or Analysis?'
    },
    maxAttempts: 15, // Increased for better reliability
    attemptInterval: 400, // ms - slightly faster
    safariAttemptInterval: 600, // ms - slightly slower for Safari
    debug: true,
    version: '2.0'
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
      
      const prefix = '[Section Swap]';
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
     * Find section by heading text
     * @param {string} headingText - Text to find in heading
     * @returns {Element|null} Section element or null
     */
    findSectionByHeading(headingText) {
      return this.safeExecute(() => {
        // Try to find the section by its heading text
        const sections = Array.from(document.querySelectorAll('section'));
        
        for (const section of sections) {
          const heading = section.querySelector('h2, h3, h4, h5, h6');
          
          if (heading && heading.textContent.trim() === headingText) {
            return section;
          }
        }
        
        return null;
      });
    },
    
    /**
     * Check if we're on the resources page
     * @returns {boolean} True if on resources page
     */
    isResourcesPage() {
      return window.location.pathname.includes('/resources') || 
             document.title.toLowerCase().includes('resource');
    },
    
    /**
     * Safely swap two DOM elements
     * @param {Element} elem1 - First element
     * @param {Element} elem2 - Second element
     * @returns {boolean} True if swap was successful
     */
    swapElements(elem1, elem2) {
      return this.safeExecute(() => {
        if (!elem1 || !elem2) {
          return false;
        }
        
        // Get parents
        const parent1 = elem1.parentNode;
        const parent2 = elem2.parentNode;
        
        if (!parent1 || !parent2) {
          return false;
        }
        
        // Enhanced approach for Safari compatibility
        const isSafari = this.isSafari();
        
        if (isSafari) {
          this.log('Using Safari-optimized element swap technique');
          
          // Save the original content
          const elem1HTML = elem1.outerHTML;
          const elem2HTML = elem2.outerHTML;
          
          // Create new elements with the swapped content
          const newElem1 = document.createElement('div');
          newElem1.innerHTML = elem2HTML;
          const newElem2 = document.createElement('div');
          newElem2.innerHTML = elem1HTML;
          
          // Replace the original elements with the new ones
          parent1.replaceChild(newElem1.firstElementChild, elem1);
          parent2.replaceChild(newElem2.firstElementChild, elem2);
        } else {
          // Standard approach for other browsers
          // Create temporary markers
          const temp1 = document.createElement('div');
          const temp2 = document.createElement('div');
          
          // Clone the elements to avoid reference issues
          const clone1 = elem1.cloneNode(true);
          const clone2 = elem2.cloneNode(true);
          
          // Replace with markers
          parent1.replaceChild(temp1, elem1);
          parent2.replaceChild(temp2, elem2);
          
          // Swap
          parent1.replaceChild(clone2, temp1);
          parent2.replaceChild(clone1, temp2);
        }
        
        return true;
      });
    }
  };
  
  // Main function to swap sections
  function swapSections() {
    // Only run on resources page
    if (!utils.isResourcesPage()) {
      utils.log('Not on resources page, skipping section swap');
      return;
    }
    
    utils.log('Attempting to swap sections on resources page');
    
    // Find sections
    const subscribeSection = utils.findSectionByHeading(CONFIG.sectionTitles.subscribe);
    const researchSection = utils.findSectionByHeading(CONFIG.sectionTitles.research);
    
    // Check if both sections were found
    if (subscribeSection && researchSection) {
      utils.log('Found both sections, swapping...');
      
      // Swap sections
      const swapResult = utils.swapElements(subscribeSection, researchSection);
      
      if (swapResult) {
        utils.log('Sections swapped successfully');
      } else {
        utils.log('Failed to swap sections', 'error');
      }
    } else {
      utils.log(`Sections not found yet. Subscribe: ${!!subscribeSection}, Research: ${!!researchSection}`, 'warn');
    }
  }
  
  // Function to attempt section swap multiple times
  function attemptSectionSwap(attempt = 0) {
    if (attempt >= CONFIG.maxAttempts) {
      utils.log('Max attempts reached, giving up', 'warn');
      return;
    }
    
    utils.log(`Attempt ${attempt + 1}/${CONFIG.maxAttempts}`);
    
    // Try to swap sections
    swapSections();
    
    // If sections weren't found, try again after a delay
    const subscribeSection = utils.findSectionByHeading(CONFIG.sectionTitles.subscribe);
    const researchSection = utils.findSectionByHeading(CONFIG.sectionTitles.research);
    
    if (!subscribeSection || !researchSection) {
      // Use different interval for Safari
      const interval = utils.isSafari() ? CONFIG.safariAttemptInterval : CONFIG.attemptInterval;
      
      setTimeout(() => {
        attemptSectionSwap(attempt + 1);
      }, interval);
    }
  }
  
  // Function to handle navigation events
  function handleNavigationEvent(event) {
    utils.log('Navigation event detected, re-attempting section swap');
    attemptSectionSwap(0); // Reset attempt counter
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a bit for React to render components
      setTimeout(() => {
        attemptSectionSwap();
      }, CONFIG.attemptInterval);
    });
  } else {
    // Document already loaded, wait a bit for React to render components
    setTimeout(() => {
      attemptSectionSwap();
    }, CONFIG.attemptInterval);
  }
  
  // Listen for window load event
  window.addEventListener('load', () => {
    utils.log('Window load event detected');
    setTimeout(() => {
      attemptSectionSwap(0); // Reset attempt counter
    }, 200);
  });
  
  // Listen for custom events from Safari Navigation Fix
  document.addEventListener('safariNavigationRefresh', handleNavigationEvent);
  document.addEventListener('safariNavigationUpdate', handleNavigationEvent);
  
  // Listen for URL changes
  let lastUrl = location.href;
  
  // Use different techniques for different browsers
  if (utils.isSafari()) {
    // Use polling for Safari
    setInterval(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleNavigationEvent();
      }
    }, 500);
  } else {
    // Use MutationObserver for other browsers
    const observer = new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        handleNavigationEvent();
      }
    });
    
    observer.observe(document, {
      subtree: true,
      childList: true
    });
  }
  
  utils.log(`Section Swap v${CONFIG.version} initialized in ${utils.isSafari() ? 'Safari' : 'standard'} mode`);
})();
