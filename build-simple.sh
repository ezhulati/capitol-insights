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

# Always override the built index.html with our production version
echo "Ensuring production index.html is used..."
cp public/index-production.html dist/index.html

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
