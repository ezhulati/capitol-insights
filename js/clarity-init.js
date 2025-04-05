// Microsoft Clarity initialization with CSP error handling
(function() {
  try {
    // Define project ID for reference in other functions
    const projectId = "qyml0noa0b";
    
    // Check if we're in a development/test environment
    const isTestEnvironment = window.location.href.includes('safari-test.html') || 
                             window.location.hostname.includes('localhost') || 
                             window.location.protocol === 'file:';
    
    // Skip Clarity in test environments
    if (isTestEnvironment) {
      console.log("Clarity initialization skipped in test environment");
      return;
    }
    
    // Create a safe wrapper for Clarity functions
    window.clarity = window.clarity || function() {
      // Store calls for later if Clarity loads
      (window.clarityQueue = window.clarityQueue || []).push(arguments);
    };
    
    // Try to load Clarity script with error handling
    const loadClarity = function() {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.clarity.ms/tag/" + projectId;
        
        // Handle loading errors
        script.onerror = function(error) {
          console.warn("Clarity script failed to load, possibly due to Content Security Policy restrictions:", error);
          // Set a flag to indicate Clarity failed to load
          window.clarityLoadFailed = true;
        };
        
        // Add the script to the page
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
        
        console.log("Attempting to load Microsoft Clarity with project ID:", projectId);
      } catch (e) {
        console.warn("Error during Clarity script initialization:", e);
      }
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadClarity);
    } else {
      loadClarity();
    }
    
    // Set up event handlers only if Clarity loads successfully
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a bit to check if Clarity loaded
      setTimeout(() => {
        // Skip if Clarity failed to load
        if (window.clarityLoadFailed) {
          console.log("Skipping Clarity event setup due to load failure");
          return;
        }
        
        // Set cookie consent (required for GDPR compliance)
        if (typeof window.clarity === 'function') {
          try {
            window.clarity("consent", true);
            
            // Identify user (if user information is available)
            const userIdElement = document.getElementById('user-id');
            if (userIdElement && userIdElement.value) {
              window.clarity("identify", userIdElement.value);
            } else {
              window.clarity("identify", `anonymous-${Date.now()}`);
            }
            
            // Set custom tags for better filtering in Clarity dashboard
            window.clarity("set", "environment", "production");
            window.clarity("set", "website_version", "1.0.0");
            
            // Example: Track when users interact with specific elements
            const downloadButtons = document.querySelectorAll('.btn-download, [class*="download"]');
            downloadButtons.forEach(button => {
              button.addEventListener('click', () => {
                window.clarity("event", "resource_download");
                window.clarity("upgrade", "resource_download");
              });
            });
            
            // Track form submissions
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              form.addEventListener('submit', () => {
                window.clarity("event", "form_submission");
                window.clarity("upgrade", "form_submission");
              });
            });
            
            console.log("Microsoft Clarity event handlers initialized");
          } catch (e) {
            console.warn("Error during Clarity event setup:", e);
          }
        }
      }, 1000); // Wait 1 second to check if Clarity loaded
    });
  } catch (e) {
    console.warn("Critical error in Clarity initialization:", e);
  }
})();
