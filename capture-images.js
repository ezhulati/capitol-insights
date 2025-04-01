// Secure Puppeteer Image Capture Utility
// This script securely captures images from approved websites using strict validation

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Security configuration
const ALLOWED_DOMAINS = [
  'capitol-insights.com',
  'www.capitol-insights.com',
  'localhost:3000'
];

const ALLOWED_SELECTORS = [
  'img[src*="drew-campbell-thumb.jpg"]', 
  'img[src*="byron-campbell-thumb.jpg"]',
  '.team-member-image',
  '.team-grid img'
];

const ALLOWED_OUTPUT_DIRS = [
  'public/uploads/team',
  'public/uploads/blog',
  'public/images'
];

// Check if the environment has required authentication
const REQUIRE_AUTH = process.env.PUPPETEER_REQUIRE_AUTH === 'true';
const AUTH_TOKEN = process.env.PUPPETEER_AUTH_TOKEN;

/**
 * Validate a URL is from an allowed domain
 * @param {string} url - The URL to validate
 * @returns {boolean} Whether the URL is valid
 */
function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return ALLOWED_DOMAINS.some(domain => urlObj.hostname === domain);
  } catch (error) {
    console.error('Invalid URL format:', error.message);
    return false;
  }
}

/**
 * Validate a selector is in the allowed list
 * @param {string} selector - The CSS selector to validate
 * @returns {boolean} Whether the selector is valid
 */
function isValidSelector(selector) {
  return ALLOWED_SELECTORS.some(allowedSelector => 
    selector === allowedSelector || 
    selector.startsWith(allowedSelector)
  );
}

/**
 * Validate output path is in an allowed directory
 * @param {string} outputPath - The path to validate
 * @returns {boolean} Whether the path is valid
 */
function isValidOutputPath(outputPath) {
  // Normalize the path and convert to absolute
  const normalizedPath = path.normalize(outputPath);
  
  // Check if path is in an allowed directory
  return ALLOWED_OUTPUT_DIRS.some(dir => normalizedPath.startsWith(dir));
}

/**
 * Capture an image from a webpage using Puppeteer
 * @param {Object} options - Capture options
 * @param {string} options.url - The URL to navigate to
 * @param {string} options.selector - The CSS selector to capture
 * @param {string} options.outputPath - Where to save the captured image
 * @param {string} [options.authToken] - Optional authentication token
 * @returns {Promise<boolean>} Whether the capture was successful
 */
export async function captureImage({ url, selector, outputPath, authToken }) {
  // Validate inputs
  if (!url || !selector || !outputPath) {
    throw new Error('Missing required parameters: url, selector, and outputPath are required');
  }
  
  // Security validations
  if (!isValidUrl(url)) {
    throw new Error(`URL not allowed: ${url}`);
  }
  
  if (!isValidSelector(selector)) {
    throw new Error(`Selector not allowed: ${selector}`);
  }
  
  if (!isValidOutputPath(outputPath)) {
    throw new Error(`Invalid output path: ${outputPath}`);
  }
  
  // Authentication check
  if (REQUIRE_AUTH && authToken !== AUTH_TOKEN) {
    throw new Error('Authentication required');
  }
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Launch browser with security settings
  const browser = await puppeteer.launch({ 
    headless: true, // Always use headless for security
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1200,800'
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a strict Content Security Policy
    await page.setExtraHTTPHeaders({
      'Content-Security-Policy': "default-src 'self'; img-src 'self' https://*.capitol-insights.com;"
    });
    
    // Set viewport size
    await page.setViewport({ width: 1200, height: 800 });
    
    // Timeout for navigation
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Wait for selector with timeout
    await page.waitForSelector(selector, { timeout: 5000 })
      .catch(() => { throw new Error(`Timeout waiting for selector: ${selector}`); });
    
    // Get element dimensions
    const rect = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return null;
      
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }, selector);
    
    if (!rect) {
      throw new Error(`Element not found: ${selector}`);
    }
    
    // Take screenshot of the element
    await page.screenshot({ 
      path: outputPath, 
      clip: rect,
      omitBackground: true
    });
    
    console.log(`Image captured successfully: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error capturing image:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// If this file is run directly, execute the example
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Example usage
  (async () => {
    try {
      // Capture Drew Campbell's image
      await captureImage({
        url: 'https://capitol-insights.com/team/',
        selector: 'img[src*="drew-campbell-thumb.jpg"]',
        outputPath: 'public/uploads/team/drew-campbell.jpg'
      });
      
      // Capture Byron Campbell's image
      await captureImage({
        url: 'https://capitol-insights.com/team/',
        selector: 'img[src*="byron-campbell-thumb.jpg"]',
        outputPath: 'public/uploads/team/byron-campbell.jpg'
      });
      
      console.log('All images captured successfully');
    } catch (error) {
      console.error('Error in capture process:', error.message);
      process.exit(1);
    }
  })();
}
