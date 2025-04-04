// Microsoft Clarity initialization using npm package
import Clarity from '@microsoft/clarity';

// Define project ID
const projectId = "qyml0noa0b";

// Initialize Clarity with project ID
Clarity.init(projectId);

// Set cookie consent (required for GDPR compliance)
Clarity.consent(true);

// Identify user (if user information is available)
// This is a placeholder - in a real implementation, you would use actual user data
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in (this is a placeholder implementation)
  const userIdElement = document.getElementById('user-id');
  if (userIdElement && userIdElement.value) {
    // Identify the user with Clarity
    Clarity.identify(userIdElement.value);
  } else {
    // For anonymous users, you can still call identify with a generated ID
    Clarity.identify(`anonymous-${Date.now()}`);
  }
});

// Set custom tags for better filtering in Clarity dashboard
Clarity.setTag("environment", "production");
Clarity.setTag("website_version", "1.0.0");

// Track page-specific custom events
document.addEventListener('DOMContentLoaded', () => {
  // Example: Track when users interact with specific elements
  const downloadButtons = document.querySelectorAll('.btn-download, [class*="download"]');
  downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Track download events
      Clarity.event("resource_download");
      
      // Upgrade the session to prioritize it in the dashboard
      Clarity.upgrade("resource_download");
    });
  });

  // Track form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      // Track form submission events
      Clarity.event("form_submission");
      
      // Upgrade the session to prioritize it in the dashboard
      Clarity.upgrade("form_submission");
    });
  });
});

// Log initialization
console.log("Microsoft Clarity initialized with project ID:", projectId);
