import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * JavaScript Optimization Script
 * 
 * This script helps identify and optimize JavaScript usage in the project:
 * 1. Analyzes bundle sizes to identify large dependencies
 * 2. Suggests code splitting opportunities
 * 3. Identifies unused imports and dependencies
 * 4. Provides recommendations for reducing JavaScript size
 */

// Configuration
const config = {
  // Directories to analyze
  srcDirs: ['./src'],
  // Bundle size threshold for warnings (in KB)
  bundleSizeThreshold: 100,
  // Import usage threshold (percentage of imports used)
  importUsageThreshold: 60
};

// Function to analyze bundle sizes
function analyzeBundleSizes() {
  console.log('\n=== Bundle Size Analysis ===\n');
  
  try {
    // Run rollup-plugin-visualizer if available
    console.log('Building project with bundle analysis...');
    execSync('npm run build -- --mode production', { stdio: 'inherit' });
    
    console.log('\nBundle analysis complete. Check the stats.html file for detailed visualization.');
    console.log('Look for large chunks that could benefit from code splitting or lazy loading.');
    
    // Provide recommendations
    console.log('\nRecommendations for reducing bundle size:');
    console.log('1. Use dynamic imports for route-level code splitting');
    console.log('   Example: const HomePage = React.lazy(() => import("./pages/HomePage"));');
    console.log('2. Lazy load heavy components that are not needed for initial render');
    console.log('3. Consider using smaller alternative libraries for large dependencies');
    console.log('4. Use tree-shaking friendly imports:');
    console.log('   Instead of: import lodash from "lodash"');
    console.log('   Use: import { map, filter } from "lodash"');
  } catch (error) {
    console.error('Error analyzing bundle sizes:', error.message);
  }
}

// Function to find unused imports
function findUnusedImports() {
  console.log('\n=== Unused Imports Analysis ===\n');
  
  try {
    // Use ESLint with unused-imports plugin if available
    console.log('Checking for unused imports...');
    
    const eslintCommand = 'npx eslint --ext .js,.jsx,.ts,.tsx src/ --no-error-on-unmatched-pattern';
    const result = execSync(eslintCommand, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    
    // Count unused imports warnings
    const unusedImportMatches = result.match(/unused-imports\/no-unused-imports/g) || [];
    const unusedVarsMatches = result.match(/no-unused-vars/g) || [];
    
    console.log(`Found ${unusedImportMatches.length} unused imports and ${unusedVarsMatches.length} unused variables.`);
    
    if (unusedImportMatches.length > 0 || unusedVarsMatches.length > 0) {
      console.log('\nRecommendations:');
      console.log('1. Remove unused imports to reduce bundle size');
      console.log('2. Consider using a tool like "eslint-plugin-unused-imports" to automatically fix these issues');
      console.log('3. Run: npx eslint --ext .js,.jsx,.ts,.tsx src/ --fix');
    } else {
      console.log('\nGreat job! No unused imports detected.');
    }
  } catch (error) {
    // ESLint will exit with error code if it finds issues, which is expected
    const output = error.stdout?.toString() || '';
    
    // Count unused imports warnings
    const unusedImportMatches = output.match(/unused-imports\/no-unused-imports/g) || [];
    const unusedVarsMatches = output.match(/no-unused-vars/g) || [];
    
    console.log(`Found ${unusedImportMatches.length} unused imports and ${unusedVarsMatches.length} unused variables.`);
    
    if (unusedImportMatches.length > 0 || unusedVarsMatches.length > 0) {
      console.log('\nRecommendations:');
      console.log('1. Remove unused imports to reduce bundle size');
      console.log('2. Consider using a tool like "eslint-plugin-unused-imports" to automatically fix these issues');
      console.log('3. Run: npx eslint --ext .js,.jsx,.ts,.tsx src/ --fix');
    }
  }
}

// Function to identify large dependencies
function identifyLargeDependencies() {
  console.log('\n=== Large Dependencies Analysis ===\n');
  
  try {
    // Use npm list to get dependency sizes
    console.log('Analyzing dependencies...');
    
    // Create a package size report
    const packageSizes = {};
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('node_modules directory not found. Run npm install first.');
      return;
    }
    
    // Get top-level dependencies
    const dependencies = fs.readdirSync(nodeModulesPath)
      .filter(dir => !dir.startsWith('.') && !dir.startsWith('@'));
    
    // Add scoped packages
    if (fs.existsSync(path.join(nodeModulesPath, '@'))) {
      const scopedDirs = fs.readdirSync(path.join(nodeModulesPath, '@'));
      
      for (const scopeDir of scopedDirs) {
        const scopePath = path.join(nodeModulesPath, '@', scopeDir);
        if (fs.statSync(scopePath).isDirectory()) {
          const scopedPackages = fs.readdirSync(scopePath)
            .map(pkg => `@${scopeDir}/${pkg}`);
          dependencies.push(...scopedPackages);
        }
      }
    }
    
    // Calculate sizes
    for (const dep of dependencies) {
      try {
        const depPath = dep.includes('/') 
          ? path.join(nodeModulesPath, dep.split('/')[0], dep.split('/')[1])
          : path.join(nodeModulesPath, dep);
        
        if (fs.existsSync(depPath) && fs.statSync(depPath).isDirectory()) {
          const size = calculateDirSize(depPath);
          packageSizes[dep] = size;
        }
      } catch (err) {
        console.error(`Error calculating size for ${dep}:`, err.message);
      }
    }
    
    // Sort by size and display
    const sortedDeps = Object.entries(packageSizes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    
    console.log('Top 20 largest dependencies:');
    console.log('---------------------------');
    sortedDeps.forEach(([dep, size], index) => {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      console.log(`${index + 1}. ${dep}: ${sizeInMB} MB`);
    });
    
    // Provide recommendations for large dependencies
    console.log('\nRecommendations for reducing dependency size:');
    console.log('1. Consider alternatives for large packages');
    console.log('2. Use dynamic imports to load large dependencies only when needed');
    console.log('3. Check if you can use smaller subpackages instead of the full library');
    console.log('4. For UI components, consider using a single component library instead of multiple ones');
  } catch (error) {
    console.error('Error identifying large dependencies:', error.message);
  }
}

// Helper function to calculate directory size recursively
function calculateDirSize(dirPath) {
  let size = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += calculateDirSize(filePath);
      } else {
        size += stat.size;
      }
    }
  } catch (err) {
    // Ignore errors for symlinks or permission issues
  }
  
  return size;
}

// Function to suggest code splitting opportunities
function suggestCodeSplitting() {
  console.log('\n=== Code Splitting Opportunities ===\n');
  
  console.log('Analyzing project for code splitting opportunities...');
  
  // Look for large components or pages
  const srcDir = path.join(process.cwd(), 'src');
  const pagesDir = path.join(srcDir, 'pages');
  
  if (fs.existsSync(pagesDir)) {
    console.log('\nRecommended code splitting for pages:');
    
    const pages = fs.readdirSync(pagesDir)
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
    
    pages.forEach(page => {
      console.log(`- Use React.lazy() for ${page.replace(/\.[^/.]+$/, '')}`);
    });
    
    console.log('\nExample implementation in App.tsx or router:');
    console.log('```');
    console.log("import React, { Suspense } from 'react';");
    console.log("const HomePage = React.lazy(() => import('./pages/HomePage'));");
    console.log('');
    console.log('// In your router or component tree');
    console.log('<Suspense fallback={<div>Loading...</div>}>');
    console.log('  <HomePage />');
    console.log('</Suspense>');
    console.log('```');
  }
  
  console.log('\nOther code splitting opportunities:');
  console.log('1. Heavy UI components (charts, rich text editors, etc.)');
  console.log('2. Feature modules that are not needed on initial load');
  console.log('3. Admin sections or authenticated areas');
  console.log('4. Modal content that is not immediately visible');
}

// Main function
function main() {
  console.log('=== JavaScript Optimization Analysis ===');
  console.log('This tool will help identify opportunities to reduce JavaScript size and improve performance.');
  
  // Run all analyses
  analyzeBundleSizes();
  findUnusedImports();
  identifyLargeDependencies();
  suggestCodeSplitting();
  
  console.log('\n=== Analysis Complete ===');
  console.log('Review the recommendations above to improve your application performance.');
  console.log('For more detailed analysis, consider using tools like:');
  console.log('- webpack-bundle-analyzer or rollup-plugin-visualizer');
  console.log('- ESLint with unused-imports plugin');
  console.log('- Lighthouse performance audits');
}

// Run the main function
main();