/**
 * Direct Team Image Update - Version 1.0
 * 
 * This script directly updates any images of Byron and Drew Campbell
 * on the page, regardless of how they're referenced.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Team member image URLs
    images: {
      byron: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550567/thumb_22372_byron-campbell-thumb_lush6g.jpg',
      drew: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550564/thumb_24013_drew-campbell-thumb_2_s7xbyl.jpg'
    },
    // Image matching patterns
    patterns: {
      byron: ['byron', 'byron-campbell', 'byron_campbell', 'byroncampbell'],
      drew: ['drew', 'drew-campbell', 'drew_campbell', 'drewcampbell']
    },
    // Update intervals (ms)
    intervals: {
      initial: 500,
      periodic: 2000,
      maxAttempts: 10
    }
  };

  // Utility functions
  const utils = {
    /**
     * Log message with prefix
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    log(message, level = 'log') {
      const prefix = '[Direct Team Image Update]';
      console[level](`${prefix} ${message}`);
    },

    /**
     * Execute function safely with error handling
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
     * Check if text matches any of the patterns
     * @param {string} text - Text to check
     * @param {string[]} patterns - Patterns to match
     * @returns {boolean} True if text matches any pattern
     */
    matchesAnyPattern(text, patterns) {
      if (!text) return false;
      const lowerText = text.toLowerCase();
      return patterns.some(pattern => lowerText.includes(pattern.toLowerCase()));
    },

    /**
     * Preload image and get dimensions
     * @param {string} url - Image URL
     * @returns {Promise<HTMLImageElement>} Promise resolving to loaded image
     */
    preloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    }
  };

  // Core functionality
  const directImageUpdater = {
    // State
    updatedImages: 0,
    updateAttempts: 0,
    preloadedImages: {},

    /**
     * Initialize the direct image updater
     */
    init() {
      utils.log('Initializing direct team image updater');
      
      // Preload images
      this.preloadImages().then(() => {
        // Run initial update
        this.update();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
        
        // Update on page load
        window.addEventListener('load', () => this.update());
        
        // Update on DOM changes
        this.observeDOMChanges();
      });
    },

    /**
     * Preload all team member images
     * @returns {Promise<void>} Promise resolving when all images are preloaded
     */
    async preloadImages() {
      try {
        // Preload Byron's image
        this.preloadedImages.byron = await utils.preloadImage(CONFIG.images.byron);
        utils.log('Byron\'s image preloaded successfully');
        
        // Preload Drew's image
        this.preloadedImages.drew = await utils.preloadImage(CONFIG.images.drew);
        utils.log('Drew\'s image preloaded successfully');
      } catch (error) {
        utils.log(`Error preloading images: ${error.message}`, 'error');
      }
    },

    /**
     * Set up periodic updates
     */
    setupPeriodicUpdates() {
      // Initial update after a short delay
      setTimeout(() => this.update(), CONFIG.intervals.initial);
      
      // Periodic updates
      const intervalId = setInterval(() => {
        this.updateAttempts++;
        this.update();
        
        // Stop periodic updates after max attempts
        if (this.updateAttempts >= CONFIG.intervals.maxAttempts) {
          clearInterval(intervalId);
          utils.log(`Stopped periodic updates after ${CONFIG.intervals.maxAttempts} attempts`);
        }
      }, CONFIG.intervals.periodic);
    },

    /**
     * Observe DOM changes to update images when new content is added
     */
    observeDOMChanges() {
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        
        // Check if any mutations added new images
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const node = mutation.addedNodes[i];
              if (node.nodeName === 'IMG' || 
                  (node.nodeType === Node.ELEMENT_NODE && node.querySelector('img'))) {
                shouldUpdate = true;
                break;
              }
            }
          }
        });
        
        // Update if new images were added
        if (shouldUpdate) {
          utils.log('DOM changes detected, updating images');
          this.update();
        }
      });
      
      // Observe the entire document for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    },

    /**
     * Update all team member images on the page
     */
    update() {
      utils.safeExecute(() => {
        utils.log('Updating team member images');
        this.updatedImages = 0;
        
        // Find all images on the page
        const allImages = document.querySelectorAll('img');
        utils.log(`Found ${allImages.length} images on the page`);
        
        // Update each image if it matches a team member
        allImages.forEach(img => {
          this.updateImageIfTeamMember(img);
        });
        
        utils.log(`Update complete, ${this.updatedImages} images updated`);
      });
    },

    /**
     * Update image if it's a team member image
     * @param {HTMLImageElement} img - Image element to check and update
     */
    updateImageIfTeamMember(img) {
      utils.safeExecute(() => {
        // Get image attributes for matching
        const src = img.src || '';
        const alt = img.alt || '';
        const className = img.className || '';
        const id = img.id || '';
        const dataAttributes = Array.from(img.attributes)
          .filter(attr => attr.name.startsWith('data-'))
          .map(attr => attr.value)
          .join(' ');
        
        // Combine all attributes for matching
        const imgText = `${src} ${alt} ${className} ${id} ${dataAttributes}`.toLowerCase();
        
        // Check if image is Byron Campbell
        if (utils.matchesAnyPattern(imgText, CONFIG.patterns.byron)) {
          this.updateImage(img, 'byron');
        }
        // Check if image is Drew Campbell
        else if (utils.matchesAnyPattern(imgText, CONFIG.patterns.drew)) {
          this.updateImage(img, 'drew');
        }
        // Check parent elements for team member names
        else {
          this.checkParentElementsForTeamMember(img);
        }
      });
    },

    /**
     * Check parent elements for team member names
     * @param {HTMLImageElement} img - Image element to check
     */
    checkParentElementsForTeamMember(img) {
      utils.safeExecute(() => {
        // Check up to 3 parent levels
        let element = img.parentElement;
        for (let i = 0; i < 3 && element; i++) {
          const text = element.textContent || '';
          
          // Check if parent contains Byron Campbell
          if (utils.matchesAnyPattern(text, CONFIG.patterns.byron)) {
            this.updateImage(img, 'byron');
            return;
          }
          // Check if parent contains Drew Campbell
          else if (utils.matchesAnyPattern(text, CONFIG.patterns.drew)) {
            this.updateImage(img, 'drew');
            return;
          }
          
          // Move up to next parent
          element = element.parentElement;
        }
      });
    },

    /**
     * Update image with team member image
     * @param {HTMLImageElement} img - Image element to update
     * @param {string} person - Person identifier (byron or drew)
     */
    updateImage(img, person) {
      utils.safeExecute(() => {
        // Skip if image is already updated
        if (img.dataset.teamImageUpdated === person) {
          return;
        }
        
        utils.log(`Updating ${person}'s image`);
        
        // Force image reload by adding cache-busting parameter
        const cacheBuster = new Date().getTime();
        const imageUrl = `${CONFIG.images[person]}?v=${cacheBuster}`;
        
        // Update image attributes
        img.src = imageUrl;
        img.alt = person === 'byron' ? 'Byron Campbell' : 'Drew Campbell';
        
        // Mark image as updated
        img.dataset.teamImageUpdated = person;
        
        // Apply styles
        this.applyImageStyles(img);
        
        this.updatedImages++;
      });
    },

    /**
     * Apply styles to an image
     * @param {HTMLImageElement} img - Image element
     */
    applyImageStyles(img) {
      img.style.objectFit = 'cover';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.display = 'block';
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => directImageUpdater.init());
  } else {
    directImageUpdater.init();
  }
})();