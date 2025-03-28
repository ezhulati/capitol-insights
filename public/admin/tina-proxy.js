// Intercept fetch requests to identity.tinajs.io and redirect them to our proxy
const originalFetch = window.fetch;

window.fetch = function(url, options) {
  // Check if the URL is for identity.tinajs.io
  if (typeof url === 'string' && url.includes('identity.tinajs.io')) {
    // Replace the URL with our proxy endpoint
    const proxyUrl = url.replace('https://identity.tinajs.io', '/api/tina-proxy');
    console.log(`Redirecting request from ${url} to ${proxyUrl}`);
    return originalFetch(proxyUrl, options);
  }
  
  // Otherwise, use the original fetch
  return originalFetch(url, options);
};
