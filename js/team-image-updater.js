/**
 * Team Image Updater - Simple Version
 * 
 * This script injects team members directly into the page.
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
    
    // Find existing team container first
    const existingContainer = document.querySelector('.team-container, [class*="team-container"], .team-members');
    if (existingContainer) {
      utils.log('Found existing team container, updating images only');
      
      // Only update existing images, don't create new elements
      updateExistingImages();
      return;
    }
    
    // Find team section before creating anything new
    const teamSection = document.querySelector(
      'section[id*="team"], div[id*="team"], section[class*="team"], div[class*="team"]'
    );
    
    // Don't create container if we can't find a team section
    if (!teamSection) {
      utils.log('No team section found, exiting');
      return;
    }
    
    // Create a container for the team members
    const container = document.createElement('div');
    container.className = 'team-container';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'center';
    container.style.gap = '20px';
    container.style.margin = '30px auto';
    container.style.maxWidth = '900px';
    
    // Create a heading
    const heading = document.createElement('h2');
    heading.textContent = 'Our Team';
    heading.style.width = '100%';
    heading.style.textAlign = 'center';
    heading.style.margin = '20px 0';
    heading.style.fontFamily = 'Arial, sans-serif';
    heading.style.color = '#333';
    container.appendChild(heading);
    
    // Add Byron and Drew to the container
    addTeamMember(container, 'byron');
    addTeamMember(container, 'drew');
    
    // Insert the container into the team section
    teamSection.appendChild(container);
  }
  
  // Update existing images instead of creating new ones
  function updateExistingImages() {
    // Find images that might be Byron or Drew
    const images = document.querySelectorAll('img');
    
    for (const img of images) {
      const alt = img.alt || '';
      const src = img.src || '';
      const text = alt + ' ' + src;
      
      if (text.toLowerCase().includes('byron')) {
        loadImageWithFetch(img, CONFIG.images.byron);
      } else if (text.toLowerCase().includes('drew')) {
        loadImageWithFetch(img, CONFIG.images.drew);
      }
    }
  }
  
  // Add a team member to the container
  function addTeamMember(container, id) {
    const member = CONFIG.members[id];
    
    // Create card
    const card = document.createElement('div');
    card.className = 'team-member';
    card.style.width = '300px';
    card.style.backgroundColor = '#fff';
    card.style.borderRadius = '8px';
    card.style.overflow = 'hidden';
    card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.style.width = '100%';
    imageContainer.style.height = '300px';
    imageContainer.style.overflow = 'hidden';
    
    // Create image
    const img = document.createElement('img');
    img.alt = member.name;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    
    // Load image via fetch to bypass CORS issues
    loadImageWithFetch(img, CONFIG.images[id]);
    
    // Create info container
    const info = document.createElement('div');
    info.style.padding = '15px';
    
    // Create name
    const name = document.createElement('h3');
    name.textContent = member.name;
    name.style.margin = '0 0 5px 0';
    name.style.fontSize = '20px';
    name.style.fontFamily = 'Arial, sans-serif';
    name.style.color = '#333';
    
    // Create title
    const title = document.createElement('p');
    title.textContent = member.title;
    title.style.margin = '0';
    title.style.fontSize = '16px';
    title.style.fontFamily = 'Arial, sans-serif';
    title.style.color = '#666';
    
    // Assemble everything
    imageContainer.appendChild(img);
    info.appendChild(name);
    info.appendChild(title);
    card.appendChild(imageContainer);
    card.appendChild(info);
    container.appendChild(card);
  }
  
  // Load image using fetch API
  function loadImageWithFetch(img, url) {
    // Add cache buster to URL
    const cacheBuster = new Date().getTime();
    const imageUrl = `${url}?v=${cacheBuster}`;
    
    // First try direct loading
    img.src = imageUrl;
    
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
    })
    .catch(error => {
      utils.log(`Error fetching image: ${error.message}`, 'error');
    });
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();
