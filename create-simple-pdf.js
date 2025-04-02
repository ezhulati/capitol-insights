const fs = require('fs');
const path = require('path');
// PDFKit is already installed
const PDFDocument = require('pdfkit');

// Create a new PDF document
const doc = new PDFDocument({
  size: 'letter',
  margin: 50,
  info: {
    Title: 'Texas Legislative Influence Guide 2025',
    Author: 'Capitol Insights',
    Creator: 'Capitol Insights PDF Generator'
  }
});

// Set the output path
const outputDir = path.join(__dirname, 'public', 'files');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'texas-legislative-influence-guide-2025.pdf');
console.log(`Creating PDF at: ${outputPath}`);

// Pipe the PDF to a file
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Add cover page
doc.fontSize(24)
   .font('Helvetica-Bold')
   .text('Texas Legislative Influence Guide 2025', {
     align: 'center'
   })
   .moveDown(1)
   .fontSize(16)
   .font('Helvetica')
   .text('Strategies for Effective Government Relations in Texas', {
     align: 'center'
   })
   .moveDown(0.5)
   .text('Capitol Insights', {
     align: 'center'
   })
   .moveDown(0.5)
   .text('2025 Edition', {
     align: 'center'
   });

// Add copyright and date at the bottom of the cover
doc.fontSize(10)
   .text('© 2025 Capitol Insights. All rights reserved.', {
     align: 'center',
     y: 700
   });

// Add content pages
doc.addPage()
   .fontSize(18)
   .font('Helvetica-Bold')
   .text('Table of Contents', {
     align: 'left'
   })
   .moveDown(1)
   .fontSize(12)
   .font('Helvetica')
   .text('1. Introduction', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('2. Understanding the Texas Legislative Process', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('3. Key Legislative Dates for 2025', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('4. Effective Advocacy Strategies', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('5. Building Relationships with Legislators', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('6. Coalition Building', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('7. Media Strategy', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('8. Engaging Stakeholders', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('9. Resources and Contacts', {
     align: 'left'
   });

// Introduction page
doc.addPage()
   .fontSize(18)
   .font('Helvetica-Bold')
   .text('1. Introduction', {
     align: 'left'
   })
   .moveDown(1)
   .fontSize(12)
   .font('Helvetica')
   .text('The Texas legislative process can be complex and challenging to navigate, especially for organizations without dedicated government affairs resources. This guide provides practical strategies and insights for effective advocacy in the Texas Legislature.', {
     align: 'left'
   })
   .moveDown(1)
   .text('With a strategic approach and proper preparation, organizations of all sizes can make their voices heard in the legislative process. Capitol Insights has compiled this guide based on years of experience working with clients across industries to achieve their government relations objectives.', {
     align: 'left'
   })
   .moveDown(1)
   .text('This guide is designed to serve as a practical resource for government affairs professionals, executives, and anyone involved in legislative advocacy in Texas.', {
     align: 'left'
   });

// Finish and end the PDF
doc.end();

console.log('PDF creation complete!');

// Log the output path for reference
console.log(`PDF saved to: ${outputPath}`);
