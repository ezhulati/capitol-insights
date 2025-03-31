import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for PDF output
const outputDir = path.join(__dirname, 'public', 'files');

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// PDF resources to regenerate - all of them
const resources = [
  {
    filename: 'texas-legislative-calendar-2025.pdf',
    title: 'Texas Legislative Calendar 2025',
    subtitle: '89th Texas Legislative Session',
    description: 'Comprehensive guide to the 89th Texas Legislative Session with important deadlines, committee meeting schedules, and key dates.'
  },
  {
    filename: 'texas-legislative-influence-guide-2025.pdf',
    title: 'Texas Legislative Advocacy Guide',
    subtitle: '2025 Session Edition',
    description: 'A comprehensive guide to effective advocacy during the Texas legislative session, including strategies, best practices, and key contacts.'
  },
  {
    filename: 'texas-transportation-funding-outlook.pdf',
    title: 'Texas Transportation Funding Outlook',
    subtitle: 'Fiscal Analysis & Projections',
    description: 'Analysis of transportation funding trends, legislative priorities, and future funding projections for Texas infrastructure.'
  },
  {
    filename: 'telecommunications-regulatory-outlook.pdf',
    title: 'Telecommunications Regulatory Outlook',
    subtitle: 'Policy & Industry Trends',
    description: 'Overview of upcoming regulatory changes, legislative priorities, and industry trends affecting telecommunications in Texas.'
  },
  {
    filename: 'healthcare-regulatory-changes.pdf',
    title: 'Healthcare Regulatory Changes Impact Analysis',
    subtitle: 'Provider & Patient Implications',
    description: 'Analysis of recent and upcoming healthcare regulatory changes and their potential impact on providers and patients in Texas.'
  },
  {
    filename: 'municipal-advocacy-strategies.pdf',
    title: 'Municipal Advocacy Strategies',
    subtitle: 'Local Government Guide',
    description: 'Effective advocacy strategies for cities and local governments to advance their legislative priorities in the Texas Legislature.'
  },
  {
    filename: 'water-infrastructure-funding.pdf',
    title: 'Water Infrastructure Funding Guide',
    subtitle: 'Financing & Grant Programs',
    description: 'Comprehensive guide to funding opportunities for water infrastructure projects in Texas, including state and federal programs.'
  },
  {
    filename: 'energy-grid-reliability.pdf',
    title: 'Energy Grid Reliability Assessment',
    subtitle: 'Policy Recommendations',
    description: 'Analysis of Texas energy grid reliability, regulatory framework, and policy recommendations for improving resilience.'
  }
];

try {
  console.log('Starting enhanced PDF generation...');
  
  for (const resource of resources) {
    const pdfFilePath = path.join(outputDir, resource.filename);
    console.log(`Generating enhanced PDF for: ${resource.title}`);
    
    try {
      // Use magick instead of convert for ImageMagick 7
      execSync(`
        magick -size 612x792 xc:white \
        -fill "#f5f5f5" -draw "rectangle 0,0 612,120" \
        \
        -gravity north -pointsize 36 -font Helvetica-Bold -fill "#102A43" -annotate +0+180 "${resource.title}" \
        -gravity north -pointsize 24 -font Helvetica -fill "#486581" -annotate +0+230 "${resource.subtitle}" \
        \
        -fill "#102A43" -draw "rectangle 150,280 462,284" \
        \
        -gravity north -pointsize 16 -font Helvetica -fill "#333333" -annotate +0+340 "${resource.description}" \
        \
        -gravity north -pointsize 20 -font Helvetica-Bold -fill "#102A43" -annotate +0+100 "CAPITOL INSIGHTS" \
        \
        -gravity southeast -pointsize 12 -font Helvetica -fill "#627D98" -annotate +30+30 "© 2025 Capitol Insights. All Rights Reserved." \
        -gravity southwest -pointsize 12 -font Helvetica -fill "#627D98" -annotate +30+30 "www.capitol-insights.com" \
        \
        -gravity north -pointsize 14 -font Helvetica -fill "#555555" -annotate +0+720 "Government Relations & Strategic Communications" \
        "${pdfFilePath}"
      `);
      console.log(`✓ Generated: ${pdfFilePath}`);
    } catch (error) {
      console.error(`Error generating PDF for ${resource.title}:`, error.message);
      
      // Fallback to simpler PDF with magick command
      try {
        execSync(`
          magick -size 612x792 xc:white \
          -gravity center \
          -pointsize 28 -font Helvetica-Bold -fill "#102A43" -annotate +0-250 "${resource.title}" \
          -pointsize 18 -font Helvetica -fill "#486581" -annotate +0-180 "${resource.subtitle}" \
          -pointsize 14 -fill "#333333" -annotate +0-80 "${resource.description}" \
          -pointsize 12 -fill "#627D98" -annotate +0+300 "© 2025 Capitol Insights. All Rights Reserved." \
          "${pdfFilePath}"
        `);
        console.log(`✓ Generated simplified PDF (fallback): ${pdfFilePath}`);
      } catch (fallbackError) {
        console.error(`Fallback PDF generation failed:`, fallbackError.message);
      }
    }
  }
  
  console.log('Enhanced PDF generation completed successfully!');
} catch (error) {
  console.error('Error in PDF generation process:', error.message);
  process.exit(1);
}
