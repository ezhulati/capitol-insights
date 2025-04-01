import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Add type definitions for jsPDF extensions
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    previousAutoTable?: { finalY: number };
  }
}

// Type guard for safer access to internal methods
function hasGetCurrentPageInfo(obj: any): obj is { getCurrentPageInfo: () => { pageNumber: number } } {
  return obj && typeof obj.getCurrentPageInfo === 'function';
}

function hasGetNumberOfPages(obj: any): obj is { getNumberOfPages: () => number } {
  return obj && typeof obj.getNumberOfPages === 'function';
}

interface PDFContent {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  sections: PDFSection[];
  footerText?: string;
}

interface PDFSection {
  heading: string;
  content: string | string[];
  subsections?: PDFSubsection[];
}

interface PDFSubsection {
  heading: string;
  content: string | string[];
}

// Colors
const COLORS = {
  navy: [16, 42, 67],       // #102A43
  gold: [170, 136, 67],     // #AA8843
  lightBlue: [72, 101, 129], // #486581
  darkGray: [51, 51, 51],    // #333333
  mediumGray: [98, 125, 152], // #627D98
  lightGray: [245, 247, 250] // #F5F7FA
};

export const generatePDF = (content: PDFContent): Blob => {
  // Create new PDF document (letter size)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter' // 8.5 x 11 inches (612 x 792 points)
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - (margin * 2);
  
  // Set document properties
  doc.setProperties({
    title: content.title,
    subject: content.subtitle,
    author: content.author,
    creator: 'Capitol Insights'
  });
  
  // Helper to check if we need a new page
  const ensureSpace = (requiredSpace: number): boolean => {
    try {
      // Type guard to ensure method exists
      if (hasGetCurrentPageInfo(doc.internal)) {
        if (doc.internal.getCurrentPageInfo().pageNumber === 0) {
          return false; // First page, no need to add a page
        }
        
        const currentY = doc.internal.getCurrentPageInfo().pageNumber === 1 
          ? doc.previousAutoTable?.finalY || margin 
          : doc.previousAutoTable?.finalY || margin;
        
        if (currentY + requiredSpace > pageHeight - margin) {
          doc.addPage();
          return true;
        }
        return false;
      } else {
        // Fallback if method isn't available
        doc.addPage();
        return true;
      }
    } catch (error) {
      // Fallback if any errors occur
      doc.addPage();
      return true;
    }
  };
  
  // Add Cover Page
  const addCoverPage = () => {
    // Draw a rectangle header
    doc.setFillColor(COLORS.lightGray[0], COLORS.lightGray[1], COLORS.lightGray[2]);
    doc.rect(0, 0, pageWidth, 120, 'F');
    
    // Add the Capitol Insights logo area
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 50, contentWidth, 40, 2, 2, 'F');
    
    // Add Logo Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(COLORS.navy[0], COLORS.navy[1], COLORS.navy[2]);
    doc.text('CAPITOL INSIGHTS', pageWidth / 2, 77, { align: 'center' });
    
    // Add Title
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.navy[0], COLORS.navy[1], COLORS.navy[2]);
    
    // Split title if needed
    const titleLines = doc.splitTextToSize(content.title, contentWidth);
    doc.text(titleLines, pageWidth / 2, 230, { align: 'center' });
    
    // Add Subtitle
    doc.setFontSize(22);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.lightBlue[0], COLORS.lightBlue[1], COLORS.lightBlue[2]);
    doc.text(content.subtitle, pageWidth / 2, 230 + (titleLines.length * 40), { align: 'center' });
    
    // Add gold line
    doc.setDrawColor(COLORS.gold[0], COLORS.gold[1], COLORS.gold[2]);
    doc.setLineWidth(3);
    doc.line(150, 300, pageWidth - 150, 300);
    
    // Add Author and Date
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.darkGray[0], COLORS.darkGray[1], COLORS.darkGray[2]);
    doc.text(`By: ${content.author}`, pageWidth / 2, 350, { align: 'center' });
    doc.text(`${content.date}`, pageWidth / 2, 370, { align: 'center' });
    
    // Add footer information
    doc.setFontSize(12);
    doc.setTextColor(COLORS.mediumGray[0], COLORS.mediumGray[1], COLORS.mediumGray[2]);
    doc.text('Government Relations & Strategic Communications', pageWidth / 2, pageHeight - 90, { align: 'center' });
    doc.text('1305 Congress Avenue, Austin, TX 78701', pageWidth / 2, pageHeight - 70, { align: 'center' });
    doc.text('www.capitol-insights.com', pageWidth / 2, pageHeight - 50, { align: 'center' });
    
    // Add copyright
    doc.setFontSize(10);
    doc.text(`© ${new Date().getFullYear()} Capitol Insights. All Rights Reserved.`, pageWidth / 2, pageHeight - 30, { align: 'center' });
  };
  
  // Add footer to all pages except the cover
  const addFooter = (pageNumber: number, totalPages: number) => {
    if (pageNumber === 1) return; // Skip cover page
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    
    // Add page numbers
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 20, { align: 'right' });
    
    // Add copyright
    doc.text(`© ${new Date().getFullYear()} Capitol Insights`, margin, pageHeight - 20);
    
    // Add footer line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 30, pageWidth - margin, pageHeight - 30);
  };
  
  // Add Table of Contents
  const addTableOfContents = () => {
    // Add a new page for TOC
    doc.addPage();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(COLORS.navy[0], COLORS.navy[1], COLORS.navy[2]);
    doc.text('TABLE OF CONTENTS', margin, margin + 20);
    
    // Add gold line under the TOC title
    doc.setDrawColor(COLORS.gold[0], COLORS.gold[1], COLORS.gold[2]);
    doc.setLineWidth(1);
    doc.line(margin, margin + 30, margin + 200, margin + 30);
    
    let y = margin + 60;
    const lineHeight = 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(COLORS.darkGray[0], COLORS.darkGray[1], COLORS.darkGray[2]);
    
    // Add sections to TOC
    content.sections.forEach((section, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${section.heading}`, margin, y);
      // Add dot leaders and page number (placeholder since we don't know the page numbers yet)
      y += lineHeight;
      
      // Add subsections to TOC if they exist
      if (section.subsections) {
        doc.setFont('helvetica', 'normal');
        section.subsections.forEach((subsection, subIndex) => {
          doc.text(`    ${index + 1}.${subIndex + 1} ${subsection.heading}`, margin, y);
          y += lineHeight;
        });
      }
    });
  };
  
  // Add content sections
  const addContentSections = () => {
    // Start on a new page after TOC
    doc.addPage();
    
    content.sections.forEach((section, sectionIndex) => {
      // Check if we need a new page for this section
      if (sectionIndex > 0) {
        ensureSpace(100); // Minimum space needed for a section heading
      }
      
      // Section heading
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(COLORS.navy[0], COLORS.navy[1], COLORS.navy[2]);
      const sectionTitle = `${sectionIndex + 1}. ${section.heading}`;
      
      const currentY = doc.previousAutoTable?.finalY || margin;
      doc.text(sectionTitle, margin, currentY + 30);
      
      // Add gold line under section heading
      doc.setDrawColor(COLORS.gold[0], COLORS.gold[1], COLORS.gold[2]);
      doc.setLineWidth(1);
      doc.line(margin, currentY + 40, margin + 200, currentY + 40);
      
      // Format section content
      let sectionContent: string[];
      if (Array.isArray(section.content)) {
        sectionContent = section.content;
      } else {
        sectionContent = doc.splitTextToSize(section.content, contentWidth);
      }
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(COLORS.darkGray[0], COLORS.darkGray[1], COLORS.darkGray[2]);
      
      // Add section content as a table
      doc.autoTable({
        startY: currentY + 60,
        theme: 'plain',
        styles: {
          fontSize: 12,
          cellPadding: { top: 5, right: 10, bottom: 5, left: 10 },
          lineColor: [240, 240, 240]
        },
        body: sectionContent.map(paragraph => [paragraph]),
        columnStyles: {
          0: { cellWidth: contentWidth }
        },
        margin: { left: margin, right: margin },
          didDrawPage: (_data: any) => {
            // Add header/footer on each page
            try {
              if (hasGetNumberOfPages(doc.internal)) {
                addFooter(doc.internal.getNumberOfPages(), content.sections.length + 2); // +2 for cover and TOC
              } else {
                // Fallback if method isn't available
                addFooter(1, content.sections.length + 2);
              }
            } catch (error) {
              // Fallback to page 1 if error
              addFooter(1, content.sections.length + 2);
            }
          }
      });
      
      // Add subsections if they exist
      if (section.subsections) {
        section.subsections.forEach((subsection, subIndex) => {
          ensureSpace(80); // Minimum space needed for a subsection heading
          
          // Subsection heading
          const subY = doc.previousAutoTable?.finalY || (currentY + 60 + (sectionContent.length * 20));
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          doc.setTextColor(COLORS.lightBlue[0], COLORS.lightBlue[1], COLORS.lightBlue[2]);
          doc.text(`${sectionIndex + 1}.${subIndex + 1} ${subsection.heading}`, margin, subY + 20);
          
          // Format subsection content
          let subsectionContent: string[];
          if (Array.isArray(subsection.content)) {
            subsectionContent = subsection.content;
          } else {
            subsectionContent = doc.splitTextToSize(subsection.content, contentWidth);
          }
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(12);
          doc.setTextColor(COLORS.darkGray[0], COLORS.darkGray[1], COLORS.darkGray[2]);
          
          // Add subsection content as a table
          doc.autoTable({
            startY: subY + 30,
            theme: 'plain',
            styles: {
              fontSize: 12,
              cellPadding: { top: 5, right: 10, bottom: 5, left: 10 },
              lineColor: [240, 240, 240]
            },
            body: subsectionContent.map(paragraph => [paragraph]),
            columnStyles: {
              0: { cellWidth: contentWidth }
            },
            margin: { left: margin, right: margin },
            didDrawPage: (_data: any) => {
              // Add header/footer on each page
              try {
                if (hasGetNumberOfPages(doc.internal)) {
                  addFooter(doc.internal.getNumberOfPages(), content.sections.length + 2);
                } else {
                  // Fallback if method isn't available
                  addFooter(1, content.sections.length + 2);
                }
              } catch (error) {
                // Fallback to page 1 if error
                addFooter(1, content.sections.length + 2);
              }
            }
          });
        });
      }
    });
  };
  
  // Generate the entire PDF
  addCoverPage();
  addTableOfContents();
  addContentSections();
  
  // Return the PDF as a blob
  return doc.output('blob');
};
