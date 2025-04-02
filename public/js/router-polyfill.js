/**
 * Comprehensive React Router Polyfill
 * 
 * This polyfill provides the necessary constants and shims that React Router depends on.
 * It specifically targets the "Unexpected identifier 'POP'" error by ensuring the 
 * Action enum constants are defined in various scopes where React Router might look for them.
 */

(function() {
  // 1. Define in global scope
  if (typeof window !== 'undefined') {
    // Define core constants that React Router History depends on
    window.POP = 'POP';
    window.PUSH = 'PUSH';
    window.REPLACE = 'REPLACE';
    
    // Also define with window.Action object for more specific imports
    window.Action = {
      POP: 'POP',
      PUSH: 'PUSH',
      REPLACE: 'REPLACE'
    };
    
    // Define in history namespace which some versions look for
    window.history = window.history || {};
    window.history.Action = window.Action;
    
    // React Router DOM-specific constants
    window.UNSAFE_NavigationContext = window.UNSAFE_NavigationContext || {};
    window.UNSAFE_useScrollRestoration = window.UNSAFE_useScrollRestoration || function() {};
    window.UNSAFE_useHref = window.UNSAFE_useHref || function() {};
    
    // Patch React Router Dom if already loaded
    if (window.ReactRouterDOM) {
      window.ReactRouterDOM.Action = window.Action;
    }
    
    // For older React Router versions
    window.ReactRouter = window.ReactRouter || {};
    window.ReactRouter.Action = window.Action;
  }
  
  // Set to global scope for Node-like environments (SSR)
  if (typeof global !== 'undefined') {
    global.POP = 'POP';
    global.PUSH = 'PUSH';
    global.REPLACE = 'REPLACE';
  }
  
  console.log('[Router Polyfill] Initialized React Router constants');
})();
