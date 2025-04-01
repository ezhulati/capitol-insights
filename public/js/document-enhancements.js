/**
 * Capitol Insights Document Enhancements
 * 
 * This script adds additional functionality to HTML documents:
 * - Table of contents navigation
 * - Reading time estimation
 * - Smooth scrolling to anchors
 * - Responsive table handling
 * - Adds skip-to-content functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add skip to content link
  addSkipToContentLink();
  
  // Calculate and display reading time
  displayReadingTime();
  
  // Handle table responsiveness
  makeTablesResponsive();
  
  // Enhanced TOC navigation
  enhanceTOC();
  
  // Add smooth scrolling to anchor links
  setupSmoothScrolling();
  
  // Add accessible focus styles to elements
  setupFocusStyles();
});

/**
 * Add a skip to content link for accessibility
 */
function addSkipToContentLink() {
  // Skip if there's already a skip link or we can't find a main element
  if (document.querySelector('.skip-to-content') || !document.querySelector('h1, h2, h3')) {
    return;
  }
  
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to content';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ID to first heading for the skip link target
  const firstHeading = document.querySelector('h1, h2, h3');
  if (firstHeading) {
    firstHeading.id = 'main-content';
  }
}

/**
 * Calculate and show estimated reading time
 */
function displayReadingTime() {
  // Skip if there's already a reading time element
  if (document.querySelector('.reading-time')) {
    return;
  }
  
  // Get text content, avoiding innerHTML for security
  const contentElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td, th');
  let textContent = '';
  for (let i = 0; i < contentElements.length; i++) {
    textContent += ' ' + contentElements[i].textContent;
  }
  
  // Average reading speed (words per minute)
  const wordsPerMinute = 225;
  const words = textContent.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  const readingTimeElement = document.createElement('div');
  readingTimeElement.className = 'reading-time';
  readingTimeElement.textContent = `Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
  
  // Insert after the date, author, or first heading
  const targetElement = 
    document.querySelector('.date') || 
    document.querySelector('.author') || 
    document.querySelector('h1');
  
  if (targetElement && targetElement.parentNode) {
    targetElement.parentNode.insertBefore(readingTimeElement, targetElement.nextSibling);
  } else {
    // Fallback - add to beginning of body if no suitable element found
    const bodyFirstChild = document.body.firstChild;
    if (bodyFirstChild) {
      document.body.insertBefore(readingTimeElement, bodyFirstChild);
    } else {
      document.body.appendChild(readingTimeElement);
    }
  }
}

/**
 * Enhance tables for better responsive behavior
 */
function makeTablesResponsive() {
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    if (!table.parentElement.classList.contains('table-container')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-container';
      wrapper.style.overflowX = 'auto';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
    
    // Add row headers for better accessibility where appropriate
    const headerRow = table.querySelector('tr:first-child');
    if (headerRow && headerRow.querySelectorAll('th').length > 0) {
      // Add scope attribute to header cells
      headerRow.querySelectorAll('th').forEach(th => {
        th.setAttribute('scope', 'col');
      });
      
      // For the first cell in each row, if it looks like a header, make it one
      table.querySelectorAll('tr:not(:first-child)').forEach(row => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell && firstCell.textContent.trim() !== '' && 
            firstCell.textContent.length < 40 && // Likely a header if short
            !firstCell.textContent.includes('.') && // No sentences
            firstCell.textContent.trim() === firstCell.textContent.trim().replace(/[.,:;]/g, '')) { // No punctuation
          
          const headerCell = document.createElement('th');
          headerCell.setAttribute('scope', 'row');
          // Use textContent instead of innerHTML for security
          headerCell.textContent = firstCell.textContent;
          headerCell.className = firstCell.className;
          row.replaceChild(headerCell, firstCell);
        }
      });
    }
  });
}

/**
 * Enhance table of contents with interactive features
 */
function enhanceTOC() {
  // Look for TOC elements
  const tocElements = [
    document.querySelector('.toc'), 
    document.querySelector('#table-of-contents'), 
    document.querySelector('ol:first-of-type')
  ].filter(el => el !== null);
  
  if (tocElements.length === 0) return;
  
  const toc = tocElements[0];
  
  // Add TOC heading if missing
  if (!toc.previousElementSibling || !/^h[1-6]$/i.test(toc.previousElementSibling.tagName)) {
    if (toc.id !== 'table-of-contents' && !toc.classList.contains('toc')) {
      // This is probably a regular list, not a TOC, so return
      return;
    }
    
    // Only add heading if this is definitely a TOC
    const tocHeading = document.createElement('h2');
    tocHeading.textContent = 'Table of Contents';
    toc.parentNode.insertBefore(tocHeading, toc);
  }
  
  // Add TOC class if missing
  if (!toc.classList.contains('toc')) {
    toc.classList.add('toc');
  }
  
  // Convert all links to smooth scroll links
  toc.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      // Only proceed if targetId is valid
      if (/^[A-Za-z0-9_-]+$/.test(targetId)) {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Set focus to the target element
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          setTimeout(() => {
            targetElement.removeAttribute('tabindex');
          }, 1000);
          
          // Update URL without causing page jump
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });
  });
}

/**
 * Set up smooth scrolling for all anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]:not(.skip-to-content)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (targetId === '') return; // Skip empty anchors
      
      // Validate the targetId to prevent XSS attacks
      if (/^[A-Za-z0-9_-]+$/.test(targetId)) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Set focus to the target element
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          setTimeout(() => {
            targetElement.removeAttribute('tabindex');
          }, 1000);
          
          // Update URL without causing page jump
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });
  });
}

/**
 * Enhance focus styling for better keyboard navigation
 */
function setupFocusStyles() {
  // This is handled by CSS, but we could add additional behaviors here
  // For example, highlighting the entire section when a heading receives focus
}
