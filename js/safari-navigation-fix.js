/**
 * Safari Navigation Fix - Version 3.0
 * 
 * This script:
 * 1. Detects Safari browser
 * 2. Completely replaces client-side navigation with server-side navigation for Safari
 * 3. Forces full page reloads for all navigation in Safari
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
  
  console.log('Safari navigation fix active - Version 3.0');
  
  // Add a flag to the window object to indicate that Safari navigation fix is active
  window.safariNavigationFixActive = true;
  
  // Function to handle navigation
  function handleNavigation() {
    console.log('Safari navigation fix: Handling navigation');
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="#/"]');
    console.log('Safari navigation fix: Found', navLinks.length, 'navigation links');
    
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
        if (!href || href.startsWith('http') || href === '#' || href.startsWith('javascript:')) {
          return;
        }
        
        console.log('Safari navigation fix: Intercepted click on link to', href);
        
        // Prevent default navigation
        event.preventDefault();
        event.stopPropagation();
        
        // Force a full page reload
        console.log('Safari navigation fix: Forcing full page reload to', href);
        window.location.href = href;
      }, true); // Use capture phase to ensure our handler runs first
    });
  }
  
  // Function to patch React Router
  function patchReactRouter() {
    console.log('Safari navigation fix: Patching React Router');
    
    // Wait for React to be loaded
    const checkReactInterval = setInterval(function() {
      // Check if React is loaded
      if (window.React) {
        clearInterval(checkReactInterval);
        console.log('Safari navigation fix: React detected, patching React Router');
        
        // Monitor for React Router
        const observer = new MutationObserver(function() {
          // Look for React Router links
          const reactRouterLinks = document.querySelectorAll('a[href^="/"]');
          
          reactRouterLinks.forEach(function(link) {
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
              if (!href || href.startsWith('http') || href === '#' || href.startsWith('javascript:')) {
                return;
              }
              
              console.log('Safari navigation fix: Intercepted React Router link click to', href);
              
              // Prevent default navigation
              event.preventDefault();
              event.stopPropagation();
              
              // Force a full page reload
              console.log('Safari navigation fix: Forcing full page reload to', href);
              window.location.href = href;
            }, true); // Use capture phase to ensure our handler runs first
          });
        });
        
        // Observe the entire document for changes
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }, 100);
    
    // Timeout after 10 seconds
    setTimeout(function() {
      clearInterval(checkReactInterval);
    }, 10000);
  }
  
  // Function to patch History API
  function patchHistoryAPI() {
    console.log('Safari navigation fix: Patching History API');
    
    // Save original methods
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    // Override pushState
    window.history.pushState = function(state, title, url) {
      console.log('Safari navigation fix: Intercepted pushState to', url);
      
      // If this is a navigation to a different path, force a full page reload
      if (url && url !== window.location.pathname && !url.startsWith('#')) {
        console.log('Safari navigation fix: Forcing full page reload for pushState to', url);
        window.location.href = url;
        return;
      }
      
      // Otherwise, call original method
      return originalPushState.apply(this, arguments);
    };
    
    // Override replaceState
    window.history.replaceState = function(state, title, url) {
      console.log('Safari navigation fix: Intercepted replaceState to', url);
      
      // If this is a navigation to a different path, force a full page reload
      if (url && url !== window.location.pathname && !url.startsWith('#')) {
        console.log('Safari navigation fix: Forcing full page reload for replaceState to', url);
        window.location.href = url;
        return;
      }
      
      // Otherwise, call original method
      return originalReplaceState.apply(this, arguments);
    };
    
    console.log('Safari navigation fix: History API patched successfully');
  }
  
  // Function to handle back/forward navigation
  function handlePopState() {
    console.log('Safari navigation fix: Handling popstate event');
    
    // Force a reload
    window.location.reload();
  }
  
  // Run immediately
  console.log('Safari navigation fix: Initializing');
  
  // Patch History API
  patchHistoryAPI();
  
  // Try to patch React Router
  patchReactRouter();
  
  // Handle back/forward navigation
  window.addEventListener('popstate', handlePopState);
  
  // Handle navigation links
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      handleNavigation();
      
      // Also run periodically to catch dynamically added links
      setInterval(handleNavigation, 1000);
      
      // Run when DOM changes
      const observer = new MutationObserver(handleNavigation);
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  } else {
    // Document already loaded, run immediately
    handleNavigation();
    
    // Also run periodically to catch dynamically added links
    setInterval(handleNavigation, 1000);
    
    // Run when DOM changes
    const observer = new MutationObserver(handleNavigation);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Add a special style to indicate that Safari navigation fix is active
  const style = document.createElement('style');
  style.textContent = `
    /* Safari navigation fix indicator */
    body::after {
      content: 'Safari navigation fix active';
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 9999;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
  
  console.log('Safari navigation fix: Initialization complete');
})();
