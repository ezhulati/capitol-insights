/**
 * This script creates a PDF directly in the output location by working with the filesystem
 * and absolute paths to ensure we can trace exactly where the file is being created.
 */

const fs = require('fs');
const path = require('path');

function createDirectPDF() {
  // Get absolute paths for clarity
  const currentDir = __dirname;
  console.log(`Current directory: ${currentDir}`);
  
  // Target directory - using absolute path
  const targetDir = path.resolve(currentDir, 'public', 'files');
  console.log(`Target directory: ${targetDir}`);
  
  // Check if target directory exists
  if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  } else {
    console.log(`Directory already exists: ${targetDir}`);
  }
  
  // Target file
  const targetFile = path.resolve(targetDir, 'texas-legislative-influence-guide-2025.pdf');
  console.log(`Target file: ${targetFile}`);
  
  // Create a minimal valid PDF file
  const minimalPDF = Buffer.from(
    '%PDF-1.4\n' +
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
    '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
    '3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\n' +
    'xref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000053 00000 n\n0000000102 00000 n\n' +
    'trailer<</Size 4/Root 1 0 R>>\n' +
    'startxref\n176\n%%EOF'
  );
  
  try {
    // Directly write the buffer to the file
    fs.writeFileSync(targetFile, minimalPDF);
    
    // Verify the file was created
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      console.log(`Successfully created PDF file. Size: ${stats.size} bytes`);
      console.log(`Absolute path: ${targetFile}`);
      
      // List directory contents to confirm
      console.log('\nDirectory contents:');
      fs.readdirSync(targetDir).forEach(file => {
        console.log(`- ${file}`);
      });
      
      return true;
    } else {
      console.error('File not created despite no error');
      return false;
    }
  } catch (error) {
    console.error(`Error creating PDF: ${error.message}`);
    console.error(error.stack);
    return false;
  }
}

// Execute the function
createDirectPDF();
