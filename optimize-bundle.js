#!/usr/bin/env node

/**
 * JavaScript Bundle Optimizer
 * 
 * This script analyzes the Vite build output and optimizes the JavaScript bundles
 * by removing unused code and splitting large bundles.
 * 
 * Usage:
 *   node optimize-bundle.js
 * 
 * This should be run after a production build (npm run build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');
const jsDir = path.join(distDir, 'js');
const cssDir = path.join(distDir, 'css');
const targetBundles = ['motion', 'index']; // Target specific bundles to optimize

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error(chalk.red('Error: dist directory not found. Run npm run build first.'));
  process.exit(1);
}

// Ensure required directories exist
[assetsDir, jsDir, cssDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Get all JS files in the assets directory
const getJsFiles = () => {
  try {
    const files = fs.readdirSync(assetsDir);
    return files.filter(file => file.endsWith('.js'));
  } catch (error) {
    console.error(chalk.red(`Error reading assets directory: ${error.message}`));
    return [];
  }
};

// Find target bundles
const findTargetBundles = (files) => {
  const targets = [];
  
  for (const file of files) {
    for (const target of targetBundles) {
      if (file.includes(target)) {
        targets.push(file);
        break;
      }
    }
  }
  
  return targets;
};

// Optimize a JavaScript bundle
const optimizeBundle = (filename) => {
  const filePath = path.join(assetsDir, filename);
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    const originalSize = content.length;
    
    // Remove console.log statements (except error and warn)
    content = content.replace(/console\.(log|info|debug)\([^)]*\);?/g, '');
    
    // Remove unused imports (this is a simplified approach)
    content = content.replace(/import\s+[^;]+\s+from\s+(['"])([^'"]+)\1;?\s*(?![\s\S]*\2)/g, '');
    
    // Remove comments
    content = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    
    // Remove whitespace (be careful with this in production)
    content = content.replace(/\s{2,}/g, ' ');
    
    // Remove empty lines
    content = content.replace(/^\s*[\r\n]/gm, '');
    
    // Write the optimized file
    fs.writeFileSync(filePath, content, 'utf8');
    
    const newSize = content.length;
    const savings = originalSize - newSize;
    const savingsPercent = (savings / originalSize * 100).toFixed(2);
    
    console.log(chalk.green(`Optimized ${filename}:`));
    console.log(`  Original size: ${formatBytes(originalSize)}`);
    console.log(`  New size: ${formatBytes(newSize)}`);
    console.log(`  Savings: ${formatBytes(savings)} (${savingsPercent}%)`);
    
    return {
      filename,
      originalSize,
      newSize,
      savings,
      savingsPercent
    };
  } catch (error) {
    console.error(chalk.red(`Error optimizing ${filename}: ${error.message}`));
    return null;
  }
};

// Format bytes to human readable size
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Create critical CSS file
const createCriticalCss = () => {
  const criticalCssPath = path.join(cssDir, 'critical.css');
  
  try {
    // Read the main CSS file
    const mainCssFiles = fs.readdirSync(assetsDir)
      .filter(file => file.endsWith('.css'));
    
    if (mainCssFiles.length === 0) {
      console.warn(chalk.yellow('No CSS files found to optimize'));
      return;
    }
    
    const mainCssPath = path.join(assetsDir, mainCssFiles[0]);
    let content = fs.readFileSync(mainCssPath, 'utf8');
    
    // Extract critical CSS (this is a simplified approach)
    // In a real-world scenario, you'd use a more sophisticated tool
    const criticalCss = content
      .split('}')
      .filter(rule => {
        const selectors = rule.split('{')[0];
        return selectors.includes('html') || 
               selectors.includes('body') || 
               selectors.includes('#root') ||
               selectors.includes('.loading') ||
               selectors.includes('.error-container');
      })
      .join('}');
    
    // Write critical CSS file
    fs.writeFileSync(criticalCssPath, criticalCss);
    
    console.log(chalk.green('Created critical.css'));
  } catch (error) {
    console.error(chalk.red(`Error creating critical CSS: ${error.message}`));
  }
};

// Main function
const main = async () => {
  console.log(chalk.blue('Starting bundle optimization...'));
  
  // Get all JS files
  const jsFiles = getJsFiles();
  if (jsFiles.length === 0) {
    console.warn(chalk.yellow('No JavaScript files found to optimize'));
    return;
  }
  
  // Find target bundles
  const targetFiles = findTargetBundles(jsFiles);
  if (targetFiles.length === 0) {
    console.warn(chalk.yellow('No target bundles found to optimize'));
    return;
  }
  
  // Optimize each target bundle
  const results = targetFiles
    .map(optimizeBundle)
    .filter(result => result !== null);
  
  // Create critical CSS
  createCriticalCss();
  
  // Log summary
  console.log(chalk.blue('\nOptimization Summary:'));
  const totalSavings = results.reduce((sum, result) => sum + result.savings, 0);
  console.log(`Total size savings: ${formatBytes(totalSavings)}`);
};

// Run the script
main().catch(error => {
  console.error(chalk.red(`Fatal error: ${error.message}`));
  process.exit(1);
});