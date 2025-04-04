#!/bin/bash

# Capitol Insights Direct Production Build Script
# This script builds the full React app properly for production

set -e

echo "===== Starting Production Build Process ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Set environment variables for successful build
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV=production
export VITE_APP_VERSION="$(date +%Y%m%d%H%M)"
export VITE_BUILD_TIME="$(date)"
export PUPPETEER_SKIP_DOWNLOAD=true

# Install dependencies - including devDependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Explicitly install Vite (both globally and locally just to be safe)
echo "Installing Vite globally and locally..."
npm install -g vite || true
npm install --save-dev vite

# Verify that vite is available
echo "Verifying Vite installation..."
node_modules/.bin/vite --version || npm ls vite

# Create a custom index-with-polyfill.html for the build process
echo "Creating optimized index.html for production build..."
cat > index-with-polyfill.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Load React Router polyfill before anything else -->
    <script>
      // Define constants for React Router
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
      
      console.log('React Router constants defined in index.html');
    </script>
    
    <title>Capitol Insights</title>
  </head>
  <body>
    <div id="root">
      <!-- This div will be replaced by React -->
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOL

# Use our optimized index.html for the build
echo "Backing up original index.html..."
cp index.html index.html.original
cp index-with-polyfill.html index.html

# Build the project with specific production settings
echo "Building for production with optimized settings..."
# Use the local vite binary directly instead of relying on npm scripts
echo "Running: node_modules/.bin/vite build"
node_modules/.bin/vite build || npm run build

# Restore original index.html for development
echo "Restoring original index.html..."
cp index.html.original index.html
rm index-with-polyfill.html

# Examine and fix built index.html
echo "Fixing asset paths in the built index.html..."
if [ -f "dist/index.html" ]; then
  # Make sure router polyfill is copied to dist
  mkdir -p dist/js
  cp public/js/router-polyfill.js dist/js/
  
  # Add router polyfill script to index.html
  echo "Adding router polyfill to index.html..."
  # Insert the script as the first script in head
  sed -i '' -e 's|<head>|<head>\n  <script src="/js/router-polyfill.js"></script>|' dist/index.html || true
  
  # Fix any incorrect asset paths
  echo "Ensuring asset paths are correct..."
  # Replace any /assets/index.js references with the correct path
  sed -i '' -e 's|/assets/index.js|./assets/index.js|g' dist/index.html || true
fi

# Copy all required static assets
echo "Copying additional static assets..."
# Copy critical CSS file 
mkdir -p dist/css
touch dist/css/critical.css

# Copy image files if they exist
if [ -d "public/images" ] && [ ! -d "dist/images" ]; then
  echo "Copying images..."
  cp -r public/images dist/
fi

# Clean up any build artifacts
echo "Cleaning up build artifacts..."
rm -f dist/backup/fallback.html 2>/dev/null || true
rm -f dist/js/fallback-loader.js 2>/dev/null || true

echo "Build completed successfully!"
