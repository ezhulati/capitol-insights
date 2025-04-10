/**
 * Update Team Images Local - Version 1.0
 * 
 * This script downloads the team member images from Cloudinary URLs
 * and updates the local image files in the root directory.
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
      
      // Update Byron's image
      this.updateImage('byron');
      
      // Update Drew's image
      this.updateImage('drew');
    },

    /**
     * Update image by downloading from URL and creating a local file
     * @param {string} person - Person identifier (byron or drew)
     */
    updateImage(person) {
      utils.safeExecute(() => {
        const config = CONFIG.images[person];
        if (!config) {
          utils.log(`No configuration found for ${person}`, 'error');
          return;
        }

        utils.log(`Updating ${person}'s image from ${config.url}`);

        // Create a new image element to load the image
        const img = new Image();
        
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          utils.log(`${person}'s image loaded successfully`);
          
          // Create a canvas to convert the image to a blob
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw the image on the canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Convert the canvas to a blob and create a local URL
          canvas.toBlob((blob) => {
            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);
            
            // Log the blob URL for debugging
            utils.log(`Created blob URL for ${person}: ${blobUrl}`);
            
            // Create a link to download the image
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = config.localPath.split('/').pop();
            
            // Append the link to the document, click it, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Release the blob URL
            URL.revokeObjectURL(blobUrl);
            
            utils.log(`${person}'s image updated successfully`);
          }, 'image/jpeg', 0.95);
        };
        
        img.onerror = () => {
          utils.log(`Error loading ${person}'s image`, 'error');
        };
        
        // Add cache-busting parameter to force reload
        const cacheBuster = new Date().getTime();
        img.src = `${config.url}?v=${cacheBuster}`;
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