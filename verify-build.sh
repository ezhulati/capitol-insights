#!/bin/bash

# Verify Build Script for Capitol Insights
# This script tests the build process locally to catch issues before deployment

set -e

echo "===== Starting Build Verification Process ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Set environment variables for successful build
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV=production
export VITE_APP_VERSION="$(date +%Y%m%d%H%M)"
export VITE_BUILD_TIME="$(date)"
export PUPPETEER_SKIP_DOWNLOAD=true

# Clean up any previous build artifacts
echo "Cleaning up previous build artifacts..."
rm -rf dist node_modules/.vite

# Install dependencies with the same flags as in production
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Verify that vite is available
echo "Verifying Vite installation..."
node_modules/.bin/vite --version || npm ls vite

# Run a production build
echo "Running production build..."
npm run build

# Verify the build output
echo "Verifying build output..."
if [ -f "dist/index.html" ]; then
  echo "✅ index.html exists"
else
  echo "❌ index.html is missing"
  exit 1
fi

if [ -d "dist/assets" ]; then
  echo "✅ assets directory exists"
else
  echo "❌ assets directory is missing"
  exit 1
fi

# Count JS files in assets directory
JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
if [ $JS_COUNT -gt 0 ]; then
  echo "✅ Found $JS_COUNT JavaScript files"
else
  echo "❌ No JavaScript files found in assets directory"
  exit 1
fi

# Count CSS files in assets directory
CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
if [ $CSS_COUNT -gt 0 ]; then
  echo "✅ Found $CSS_COUNT CSS files"
else
  echo "❌ No CSS files found in assets directory"
  exit 1
fi

echo "===== Build Verification Completed Successfully ====="
echo "The build process completed without errors."
echo "You can now commit your changes and push to Netlify."
