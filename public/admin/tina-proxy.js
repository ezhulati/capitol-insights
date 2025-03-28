// Intercept fetch requests to identity.tinajs.io and redirect them to our proxy
const originalFetch = window.fetch;

window.fetch = function(url, options) {
  // Check if the URL is for identity.tinajs.io
  if (typeof url === 'string' && url.includes('identity.tinajs.io')) {
    // Replace the URL with our proxy endpoint
    const proxyUrl = url.replace('https://identity.tinajs.io', 'http://localhost:9999/.netlify/functions/tina-proxy');
    console.log(`Redirecting request from ${url} to ${proxyUrl}`);
    
    // Ensure we have options object with headers
    const newOptions = options || {};
    newOptions.headers = newOptions.headers || {};
    
    // Add credentials to ensure cookies are sent with the request
    newOptions.credentials = 'include';
    
    return originalFetch(proxyUrl, newOptions);
  }
  
  // Otherwise, use the original fetch
  return originalFetch(url, options);
};

// Add a console message to confirm the proxy script is loaded
console.log('Tina proxy script loaded and active');
