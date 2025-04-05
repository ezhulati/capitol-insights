/**
 * Safari Navigation Fix - Version 2.0
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
  
  console.log('Safari navigation fix active - Version 2.0');
  
  // Add a flag to the window object to indicate that Safari navigation fix is active
  window.safariNavigationFixActive = true;
  
  // Function to handle navigation
  function handleNavigation() {
    console.log('Safari navigation fix: Handling navigation');
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
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
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) {
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
    console.log('Safari navigation fix: Attempting to patch React Router');
    
    // Check if React Router is available
    if (window.ReactRouter) {
      console.log('Safari navigation fix: Found React Router, patching...');
      
      // Save original methods
      const originalPush = window.ReactRouter.useNavigate;
      const originalNavigate = window.ReactRouter.useNavigate;
      
      // Override push method
      window.ReactRouter.useNavigate = function() {
        const navigate = originalNavigate.apply(this, arguments);
        
        return function(to, options) {
          console.log('Safari navigation fix: Intercepted React Router navigation to', to);
          
          // Force a full page reload
          window.location.href = typeof to === 'string' ? to : to.pathname;
          
          // Call original method (won't actually be used)
          return navigate(to, options);
        };
      };
      
      console.log('Safari navigation fix: React Router patched successfully');
    } else {
      console.log('Safari navigation fix: React Router not found, will try again later');
      
      // Try again later
      setTimeout(patchReactRouter, 1000);
    }
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
