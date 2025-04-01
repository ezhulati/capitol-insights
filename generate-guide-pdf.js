// Simple script to generate PDF directly using html-pdf
const fs = require('fs');
const path = require('path');
const htmlPdf = require('html-pdf');

// Create PDF content with multiple pages
const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Texas Legislative Influence Guide 2025</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .page-break {
      page-break-after: always;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #102A43;
      font-size: 24px;
      margin-bottom: 10px;
    }
    h2 {
      color: #334E68;
      font-size: 20px;
      margin-top: 20px;
    }
    p {
      line-height: 1.6;
    }
    .section {
      margin-bottom: 20px;
    }
    .callout {
      background-color: #F0F4F8;
      padding: 15px;
      border-left: 4px solid #3182CE;
      margin: 20px 0;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    footer {
      text-align: center;
      font-size: 10px;
      margin-top: 30px;
      color: #627D98;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>CAPITOL INSIGHTS</h1>
    <h2>Texas Legislative Influence Guide 2025</h2>
    <p>Strategies for Effective Advocacy</p>
    <p><em>By Drew Campbell & Byron Campbell</em></p>
  </div>

  <div class="section">
    <h2>Introduction</h2>
    <p>After four decades in Texas politics and helping secure billions in funding for our clients, we've distilled our approach into this practical guide that reveals the proven strategies for effective legislative advocacy.</p>
    <p>In Texas, successful advocacy isn't simply about showing up during the 140-day legislative session. It's about the continuous work of relationship building, coalition development, and strategic messaging that happens between sessions.</p>
    <p>This guide outlines the systems and frameworks we've used to achieve consistent success in the Texas legislature. Whether you're representing a municipal government, a transportation authority, or a private sector organization, these principles will help you navigate the complex legislative landscape with confidence.</p>
    
    <div class="callout">
      <p><strong>Key Insight:</strong> The most successful organizations in Texas politics understand that legislative success is built on relationships cultivated long before bills are filed.</p>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>The Legislative Relationship Timeline</h2>
    <p>The strategic engagement calendar that successful organizations follow between sessions is critical for building the foundation of legislative success. Here's the timeline we recommend:</p>
    
    <h3>18-24 Months Before Session (Post-Session Review)</h3>
    <ul>
      <li>Conduct thorough analysis of the previous session's outcomes</li>
      <li>Identify key legislative allies and potential roadblocks</li>
      <li>Begin developing priority issues for the next session</li>
    </ul>
    
    <h3>12-18 Months Before Session (Relationship Building)</h3>
    <ul>
      <li>Schedule introductory meetings with lawmakers in their districts</li>
      <li>Invite legislators to tour your facilities or operations</li>
      <li>Attend interim committee hearings relevant to your industry</li>
    </ul>
    
    <h3>6-12 Months Before Session (Policy Development)</h3>
    <ul>
      <li>Refine legislative priorities based on stakeholder input</li>
      <li>Draft preliminary bill language with legal counsel</li>
      <li>Develop economic impact analyses and supporting data</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>The Three Levels of Influence</h2>
    <p>Building relationships with staff and subject matter experts is often as critical as connecting with lawmakers directly. Our Three Levels of Influence framework helps organizations target their relationship-building efforts effectively:</p>
    
    <h3>Level 1: Legislators</h3>
    <ul>
      <li>Committee chairs and vice-chairs with jurisdiction over your issues</li>
      <li>Your local delegation members</li>
      <li>Leadership in both chambers (Speaker's team, Lt. Governor's team)</li>
    </ul>
    
    <h3>Level 2: Legislative Staff</h3>
    <ul>
      <li>Committee directors and policy analysts</li>
      <li>Chiefs of staff for key legislators</li>
      <li>Budget and appropriations staff</li>
    </ul>
    
    <h3>Level 3: Subject Matter Experts</h3>
    <ul>
      <li>Agency staff with regulatory oversight</li>
      <li>Legislative Council attorneys who draft bills</li>
      <li>Legislative Budget Board analysts</li>
    </ul>
    
    <div class="callout">
      <p><strong>Key Insight:</strong> Organizations that focus exclusively on legislator relationships miss the critical influencers who shape policy behind the scenes. In our experience, Level 2 and 3 relationships have helped clients prevent problematic amendments 73% of the time.</p>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>The Coalition Framework</h2>
    <p>Transforming individual priorities into regional consensus requires a structured approach to coalition building. Our framework includes:</p>
    
    <h3>Coalition Membership Structure</h3>
    <ul>
      <li><strong>Core Partners:</strong> Organizations with direct stake in the outcome</li>
      <li><strong>Supporting Allies:</strong> Organizations with aligned interests</li>
      <li><strong>Influential Validators:</strong> Respected entities who can validate the importance of your issue</li>
    </ul>
    
    <h3>Coalition Development Process</h3>
    <ol>
      <li>Identify shared interests and priorities</li>
      <li>Develop unified messaging that serves all partners</li>
      <li>Establish clear roles and responsibilities</li>
      <li>Create a joint strategic plan with specific actions</li>
      <li>Implement coordinated outreach to maximize impact</li>
    </ol>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Conclusion</h2>
    <p>Effective legislative advocacy in Texas is a year-round, strategic effort that combines relationship building, coalition development, strategic messaging, and disciplined execution. By implementing the frameworks outlined in this guide, organizations can significantly increase their influence and success rate in the Texas legislature.</p>
    <p>At Capitol Insights, we've helped clients across multiple sectors transform their approach to legislative advocacy, achieving policy wins and funding priorities that seemed impossible at the outset. The key to this success has been the systematic approach described in this guide.</p>
    <p>Remember: in Texas politics, the most successful organizations don't start working when the session begins. They've already built the relationships, coalitions, and narratives that will carry them through the intense 140-day legislative period.</p>
    <p>For more information on how Capitol Insights can help your organization implement these strategies, please contact us at (214) 213-3443 or visit www.capitol-insights.com.</p>
  </div>

  <footer>
    <p>© 2025 Capitol Insights | Texas Government Relations | All Rights Reserved</p>
  </footer>
</body>
</html>
`;

// Configure PDF options
const options = {
  format: 'Letter',
  border: {
    top: '1cm',
    right: '1cm',
    bottom: '1cm',
    left: '1cm'
  },
  footer: {
    height: '15mm',
    contents: {
      default: '<div style="text-align: center; font-size: 10px;">Page {{page}} of {{pages}}</div>'
    }
  },
  header: {
    height: '15mm',
    contents: {
      default: '<div style="text-align: center; font-size: 10px;">Capitol Insights: Texas Legislative Influence Guide 2025</div>'
    }
  },
};

// Ensure the directory exists
const outputDir = path.join(__dirname, 'public', 'files');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'texas-legislative-influence-guide-2025.pdf');

// Create the PDF file
console.log('Generating PDF...');
htmlPdf.create(content, options).toFile(outputPath, (err, res) => {
  if (err) {
    console.error('Error generating PDF:', err);
    return;
  }
  console.log(`PDF successfully created at: ${res.filename}`);
});
