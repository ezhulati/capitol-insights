/**
 * Create PDF versions of all HTML documents
 * This script creates PDF versions of all HTML files in the public/files directory
 * The PDFs are copies of the HTML content, allowing both formats to be offered
 */

const fs = require('fs');
const path = require('path');

// Directory containing the HTML files
const filesDir = path.join(__dirname, 'public', 'files');

// Process a single HTML file to create PDF version
function processHtmlFile(htmlFile) {
  // Only process .html files
  if (!htmlFile.endsWith('.html')) return;
  
  // Skip files that already have .pdf.html endings
  if (htmlFile.endsWith('.pdf.html')) return;
  
  const htmlPath = path.join(filesDir, htmlFile);
  // Create PDF file path (change extension from .html to .pdf)
  const pdfPath = path.join(filesDir, htmlFile.replace('.html', '.pdf'));
  
  console.log(`Processing: ${htmlFile}`);
  
  try {
    // Read HTML content
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Write content to PDF file
    fs.writeFileSync(pdfPath, htmlContent);
    
    const stats = fs.statSync(pdfPath);
    console.log(`Created ${pdfPath} (${stats.size} bytes)`);
  } catch (error) {
    console.error(`Error processing ${htmlFile}: ${error.message}`);
  }
}

// Main function
function generatePdfs() {
  console.log(`Looking for HTML files in: ${filesDir}`);
  
  try {
    // Get list of files in directory
    const files = fs.readdirSync(filesDir);
    
    // Counter for processed files
    let processed = 0;
    
    // Process each HTML file
    files.forEach(file => {
      if (file.endsWith('.html')) {
        processHtmlFile(file);
        processed++;
      }
    });
    
    console.log(`Completed processing ${processed} files`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the generation
generatePdfs();
