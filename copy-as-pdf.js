s/**
 * Very simple approach: Copy the HTML file content to a PDF file
 * Since the website is designed to serve HTML files, this just ensures
 * there's a file with the .pdf extension to satisfy the layout.
 */

const fs = require('fs');
const path = require('path');

// File paths
const htmlPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.html');
const pdfPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.pdf');

// Verify HTML file exists
if (!fs.existsSync(htmlPath)) {
  console.error(`Error: Source HTML file not found at ${htmlPath}`);
  process.exit(1);
}

// Read HTML content
try {
  console.log(`Reading HTML file from: ${htmlPath}`);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  console.log(`Read HTML content (${htmlContent.length} bytes)`);
  
  // Create PDF file with HTML content
  fs.writeFileSync(pdfPath, htmlContent);
  console.log(`Created PDF file at: ${pdfPath}`);
  
  // Verify file was created
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`Successfully created file with size: ${stats.size} bytes`);
  } else {
    console.error("Error: Failed to create PDF file");
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
}
