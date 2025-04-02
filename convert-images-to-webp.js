/**
 * Convert JPG images to WebP format
 * This script converts JPG images in the public/images directory to WebP format
 * and creates responsive versions for better performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the images
const imagesDir = path.join(__dirname, 'public', 'images');
const webpDir = path.join(__dirname, 'public', 'images', 'webp');

// Ensure the WebP directory exists
if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

// Process a single image file
async function processImage(imageFile) {
  // Only process .jpg files
  if (!imageFile.endsWith('.jpg')) return;
  
  const imagePath = path.join(imagesDir, imageFile);
  const baseName = path.basename(imageFile, '.jpg');
  
  // Create WebP versions with different sizes
  const sizes = [
    { width: 800, suffix: '' },
    { width: 400, suffix: '-400' },
    { width: 1200, suffix: '-1200' }
  ];
  
  console.log(`Processing: ${imageFile}`);
  
  try {
    // Create WebP versions
    for (const size of sizes) {
      const outputPath = path.join(webpDir, `${baseName}${size.suffix}.webp`);
      
      // Use Sharp to convert and resize the image
      try {
        await sharp(imagePath)
          .resize(size.width)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        const originalStats = fs.statSync(imagePath);
        const savings = originalStats.size - stats.size;
        const savingsPercent = Math.round((savings / originalStats.size) * 100);
        
        console.log(`Created ${outputPath} (${stats.size} bytes, saved ${savingsPercent}%)`);
      } catch (error) {
        console.error(`Error creating WebP version: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${imageFile}: ${error.message}`);
  }
}

// Main function
async function convertImages() {
  console.log(`Looking for JPG files in: ${imagesDir}`);
  
  try {
    // Get list of files in directory
    const files = fs.readdirSync(imagesDir);
    
    // Counter for processed files
    let processed = 0;
    
    // Process each JPG file
    for (const file of files) {
      if (file.endsWith('.jpg')) {
        await processImage(file);
        processed++;
      }
    };
    
    console.log(`Completed processing ${processed} files`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the conversion
convertImages().catch(error => {
  console.error(`Error in conversion process: ${error.message}`);
});