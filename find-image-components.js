const fs = require('fs');
const path = require('path');

/**
 * Script to find image components that should be replaced with OptimizedImage
 * 
 * This script scans the project for <img> tags and suggests replacing them
 * with the OptimizedImage component for better performance.
 */

// Configuration
const config = {
  // Directories to scan
  srcDirs: ['./src'],
  // File extensions to scan
  extensions: ['.tsx', '.jsx', '.js', '.ts'],
  // Patterns to look for
  patterns: [
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g,
    /src=["']([^"']+\.(?:jpg|jpeg|png))["']/g
  ]
};

// Function to scan a file for image tags
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let matches = [];
    
    // Check for each pattern
    for (const pattern of config.patterns) {
      const patternMatches = [...content.matchAll(pattern)];
      matches = [...matches, ...patternMatches];
    }
    
    if (matches.length > 0) {
      return {
        file: filePath,
        matches: matches.map(match => ({
          fullMatch: match[0],
          src: match[1]
        }))
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message);
    return null;
  }
}

// Function to scan a directory recursively
function scanDirectory(dirPath) {
  let results = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other common directories to ignore
        if (['node_modules', 'dist', 'build', '.git'].includes(entry.name)) {
          continue;
        }
        
        // Recursively scan subdirectories
        results = [...results, ...scanDirectory(fullPath)];
      } else if (entry.isFile()) {
        // Check if file has one of the extensions we're looking for
        const ext = path.extname(entry.name);
        if (config.extensions.includes(ext)) {
          const fileResult = scanFile(fullPath);
          if (fileResult) {
            results.push(fileResult);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return results;
}

// Function to generate replacement suggestions
function generateSuggestions(results) {
  let suggestions = [];
  
  for (const result of results) {
    for (const match of result.matches) {
      // Extract attributes from the img tag
      const altMatch = match.fullMatch.match(/alt=["']([^"']*)["']/);
      const alt = altMatch ? altMatch[1] : 'Image';
      
      const widthMatch = match.fullMatch.match(/width=["']([^"']*)["']/);
      const width = widthMatch ? widthMatch[1] : null;
      
      const heightMatch = match.fullMatch.match(/height=["']([^"']*)["']/);
      const height = heightMatch ? heightMatch[1] : null;
      
      const classMatch = match.fullMatch.match(/className=["']([^"']*)["']/);
      const className = classMatch ? classMatch[1] : null;
      
      // Generate OptimizedImage component
      let replacement = `<OptimizedImage\n`;
      replacement += `  src="${match.src}"\n`;
      replacement += `  alt="${alt}"\n`;
      
      if (width) replacement += `  width={${width}}\n`;
      if (height) replacement += `  height={${height}}\n`;
      if (className) replacement += `  className="${className}"\n`;
      
      replacement += `  loading="lazy"\n`;
      replacement += `  objectFit="cover"\n`;
      replacement += `/>\n`;
      
      suggestions.push({
        file: result.file,
        original: match.fullMatch,
        replacement
      });
    }
  }
  
  return suggestions;
}

// Main function
function main() {
  console.log('=== Finding Image Components to Optimize ===\n');
  
  let allResults = [];
  
  // Scan all source directories
  for (const dir of config.srcDirs) {
    console.log(`Scanning ${dir}...`);
    const results = scanDirectory(dir);
    allResults = [...allResults, ...results];
  }
  
  // Generate suggestions
  const suggestions = generateSuggestions(allResults);
  
  // Print results
  console.log(`\nFound ${suggestions.length} images that could be optimized in ${allResults.length} files.\n`);
  
  if (suggestions.length > 0) {
    console.log('=== Replacement Suggestions ===\n');
    
    // Group suggestions by file
    const fileGroups = {};
    for (const suggestion of suggestions) {
      if (!fileGroups[suggestion.file]) {
        fileGroups[suggestion.file] = [];
      }
      fileGroups[suggestion.file].push(suggestion);
    }
    
    // Print suggestions by file
    for (const [file, fileSuggestions] of Object.entries(fileGroups)) {
      console.log(`File: ${file}`);
      console.log(`Found ${fileSuggestions.length} images to optimize\n`);
      
      for (let i = 0; i < fileSuggestions.length; i++) {
        const suggestion = fileSuggestions[i];
        console.log(`Image ${i + 1}:`);
        console.log(`Original: ${suggestion.original}`);
        console.log(`Replace with:\n${suggestion.replacement}`);
        console.log('---\n');
      }
      
      console.log('\n');
    }
    
    // Print import instructions
    console.log('=== Implementation Steps ===\n');
    console.log('1. Add the OptimizedImage import to each file:');
    console.log(`   import OptimizedImage from '../components/OptimizedImage';\n`);
    console.log('2. Replace each <img> tag with the OptimizedImage component as shown above');
    console.log('3. Run the convert-images-to-webp.js script to generate WebP versions of your images');
    console.log('   node convert-images-to-webp.js\n');
    
    console.log('Benefits:');
    console.log('- Smaller image file sizes (WebP is typically 25-35% smaller than JPEG/PNG)');
    console.log('- Automatic format fallback for browsers that don\'t support WebP');
    console.log('- Better loading performance with proper image attributes');
    console.log('- Improved Core Web Vitals scores (LCP, CLS)');
  } else {
    console.log('No images found that need optimization.');
  }
}

// Run the main function
main();