/**
 * Safari Navigation Fix
 * 
 * This script:
 * 1. Detects Safari browser
 * 2. Intercepts navigation events
 * 3. Provides fallback navigation for Safari
 * 4. Ensures consistent navigation across browsers
 */

(function() {
  // Detect Safari browser
  function isSafari() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && ua.indexOf('android') === -1;
  }
  
  // Only apply fixes for Safari
  if (!isSafari()) {
    console.log('Safari navigation fix not needed for this browser');
    return;
  }
  
  console.log('Safari navigation fix active');
  
  // Function to handle navigation
  function handleNavigation() {
    // Find all navigation links
    const navLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    
    navLinks.forEach(function(link) {
      // Skip links that already have click handlers
      if (link.getAttribute('data-safari-fixed')) {
        return;
      }
      
      // Mark as fixed
      link.setAttribute('data-safari-fixed', 'true');
      
      // Add click handler
      link.addEventListener('click', function(event) {
        const href = link.getAttribute('href');
        
        // Skip external links, anchor links, or javascript: links
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) {
          return;
        }
        
        // Prevent default navigation
        event.preventDefault();
        
        // Use history API for navigation
        window.history.pushState({}, '', href);
        
        // Dispatch a popstate event to trigger React Router navigation
        const popStateEvent = new PopStateEvent('popstate', { state: {} });
        window.dispatchEvent(popStateEvent);
        
        // If that doesn't work, try location.href as a fallback after a short delay
        setTimeout(function() {
          // Check if URL actually changed
          if (window.location.pathname !== href && !href.startsWith('?') && !href.startsWith('#')) {
            console.log('Fallback navigation to:', href);
            window.location.href = href;
          }
        }, 300);
      });
    });
  }
  
  // Run on page load
  document.addEventListener('DOMContentLoaded', function() {
    handleNavigation();
    
    // Also run periodically to catch dynamically added links
    setInterval(handleNavigation, 2000);
    
    // Run when DOM changes
    const observer = new MutationObserver(function() {
      handleNavigation();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  
  // Fix back/forward navigation
  window.addEventListener('popstate', function() {
    // Force a reload if needed for Safari
    if (isSafari()) {
      const currentPath = window.location.pathname;
      
      // Check if the app has already handled the navigation
      setTimeout(function() {
        // If we're still on the same page after a popstate event, reload
        if (document.querySelector('h1')?.textContent === 'Capitol Insights' && 
            currentPath !== '/' && 
            !document.querySelector('.resources-page, .about-page, .services-page')) {
          console.log('Forcing reload for Safari navigation');
          window.location.reload();
        }
      }, 500);
    }
  });
})();
