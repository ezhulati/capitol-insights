/**
 * Section Swap Script - Safari Compatible Version
 * 
 * This script safely swaps the "Need Customized Research or Analysis?" section 
 * with the "Subscribe to Legislative Updates" section on the resources page.
 * It uses a more robust approach that works in all browsers, including Safari.
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    sectionTitles: {
      subscribe: 'Subscribe to Legislative Updates',
      research: 'Need Customized Research or Analysis?'
    },
    maxAttempts: 10,
    attemptInterval: 500, // ms
    debug: true
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
      setTimeout(() => {
        attemptSectionSwap(attempt + 1);
      }, CONFIG.attemptInterval);
    }
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
})();
