/**
 * Script to import additional content into Sanity (briefings and homepage details)
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');

// Initialize Sanity client
const client = createClient({
  projectId: 'bowvx6js',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN, // Set this environment variable before running
  apiVersion: '2023-05-03',
  useCdn: false
});

// Content directories
const downloadsDir = path.join(__dirname, '../../public/downloads');
const homepageDir = path.join(__dirname, '../../content/home');

// Function to create a slug
function createSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Generate a document ID based on type and slug
function generateDocId(type, slug) {
  return `${type}.${slug}`;
}

// Helper function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Function to upload a file to Sanity
async function uploadFile(filePath, title = '') {
  try {
    if (!fileExists(filePath)) {
      console.log(`File not found: ${filePath}`);
      return null;
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = ext === '.pdf' ? 'application/pdf' : 
                    ext === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                    ext === '.xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                    'application/octet-stream';
    
    // Upload file to Sanity
    const asset = await client.assets.upload('file', fileBuffer, {
      filename: path.basename(filePath),
      contentType: mimeType,
      title: title || path.basename(filePath, path.extname(filePath))
    });
    
    console.log(`✓ Uploaded file: ${path.basename(filePath)}`);
    
    // Return a reference to the uploaded file
    return {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`Error uploading file ${filePath}:`, error.message);
    return null;
  }
}

// Function to upload an image to Sanity
async function uploadImage(imagePath, altText = '') {
  try {
    if (!fileExists(imagePath)) {
      console.log(`Image not found: ${imagePath}`);
      return null;
    }

    // Read image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Upload image to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      title: altText || path.basename(imagePath, path.extname(imagePath))
    });
    
    console.log(`✓ Uploaded image: ${path.basename(imagePath)}`);
    
    // Return a reference to the uploaded image
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Function to create a basic block from markdown
function markdownToBasicBlock(markdown) {
  return [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: markdown || '',
          marks: []
        }
      ]
    }
  ];
}

// Function to extract text content from HTML file
function extractContentFromHtml(filePath) {
  try {
    if (!fileExists(filePath)) {
      return { title: '', description: '', content: '' };
    }

    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract title (simple regex approach)
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' | Capitol Insights', '') : '';
    
    // Extract meta description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1] : '';
    
    // Extract body content (simplified)
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/s);
    let content = bodyMatch ? bodyMatch[1] : '';
    
    // Clean up HTML tags (simple approach)
    content = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    return { title, description, content };
  } catch (error) {
    console.error(`Error extracting content from ${filePath}:`, error.message);
    return { title: '', description: '', content: '' };
  }
}

// Import homepage features
async function importHomepageFeatures() {
  console.log('\nImporting homepage features...');
  
  if (!fs.existsSync(homepageDir)) {
    console.log('Homepage directory not found');
    return;
  }
  
  const indexPath = path.join(homepageDir, 'index.mdx');
  if (!fs.existsSync(indexPath)) {
    console.log('Homepage index file not found');
    return;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  const { data, content: markdown } = matter(content);
  
  // Check if we have a hero image
  let heroImage = null;
  const possibleHeroImagePaths = [
    path.join(__dirname, '../../public/images/hero.jpg'),
    path.join(__dirname, '../../public/images/hero-pattern.jpg'),
    path.join(__dirname, '../../public/images/capitol-background.jpg')
  ];
  
  for (const imgPath of possibleHeroImagePaths) {
    if (fileExists(imgPath)) {
      heroImage = await uploadImage(imgPath, 'Homepage Hero');
      if (heroImage) break;
    }
  }
  
  // Parse features if available
  const features = data.features || [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const slug = createSlug(feature.title || `feature-${i+1}`);
    
    let featureImage = null;
    if (feature.image && feature.image.startsWith('/')) {
      const imagePath = path.join(__dirname, '../../public', feature.image);
      featureImage = await uploadImage(imagePath, feature.title);
    }
    
    try {
      const featureDoc = {
        _id: generateDocId('homeFeature', slug),
        _type: 'homeFeature',
        title: feature.title || `Feature ${i+1}`,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: feature.description || '',
        content: markdownToBasicBlock(feature.content || ''),
        order: i + 1
      };
      
      if (featureImage) {
        featureDoc.image = featureImage;
      }
      
      // Create schema for homeFeature if it doesn't exist
      try {
        const existingTypes = await client.fetch('*[_type == "sanity.documentType"].name');
        if (!existingTypes.includes('homeFeature')) {
          await client.create({
            _id: 'homeFeature',
            _type: 'sanity.documentType',
            name: 'homeFeature',
            title: 'Home Feature',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Title'
              },
              {
                name: 'slug',
                type: 'slug',
                title: 'Slug',
                options: {
                  source: 'title'
                }
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description'
              },
              {
                name: 'content',
                type: 'array',
                title: 'Content',
                of: [{ type: 'block' }]
              },
              {
                name: 'image',
                type: 'image',
                title: 'Image'
              },
              {
                name: 'order',
                type: 'number',
                title: 'Order'
              }
            ]
          });
          console.log('✓ Created homeFeature schema');
        }
      } catch (schemaError) {
        console.error('Error creating homeFeature schema:', schemaError.message);
      }
      
      const result = await client.createOrReplace(featureDoc);
      console.log(`✓ Imported home feature: ${result.title}`);
    } catch (error) {
      console.error(`Error importing home feature ${slug}:`, error.message);
    }
  }
  
  // Also update the home page with the hero image if we have one
  if (heroImage) {
    try {
      const homePageId = generateDocId('page', 'home');
      const homePage = await client.getDocument(homePageId);
      
      if (homePage) {
        homePage.heroImage = heroImage;
        await client.createOrReplace(homePage);
        console.log('✓ Updated homepage with hero image');
      }
    } catch (error) {
      console.error('Error updating homepage with hero image:', error.message);
    }
  }
}

// Import briefings from downloads directory
async function importBriefings() {
  console.log('\nImporting briefings and resources...');
  
  if (!fs.existsSync(downloadsDir)) {
    console.log('Downloads directory not found');
    return;
  }
  
  // Create resource schema if it doesn't already exist
  try {
    // We already have a resource schema in our codebase
    console.log('Using existing resource schema');
  } catch (schemaError) {
    console.error('Error creating resource schema:', schemaError.message);
  }
  
  // Look for HTML files in the downloads directory
  const htmlFiles = fs.readdirSync(downloadsDir).filter(file => file.endsWith('.html'));
  
  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(downloadsDir, htmlFile);
    const { title, description, content } = extractContentFromHtml(htmlPath);
    
    // Generate a proper title if extraction failed
    const resourceTitle = title || htmlFile.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const slug = htmlFile.replace('.html', '');
    
    // Look for a matching PDF file
    const pdfFileName = `${slug}.pdf`;
    const pdfFilePath = path.join(downloadsDir, pdfFileName);
    
    let fileAsset = null;
    if (fileExists(pdfFilePath)) {
      fileAsset = await uploadFile(pdfFilePath, resourceTitle);
    }
    
    // Look for a matching image
    const possibleImagePaths = [
      path.join(__dirname, '../../public/uploads/resources', `${slug}.jpg`),
      path.join(__dirname, '../../public/uploads/resources', `${slug}.png`),
      path.join(__dirname, '../../public/images', `${slug}.jpg`)
    ];
    
    let featuredImage = null;
    for (const imgPath of possibleImagePaths) {
      if (fileExists(imgPath)) {
        featuredImage = await uploadImage(imgPath, resourceTitle);
        if (featuredImage) break;
      }
    }
    
    try {
      const resource = {
        _id: generateDocId('resource', slug),
        _type: 'resource',
        title: resourceTitle,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: description || content.substring(0, 150) + '...',
        requiresEmail: true,
        categories: [],
        publishedAt: new Date().toISOString()
      };
      
      // Add file if available
      if (fileAsset) {
        resource.file = fileAsset;
      }
      
      // Add image if available
      if (featuredImage) {
        resource.featuredImage = featuredImage;
      }
      
      const result = await client.createOrReplace(resource);
      console.log(`✓ Imported briefing/resource: ${result.title}`);
    } catch (error) {
      console.error(`Error importing briefing ${slug}:`, error.message);
    }
  }
}

// Run all import functions
async function importAdditionalContent() {
  try {
    console.log('Starting additional content migration...');
    await importHomepageFeatures();
    await importBriefings();
    console.log('\nAdditional content migration completed!');
  } catch (error) {
    console.error('Error importing additional content:', error);
  }
}

// Check if token is provided
if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set the SANITY_API_TOKEN environment variable');
  process.exit(1);
}

// Run the import
importAdditionalContent();
