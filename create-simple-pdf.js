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
   .text('Strategies for Effective Advocacy', {
     align: 'center'
   })
   .moveDown(1)
   .fontSize(12)
   .text('By Drew Campbell & Byron Campbell', {
     align: 'center'
   })
   .moveDown(3)
   .text('© 2025 Capitol Insights', {
     align: 'center'
   })
   .moveDown(0.5)
   .text('Texas Government Relations', {
     align: 'center'
   });

// Add footer with page number
doc.fontSize(10)
   .text('Page 1 of 5', {
     align: 'center',
     y: 700
   });

// Add second page
doc.addPage()
   .fontSize(18)
   .font('Helvetica-Bold')
   .text('Introduction', {
     align: 'left'
   })
   .moveDown(1)
   .fontSize(12)
   .font('Helvetica')
   .text('After four decades in Texas politics and helping secure billions in funding for our clients, we\'ve distilled our approach into this practical guide that reveals the proven strategies for effective legislative advocacy.', {
     align: 'left'
   })
   .moveDown(0.5)
   .text('In Texas, successful advocacy isn\'t simply about showing up during the 140-day legislative session. It\'s about the continuous work of relationship building, coalition development, and strategic messaging that happens between sessions.', {
     align: 'left'
   })
   .moveDown(2)
   .fontSize(16)
   .font('Helvetica-Bold')
   .text('Key Insight:', {
     align: 'left'
   })
   .fontSize(12)
   .font('Helvetica')
   .text('The most successful organizations in Texas politics understand that legislative success is built on relationships cultivated long before bills are filed.', {
     align: 'left'
   });

// Add footer with page number
doc.fontSize(10)
   .text('Page 2 of 5', {
     align: 'center',
     y: 700
   });

// Add third page
doc.addPage()
   .fontSize(18)
   .font('Helvetica-Bold')
   .text('The Legislative Relationship Timeline', {
     align: 'left'
   })
   .moveDown(1)
   .fontSize(12)
   .font('Helvetica')
   .text('The strategic engagement calendar that successful organizations follow between sessions is critical for building the foundation of legislative success. Here\'s the timeline we recommend:', {
     align: 'left'
   })
   .moveDown(1)
   .fontSize(14)
   .font('Helvetica-Bold')
   .text('18-24 Months Before Session (Post-Session Review)', {
     align: 'left'
   })
   .moveDown(0.5)
   .fontSize(12)
   .font('Helvetica')
   .text('• Conduct thorough analysis of the previous session\'s outcomes', {
     align: 'left'
   })
   .text('• Identify key legislative allies and potential roadblocks', {
     align: 'left'
   })
   .text('• Begin developing priority issues for the next session', {
     align: 'left'
   });

// Add fourth and fifth pages similarly
doc.addPage();

// Finalize the PDF
doc.end();

stream.on('finish', function() {
  console.log(`PDF successfully created at ${outputPath}`);
  
  // Check that the file exists
  fs.access(outputPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`PDF file was not created: ${err.message}`);
    } else {
      const stats = fs.statSync(outputPath);
      console.log(`PDF file size: ${stats.size} bytes`);
    }
  });
});

stream.on('error', function(err) {
  console.error('Error writing PDF file:', err);
});
