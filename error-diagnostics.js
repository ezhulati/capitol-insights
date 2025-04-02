/**
 * Error diagnostics script for Capitol Insights website
 * 
 * This script is injected into the HTML to help diagnose runtime errors
 * by providing detailed error information in the browser console
 * and adding a fallback UI for critical errors.
 */
(function() {
  console.log('[Diagnostics] Loading error diagnostics script...');
  
  // Store original console methods
  const originalConsoleError = console.error;
  
  // Enhanced error logging
  console.error = function(...args) {
    originalConsoleError.apply(console, args);
    
    // Try to extract useful information from errors
    try {
      const errorObjects = args.filter(arg => arg instanceof Error || (typeof arg === 'object' && arg !== null && 'message' in arg));
      
      if (errorObjects.length > 0) {
        originalConsoleError('[Diagnostics] Detected error object:', {
          message: errorObjects[0].message,
          stack: errorObjects[0].stack,
          type: errorObjects[0].constructor.name,
          details: errorObjects[0]
        });
      }
      
      // Check for specific error types
      const errorText = args.map(arg => String(arg)).join(' ');
      
      if (errorText.includes('failed to load') || errorText.includes('Cannot find module')) {
        originalConsoleError('[Diagnostics] Module loading error detected - check network requests and module paths');
      }
      
      if (errorText.includes('undefined is not a function') || errorText.includes('is not a function')) {
        originalConsoleError('[Diagnostics] Function call error detected - check for undefined variables');
      }
      
      if (errorText.includes('Loading chunk') && errorText.includes('failed')) {
        originalConsoleError('[Diagnostics] Chunk loading error - this may be a code splitting issue');
      }
    } catch (e) {
      originalConsoleError('[Diagnostics] Error in diagnostics script:', e);
    }
  };
  
  // Add a global error handler with detailed logging
  window.addEventListener('error', function(event) {
    console.log('[Diagnostics] Global error event:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
    
    // Show an enhanced error UI if this is likely a serious error
    const rootElement = document.getElementById('root');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = errorContainer?.querySelector('.error-message');
    
    if (rootElement && event.filename?.includes('main') && errorContainer) {
      // This is likely a critical app error
      errorContainer.style.display = 'flex';
      
      // Try to give a more helpful error message
      if (errorMessage) {
        if (event.message.includes('Loading chunk')) {
          errorMessage.textContent = 'Failed to load a required component. This might be a network issue or deployment problem.';
        } else if (event.message.includes('Cannot find module')) {
          errorMessage.textContent = 'Failed to load a required module. This might be a build configuration issue.';
        } else {
          errorMessage.textContent = `Application error: ${event.message}`;
        }
      }
      
      // Create diagnostic data for support
      const diagnosticData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        error: {
          message: event.message,
          filename: event.filename,
          line: event.lineno,
          column: event.colno,
          stack: event.error?.stack
        }
      };
      
      console.log('[Diagnostics] Error diagnostic data:', diagnosticData);
      
      // Optional: Append diagnostic info to the UI
      const diagnosticElement = document.createElement('div');
      diagnosticElement.style.marginTop = '20px';
      diagnosticElement.style.fontSize = '10px';
      diagnosticElement.style.color = '#666';
      diagnosticElement.style.maxWidth = '400px';
      diagnosticElement.style.margin = '20px auto';
      diagnosticElement.style.textAlign = 'left';
      diagnosticElement.style.wordBreak = 'break-word';
      diagnosticElement.textContent = 'Error ID: ' + Math.random().toString(36).substring(2, 15);
      
      if (errorContainer) {
        errorContainer.appendChild(diagnosticElement);
      }
    }
  });
  
  // Add unhandled rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    console.log('[Diagnostics] Unhandled promise rejection:', {
      reason: event.reason,
      message: event.reason?.message,
      stack: event.reason?.stack
    });
  });
  
  // Add a load success handler
  window.addEventListener('load', function() {
    console.log('[Diagnostics] Window loaded successfully');
    
    // Check for React root content
    setTimeout(function() {
      const rootElement = document.getElementById('root');
      const rootContent = rootElement?.innerHTML || '';
      
      if (rootContent.length < 100 || rootContent.includes('loading') || !rootContent.includes('<')) {
        console.log('[Diagnostics] React app may not have rendered properly. Root content:', rootContent);
      } else {
        console.log('[Diagnostics] React app appears to have rendered successfully');
      }
    }, 2000);
  });
  
  // Register window error loggers early
  if (typeof window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ !== 'undefined') {
    console.log('[Diagnostics] React error overlay hook detected');
  }
  
  console.log('[Diagnostics] Error diagnostics initialized successfully');
})();
