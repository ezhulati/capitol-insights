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
const targetBundles = ['motion', 'index']; // Target specific bundles to optimize

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error(chalk.red('Error: dist directory not found. Run npm run build first.'));
  process.exit(1);
}

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
    
    // Simple optimization: Remove console.log statements
    content = content.replace(/console\.log\([^)]*\);?/g, '');
    
    // Remove unused imports (this is a simplified approach)
    // In a real-world scenario, you'd use a more sophisticated tool like tree-shaking
    content = content.replace(/import\s+[^;]+\s+from\s+(['"])([^'"]+)\1;?\s*(?![\s\S]*\2)/g, '');
    
    // Remove comments
    content = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    
    // Remove whitespace (be careful with this in production)
    content = content.replace(/\s{2,}/g, ' ');
    
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

// Format bytes to human-readable format
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Create a critical CSS file
const createCriticalCss = () => {
  try {
    // Find the main CSS file
    const cssFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.css'));
    if (cssFiles.length === 0) {
      console.error(chalk.red('No CSS files found in assets directory.'));
      return;
    }
    
    const mainCssFile = cssFiles.find(file => file.includes('index')) || cssFiles[0];
    const mainCssPath = path.join(assetsDir, mainCssFile);
    
    // Read the CSS file
    const css = fs.readFileSync(mainCssPath, 'utf8');
    
    // Extract critical CSS (simplified approach)
    // In a real-world scenario, you'd use a tool like critical or penthouse
    const criticalSelectors = [
      'body', 'html', 'header', 'nav', 'main', 'h1', 'h2', 'h3',
      '.container', '.bg-capitol', '.bg-texture', '.text-navy',
      '.text-gold', '.font-display', '.font-sans'
    ];
    
    let criticalCss = '';
    
    // Very simple extraction (not recommended for production)
    for (const selector of criticalSelectors) {
      const regex = new RegExp(`${selector}[^{]*{[^}]*}`, 'g');
      const matches = css.match(regex);
      
      if (matches) {
        criticalCss += matches.join('\n') + '\n';
      }
    }
    
    // Write critical CSS to public directory
    const criticalCssPath = path.join(distDir, 'critical.css');
    fs.writeFileSync(criticalCssPath, criticalCss, 'utf8');
    
    console.log(chalk.green('Created critical CSS:'));
    console.log(`  File: ${criticalCssPath}`);
    console.log(`  Size: ${formatBytes(criticalCss.length)}`);
    
    // Update index.html to include critical CSS inline
    const indexHtmlPath = path.join(distDir, 'index.html');
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Add critical CSS inline
    indexHtml = indexHtml.replace('</head>', `<style>${criticalCss}</style></head>`);
    
    // Update the main CSS link to load asynchronously
    indexHtml = indexHtml.replace(
      `<link rel="stylesheet" href="/assets/${mainCssFile}">`,
      `<link rel="stylesheet" href="/assets/${mainCssFile}" media="print" onload="this.media='all'">`
    );
    
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log(chalk.green('Updated index.html with inline critical CSS and async loading.'));
    
  } catch (error) {
    console.error(chalk.red(`Error creating critical CSS: ${error.message}`));
  }
};

// Main function
const main = async () => {
  console.log(chalk.blue('Starting JavaScript bundle optimization...'));
  
  // Get all JS files
  const jsFiles = getJsFiles();
  console.log(`Found ${jsFiles.length} JavaScript files in assets directory.`);
  
  // Find target bundles
  const targetFiles = findTargetBundles(jsFiles);
  console.log(`Found ${targetFiles.length} target bundles to optimize.`);
  
  // Optimize each target bundle
  const results = [];
  for (const file of targetFiles) {
    const result = optimizeBundle(file);
    if (result) {
      results.push(result);
    }
  }
  
  // Create critical CSS
  console.log(chalk.blue('\nCreating critical CSS...'));
  createCriticalCss();
  
  // Summary
  console.log(chalk.blue('\nOptimization Summary:'));
  let totalSavings = 0;
  for (const result of results) {
    totalSavings += result.savings;
  }
  console.log(`Total savings: ${formatBytes(totalSavings)}`);
  console.log(chalk.green('Bundle optimization complete!'));
};

// Run the main function
main().catch(error => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
});