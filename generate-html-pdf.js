/**
 * This script generates a PDF version of the HTML guide
 * It uses puppeteer to render the HTML with proper formatting
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  console.log('Starting PDF generation...');
  
  // Define file paths
  const htmlFilePath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.html');
  const pdfOutputPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.pdf');
  
  console.log(`HTML source: ${htmlFilePath}`);
  console.log(`PDF destination: ${pdfOutputPath}`);
  
  // Verify HTML file exists
  if (!fs.existsSync(htmlFilePath)) {
    console.error(`ERROR: HTML file does not exist at ${htmlFilePath}`);
    return;
  }
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport to a standard paper size
    await page.setViewport({
      width: 794, // Letter width at 96 DPI
      height: 1123, // Letter height at 96 DPI
      deviceScaleFactor: 2, // Higher resolution
    });
    
    // Get HTML content
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    console.log(`Read HTML file - length: ${htmlContent.length} bytes`);
    
    // Load the HTML
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Add print-specific styles
    await page.addStyleTag({
      content: `
        @page {
          margin: 0.5in;
          size: letter;
        }
        
        /* Hide print buttons in PDF */
        .print-container {
          display: none !important;
        }
        
        /* Improve page breaks */
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
      `
    });
    
    // Generate PDF
    console.log('Generating PDF...');
    await page.pdf({
      path: pdfOutputPath,
      format: 'Letter',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 8px; width: 100%; text-align: center; color: #666;">Capitol Insights: Texas Legislative Influence Guide 2025</div>',
      footerTemplate: '<div style="font-size: 8px; width: 100%; text-align: center; color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: {
        top: '0.6in',
        right: '0.5in',
        bottom: '0.6in',
        left: '0.5in'
      }
    });
    
    // Check if PDF was created successfully
    if (fs.existsSync(pdfOutputPath)) {
      const stats = fs.statSync(pdfOutputPath);
      console.log(`Success! PDF created: ${pdfOutputPath} (${stats.size} bytes)`);
    } else {
      console.error('ERROR: PDF was not created');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF()
  .then(() => console.log('PDF generation completed'))
  .catch(err => console.error('PDF generation failed:', err));
