const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Ensure the directory exists
const outputDir = path.join(__dirname, 'public', 'files');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a PDF document
const doc = new PDFDocument({
  size: 'letter', 
  margins: {
    top: 50,
    bottom: 50,
    left: 72,
    right: 72
  },
  info: {
    Title: 'Texas Legislative Influence Guide 2025',
    Author: 'Capitol Insights',
    Subject: 'Strategies for Effective Advocacy',
    Keywords: 'Texas, Legislature, Advocacy, Government Relations',
    Creator: 'Capitol Insights'
  }
});

// Pipe the PDF output to a file
const outputPath = path.join(outputDir, 'texas-legislative-influence-guide-2025.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Define some styles
const colors = {
  primary: '#102A43',
  secondary: '#334E68',
  accent: '#0284C7',
  light: '#F0F4F8',
  text: '#334E68'
};

// Helper function to draw page headers/footers
function addPageNumberAndHeader(doc, pageNum, totalPages) {
  // Header
  doc.fontSize(10)
     .fillColor(colors.secondary)
     .text('Capitol Insights: Texas Legislative Influence Guide 2025', 
           72, 20, { align: 'center', width: doc.page.width - 144 });
  
  // Footer with page number
  doc.fontSize(10)
     .fillColor(colors.secondary)
     .text(`Page ${pageNum} of ${totalPages}`, 
           72, doc.page.height - 40, 
           { align: 'center', width: doc.page.width - 144 });
}

// Helper function to create a callout box
function drawCallout(doc, text, options = {}) {
  const x = options.x || 72;
  const y = options.y || doc.y;
  const width = options.width || doc.page.width - 144;
  
  // Calculate height based on text
  const textHeight = doc.heightOfString(text, {
    width: width - 20,
    align: 'left'
  });
  
  // Draw background and border
  doc.fillColor(colors.light)
     .roundedRect(x, y, width, textHeight + 20, 5)
     .fill()
     .strokeColor(colors.accent)
     .lineWidth(3)
     .roundedRect(x, y, 3, textHeight + 20, 0)
     .stroke();
  
  // Add text
  doc.fillColor(colors.text)
     .text(text, x + 15, y + 10, {
       width: width - 20,
       align: 'left'
     });
  
  // Return new Y position
  return y + textHeight + 30;
}

// Cover Page
doc.font('Helvetica-Bold')
   .fontSize(24)
   .fillColor(colors.primary)
   .text('CAPITOL INSIGHTS', { align: 'center' })
   .moveDown(0.5)
   .fontSize(20)
   .text('Texas Legislative Influence Guide 2025', { align: 'center' })
   .moveDown(0.5)
   .fontSize(16)
   .fillColor(colors.secondary)
   .text('Strategies for Effective Advocacy', { align: 'center' })
   .moveDown(0.5)
   .fontSize(12)
   .font('Helvetica-Oblique')
   .text('By Drew Campbell & Byron Campbell', { align: 'center' });

// Add company logo placeholder
doc.moveDown(2)
   .font('Helvetica-Bold')
   .fontSize(12)
   .fillColor(colors.primary)
   .text('© 2025 Capitol Insights', { align: 'center' })
   .moveDown(0.5)
   .fontSize(10)
   .font('Helvetica')
   .text('Texas Government Relations', { align: 'center' });

// Add first page page numbers
addPageNumberAndHeader(doc, 1, 5);

// Add a page break after the cover page
doc.addPage();

// Page 2: Introduction
addPageNumberAndHeader(doc, 2, 5);

doc.font('Helvetica-Bold')
   .fontSize(18)
   .fillColor(colors.primary)
   .text('Introduction')
   .moveDown(1);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text)
   .text('After four decades in Texas politics and helping secure billions in funding for our clients, we\'ve distilled our approach into this practical guide that reveals the proven strategies for effective legislative advocacy.')
   .moveDown(0.5)
   .text('In Texas, successful advocacy isn\'t simply about showing up during the 140-day legislative session. It\'s about the continuous work of relationship building, coalition development, and strategic messaging that happens between sessions.')
   .moveDown(0.5)
   .text('This guide outlines the systems and frameworks we\'ve used to achieve consistent success in the Texas legislature. Whether you\'re representing a municipal government, a transportation authority, or a private sector organization, these principles will help you navigate the complex legislative landscape with confidence.')
   .moveDown(1);

// Add a callout box
doc.y = drawCallout(doc, 'Key Insight: The most successful organizations in Texas politics understand that legislative success is built on relationships cultivated long before bills are filed.', { y: doc.y });

doc.moveDown(1);

// Page 3: The Legislative Timeline
doc.addPage();
addPageNumberAndHeader(doc, 3, 5);

doc.font('Helvetica-Bold')
   .fontSize(18)
   .fillColor(colors.primary)
   .text('The Legislative Relationship Timeline')
   .moveDown(1);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text)
   .text('The strategic engagement calendar that successful organizations follow between sessions is critical for building the foundation of legislative success. Here\'s the timeline we recommend:')
   .moveDown(1);

// Subsection 1
doc.font('Helvetica-Bold')
   .fontSize(14)
   .fillColor(colors.secondary)
   .text('18-24 Months Before Session (Post-Session Review)')
   .moveDown(0.5);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text);

// Bullet points
const bulletPoints1 = [
  'Conduct thorough analysis of the previous session\'s outcomes',
  'Identify key legislative allies and potential roadblocks',
  'Begin developing priority issues for the next session'
];

bulletPoints1.forEach(point => {
  doc.moveDown(0.2)
     .text(`• ${point}`);
});

doc.moveDown(1);

// Subsection 2
doc.font('Helvetica-Bold')
   .fontSize(14)
   .fillColor(colors.secondary)
   .text('12-18 Months Before Session (Relationship Building)')
   .moveDown(0.5);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text);

// Bullet points
const bulletPoints2 = [
  'Schedule introductory meetings with lawmakers in their districts',
  'Invite legislators to tour your facilities or operations',
  'Attend interim committee hearings relevant to your industry'
];

bulletPoints2.forEach(point => {
  doc.moveDown(0.2)
     .text(`• ${point}`);
});

// Page 4: Three Levels of Influence
doc.addPage();
addPageNumberAndHeader(doc, 4, 5);

doc.font('Helvetica-Bold')
   .fontSize(18)
   .fillColor(colors.primary)
   .text('The Three Levels of Influence')
   .moveDown(1);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text)
   .text('Building relationships with staff and subject matter experts is often as critical as connecting with lawmakers directly. Our Three Levels of Influence framework helps organizations target their relationship-building efforts effectively:')
   .moveDown(1);

// Level 1
doc.font('Helvetica-Bold')
   .fontSize(14)
   .fillColor(colors.secondary)
   .text('Level 1: Legislators')
   .moveDown(0.5);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text);

const level1Points = [
  'Committee chairs and vice-chairs with jurisdiction over your issues',
  'Your local delegation members',
  'Leadership in both chambers (Speaker\'s team, Lt. Governor\'s team)'
];

level1Points.forEach(point => {
  doc.moveDown(0.2)
     .text(`• ${point}`);
});

doc.moveDown(1);

// Level 2
doc.font('Helvetica-Bold')
   .fontSize(14)
   .fillColor(colors.secondary)
   .text('Level 2: Legislative Staff')
   .moveDown(0.5);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text);

const level2Points = [
  'Committee directors and policy analysts',
  'Chiefs of staff for key legislators',
  'Budget and appropriations staff'
];

level2Points.forEach(point => {
  doc.moveDown(0.2)
     .text(`• ${point}`);
});

// Add a callout box
doc.moveDown(1);
doc.y = drawCallout(doc, 'Key Insight: Organizations that focus exclusively on legislator relationships miss the critical influencers who shape policy behind the scenes. In our experience, Level 2 and 3 relationships have helped clients prevent problematic amendments 73% of the time.', { y: doc.y });

// Page 5: Conclusion
doc.addPage();
addPageNumberAndHeader(doc, 5, 5);

doc.font('Helvetica-Bold')
   .fontSize(18)
   .fillColor(colors.primary)
   .text('Conclusion')
   .moveDown(1);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text)
   .text('Effective legislative advocacy in Texas is a year-round, strategic effort that combines relationship building, coalition development, strategic messaging, and disciplined execution. By implementing the frameworks outlined in this guide, organizations can significantly increase their influence and success rate in the Texas legislature.')
   .moveDown(0.5)
   .text('At Capitol Insights, we\'ve helped clients across multiple sectors transform their approach to legislative advocacy, achieving policy wins and funding priorities that seemed impossible at the outset. The key to this success has been the systematic approach described in this guide.')
   .moveDown(0.5)
   .text('Remember: in Texas politics, the most successful organizations don\'t start working when the session begins. They\'ve already built the relationships, coalitions, and narratives that will carry them through the intense 140-day legislative period.')
   .moveDown(1);

// Add contact information
doc.font('Helvetica-Bold')
   .fontSize(12)
   .fillColor(colors.primary)
   .text('For more information:')
   .moveDown(0.5);

doc.font('Helvetica')
   .fontSize(12)
   .fillColor(colors.text)
   .text('Capitol Insights')
   .text('Texas Government Relations')
   .text('(214) 213-3443')
   .moveDown(0.5)
   .fillColor(colors.accent)
   .text('www.capitol-insights.com');

// Finalize the PDF and end the stream
doc.end();

console.log(`PDF created at: ${outputPath}`);
