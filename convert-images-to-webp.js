const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories to process
const directories = [
  './public/images',
  './src/assets/images'
];

// Function to convert an image to WebP
async function convertToWebP(filePath) {
  try {
    const fileInfo = path.parse(filePath);
    
    // Only process JPG, JPEG, and PNG files
    if (!['.jpg', '.jpeg', '.png'].includes(fileInfo.ext.toLowerCase())) {
      return;
    }
    
    const webpPath = path.join(fileInfo.dir, `${fileInfo.name}.webp`);
    
    // Check if WebP version already exists
    if (fs.existsSync(webpPath)) {
      console.log(`WebP version already exists for ${filePath}`);
      return;
    }
    
    console.log(`Converting ${filePath} to WebP...`);
    
    // Convert to WebP with 80% quality (good balance between quality and file size)
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`Converted ${filePath} to WebP. Size reduction: ${savings}% (${(originalSize/1024).toFixed(2)}KB → ${(webpSize/1024).toFixed(2)}KB)`);
  } catch (error) {
    console.error(`Error converting ${filePath} to WebP:`, error);
  }
}

// Function to process a directory
async function processDirectory(directory) {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      console.log(`Directory ${directory} does not exist. Skipping.`);
      return;
    }
    
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(filePath);
      } else {
        await convertToWebP(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Main function
async function main() {
  console.log('Starting image conversion to WebP...');
  
  for (const directory of directories) {
    await processDirectory(directory);
  }
  
  console.log('Image conversion complete!');
}

// Run the script
main().catch(console.error);