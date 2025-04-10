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
        
        // If no images were updated, try to find team member containers
        if (this.updatedImages === 0) {
          this.insertTeamMemberImages();
        }
        
        utils.log(`Update complete, ${this.updatedImages} images updated`);
      });
    },

    /**
     * Insert team member images if they don't exist
     */
    insertTeamMemberImages() {
      utils.safeExecute(() => {
        utils.log('Trying to insert team member images');
        
        // Look for team members container or create one if it doesn't exist
        let teamContainer = document.querySelector('.team-container, [class*="team-container"], [class*="TeamContainer"]');
        
        // If no team container found, look for relevant sections
        if (!teamContainer) {
          // Try to find the most appropriate container
          const possibleContainers = [
            document.querySelector('section[id*="team"], section[class*="team"]'),
            document.querySelector('div[id*="team"], div[class*="team"]'),
            document.querySelector('section:nth-child(2), section:nth-child(3)'),
            document.body
          ];
          
          for (const container of possibleContainers) {
            if (container) {
              teamContainer = container;
              break;
            }
          }
        }
        
        if (!teamContainer) {
          utils.log('No suitable container found for team members', 'warn');
          return;
        }
        
        // Check if Byron's image exists
        const byronImage = document.querySelector('img[alt*="Byron"], img[src*="byron"]');
        if (!byronImage) {
          this.createTeamMemberElement(teamContainer, 'byron', 'Byron Campbell', 'Managing Partner');
        }
        
        // Check if Drew's image exists
        const drewImage = document.querySelector('img[alt*="Drew"], img[src*="drew"]');
        if (!drewImage) {
          this.createTeamMemberElement(teamContainer, 'drew', 'Drew Campbell', 'Senior Partner');
        }
      });
    },
    
    /**
     * Create a team member element
     * @param {HTMLElement} container - Container element
     * @param {string} person - Person identifier (byron or drew)
     * @param {string} name - Full name
     * @param {string} title - Job title
     */
    createTeamMemberElement(container, person, name, title) {
      utils.safeExecute(() => {
        utils.log(`Creating team member element for ${name}`);
        
        // Create wrapper element
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        teamMember.style.margin = '20px';
        teamMember.style.padding = '10px';
        teamMember.style.border = '1px solid #eee';
        teamMember.style.borderRadius = '8px';
        teamMember.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.style.width = '100%';
        imageContainer.style.height = '300px';
        imageContainer.style.overflow = 'hidden';
        imageContainer.style.borderRadius = '4px';
        
        // Create image element
        const img = document.createElement('img');
        img.alt = name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        // Add cache-busting parameter
        const cacheBuster = new Date().getTime();
        img.src = `${CONFIG.images[person]}?v=${cacheBuster}`;
        
        // Create info container
        const infoContainer = document.createElement('div');
        infoContainer.style.padding = '15px 10px';
        
        // Create name element
        const nameElement = document.createElement('h3');
        nameElement.textContent = name;
        nameElement.style.margin = '0 0 5px 0';
        nameElement.style.fontSize = '18px';
        nameElement.style.fontWeight = 'bold';
        
        // Create title element
        const titleElement = document.createElement('p');
        titleElement.textContent = title;
        titleElement.style.margin = '0';
        titleElement.style.fontSize = '14px';
        titleElement.style.color = '#666';
        
        // Assemble the elements
        imageContainer.appendChild(img);
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(titleElement);
        teamMember.appendChild(imageContainer);
        teamMember.appendChild(infoContainer);
        
        // Add the team member to the container
        container.appendChild(teamMember);
        
        // Update the image properly
        this.updateImage(img, person);
        
        utils.log(`Added ${name} to the team page`);
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
        
        // Create a new image element to test loading
        const testImg = new Image();
        testImg.onload = () => {
          // Update image attributes only after successful load
          img.src = imageUrl;
          img.alt = person === 'byron' ? 'Byron Campbell' : 'Drew Campbell';
          
          // Mark image as updated
          img.dataset.teamImageUpdated = person;
          
          // Apply styles
          this.applyImageStyles(img);
          
          this.updatedImages++;
        };
        
        testImg.onerror = (err) => {
          utils.log(`Error loading ${person}'s image: ${err}`, 'error');
        };
        
        // Set crossOrigin to anonymous to prevent CORS issues
        testImg.crossOrigin = "anonymous";
        testImg.src = imageUrl;
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