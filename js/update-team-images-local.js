/**
 * Update Team Images Local - Version 1.0
 * 
 * This script updates the team member images from Cloudinary URLs
 * and updates the images on the page instead of downloading them.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Team member image URLs and local file paths
    images: {
      byron: {
        url: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550567/thumb_22372_byron-campbell-thumb_lush6g.jpg',
        localPath: '/byron-campbell.jpg'
      },
      drew: {
        url: 'https://res.cloudinary.com/dwnmuolg8/image/upload/v1743550564/thumb_24013_drew-campbell-thumb_2_s7xbyl.jpg',
        localPath: '/drew-campbell.jpg'
      }
    },
    // Strict team page paths
    teamPaths: ['/team', '/team/', '/team.html', '/about-us/team', '/about/team']
  };

  // Utility functions
  const utils = {
    /**
     * Log message with prefix
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    log(message, level = 'log') {
      const prefix = '[Update Team Images Local]';
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
    }
  };

  // Core functionality
  const teamImageUpdater = {
    /**
     * Initialize the team image updater
     */
    init() {
      utils.log('Initializing team image local updater');
      
      // Check if we're on a team page
      if (!this.isTeamPage()) {
        utils.log('Not on team page, exiting');
        return;
      }
      
      // Find and update team member images
      this.findAndUpdateImages();
    },

    /**
     * Check if current page is a team page
     * @returns {boolean} True if on team page
     */
    isTeamPage() {
      const currentPath = window.location.pathname.toLowerCase();
      return CONFIG.teamPaths.some(path => currentPath === path);
    },

    /**
     * Find and update all team member images on the page
     */
    findAndUpdateImages() {
      utils.safeExecute(() => {
        // Find all images on the page
        const allImages = document.querySelectorAll('img');
        utils.log(`Found ${allImages.length} images on the page`);
        
        let updatedCount = 0;
        
        // APPROACH 1: Check each image for Byron or Drew by src/alt
        allImages.forEach(img => {
          const src = (img.src || '').toLowerCase();
          const alt = (img.alt || '').toLowerCase();
          const text = src + ' ' + alt;
          
          if (text.includes('byron')) {
            this.updateImageOnPage(img, 'byron');
            updatedCount++;
          } else if (text.includes('drew')) {
            this.updateImageOnPage(img, 'drew');
            updatedCount++;
          }
        });
        
        // APPROACH 2: If no images found, try looking by surrounding text
        if (updatedCount === 0) {
          utils.log('No direct matches found, looking by surrounding text');
          
          // Find elements that might contain team member names
          const textElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, span, div'))
            .filter(el => {
              const text = el.textContent.toLowerCase();
              return text.includes('byron') || text.includes('drew');
            });
          
          // For each text element, look for nearby images
          textElements.forEach(el => {
            const text = el.textContent.toLowerCase();
            
            // Look for nearby images (parent, siblings, etc.)
            let img = null;
            
            // Check for images in parent
            let parent = el.parentElement;
            if (parent && !img) {
              img = parent.querySelector('img');
            }
            
            // Check for images in siblings
            if (parent && !img) {
              const siblings = Array.from(parent.children).filter(child => child !== el);
              for (const sibling of siblings) {
                const siblingImg = sibling.querySelector('img');
                if (siblingImg) {
                  img = siblingImg;
                  break;
                }
              }
            }
            
            // If image found, update it based on text
            if (img) {
              if (text.includes('byron')) {
                this.updateImageOnPage(img, 'byron');
                updatedCount++;
              } else if (text.includes('drew')) {
                this.updateImageOnPage(img, 'drew');
                updatedCount++;
              }
            }
          });
        }
        
        utils.log(`Updated ${updatedCount} images on the page`);
      });
    },

    /**
     * Update image on the page instead of downloading
     * @param {HTMLImageElement} img - Image element to update
     * @param {string} person - Person identifier (byron or drew)
     */
    updateImageOnPage(img, person) {
      utils.safeExecute(() => {
        const config = CONFIG.images[person];
        if (!config) {
          utils.log(`No configuration found for ${person}`, 'error');
          return;
        }

        utils.log(`Updating ${person}'s image from ${config.url}`);

        // Create a new image element to test loading
        const testImg = new Image();
        testImg.crossOrigin = 'anonymous';
        
        testImg.onload = () => {
          utils.log(`${person}'s image loaded successfully`);
          
          // Update the image source with cache busting
          const cacheBuster = new Date().getTime();
          img.src = `${config.url}?v=${cacheBuster}`;
          img.alt = person === 'byron' ? 'Byron Campbell' : 'Drew Campbell';
          
          // Apply basic styles
          img.style.objectFit = 'cover';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.display = 'block';
          
          utils.log(`${person}'s image updated successfully`);
        };
        
        testImg.onerror = () => {
          utils.log(`Error loading ${person}'s image, trying fetch API`, 'warn');
          
          // Try with fetch as fallback
          fetch(`${config.url}?v=${new Date().getTime()}`)
            .then(response => {
              if (!response.ok) throw new Error('Network response was not ok');
              return response.blob();
            })
            .then(blob => {
              const objectUrl = URL.createObjectURL(blob);
              img.src = objectUrl;
              img.alt = person === 'byron' ? 'Byron Campbell' : 'Drew Campbell';
              
              // Apply basic styles
              img.style.objectFit = 'cover';
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.display = 'block';
              
              utils.log(`${person}'s image updated successfully via fetch`);
            })
            .catch(error => {
              utils.log(`Error fetching ${person}'s image: ${error.message}`, 'error');
            });
        };
        
        // Add cache-busting parameter to force reload
        const cacheBuster = new Date().getTime();
        testImg.src = `${config.url}?v=${cacheBuster}`;
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => teamImageUpdater.init());
  } else {
    teamImageUpdater.init();
  }
})();