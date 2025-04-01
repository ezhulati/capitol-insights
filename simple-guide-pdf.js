/**
 * Simple script to generate a PDF from HTML using the html-pdf package
 */

const htmlPdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

// File paths
const htmlPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.html');
const pdfPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.pdf');

// PDF generation options
const pdfOptions = {
  format: 'Letter',
  border: {
    top: '0.5in',
    right: '0.5in',
    bottom: '0.5in',
    left: '0.5in'
  },
  header: {
    height: '15mm',
    contents: '<div style="text-align: center; font-size: 10px; color: #666;">Capitol Insights: Texas Legislative Influence Guide 2025</div>'
  },
  footer: {
    height: '15mm',
    contents: {
      default: '<div style="text-align: center; font-size: 10px; color: #666;">Page {{page}} of {{pages}}</div>'
    }
  },
  base: `file://${__dirname}/public/`
};

// Check if HTML file exists
if (!fs.existsSync(htmlPath)) {
  console.error(`Error: HTML file not found at ${htmlPath}`);
  process.exit(1);
}

console.log(`Reading HTML from: ${htmlPath}`);

// Read the HTML file
fs.readFile(htmlPath, 'utf8', (err, html) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    return;
  }
  
  console.log(`HTML file read, length: ${html.length} bytes`);
  
  // Add style to hide print buttons
  const htmlWithStyles = html.replace('</head>', 
    `<style>
      .print-container {
        display: none !important;
      }
      h2 {
        page-break-before: always;
      }
      h2:first-of-type {
        page-break-before: avoid;
      }
      p {
        page-break-inside: avoid;
      }
      .callout {
        page-break-inside: avoid;
      }
    </style>
    </head>`
  );
  
  console.log('Creating PDF...');
  
  // Create PDF
  htmlPdf.create(htmlWithStyles, pdfOptions).toFile(pdfPath, (err, res) => {
    if (err) {
      console.error('Error creating PDF:', err);
      return;
    }
    
    console.log(`PDF successfully created at: ${res.filename}`);
    console.log(`File size: ${fs.statSync(res.filename).size} bytes`);
  });
});
