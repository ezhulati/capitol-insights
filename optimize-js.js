/**
 * Optimize JavaScript by analyzing and removing unused code
 * This script helps identify and remove unused JavaScript to improve performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite build output directory
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

// Function to analyze JS file size
async function analyzeJsFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    console.log(`Analyzing ${path.basename(filePath)}: ${sizeKB.toFixed(2)} KB`);
    
    // Read file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Simple analysis of potential unused code
    const unusedPatterns = [
      { pattern: /console\.log\(/g, name: 'console.log statements' },
      { pattern: /\/\*\*[\s\S]*?\*\//g, name: 'JSDoc comments' },
      { pattern: /\/\/.*$/gm, name: 'Single-line comments' },
      { pattern: /debugger;/g, name: 'debugger statements' },
      { pattern: /if\s*\(\s*false\s*\)/g, name: 'if (false) blocks' },
      { pattern: /if\s*\(\s*process\.env\.NODE_ENV\s*!==\s*['"]production['"]\s*\)/g, name: 'development-only code' }
    ];
    
    let totalUnusedBytes = 0;
    
    unusedPatterns.forEach(({ pattern, name }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        const unusedBytes = matches.reduce((sum, match) => sum + match.length, 0);
        const unusedKB = unusedBytes / 1024;
        totalUnusedBytes += unusedBytes;
        
        if (unusedKB > 0.1) { // Only show if more than 0.1 KB
          console.log(`  - Found ${matches.length} ${name}: ~${unusedKB.toFixed(2)} KB`);
        }
      }
    });
    
    // Check for large dependencies
    const importPatterns = [
      { pattern: /import\s+.*\s+from\s+['"](.+)['"]/g, name: 'ES imports' },
      { pattern: /require\s*\(\s*['"](.+)['"]\s*\)/g, name: 'CommonJS requires' }
    ];
    
    const imports = new Set();
    
    importPatterns.forEach(({ pattern }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && !match[1].startsWith('.')) {
          imports.add(match[1].split('/')[0]); // Get the package name
        }
      }
    });
    
    if (imports.size > 0) {
      console.log('  - Imported packages:');
      imports.forEach(pkg => {
        console.log(`    * ${pkg}`);
      });
    }
    
    const totalUnusedKB = totalUnusedBytes / 1024;
    if (totalUnusedKB > 0.5) { // Only show if more than 0.5 KB
      console.log(`  - Total potential savings: ~${totalUnusedKB.toFixed(2)} KB`);
    }
    
    return {
      file: path.basename(filePath),
      size: sizeKB,
      unusedSize: totalUnusedKB,
      imports: Array.from(imports)
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}: ${error.message}`);
    return null;
  }
}

// Function to find large JS files
async function findLargeJsFiles() {
  console.log(`Checking for JS files in ${assetsDir}...`);
  
  try {
    if (!fs.existsSync(assetsDir)) {
      console.log(`Build output directory not found. Please run 'npm run build' first.`);
      return;
    }
    
    const files = await fs.promises.readdir(assetsDir);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    if (jsFiles.length === 0) {
      console.log('No JS files found in the build output.');
      return;
    }
    
    console.log(`Found ${jsFiles.length} JS files. Analyzing...`);
    
    const results = [];
    
    for (const file of jsFiles) {
      const filePath = path.join(assetsDir, file);
      const result = await analyzeJsFile(filePath);
      if (result) {
        results.push(result);
      }
    }
    
    // Sort by size (largest first)
    results.sort((a, b) => b.size - a.size);
    
    console.log('\nSummary of JS files by size:');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.file}: ${result.size.toFixed(2)} KB (potential savings: ${result.unusedSize.toFixed(2)} KB)`);
    });
    
    console.log('\nRecommendations:');
    console.log('1. Consider code splitting to reduce initial bundle size');
    console.log('2. Lazy load components that are not needed for initial render');
    console.log('3. Check for unused dependencies in package.json');
    console.log('4. Use dynamic imports for large libraries');
    console.log('5. Consider using tree-shaking compatible imports');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Main function
async function optimizeJs() {
  console.log('JavaScript Optimization Analysis');
  console.log('===============================');
  
  await findLargeJsFiles();
}

// Run the optimization
optimizeJs().catch(error => {
  console.error(`Error in optimization process: ${error.message}`);
});