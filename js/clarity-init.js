// Microsoft Clarity initialization using traditional script approach
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "qyml0noa0b");

// Define project ID for reference in other functions
const projectId = "qyml0noa0b";

// Wait for Clarity to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set cookie consent (required for GDPR compliance)
  if (window.clarity) {
    window.clarity("consent", true);

    // Identify user (if user information is available)
    // This is a placeholder - in a real implementation, you would use actual user data
    const userIdElement = document.getElementById('user-id');
    if (userIdElement && userIdElement.value) {
      // Identify the user with Clarity
      window.clarity("identify", userIdElement.value);
    } else {
      // For anonymous users, you can still call identify with a generated ID
      window.clarity("identify", `anonymous-${Date.now()}`);
    }

    // Set custom tags for better filtering in Clarity dashboard
    window.clarity("set", "environment", "production");
    window.clarity("set", "website_version", "1.0.0");

    // Example: Track when users interact with specific elements
    const downloadButtons = document.querySelectorAll('.btn-download, [class*="download"]');
    downloadButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Track download events
        window.clarity("event", "resource_download");
        
        // Upgrade the session to prioritize it in the dashboard
        window.clarity("upgrade", "resource_download");
      });
    });

    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', () => {
        // Track form submission events
        window.clarity("event", "form_submission");
        
        // Upgrade the session to prioritize it in the dashboard
        window.clarity("upgrade", "form_submission");
      });
    });
  }
});

// Log initialization
console.log("Microsoft Clarity initialized with project ID:", projectId);
