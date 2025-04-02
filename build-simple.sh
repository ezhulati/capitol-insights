#!/bin/bash

# Simple build script for Capitol Insights
# This script builds the project for production without complexity

set -e

echo "===== Starting Simple Build Process ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Set environment variables
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
echo "Installing dependencies..."
npm ci || npm install --force

# Save the working index.html and force it as the main index.html
echo "Replacing index.html with production version..."
cp index.html index.html.original
cp public/index-production.html index.html

# Build the project
echo "Building for production..."
npm run build

# Restore original index.html for development
echo "Restoring original index.html..."
cp index.html.original index.html

# Instead of replacing index.html entirely, we'll ensure it has the right scripts
echo "Ensuring React app has fallback content..."
mkdir -p dist/backup
cp public/index-production.html dist/backup/fallback.html

# Create a script to inject fallback content if React fails to load
echo "Creating fallback loader script..."
mkdir -p dist/js
cat > dist/js/fallback-loader.js << 'EOL'
console.log('[Fallback Loader] Initializing');
// In case React doesn't load, we need to ensure the page has content
window.addEventListener('DOMContentLoaded', function() {
  // Define React Router constants in global scope
  window.POP = window.POP || 'POP';
  window.PUSH = window.PUSH || 'PUSH';
  window.REPLACE = window.REPLACE || 'REPLACE';

  console.log('[Fallback Loader] DOM Content Loaded');
  
  // Check if root is empty or just contains a loader
  setTimeout(function() {
    var root = document.getElementById('root');
    var hasContent = false;
    
    if (root) {
      // Check if root has real content or just a spinner
      if (root.children.length > 0) {
        var onlyHasLoader = true;
        for (var i = 0; i < root.children.length; i++) {
          if (!root.children[i].classList.contains('loading') && 
              !root.children[i].classList.contains('loading-spinner')) {
            onlyHasLoader = false;
            break;
          }
        }
        hasContent = !onlyHasLoader;
      }
      
      if (!hasContent) {
        console.log('[Fallback Loader] No content detected, loading fallback');
        fetch('/backup/fallback.html')
          .then(function(response) { return response.text(); })
          .then(function(html) {
            // Extract the body content from the fallback HTML
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var fallbackRoot = doc.getElementById('root');
            
            if (fallbackRoot) {
              // Replace the content of the current page's root with the fallback content
              root.innerHTML = fallbackRoot.innerHTML;
              console.log('[Fallback Loader] Fallback content loaded');
              
              // Execute any scripts in the fallback content
              var scripts = root.getElementsByTagName('script');
              for (var i = 0; i < scripts.length; i++) {
                var script = document.createElement('script');
                if (scripts[i].src) {
                  script.src = scripts[i].src;
                } else {
                  script.textContent = scripts[i].textContent;
                }
                document.body.appendChild(script);
              }
            }
          })
          .catch(function(err) {
            console.error('[Fallback Loader] Failed to load fallback', err);
          });
      } else {
        console.log('[Fallback Loader] Content detected, no need for fallback');
      }
    }
  }, 2000); // Check after 2 seconds
});
EOL

# Add the fallback loader script to index.html
if [ -f "dist/index.html" ]; then
  echo "Adding fallback loader to index.html..."
  # Insert the script right before the closing body tag
  sed -i '' -e 's|</body>|  <script src="/js/fallback-loader.js"></script>\n</body>|' dist/index.html || true
fi

# Make sure critical files exist
if [ ! -d "dist/js" ]; then
  echo "Creating JS directory..."
  mkdir -p dist/js
fi

# Copy router polyfill to ensure it's available
if [ -f "public/js/router-polyfill.js" ]; then
  echo "Copying router polyfill..."
  cp public/js/router-polyfill.js dist/js/
else
  echo "Creating router polyfill..."
  mkdir -p dist/js
  echo "console.log('[Router Polyfill] Initialized React Router constants');
// Define React Router constants in global scope
window.POP = 'POP';
window.PUSH = 'PUSH';
window.REPLACE = 'REPLACE';" > dist/js/router-polyfill.js
fi

# Ensure CSS files exist
mkdir -p dist/css
if [ ! -f "dist/css/critical.css" ]; then
  echo "Creating critical CSS..."
  echo "/* Critical CSS */" > dist/css/critical.css
fi

# Copy image files
if [ -d "public/images" ] && [ ! -d "dist/images" ]; then
  echo "Copying images..."
  cp -r public/images dist/
fi

echo "Build completed successfully!"
