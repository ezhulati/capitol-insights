/**
 * Fallback Application
 * 
 * This provides a complete fallback for the main application in case it fails to load.
 * It directly renders a minimal functional UI into the #root element.
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('[Fallback] DOM is ready, checking if app has loaded...');
  
  // Check if the app has already rendered something substantial to #root
  const checkAndRenderFallback = function() {
    const root = document.getElementById('root');
    
    // Safety check
    if (!root) {
      console.error('[Fallback] Root element not found');
      return false;
    }
    
    // Check if app appears to be loading still
    if (!root.children.length || 
        (root.children.length === 1 && root.children[0].className === 'loading')) {
      
      console.log('[Fallback] App not loaded, rendering fallback UI');
      
      // First, hide any error messages or loading spinners
      try {
        // Hide loading spinner if it exists
        const loading = root.querySelector('.loading');
        if (loading) {
          loading.style.display = 'none';
        }
        
        // Also hide error container if it's shown
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
          errorContainer.style.display = 'none';
        }
      } catch (e) {
        console.error('[Fallback] Error hiding elements:', e);
      }
      
      // Clear existing root content
      root.innerHTML = '';
      
      // Render basic header
      const header = document.createElement('header');
      header.style.backgroundColor = '#1a365d';
      header.style.color = 'white';
      header.style.padding = '1rem';
      header.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <h1 style="margin: 0; font-size: 1.5rem;">Capitol Insights</h1>
          <nav>
            <a href="/" style="color: white; text-decoration: none; margin-left: 1rem;">Home</a>
            <a href="/services" style="color: white; text-decoration: none; margin-left: 1rem;">Services</a>
            <a href="/contact" style="color: white; text-decoration: none; margin-left: 1rem;">Contact</a>
          </nav>
        </div>
      `;
      root.appendChild(header);
      
      // Render main content
      const main = document.createElement('main');
      main.style.maxWidth = '1200px';
      main.style.margin = '2rem auto';
      main.style.padding = '0 1rem';
      main.innerHTML = `
        <div style="background-color: #f8f9fa; padding: 2rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h2 style="color: #1a365d; margin-top: 0;">Welcome to Capitol Insights</h2>
          <p>Your trusted partner for Texas government relations and legislative advocacy.</p>
          <button style="background-color: #1a365d; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; cursor: pointer;">Contact Us</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1a365d; margin-top: 0;">Government Relations</h3>
            <p>Strategic advocacy to navigate the complexities of Texas government.</p>
          </div>
          
          <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1a365d; margin-top: 0;">Legislative Monitoring</h3>
            <p>Stay informed of legislative developments affecting your interests.</p>
          </div>
          
          <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1a365d; margin-top: 0;">Coalition Building</h3>
            <p>Forge strategic partnerships to amplify your advocacy efforts.</p>
          </div>
        </div>
      `;
      root.appendChild(main);
      
      // Render footer
      const footer = document.createElement('footer');
      footer.style.backgroundColor = '#f8f9fa';
      footer.style.padding = '2rem 1rem';
      footer.style.marginTop = '2rem';
      footer.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
          <div>
            <h3 style="color: #1a365d; margin-top: 0;">Capitol Insights</h3>
            <p>Texas Government Relations</p>
          </div>
          
          <div>
            <p>&copy; 2025 Capitol Insights. All rights reserved.</p>
          </div>
        </div>
      `;
      root.appendChild(footer);
      
      // Log success
      console.log('[Fallback] Fallback UI rendered successfully');
      
      // Let the mount checker know that we've handled the situation
      window.FALLBACK_APP_ACTIVE = true;
      
      return true;
    }
    
    return false;
  };
  
  // Check immediately in case DOMContentLoaded fired late
  if (!checkAndRenderFallback()) {
    // Set a timeout to check again after main app has had time to load
    setTimeout(function() {
      // Only render fallback if app still hasn't loaded
      checkAndRenderFallback();
    }, 5000); // 5 second timeout
  }
});

// Also add a window load fallback as backup
window.addEventListener('load', function() {
  console.log('[Fallback] Window loaded');
  
  // Wait a bit for React to mount first
  setTimeout(function() {
    // Check if anything has been rendered by the app
    const root = document.getElementById('root');
    
    // Only render fallback if app still hasn't loaded
    if (root && (!root.children.length || 
        (root.children.length === 1 && root.children[0].className === 'loading'))) {
      
      console.log('[Fallback] Window loaded but app not rendered, forcing fallback UI');
      
      // Force trigger the fallback renderer
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }
  }, 2000); // 2 second grace period after load
});

console.log('[Fallback] Fallback script loaded successfully');
