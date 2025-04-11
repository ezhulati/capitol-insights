/**
 * Team Image Updater - Simple Version
 * 
 * This script updates existing team member images on the page.
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
    // Team member info
    members: {
      byron: {
        name: 'Byron Campbell',
        title: 'Managing Partner'
      },
      drew: {
        name: 'Drew Campbell',
        title: 'Senior Partner'
      }
    }
  };

  // Utility functions
  const utils = {
    log(message, level = 'log') {
      console[level]('[Team Images] ' + message);
    },
    
    // STRICT check - only execute on exact team page path
    isTeamPage() {
      // Only match exact team page paths
      const teamPaths = ['/team', '/team/', '/team.html', '/about-us/team', '/about/team'];
      const currentPath = window.location.pathname.toLowerCase();
      
      // Check if current path exactly matches a team path
      return teamPaths.some(path => currentPath === path);
    }
  };

  // Main functionality
  function init() {
    utils.log('Initializing team image updater');
    
    // STRICT check - Only run on team pages
    if (!utils.isTeamPage()) {
      utils.log('Not a team page, exiting');
      return;
    }
    
    // ONLY update existing images - never create new elements
    updateExistingImages();
  }
  
  // Update existing images
  function updateExistingImages() {
    utils.log('Looking for existing team member images to update');
    
    let updatedCount = 0;
    
    // DIRECT APPROACH: Find all image containers with "VIEW EXPERIENCE" text
    const viewExperienceElements = findElementsContainingText('view experience');
    utils.log(`Found ${viewExperienceElements.length} 'VIEW EXPERIENCE' elements`);
    
    // For each section with team member name
    const byronSection = findElementContainingText('Byron Campbell');
    const drewSection = findElementContainingText('Drew Campbell');
    
    if (byronSection) {
      // Find closest VIEW EXPERIENCE element
      const byronContainer = findClosestViewExperience(byronSection);
      if (byronContainer) {
        replaceViewExperienceWithImage(byronContainer, 'byron');
        updatedCount++;
      }
    }
    
    if (drewSection) {
      // Find closest VIEW EXPERIENCE element
      const drewContainer = findClosestViewExperience(drewSection);
      if (drewContainer) {
        replaceViewExperienceWithImage(drewContainer, 'drew');
        updatedCount++;
      }
    }
    
    // If we couldn't find the sections, try directly with the VIEW EXPERIENCE elements
    if (updatedCount === 0 && viewExperienceElements.length > 0) {
      utils.log('Trying to match VIEW EXPERIENCE elements with team members');
      
      // Try to determine which is which based on surrounding content
      viewExperienceElements.forEach(element => {
        // Check nearby text for team member names
        const surroundingText = getSurroundingText(element);
        
        if (surroundingText.includes('byron')) {
          replaceViewExperienceWithImage(element, 'byron');
          updatedCount++;
        } else if (surroundingText.includes('drew')) {
          replaceViewExperienceWithImage(element, 'drew');
          updatedCount++;
        } else if (viewExperienceElements.length === 2) {
          // If exactly 2 elements and we processed 1 already, the other is the remaining team member
          if (updatedCount === 1) {
            const remainingPerson = updatedCount === 1 ? 'drew' : 'byron';
            replaceViewExperienceWithImage(element, remainingPerson);
            updatedCount++;
          }
        }
      });
    }
    
    // BACKUP APPROACH: If still no success, try original approaches
    if (updatedCount === 0) {
      // APPROACH 1: Look for images by alt text or src containing names
      const allImages = document.querySelectorAll('img');
      for (const img of allImages) {
        const alt = (img.alt || '').toLowerCase();
        const src = (img.src || '').toLowerCase();
        const text = alt + ' ' + src;
        
        if (text.includes('byron')) {
          loadImageWithFetch(img, CONFIG.images.byron);
          updatedCount++;
          utils.log('Updated Byron image by direct match');
        } else if (text.includes('drew')) {
          loadImageWithFetch(img, CONFIG.images.drew);
          updatedCount++;
          utils.log('Updated Drew image by direct match');
        }
      }
      
      // APPROACH 2: Look for team member elements by surrounding text
      if (updatedCount === 0) {
        utils.log('No direct matches found, looking for team members by surrounding text');
        
        // Find all elements containing Byron or Drew
        const byronElements = findElementsContainingText('byron campbell', 'byron');
        const drewElements = findElementsContainingText('drew campbell', 'drew');
        
        // For each element containing Byron, look for nearby image
        byronElements.forEach(element => {
          const img = findNearbyImage(element);
          if (img) {
            loadImageWithFetch(img, CONFIG.images.byron);
            updatedCount++;
            utils.log('Updated Byron image via surrounding text');
          }
        });
        
        // For each element containing Drew, look for nearby image
        drewElements.forEach(element => {
          const img = findNearbyImage(element);
          if (img) {
            loadImageWithFetch(img, CONFIG.images.drew);
            updatedCount++;
            utils.log('Updated Drew image via surrounding text');
          }
        });
      }
    }
    
    utils.log(`Finished updating images. Updated ${updatedCount} images.`);
  }
  
  // Find elements containing specific text
  function findElementsContainingText(...searchTerms) {
    const results = [];
    const allElements = document.querySelectorAll('*');
    
    for (const element of allElements) {
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') continue;
      
      const text = element.textContent.toLowerCase();
      if (searchTerms.some(term => text.includes(term.toLowerCase()))) {
        results.push(element);
      }
    }
    
    return results;
  }
  
  // Find nearby image element
  function findNearbyImage(element) {
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
    const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
    for (const sibling of siblings) {
      if (sibling !== element) {
        const siblingImg = sibling.querySelector('img');
        if (siblingImg) return siblingImg;
      }
    }
    
    return null;
  }
  
  // Load image using fetch API
  function loadImageWithFetch(img, url) {
    // Keep original dimensions if they exist
    const originalWidth = img.width;
    const originalHeight = img.height;
    
    // Add cache buster to URL
    const cacheBuster = new Date().getTime();
    const imageUrl = `${url}?v=${cacheBuster}`;
    
    // First try direct loading
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    
    // Preserve original size if possible
    if (originalWidth && originalHeight) {
      img.width = originalWidth;
      img.height = originalHeight;
    }
    
    // Then try fetch as backup
    fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    })
    .then(response => response.blob())
    .then(blob => {
      const objectUrl = URL.createObjectURL(blob);
      img.src = objectUrl;
      
      // Make sure image is visible
      img.style.display = 'block';
      
      // Preserve original size if possible
      if (originalWidth && originalHeight) {
        img.width = originalWidth;
        img.height = originalHeight;
      }
    })
    .catch(error => {
      utils.log(`Error fetching image: ${error.message}`, 'error');
    });
  }
  
  // Find closest VIEW EXPERIENCE element to a section
  function findClosestViewExperience(section) {
    // Check if there's a VIEW EXPERIENCE element nearby
    const viewExp = findElementContainingTextWithin(section, 'VIEW EXPERIENCE');
    if (viewExp) return viewExp;
    
    // Try siblings
    if (section.parentElement) {
      const siblings = Array.from(section.parentElement.children);
      for (const sibling of siblings) {
        if (sibling !== section) {
          const viewExp = findElementContainingTextWithin(sibling, 'VIEW EXPERIENCE');
          if (viewExp) return viewExp;
        }
      }
    }
    
    // Try parent's siblings
    if (section.parentElement && section.parentElement.parentElement) {
      const parentSiblings = Array.from(section.parentElement.parentElement.children);
      for (const sibling of parentSiblings) {
        if (sibling !== section.parentElement) {
          const viewExp = findElementContainingTextWithin(sibling, 'VIEW EXPERIENCE');
          if (viewExp) return viewExp;
        }
      }
    }
    
    return null;
  }
  
  // Find an element containing specific text within a container
  function findElementContainingTextWithin(container, text) {
    const allElements = container.querySelectorAll('*');
    const lowerText = text.toLowerCase();
    
    // First check direct children
    for (const element of allElements) {
      if (element.textContent.toLowerCase().includes(lowerText)) {
        return element;
      }
    }
    
    return null;
  }
  
  // Find a single element containing text
  function findElementContainingText(text) {
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, div, span');
    const lowerText = text.toLowerCase();
    
    for (const element of allElements) {
      if (element.textContent.toLowerCase().includes(lowerText)) {
        return element;
      }
    }
    
    return null;
  }
  
  // Replace VIEW EXPERIENCE with actual image
  function replaceViewExperienceWithImage(element, person) {
    utils.log(`Replacing VIEW EXPERIENCE with ${person}'s image`);
    
    // Look for image element
    let img = element.querySelector('img');
    
    // If no image found, create one
    if (!img) {
      img = document.createElement('img');
      img.alt = person === 'byron' ? 'Byron Campbell' : 'Drew Campbell';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      
      // Replace the VIEW EXPERIENCE text/element with the image
      element.innerHTML = '';
      element.appendChild(img);
    }
    
    // Load the image
    loadImageWithFetch(img, CONFIG.images[person]);
  }
  
  // Get text from surrounding elements
  function getSurroundingText(element) {
    let text = '';
    
    // Check the element itself
    text += element.textContent.toLowerCase() + ' ';
    
    // Check siblings
    if (element.parentElement) {
      const siblings = Array.from(element.parentElement.children);
      for (const sibling of siblings) {
        if (sibling !== element) {
          text += sibling.textContent.toLowerCase() + ' ';
        }
      }
    }
    
    // Check parent
    if (element.parentElement) {
      text += element.parentElement.textContent.toLowerCase() + ' ';
    }
    
    return text;
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();
