/**
 * Team Image Updater - Version 1.0
 * 
 * This script updates the team member images on the team page.
 * It replaces the images for Byron Campbell and Drew Campbell with the specified URLs.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Team member image URLs
    images: {
      byronCampbell: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550567/thumb_22372_byron-campbell-thumb_lush6g.jpg',
      drewCampbell: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550564/thumb_24013_drew-campbell-thumb_2_s7xbyl.jpg'
    },
    // Selectors
    selectors: {
      teamPage: '[class*="team"], [class*="Team"], [data-page="team"]',
      teamMembers: '.team-member, [class*="team-member"], [class*="TeamMember"]'
    },
    // Text matching
    textMatches: {
      byron: ['Byron Campbell', 'Byron'],
      drew: ['Drew Campbell', 'Drew']
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
      const prefix = '[Team Image Updater]';
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
     * Check if current page is team page
     * @returns {boolean} True if current page is team page
     */
    isTeamPage() {
      return window.location.pathname.includes('/team') || 
             window.location.pathname.includes('/about') || 
             document.title.toLowerCase().includes('team') ||
             document.title.toLowerCase().includes('about') ||
             !!document.querySelector(CONFIG.selectors.teamPage);
    },

    /**
     * Create and add styles to document
     */
    addStyles() {
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        /* Team member image styles */
        .team-member img, 
        [class*="team-member"] img,
        [class*="TeamMember"] img {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
        
        /* Safari-specific fixes */
        @supports (-webkit-hyphens:none) {
          .team-member img, 
          [class*="team-member"] img,
          [class*="TeamMember"] img {
            position: relative !important;
            transform: translateZ(0) !important; /* Force hardware acceleration */
            backface-visibility: hidden !important; /* Prevent flickering */
          }
        }
      `;
      document.head.appendChild(styleTag);
      this.log('Styles added');
    }
  };

  // Core functionality
  const teamImageUpdater = {
    // State
    isSafari: false,
    updatedImages: 0,

    /**
     * Initialize the team image updater
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
     * Update team member images
     */
    update() {
      utils.safeExecute(() => {
        // Only run on team page
        if (!utils.isTeamPage()) {
          return;
        }
        
        utils.log('Updating team page');
        this.updatedImages = 0;
        
        // Update images using direct approach
        this.updateImagesDirectly();
        
        // If no images were updated, try fallback approach
        if (this.updatedImages === 0) {
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
      // Find all team member elements
      const teamMembers = document.querySelectorAll(CONFIG.selectors.teamMembers);
      utils.log(`Found ${teamMembers.length} team members on the page`);
      
      if (teamMembers.length === 0) {
        // If no team member elements found, try to find all images
        this.updateAllImages();
        return;
      }
      
      teamMembers.forEach(member => {
        utils.safeExecute(() => {
          // Find name element
          const nameElement = member.querySelector('h2, h3, h4, [class*="name"]');
          if (!nameElement) return;
          
          const name = nameElement.textContent.trim();
          
          // Find image element
          const img = member.querySelector('img');
          if (!img) return;
          
          // Update image based on name
          if (utils.textContainsAny(name, CONFIG.textMatches.byron)) {
            this.updateByronImage(img);
          } else if (utils.textContainsAny(name, CONFIG.textMatches.drew)) {
            this.updateDrewImage(img);
          }
        });
      });
    },

    /**
     * Update all images on the page
     */
    updateAllImages() {
      const allImages = document.querySelectorAll('img');
      utils.log(`Found ${allImages.length} images on the page`);
      
      allImages.forEach(img => {
        utils.safeExecute(() => {
          // Check image alt text or src for team member names
          const altText = img.alt || '';
          const srcText = img.src || '';
          const imgText = altText + ' ' + srcText;
          
          // Update image based on alt text or src
          if (utils.textContainsAny(imgText, CONFIG.textMatches.byron) || 
              imgText.toLowerCase().includes('byron')) {
            this.updateByronImage(img);
          } else if (utils.textContainsAny(imgText, CONFIG.textMatches.drew) || 
                     imgText.toLowerCase().includes('drew')) {
            this.updateDrewImage(img);
          }
        });
      });
    },

    /**
     * Update images with fallback approach
     */
    updateImagesWithFallback() {
      // Try to find elements containing team member names
      const allElements = document.querySelectorAll('*');
      
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const text = element.textContent || '';
        
        if (utils.textContainsAny(text, CONFIG.textMatches.byron) || 
            text.toLowerCase().includes('byron')) {
          // Found Byron Campbell element, look for nearby image
          const img = this.findNearbyImage(element);
          if (img) {
            this.updateByronImage(img);
          }
        } else if (utils.textContainsAny(text, CONFIG.textMatches.drew) || 
                   text.toLowerCase().includes('drew')) {
          // Found Drew Campbell element, look for nearby image
          const img = this.findNearbyImage(element);
          if (img) {
            this.updateDrewImage(img);
          }
        }
      }
    },

    /**
     * Find nearby image element
     * @param {HTMLElement} element - Element to search from
     * @returns {HTMLImageElement|null} Image element or null
     */
    findNearbyImage(element) {
      // Check if element has an image
      const img = element.querySelector('img');
      if (img) return img;
      
      // Check parent elements
      let parent = element.parentElement;
      for (let i = 0; i < 3 && parent; i++) {
        const parentImg = parent.querySelector('img');
        if (parentImg) return parentImg;
        parent = parent.parentElement;
      }
      
      // Check sibling elements
      const siblings = element.parentElement ? element.parentElement.children : [];
      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling !== element) {
          const siblingImg = sibling.querySelector('img');
          if (siblingImg) return siblingImg;
        }
      }
      
      return null;
    },

    /**
     * Update Byron Campbell image
     * @param {HTMLImageElement} img - Image element
     */
    updateByronImage(img) {
      utils.log('Updating Byron Campbell image');
      
      // Force image reload by adding cache-busting parameter
      const cacheBuster = new Date().getTime();
      const imageUrl = `${CONFIG.images.byronCampbell}?v=${cacheBuster}`;
      
      // Create a new image to ensure proper loading
      const newImg = new Image();
      
      // Set up onload handler before setting src
      newImg.onload = () => {
        utils.log('Byron Campbell image loaded successfully');
        
        // Update existing image with cache-busting URL
        img.src = imageUrl;
        img.alt = 'Byron Campbell';
        
        // Apply styles
        this.applyImageStyles(img);
        
        // Force repaint in Safari
        if (this.isSafari) {
          setTimeout(() => {
            img.style.opacity = '0.99';
            setTimeout(() => {
              img.style.opacity = '1';
            }, 50);
          }, 0);
        }
        
        this.updatedImages++;
      };
      
      // Handle loading errors
      newImg.onerror = () => {
        utils.log('Error loading Byron Campbell image, trying direct approach', 'warn');
        
        // Try with fetch API instead
        fetch(imageUrl)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
          })
          .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            img.src = objectUrl;
            img.alt = 'Byron Campbell';
            this.applyImageStyles(img);
            this.updatedImages++;
          })
          .catch(error => {
            utils.log(`Error fetching Byron Campbell image: ${error.message}`, 'error');
          });
      };
      
      // Set crossOrigin to avoid CORS issues
      newImg.crossOrigin = "anonymous";
      // Set source to trigger load
      newImg.src = imageUrl;
    },

    /**
     * Update Drew Campbell image
     * @param {HTMLImageElement} img - Image element
     */
    updateDrewImage(img) {
      utils.log('Updating Drew Campbell image');
      
      // Force image reload by adding cache-busting parameter
      const cacheBuster = new Date().getTime();
      const imageUrl = `${CONFIG.images.drewCampbell}?v=${cacheBuster}`;
      
      // Create a new image to ensure proper loading
      const newImg = new Image();
      
      // Set up onload handler before setting src
      newImg.onload = () => {
        utils.log('Drew Campbell image loaded successfully');
        
        // Update existing image with cache-busting URL
        img.src = imageUrl;
        img.alt = 'Drew Campbell';
        
        // Apply styles
        this.applyImageStyles(img);
        
        // Force repaint in Safari
        if (this.isSafari) {
          setTimeout(() => {
            img.style.opacity = '0.99';
            setTimeout(() => {
              img.style.opacity = '1';
            }, 50);
          }, 0);
        }
        
        this.updatedImages++;
      };
      
      // Handle loading errors
      newImg.onerror = () => {
        utils.log('Error loading Drew Campbell image, trying direct approach', 'warn');
        
        // Try with fetch API instead
        fetch(imageUrl)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
          })
          .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            img.src = objectUrl;
            img.alt = 'Drew Campbell';
            this.applyImageStyles(img);
            this.updatedImages++;
          })
          .catch(error => {
            utils.log(`Error fetching Drew Campbell image: ${error.message}`, 'error');
          });
      };
      
      // Set crossOrigin to avoid CORS issues
      newImg.crossOrigin = "anonymous";
      // Set source to trigger load
      newImg.src = imageUrl;
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
      
      // Safari-specific styles
      if (this.isSafari) {
        img.style.position = 'relative';
        img.style.transform = 'translateZ(0)';
        img.style.backfaceVisibility = 'hidden';
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => teamImageUpdater.init());
  } else {
    teamImageUpdater.init();
  }
})();
