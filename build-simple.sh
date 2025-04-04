#!/bin/bash

# Capitol Insights Direct Production Build Script
# This script builds the full React app properly for production

set -e

echo "===== Starting Production Build Process ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Check for essential commands and use Node.js alternatives if needed
check_command() {
  if ! command -v $1 &> /dev/null; then
    echo "Warning: $1 command not found, will use Node.js alternative"
    return 1
  fi
  return 0
}

# Node.js alternatives for essential commands
node_mkdir() {
  node -e "const fs = require('fs'); try { fs.mkdirSync('$1', { recursive: true }); } catch (e) { console.error(e); }"
}

node_touch() {
  node -e "const fs = require('fs'); try { fs.closeSync(fs.openSync('$1', 'w')); } catch (e) { console.error(e); }"
}

node_cp() {
  node -e "const fs = require('fs'); try { fs.copyFileSync('$1', '$2'); } catch (e) { console.error(e); }"
}

node_cp_r() {
  node -e "const fs = require('fs'); const path = require('path'); const copyDir = (src, dest) => { if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true }); const entries = fs.readdirSync(src, { withFileTypes: true }); for (const entry of entries) { const srcPath = path.join(src, entry.name); const destPath = path.join(dest, entry.name); if (entry.isDirectory()) { copyDir(srcPath, destPath); } else { fs.copyFileSync(srcPath, destPath); } } }; try { copyDir('$1', '$2'); } catch (e) { console.error(e); }"
}

node_rm() {
  node -e "const fs = require('fs'); try { fs.unlinkSync('$1'); } catch (e) { /* ignore */ }"
}

node_sed() {
  node -e "const fs = require('fs'); try { let content = fs.readFileSync('$3', 'utf8'); content = content.replace(/$1/, '$2'); fs.writeFileSync('$3', content); } catch (e) { console.error(e); }"
}

# Set environment variables for successful build
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV=production
export VITE_APP_VERSION="$(date +%Y%m%d%H%M || echo 'build-date')"
export VITE_BUILD_TIME="$(date || echo 'build-time')"
export PUPPETEER_SKIP_DOWNLOAD=true

# Install dependencies - including devDependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Explicitly install Vite and its plugins
echo "Installing Vite and plugins..."
npm install --save-dev vite @vitejs/plugin-react vite-plugin-pwa vite-plugin-compression rollup-plugin-visualizer

# Verify that vite is available
echo "Verifying Vite installation..."
node_modules/.bin/vite --version || npm ls vite

# Create a custom index-with-polyfill.html for the build process using Node.js
echo "Creating optimized index.html for production build..."
node -e "
const fs = require('fs');
const content = \`<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <link rel=\"icon\" href=\"/favicon.svg\" type=\"image/svg+xml\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    
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
    <div id=\"root\">
      <!-- This div will be replaced by React -->
    </div>
    <script type=\"module\" src=\"/src/main.tsx\"></script>
  </body>
</html>\`;
fs.writeFileSync('index-with-polyfill.html', content);
"

# Use our optimized index.html for the build
echo "Backing up original index.html..."
if check_command cp; then
  cp index.html index.html.original
  cp index-with-polyfill.html index.html
else
  node_cp "index.html" "index.html.original"
  node_cp "index-with-polyfill.html" "index.html"
fi

# Build the project with specific production settings
echo "Building for production with optimized settings..."
# Use the local vite binary directly instead of relying on npm scripts
echo "Running: node_modules/.bin/vite build"
node_modules/.bin/vite build || npm run build

# Restore original index.html for development
echo "Restoring original index.html..."
if check_command cp && check_command rm; then
  cp index.html.original index.html
  rm index-with-polyfill.html
else
  node_cp "index.html.original" "index.html"
  node_rm "index-with-polyfill.html"
fi

# Examine and fix built index.html
echo "Fixing asset paths in the built index.html..."
if [ -f "dist/index.html" ]; then
  # Make sure router polyfill is copied to dist
  if check_command mkdir && check_command cp; then
    mkdir -p dist/js
    cp public/js/router-polyfill.js dist/js/
  else
    node_mkdir "dist/js"
    node_cp "public/js/router-polyfill.js" "dist/js/router-polyfill.js"
  fi
  
  # Add router polyfill script to index.html
  echo "Adding router polyfill to index.html..."
  # Insert the script as the first script in head using Node.js
  node -e "
  const fs = require('fs');
  try {
    let content = fs.readFileSync('dist/index.html', 'utf8');
    content = content.replace('<head>', '<head>\\n  <script src=\"/js/router-polyfill.js\"></script>');
    fs.writeFileSync('dist/index.html', content);
  } catch (e) {
    console.error('Error modifying index.html:', e);
  }
  "
  
  # Fix any incorrect asset paths
  echo "Ensuring asset paths are correct..."
  # Replace any /assets/index.js references with the correct path
  node -e "
  const fs = require('fs');
  try {
    let content = fs.readFileSync('dist/index.html', 'utf8');
    content = content.replace(/\/assets\/index\.js/g, './assets/index.js');
    fs.writeFileSync('dist/index.html', content);
  } catch (e) {
    console.error('Error fixing asset paths:', e);
  }
  "
fi

# Copy all required static assets
echo "Copying additional static assets..."
# Copy critical CSS file 
if check_command mkdir && check_command touch; then
  mkdir -p dist/css
  touch dist/css/critical.css
else
  node_mkdir "dist/css"
  node_touch "dist/css/critical.css"
fi

# Copy image files if they exist
if [ -d "public/images" ]; then
  echo "Copying images..."
  if check_command mkdir && check_command cp; then
    mkdir -p dist/images
    cp -r public/images/* dist/images/
  else
    node_mkdir "dist/images"
    node_cp_r "public/images" "dist/images"
  fi
fi

# Clean up any build artifacts using Node.js
echo "Cleaning up build artifacts..."
node -e "
const fs = require('fs');
const paths = ['dist/backup/fallback.html', 'dist/js/fallback-loader.js'];
for (const path of paths) {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (e) {
    /* ignore errors */
  }
}
"

echo "Build completed successfully!"
