/**
 * Resource Image Updater - Version 1.0
 * 
 * A clean, modern implementation for updating resource images on the resources page.
 * This script handles image loading and display across all browsers with special
 * optimizations for Safari.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Resource image URLs
    images: {
      legislativeCalendar: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743313784/33727E2E-27C9-44FD-BA77-4C5F3CFD7F4A_oia0si.png',
      advocacyGuide: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743461383/Image_Mar_31_2025_05_47_12_PM_vwvuxs.png'
    },
    // CSS class names
    classes: {
      resourceCard: 'resource-card',
      imageContainer: 'image-container'
    },
    // Selectors
    selectors: {
      resourceCards: '.bg-white, [class*="card"], [class*="resource"]',
      titleElements: 'h2, h3, [class*="title"]',
      dateElements: '.text-xs, [class*="date"]'
    },
    // Text matching
    textMatches: {
      calendar: ['Legislative Calendar', 'Calendar 2025'],
      advocacy: ['Advocacy Guide', 'Legislative Advocacy']
    },
    // Update intervals (ms)
    intervals: {
      standard: 1000,
      safari: 2000
    }
  };

  // Utility functions
  const utils = {
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
     * Log message with prefix
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    log(message, level = 'log') {
      const prefix = '[Resource Updater]';
      console[level](`${prefix} ${message}`);
    },

    /**
     * Execute function safely with error handling
     * @param {Function} fn - Function to execute
     * @param {Function} fallbackFn - Fallback function if main function fails
     * @returns {*} Result of function execution
     */
    safeExecute(fn, fallbackFn) {
      try {
        return fn();
      } catch (error) {
        this.log(`Error: ${error.message}`, 'error');
        if (fallbackFn) {
          try {
            return fallbackFn();
          } catch (fallbackError) {
            this.log(`Fallback error: ${fallbackError.message}`, 'error');
          }
        }
        return null;
      }
    },

    /**
     * Check if text contains any of the specified keywords
     * @param {string} text - Text to check
     * @param {string[]} keywords - Keywords to match
     * @returns {boolean} True if text contains any keyword
     */
    textContainsAny(text, keywords) {
      if (!text) return false;
      const lowerText = text.toLowerCase();
      return keywords.some(keyword => 
        lowerText.includes(keyword.toLowerCase())
      );
    },

    /**
     * Check if current page is resources page
     * @returns {boolean} True if current page is resources page
     */
    isResourcesPage() {
      return window.location.pathname.includes('/resources') || 
             document.title.toLowerCase().includes('resource') ||
             !!document.querySelector('[class*="resource"]');
    },

    /**
     * Create and add styles to document
     */
    addStyles() {
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        /* Base styles for resource images */
        .resource-card img, 
        [class*="resource"] img {
          object-fit: contain !important;
          width: 100% !important;
          height: auto !important;
          min-height: 200px !important;
          max-width: 100% !important;
          display: block !important;
        }
        
        /* Container styles */
        .image-container, 
        .rounded-t-xl, 
        [class*="rounded-t"] {
          height: auto !important;
          min-height: 200px !important;
          overflow: visible !important;
        }
        
        /* Safari-specific fixes */
        @supports (-webkit-hyphens:none) {
          .resource-card, 
          [class*="resource"] {
            overflow: visible !important;
          }
          
          .resource-card img, 
          [class*="resource"] img {
            position: relative !important;
          }
        }
      `;
      document.head.appendChild(styleTag);
      this.log('Styles added');
    }
  };

  // Core functionality
  const resourceUpdater = {
    // State
    isSafari: false,
    updatedImages: 0,

    /**
     * Initialize the resource updater
     */
    init() {
      this.isSafari = utils.isSafari();
      utils.log(`Initializing in ${this.isSafari ? 'Safari' : 'standard'} mode`);
      
      // Add styles
      utils.addStyles();
      
      // Run immediately and set up intervals
      this.update();
      
      // Set up intervals for updates
      setTimeout(() => this.update(), CONFIG.intervals.standard);
      
      // Additional updates for Safari
      if (this.isSafari) {
        setTimeout(() => this.update(), CONFIG.intervals.safari);
        setTimeout(() => this.update(), CONFIG.intervals.safari * 2);
      }
      
      // Update on page load
      window.addEventListener('load', () => this.update());
      
      // Set up URL change detection for SPAs
      this.setupUrlChangeDetection();
    },

    /**
     * Set up detection for URL changes in single-page applications
     */
    setupUrlChangeDetection() {
      let lastUrl = location.href;
      
      if (this.isSafari) {
        // Use polling for Safari
        setInterval(() => {
          const url = location.href;
          if (url !== lastUrl) {
            lastUrl = url;
            this.update();
          }
        }, 500);
      } else {
        // Use MutationObserver for other browsers
        const observer = new MutationObserver(() => {
          const url = location.href;
          if (url !== lastUrl) {
            lastUrl = url;
            this.update();
          }
        });
        
        observer.observe(document, {
          subtree: true,
          childList: true
        });
      }
    },

    /**
     * Update resource images
     */
    update() {
      utils.safeExecute(() => {
        // Only run on resources page
        if (!utils.isResourcesPage()) {
          return;
        }
        
        utils.log('Updating resources page');
        this.updatedImages = 0;
        
        // Add class to all resource cards for easier targeting
        document.querySelectorAll(CONFIG.selectors.resourceCards).forEach(card => {
          card.classList.add(CONFIG.classes.resourceCard);
        });
        
        // Update images using direct approach
        this.updateImagesDirectly();
        
        // If no images were updated in Safari, try fallback approach
        if (this.updatedImages === 0 && this.isSafari) {
          utils.log('No images updated, trying fallback approach', 'warn');
          this.updateImagesWithFallback();
        }
        
        utils.log(`Update complete, ${this.updatedImages} images updated`);
      });
    },

    /**
     * Update images directly by finding existing images
     */
    updateImagesDirectly() {
      const allImages = document.querySelectorAll('img');
      utils.log(`Found ${allImages.length} images on the page`);
      
      allImages.forEach(img => {
        utils.safeExecute(() => {
          // Find parent card
          let card = this.findParentCard(img);
          if (!card) return;
          
          // Find title element
          const titleElement = this.findTitleElement(card);
          if (!titleElement) return;
          
          const title = titleElement.textContent.trim();
          
          // Update image based on title
          if (utils.textContainsAny(title, CONFIG.textMatches.calendar)) {
            this.updateCalendarImage(img, card);
          } else if (utils.textContainsAny(title, CONFIG.textMatches.advocacy)) {
            this.updateAdvocacyImage(img, card);
          }
        });
      });
    },

    /**
     * Update images with fallback approach by creating new images
     */
    updateImagesWithFallback() {
      const resourceCards = document.querySelectorAll(CONFIG.selectors.resourceCards);
      
      resourceCards.forEach(card => {
        utils.safeExecute(() => {
          // Find title element
          const titleElement = this.findTitleElement(card);
          if (!titleElement) return;
          
          const title = titleElement.textContent.trim();
          
          // Create and add image based on title
          if (utils.textContainsAny(title, CONFIG.textMatches.calendar)) {
            this.createAndAddImage(card, CONFIG.images.legislativeCalendar, 'Texas Legislative Calendar 2025');
          } else if (utils.textContainsAny(title, CONFIG.textMatches.advocacy)) {
            this.createAndAddImage(card, CONFIG.images.advocacyGuide, 'Texas Legislative Advocacy Guide');
            this.updateDateLabel(card);
          }
        });
      });
    },

    /**
     * Find parent card element for an image
     * @param {HTMLImageElement} img - Image element
     * @returns {HTMLElement|null} Parent card element or null
     */
    findParentCard(img) {
      // Try closest method first
      let card = img.closest('.resource-card');
      
      // If not found, traverse up the DOM
      if (!card) {
        let parent = img.parentElement;
        while (parent) {
          if (parent.classList && 
              (parent.classList.contains('bg-white') || 
               parent.classList.contains('resource-card') || 
               parent.className.includes('card') || 
               parent.className.includes('resource'))) {
            card = parent;
            break;
          }
          parent = parent.parentElement;
        }
      }
      
      // Fallback to direct parent if still not found
      return card || img.parentElement;
    },

    /**
     * Find title element in a card
     * @param {HTMLElement} card - Card element
     * @returns {HTMLElement|null} Title element or null
     */
    findTitleElement(card) {
      const titleElements = card.querySelectorAll(CONFIG.selectors.titleElements);
      
      for (let i = 0; i < titleElements.length; i++) {
        if (titleElements[i].textContent.trim()) {
          return titleElements[i];
        }
      }
      
      return null;
    },

    /**
     * Update Texas Legislative Calendar image
     * @param {HTMLImageElement} img - Image element
     * @param {HTMLElement} card - Card element
     */
    updateCalendarImage(img, card) {
      utils.log('Updating Texas Legislative Calendar image');
      
      // Create a new image to ensure proper loading
      const newImg = new Image();
      
      // Set up onload handler before setting src
      newImg.onload = () => {
        // Update existing image
        img.src = newImg.src;
        img.alt = 'Texas Legislative Calendar 2025';
        
        // Apply styles
        this.applyImageStyles(img);
        
        // Update container
        this.updateImageContainer(img);
        
        this.updatedImages++;
      };
      
      // Set source to trigger load
      newImg.src = CONFIG.images.legislativeCalendar;
    },

    /**
     * Update Texas Legislative Advocacy Guide image
     * @param {HTMLImageElement} img - Image element
     * @param {HTMLElement} card - Card element
     */
    updateAdvocacyImage(img, card) {
      utils.log('Updating Texas Legislative Advocacy Guide image');
      
      // Force image reload by adding cache-busting parameter
      const cacheBuster = new Date().getTime();
      const imageUrl = `${CONFIG.images.advocacyGuide}?v=${cacheBuster}`;
      
      // Create a new image to ensure proper loading
      const newImg = new Image();
      
      // Set up onload handler before setting src
      newImg.onload = () => {
        utils.log('Advocacy Guide image loaded successfully');
        
        // Update existing image with cache-busting URL
        img.src = imageUrl;
        img.alt = 'Texas Legislative Advocacy Guide';
        
        // Apply enhanced styles
        this.applyImageStyles(img);
        img.style.objectPosition = 'center';
        
        // Force repaint in Safari
        if (this.isSafari) {
          setTimeout(() => {
            img.style.opacity = '0.99';
            setTimeout(() => {
              img.style.opacity = '1';
            }, 50);
          }, 0);
        }
        
        // Update container with enhanced styles
        this.updateImageContainer(img);
        
        // Update date label
        this.updateDateLabel(card);
        
        this.updatedImages++;
      };
      
      // Handle loading errors
      newImg.onerror = () => {
        utils.log('Error loading Advocacy Guide image, trying direct approach', 'warn');
        
        // Direct approach as fallback
        img.src = imageUrl;
        img.alt = 'Texas Legislative Advocacy Guide';
        this.applyImageStyles(img);
        this.updateImageContainer(img);
        this.updateDateLabel(card);
        this.updatedImages++;
      };
      
      // Set source to trigger load
      newImg.src = imageUrl;
    },

    /**
     * Create and add a new image to a card
     * @param {HTMLElement} card - Card element
     * @param {string} src - Image source URL
     * @param {string} alt - Image alt text
     */
    createAndAddImage(card, src, alt) {
      // Check if card already has an image
      const existingImg = card.querySelector('img');
      
      if (existingImg) {
        // Update existing image
        const newImg = new Image();
        newImg.onload = () => {
          existingImg.src = src;
          existingImg.alt = alt;
          this.applyImageStyles(existingImg);
          this.updateImageContainer(existingImg);
          this.updatedImages++;
        };
        newImg.src = src;
      } else {
        // Create new image
        const newImg = document.createElement('img');
        newImg.src = src;
        newImg.alt = alt;
        this.applyImageStyles(newImg);
        
        // Find container for the image
        const imageContainer = card.querySelector('.rounded-t-xl, .bg-blue-100, .overflow-hidden') || 
                              card.firstElementChild;
        
        if (imageContainer) {
          imageContainer.prepend(newImg);
          imageContainer.style.height = 'auto';
          imageContainer.style.minHeight = '200px';
          imageContainer.style.overflow = 'visible';
        } else {
          card.prepend(newImg);
        }
        
        this.updatedImages++;
      }
    },

    /**
     * Apply styles to an image
     * @param {HTMLImageElement} img - Image element
     */
    applyImageStyles(img) {
      img.style.objectFit = 'contain';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.minHeight = '200px';
      img.style.maxWidth = '100%';
      img.style.display = 'block';
      
      // Safari-specific styles
      if (this.isSafari) {
        img.style.position = 'relative';
      }
    },

    /**
     * Update image container styles
     * @param {HTMLImageElement} img - Image element
     */
    updateImageContainer(img) {
      const container = img.parentElement;
      if (container) {
        container.style.height = 'auto';
        container.style.minHeight = '200px';
        container.style.overflow = 'visible';
      }
    },

    /**
     * Update date label for advocacy guide
     * @param {HTMLElement} card - Card element
     */
    updateDateLabel(card) {
      utils.safeExecute(() => {
        const dateLabels = card.querySelectorAll(CONFIG.selectors.dateElements);
        
        for (let i = 0; i < dateLabels.length; i++) {
          const dateLabel = dateLabels[i];
          if (dateLabel && dateLabel.textContent.trim() !== 'December 14, 2024') {
            dateLabel.textContent = 'December 14, 2024';
          }
        }
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => resourceUpdater.init());
  } else {
    resourceUpdater.init();
  }
})();
