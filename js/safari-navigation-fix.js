/**
 * Safari Navigation Fix - v2.0
 *
 * This script addresses Safari-specific navigation issues in single-page applications.
 * It fixes problems with history API, popstate events, and hash-based routing.
 */

(function() {
  'use strict';
  
  // Only run in Safari browsers
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  console.log('Safari navigation fix is ' + (isSafari ? 'ENABLED' : 'DISABLED (non-Safari browser)'));
  
  if (!isSafari) return;
  
  // Configuration
  const config = {
    resourcesPagePath: '/resources',
    hashChangeDelay: 50,
    scrollRestoration: true,
    debug: true
  };
  
  // Logging function
  function log(message) {
    if (config.debug) {
      console.log('[Safari Nav Fix] ' + message);
    }
  }
  
  log('Initializing Safari navigation fixes');
  
  // Fix 1: Handle Safari-specific issues with popstate events
  let lastPopstateURL = location.href;
  
  window.addEventListener('popstate', function(event) {
    log('Popstate event detected');
    
    // Safari sometimes fires popstate on page load, ignore this case
    if (lastPopstateURL === location.href) {
      log('Ignoring duplicate popstate event');
      return;
    }
    
    lastPopstateURL = location.href;
    
    // Force page refresh for resources page to ensure proper loading
    if (location.pathname.includes(config.resourcesPagePath)) {
      log('Resources page detected in popstate, forcing content refresh');
      
      // Dispatch a custom event that React can listen for
      const refreshEvent = new CustomEvent('safariNavigationRefresh', {
        detail: {
          timestamp: Date.now(),
          path: location.pathname
        }
      });
      document.dispatchEvent(refreshEvent);
      
      // Force layout recalculation
      document.body.style.display = 'none';
      setTimeout(function() {
        document.body.style.display = '';
      }, 0);
    }
  });
  
  // Fix 2: Enhance history.pushState for Safari
  const originalPushState = history.pushState;
  history.pushState = function(state, title, url) {
    log('Enhanced pushState called: ' + url);
    
    // Add timestamp to state to ensure uniqueness
    if (state === null) state = {};
    state.safariTimestamp = Date.now();
    
    // Call original function
    originalPushState.call(this, state, title, url);
    
    // Force Safari to recognize the state change
    if (url && url.includes(config.resourcesPagePath)) {
      log('Resources page detected in pushState, ensuring content update');
      setTimeout(function() {
        // Dispatch a custom event that React can listen for
        const navEvent = new CustomEvent('safariNavigationUpdate', {
          detail: {
            timestamp: Date.now(),
            path: url
          }
        });
        document.dispatchEvent(navEvent);
      }, config.hashChangeDelay);
    }
  };
  
  // Fix 3: Handle hash changes more reliably
  window.addEventListener('hashchange', function(event) {
    log('Hash change detected: ' + location.hash);
    
    // Force Safari to update the view after hash changes
    setTimeout(function() {
      // Scroll to hash element if it exists
      if (location.hash && config.scrollRestoration) {
        const hashElement = document.getElementById(location.hash.substring(1));
        if (hashElement) {
          log('Scrolling to hash element: ' + location.hash);
          hashElement.scrollIntoView();
        }
      }
    }, config.hashChangeDelay);
  });
  
  // Fix 4: Add a global navigation event listener for React router
  document.addEventListener('click', function(event) {
    // Look for link clicks that might be handled by React Router
    const link = event.target.closest('a');
    if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('http')) {
      const href = link.getAttribute('href');
      
      // Special handling for resources page links
      if (href.includes(config.resourcesPagePath)) {
        log('Resources page link clicked: ' + href);
        
        // Add a small delay to ensure React Router has processed the navigation
        setTimeout(function() {
          log('Triggering resources page refresh');
          // Force a refresh of resource images
          if (window.resourceUpdater && typeof window.resourceUpdater.update === 'function') {
            window.resourceUpdater.update();
          }
        }, 100);
      }
    }
  }, false);
  
  // Fix 5: Ensure resources page is properly initialized on direct navigation
  if (location.pathname.includes(config.resourcesPagePath)) {
    log('Direct navigation to resources page detected');
    
    // Wait for page to be fully loaded
    window.addEventListener('load', function() {
      log('Window loaded, ensuring resources page is properly initialized');
      
      // Force a refresh of resource images
      setTimeout(function() {
        if (window.resourceUpdater && typeof window.resourceUpdater.update === 'function') {
          window.resourceUpdater.update();
        }
      }, 500);
    });
  }
  
  log('Safari navigation fixes initialized');
})();
