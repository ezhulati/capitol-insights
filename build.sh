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
  for file in "dist/assets/index-*.js" "dist/assets/index-*.css"; do
    if ! ls $file 1> /dev/null 2>&1; then
      handle_error "Missing critical asset: $file"
    fi
  done
  
  # Verify script source in index.html
  if ! grep -q 'src="/assets/main-' dist/index.html; then
    handle_error "index.html has incorrect script source"
  fi
  
  # Verify critical CSS file exists
  if [ ! -f "dist/css/critical.css" ]; then
    handle_error "critical.css not found after build"
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
      handle_error "Required JavaScript file not found: $file"
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

log "Build completed successfully!"
