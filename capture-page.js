// Secure Puppeteer Page Capture Utility
// This script securely captures full page screenshots from approved websites

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

const ALLOWED_OUTPUT_DIRS = [
  'public/uploads/team',
  'public/uploads/blog',
  'public/images',
  'public/screenshots'
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
 * Capture a full page screenshot using Puppeteer
 * @param {Object} options - Capture options
 * @param {string} options.url - The URL to navigate to
 * @param {string} options.outputPath - Where to save the captured screenshot
 * @param {number} [options.scrollPixels] - Optional pixels to scroll down before capture
 * @param {string} [options.waitSelector] - Optional selector to wait for
 * @param {string} [options.authToken] - Optional authentication token
 * @returns {Promise<boolean>} Whether the capture was successful
 */
export async function capturePage({ url, outputPath, scrollPixels = 0, waitSelector = 'img', authToken }) {
  // Validate inputs
  if (!url || !outputPath) {
    throw new Error('Missing required parameters: url and outputPath are required');
  }
  
  // Security validations
  if (!isValidUrl(url)) {
    throw new Error(`URL not allowed: ${url}`);
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
    if (waitSelector) {
      await page.waitForSelector(waitSelector, { timeout: 5000 })
        .catch(() => console.log(`Timeout waiting for selector: ${waitSelector}`));
    }
    
    // Scroll down if needed
    if (scrollPixels > 0) {
      await page.evaluate((pixels) => {
        window.scrollBy(0, pixels);
      }, scrollPixels);
      
      // Wait a bit for scrolling to complete
      await new Promise(r => setTimeout(r, 1000));
    }
    
    // Take screenshot of the entire page
    await page.screenshot({ 
      path: outputPath,
      fullPage: true
    });
    
    console.log(`Page captured successfully: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error capturing page:', error.message);
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
      // Capture team page
      await capturePage({
        url: 'https://capitol-insights.com/team/',
        outputPath: 'public/uploads/team/team-page.png',
        scrollPixels: 500
      });
      
      console.log('Page captured successfully');
    } catch (error) {
      console.error('Error in capture process:', error.message);
      process.exit(1);
    }
  })();
}
