const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  // Create the public/files directory if it doesn't exist
  const outputDir = path.join(__dirname, 'public', 'files');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new', // Use the new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set the viewport to a common paper size (A4)
    await page.setViewport({
      width: 794, // ~8.5in at 96dpi
      height: 1123, // ~11in at 96dpi
    });

    // Print current directory and list files to debug path issues
    console.log(`Current directory: ${__dirname}`);
    console.log('Files in public directory:');
    console.log(fs.readdirSync(path.join(__dirname, 'public')).join('\n'));
    console.log('Files in public/files directory:');
    if (fs.existsSync(path.join(__dirname, 'public', 'files'))) {
      console.log(fs.readdirSync(path.join(__dirname, 'public', 'files')).join('\n'));
    } else {
      console.log('public/files directory does not exist');
    }

    // Get the HTML content from the file
    const htmlPath = path.join(__dirname, 'public', 'files', 'texas-legislative-influence-guide-2025.html');
    
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file does not exist at path: ${htmlPath}`);
    }
    
    console.log(`Reading HTML file from: ${htmlPath}`);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Add styles to optimize for PDF
    await page.addStyleTag({
      content: `
        @page {
          margin: 1cm;
          size: letter;
        }
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0 0 20px 0;
        }
        /* Hide the print buttons for the PDF */
        .print-container {
          display: none !important;
        }
      `
    });

    console.log('Generating PDF...');
    console.log(`HTML file exists: ${fs.existsSync(htmlPath)}`);
    console.log(`HTML file path: ${htmlPath}`);
    
    // Generate PDF with proper settings
    const pdfPath = path.join(outputDir, 'texas-legislative-influence-guide-2025.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Capitol Insights: Texas Legislative Influence Guide 2025</div>',
      footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      preferCSSPageSize: true
    });

    console.log(`PDF successfully created at ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF().catch(console.error);
