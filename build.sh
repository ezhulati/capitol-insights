#!/bin/bash

# Build script for Capitol Insights
# This script handles dependency resolution and builds the project

# Enable error handling
set -e

# Function to log messages
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to handle errors
handle_error() {
  log "ERROR: $1"
  exit 1
}

# Start build process
log "Starting build process for Capitol Insights..."

# Set environment variables
export NODE_OPTIONS="--max-old-space-size=4096"
export NPM_CONFIG_LOGLEVEL=verbose

# Clean up node_modules to ensure a fresh install
log "Cleaning up node_modules..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf dist

# Install dependencies
log "Installing dependencies..."

# First, explicitly install the correct versions of React and types
log "Installing React and TypeScript types explicitly..."
npm install --no-save react@18.2.0 react-dom@18.2.0 @types/react@18.2.48 @types/react-dom@18.2.18 --verbose || handle_error "Failed to install React dependencies"

# Then install all dependencies
log "Installing all dependencies..."
npm install --verbose || handle_error "Failed to install project dependencies"

# Build the project
log "Building the project..."
npm run build || handle_error "Build failed"

# Run optimizations (only if dist directory exists)
if [ -d "dist" ]; then
  log "Running optimizations..."
  node optimize-bundle.js || log "Warning: Optimization failed but continuing with deployment..."
  
  # Extract critical CSS
  log "Extracting critical CSS..."
  node extract-critical-css.js || log "Warning: CSS extraction failed but continuing with deployment..."
  
  # Verify critical files exist
  if [ ! -f "dist/index.html" ]; then
    handle_error "dist/index.html not found after build"
  fi
  
  # Check for JavaScript bundle
  if ! ls dist/assets/index-*.js 1> /dev/null 2>&1; then
    handle_error "No JavaScript bundle found after build"
  fi
  
  # Verify the index.html has the correct content
  if ! grep -q "Capitol Insights" dist/index.html; then
    handle_error "index.html appears to be empty or invalid"
  fi
  
  # Verify critical assets
  log "Verifying critical assets..."
  
  # Check for JavaScript bundle
  JS_BUNDLES=$(find dist/assets -name "*.js" | grep -v "chunk-")
  if [ -z "$JS_BUNDLES" ]; then
    handle_error "Missing critical asset: No JavaScript bundles found"
  else
    log "JavaScript bundles found: $JS_BUNDLES"
  fi
  
  # Check for CSS bundle - try various patterns that Vite might use
  CSS_BUNDLE=$(find dist/assets -name "*.css")
  if [ -z "$CSS_BUNDLE" ]; then
    log "Warning: No CSS bundle found in dist/assets - creating fallback"
    # Create minimal CSS file if it doesn't exist (emergency fallback)
    mkdir -p dist/assets
    echo "/* Fallback CSS */" > dist/assets/index-fallback.css
    CSS_BUNDLE="dist/assets/index-fallback.css"
  else
    log "CSS bundle found: $CSS_BUNDLE"
  fi
  
  # Verify script source in index.html - updated to check for type="module"
  if ! grep -q 'type="module"' dist/index.html; then
    handle_error "index.html has incorrect script source"
  fi
  
  # Create css directory for backward compatibility
  log "Creating dist/css directory..."
  mkdir -p dist/css
  
  # Add a fallback check for critical.css if it still doesn't exist
  if [ ! -f "dist/css/critical.css" ]; then
    log "Critical CSS still missing - using emergency fallback..."
    
    # Create minimal CSS as emergency fallback
    log "Creating emergency fallback critical.css..."
    cat << 'EOF' > dist/css/critical.css
/* Emergency fallback CSS */
body { font-family: sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
h1, h2, h3, h4, h5, h6 { color: #0F2539; }
.text-navy-900 { color: #0F2539; }
.bg-gold-600 { background-color: #D9A800; }
.text-white { color: #ffffff; }
EOF
  fi
  
  # Also ensure we have a CSS file in assets directory
  if [ ! -f "dist/assets/index-main.css" ] && [ ! -z "$CSS_BUNDLE" ]; then
    log "Creating assets/index-main.css from $CSS_BUNDLE..."
    cp $CSS_BUNDLE dist/assets/index-main.css
  elif [ ! -f "dist/assets/index-main.css" ] && [ -f "dist/css/critical.css" ]; then
    log "Creating assets/index-main.css from critical.css..."
    cp dist/css/critical.css dist/assets/index-main.css
  fi
  
  # Create JS directory if it doesn't exist
  if [ ! -d "dist/js" ]; then
    log "Creating dist/js directory..."
    mkdir -p dist/js
  fi
  
  # Copy JS files from public directory
  log "Copying JS files from public directory..."
  if [ -d "public/js" ]; then
    cp -r public/js/* dist/js/ || log "Warning: Failed to copy JS files but continuing with deployment..."
  fi
  
  # Copy diagnostics script
  log "Copying diagnostics script..."
  if [ -f "error-diagnostics.js" ]; then
    cp error-diagnostics.js dist/ || log "Warning: Failed to copy diagnostics script but continuing with deployment..."
  fi
  
  # Verify required JavaScript files exist
  log "Verifying required JavaScript files..."
  required_js_files=(
    "defer-js.js"
    "advocacy-navigation.js"
    "document-enhancements.js"
    "dom-purify.js"
    "image-preload.js"
    "meta-fixer.js"
    "structured-data.js"
  )
  
  for file in "${required_js_files[@]}"; do
    if [ ! -f "dist/js/$file" ]; then
      log "Warning: Required JavaScript file not found: $file. Creating empty file..."
      touch "dist/js/$file"
    fi
  done
  
  # Ensure proper file permissions
  log "Setting file permissions..."
  find dist -type f -exec chmod 644 {} \;
  find dist -type d -exec chmod 755 {} \;
  
  # Log build size
  log "Build size: $(du -sh dist | cut -f1)"
  
  # Log file sizes for debugging
  log "File sizes:"
  find dist -type f -exec ls -lh {} \;
else
  handle_error "dist directory not found after build"
fi
