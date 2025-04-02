/**
 * Find image components in the codebase
 * This script searches for img tags in TSX files to help identify
 * where to replace with OptimizedImage component
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to search
const srcDir = path.join(__dirname, 'src');

// Regular expression to find img tags
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;

// Function to search for img tags in a file
async function searchFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const matches = [...content.matchAll(imgRegex)];
    
    if (matches.length > 0) {
      console.log(`\nFound ${matches.length} image(s) in ${filePath}:`);
      
      matches.forEach((match, index) => {
        const imgTag = match[0];
        const src = match[1];
        
        // Extract other attributes
        const alt = imgTag.match(/alt=["']([^"']*)["']/)?.[1] || '';
        const width = imgTag.match(/width=["']([^"']*)["']/)?.[1] || '';
        const height = imgTag.match(/height=["']([^"']*)["']/)?.[1] || '';
        const className = imgTag.match(/className=["']([^"']*)["']/)?.[1] || '';
        const loading = imgTag.match(/loading=["']([^"']*)["']/)?.[1] || '';
        
        console.log(`  ${index + 1}. src: ${src}`);
        console.log(`     alt: ${alt}`);
        if (width) console.log(`     width: ${width}`);
        if (height) console.log(`     height: ${height}`);
        if (className) console.log(`     className: ${className}`);
        if (loading) console.log(`     loading: ${loading}`);
        
        // Suggest OptimizedImage replacement
        console.log(`\n     Suggested replacement:`);
        console.log(`     <OptimizedImage`);
        console.log(`       src="${src}"`);
        console.log(`       alt="${alt}"`);
        if (width) console.log(`       width={${width}}`);
        if (height) console.log(`       height={${height}}`);
        if (className) console.log(`       className="${className}"`);
        if (loading) console.log(`       loading="${loading}"`);
        console.log(`     />`);
      });
    }
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Function to recursively search directories
async function searchDirectory(dirPath) {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await searchDirectory(fullPath);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx')) {
        await searchFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error searching directory ${dirPath}: ${error.message}`);
  }
}

// Main function
async function findImageComponents() {
  console.log('Searching for image components in TSX/JSX files...');
  
  try {
    await searchDirectory(srcDir);
    console.log('\nSearch complete. Use the suggestions above to replace img tags with OptimizedImage component.');
    console.log('\nDon\'t forget to:');
    console.log('1. Import the OptimizedImage component: import OptimizedImage from \'../components/OptimizedImage\';');
    console.log('2. Run the image conversion script: npm run convert-images');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the search
findImageComponents().catch(error => {
  console.error(`Error in search process: ${error.message}`);
});