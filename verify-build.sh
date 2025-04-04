#!/bin/bash

# Verify Build Script for Capitol Insights
# This script tests the build process locally to catch issues before deployment

set -e

echo "===== Starting Build Verification Process ====="
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

# Set environment variables for successful build
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV=production
export VITE_APP_VERSION="$(date +%Y%m%d%H%M || echo 'build-date')"
export VITE_BUILD_TIME="$(date || echo 'build-time')"
export PUPPETEER_SKIP_DOWNLOAD=true

# Clean up any previous build artifacts using Node.js
echo "Cleaning up previous build artifacts..."
node -e "
const fs = require('fs');
const path = require('path');
const rimraf = (dir_path) => {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach((entry) => {
      const entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    try { fs.rmdirSync(dir_path); } catch (e) { console.error(e); }
  }
};
try {
  rimraf('dist');
  if (fs.existsSync('node_modules/.vite')) {
    rimraf('node_modules/.vite');
  }
} catch (e) {
  console.error('Error cleaning up artifacts:', e);
}
"

# Install dependencies with the same flags as in production
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Explicitly install Vite and its plugins
echo "Installing Vite and plugins..."
npm install --save-dev vite @vitejs/plugin-react vite-plugin-pwa vite-plugin-compression rollup-plugin-visualizer

# Verify that vite is available
echo "Verifying Vite installation..."
node_modules/.bin/vite --version || npm ls vite

# Run a production build
echo "Running production build..."
npm run build

# Verify the build output using Node.js
echo "Verifying build output..."
node -e "
const fs = require('fs');
const path = require('path');

// Check if index.html exists
if (fs.existsSync('dist/index.html')) {
  console.log('✅ index.html exists');
} else {
  console.log('❌ index.html is missing');
  process.exit(1);
}

// Check if assets directory exists
if (fs.existsSync('dist/assets') && fs.statSync('dist/assets').isDirectory()) {
  console.log('✅ assets directory exists');
} else {
  console.log('❌ assets directory is missing');
  process.exit(1);
}

// Count JS files in assets directory
let jsCount = 0;
let cssCount = 0;

const countFiles = (dir, ext) => {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += countFiles(filePath, ext);
    } else if (file.endsWith(ext)) {
      count++;
    }
  }
  
  return count;
};

try {
  jsCount = countFiles('dist/assets', '.js');
  if (jsCount > 0) {
    console.log(\`✅ Found \${jsCount} JavaScript files\`);
  } else {
    console.log('❌ No JavaScript files found in assets directory');
    process.exit(1);
  }
  
  cssCount = countFiles('dist/assets', '.css');
  if (cssCount > 0) {
    console.log(\`✅ Found \${cssCount} CSS files\`);
  } else {
    console.log('❌ No CSS files found in assets directory');
    process.exit(1);
  }
} catch (e) {
  console.error('Error counting files:', e);
  process.exit(1);
}
"

echo "===== Build Verification Completed Successfully ====="
echo "The build process completed without errors."
echo "You can now commit your changes and push to Netlify."
