/**
 * Simple script that creates a PDF from direct HTML content
 * We're trying a more direct approach since the other methods weren't creating the file
 */

const fs = require('fs');
const path = require('path');

// Create a very simple PDF directly as binary content
function createPDF() {
  // Output path for the PDF
  const outputDir = path.join(__dirname, 'public', 'files');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'texas-legislative-influence-guide-2025.pdf');
  
  // This is a minimal PDF file structure - WARNING: This is a hack approach!
  // In a real application, you should use a proper PDF generation library
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog
   /Pages 2 0 R
>>
endobj

2 0 obj
<< /Type /Pages
   /Kids [3 0 R]
   /Count 1
>>
endobj

3 0 obj
<< /Type /Page
   /Parent 2 0 R
   /Resources << /Font << /F1 4 0 R >> >>
   /MediaBox [0 0 612 792]
   /Contents 5 0 R
>>
endobj

4 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica
>>
endobj

5 0 obj
<< /Length 157 >>
stream
BT
/F1 24 Tf
100 700 Td
(Texas Legislative Influence Guide 2025) Tj
/F1 14 Tf
0 -50 Td
(Strategies for Effective Advocacy) Tj
/F1 12 Tf
0 -30 Td
(By Drew Campbell & Byron Campbell) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000060 00000 n
0000000120 00000 n
0000000250 00000 n
0000000330 00000 n
trailer
<< /Size 6
   /Root 1 0 R
>>
startxref
540
%%EOF`;

  try {
    fs.writeFileSync(outputPath, pdfContent);
    console.log(`PDF file created at: ${outputPath}`);
    
    // Check that the file was created
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`PDF file size: ${stats.size} bytes`);
      return true;
    } else {
      console.error('PDF file was not created');
      return false;
    }
  } catch (error) {
    console.error('Error creating PDF:', error);
    return false;
  }
}

// Execute the function
createPDF();
