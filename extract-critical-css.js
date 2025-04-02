// CSS extraction utility for build process
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// Get current working directory
const cwd = process.cwd();

console.log('Extracting critical CSS for fallback...');

// Check if dist/assets directory exists
if (!fs.existsSync(path.join(cwd, 'dist', 'assets'))) {
  console.log('Creating dist/assets directory');
  fs.mkdirSync(path.join(cwd, 'dist', 'assets'), { recursive: true });
}

// Check if dist/css directory exists
if (!fs.existsSync(path.join(cwd, 'dist', 'css'))) {
  console.log('Creating dist/css directory');
  fs.mkdirSync(path.join(cwd, 'dist', 'css'), { recursive: true });
}

// Function to find CSS bundles
function findCssFiles() {
  try {
    // Look for CSS files in dist/assets
    const assetFiles = fs.readdirSync(path.join(cwd, 'dist', 'assets'));
    const cssFiles = assetFiles.filter(file => file.endsWith('.css'));
    
    if (cssFiles.length > 0) {
      console.log(`Found ${cssFiles.length} CSS files in dist/assets:`);
      cssFiles.forEach(file => console.log(`- ${file}`));
      return cssFiles.map(file => path.join(cwd, 'dist', 'assets', file));
    }
    
    console.log('No CSS files found in dist/assets');
    return [];
  } catch (error) {
    console.error(`Error finding CSS files: ${error.message}`);
    return [];
  }
}

// Generate a minimal Tailwind CSS bundle as fallback
function generateFallbackCss() {
  console.log('Generating fallback CSS...');
  
  const fallbackCss = `
/* Tailwind Base */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Critical styles */
.container {
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #334E68;
  background-color: #ffffff;
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Georgia, Times, 'Times New Roman', serif;
  color: #0F2539;
  margin-top: 0;
  font-weight: 600;
  line-height: 1.2;
}

/* Custom colors */
.text-navy-900 {
  color: #0F2539;
}

.bg-gold-600 {
  background-color: #D9A800;
}

.text-white {
  color: #ffffff;
}

/* Utilities */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
`;

  const fallbackFile = path.join(cwd, 'dist', 'assets', 'index-fallback.css');
  fs.writeFileSync(fallbackFile, fallbackCss);
  console.log(`Fallback CSS created at ${fallbackFile}`);
  return fallbackFile;
}

// Copy CSS file to critical.css
async function copyCriticalCss() {
  console.log('Copying critical CSS...');
  
  const cssFiles = findCssFiles();
  let sourceCss;
  
  if (cssFiles.length > 0) {
    // Use the first CSS file found
    sourceCss = cssFiles[0];
    console.log(`Using ${sourceCss} as source`);
  } else {
    // Generate fallback
    sourceCss = generateFallbackCss();
  }
  
  const criticalCssFile = path.join(cwd, 'dist', 'css', 'critical.css');
  
  // Copy file
  fs.copyFileSync(sourceCss, criticalCssFile);
  console.log(`CSS copied to ${criticalCssFile}`);
  
  // Also ensure we have a named version in assets directory for Netlify to detect
  const assetsCssFile = path.join(cwd, 'dist', 'assets', 'index-main.css');
  fs.copyFileSync(sourceCss, assetsCssFile);
  console.log(`CSS copied to ${assetsCssFile}`);
  
  return true;
}

// Execute the copy
copyCriticalCss()
  .then(() => console.log('Critical CSS extraction complete'))
  .catch(error => console.error(`Error extracting critical CSS: ${error.message}`));
