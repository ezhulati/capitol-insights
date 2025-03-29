/**
 * Script to fix meta descriptions in Sanity documents
 */
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Initialize Sanity client
const client = createClient({
  projectId: 'bowvx6js',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN, // Set this environment variable before running
  apiVersion: '2023-05-03',
  useCdn: false
});

// Function to truncate text to specified length without cutting words
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  const truncated = text.substring(0, maxLength).trim();
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

// Content directories
const contentDirs = {
  posts: path.join(__dirname, '../../content/posts'),
  team: path.join(__dirname, '../../content/team'),
  services: path.join(__dirname, '../../content/services'),
  home: path.join(__dirname, '../../content/home'),
  approach: path.join(__dirname, '../../content/approach'),
  results: path.join(__dirname, '../../content/results'),
  contact: path.join(__dirname, '../../content/contact'),
};

// Function to extract meta description from MDX file
function extractMetaDescriptionFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    return data.metaDescription || data.description || null;
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error.message);
    return null;
  }
}

// Process all documents of a specific type and update their meta descriptions
async function fixMetaDescriptionsForType(type) {
  console.log(`\nFixing meta descriptions for ${type} documents...`);
  
  try {
    // Fetch all documents of this type
    const query = `*[_type == "${type}" && defined(seo)]`;
    const documents = await client.fetch(query);
    
    console.log(`Found ${documents.length} ${type} documents with SEO fields`);
    
    let updated = 0;
    
    for (const doc of documents) {
      // Skip if SEO is not defined
      if (!doc.seo) {
        continue;
      }
      
      let metaDescription = null;
      
      // First, try to extract meta description from the original MDX files
      switch (type) {
        case 'post':
          if (doc.slug && doc.slug.current) {
            const filePath = path.join(contentDirs.posts, `${doc.slug.current}.mdx`);
            metaDescription = extractMetaDescriptionFromFile(filePath);
            
            // Also check .md extension
            if (!metaDescription) {
              const mdFilePath = path.join(contentDirs.posts, `${doc.slug.current}.md`);
              metaDescription = extractMetaDescriptionFromFile(mdFilePath);
            }
          }
          break;
        case 'page':
          if (doc.slug && doc.slug.current) {
            const dirPath = contentDirs[doc.slug.current];
            if (dirPath) {
              const indexPath = path.join(dirPath, 'index.mdx');
              metaDescription = extractMetaDescriptionFromFile(indexPath);
            }
          }
          break;
      }
      
      // If no meta description was found in the MDX files, generate one
      if (!metaDescription) {
        switch (type) {
          case 'post':
            metaDescription = doc.excerpt 
              ? truncateText(doc.excerpt, 155) 
              : `Read the latest insights on ${doc.title} from Capitol Insights, your Texas government relations experts. Learn about policy, legislation, and regulatory affairs.`;
            break;
          case 'page':
            metaDescription = doc.description 
              ? truncateText(doc.description, 155) 
              : `Capitol Insights provides expert Texas government relations and legislative affairs services. Learn about our ${doc.slug?.current || 'services'} for organizations across Texas.`;
            break;
          case 'service':
            metaDescription = doc.description 
              ? truncateText(doc.description, 155) 
              : `Capitol Insights offers professional ${doc.title} services to help organizations effectively navigate the complex Texas political and regulatory landscape. Contact us today.`;
            break;
          case 'teamMember':
            metaDescription = `Meet ${doc.name}, ${doc.position || 'team member'} at Capitol Insights. Experienced in Texas government relations, legislative advocacy, and regulatory affairs. Learn about our expert team.`;
            break;
          case 'resource':
            metaDescription = doc.description 
              ? truncateText(doc.description, 155) 
              : `Download our professional resource on ${doc.title} from Capitol Insights, your Texas government relations experts. Access valuable insights and analysis.`;
            break;
          case 'homeFeature':
            metaDescription = doc.description 
              ? truncateText(doc.description, 155) 
              : `Learn about ${doc.title} from Capitol Insights, Texas' premier government relations firm. We help organizations navigate the complex political landscape in Austin.`;
            break;
        }
      }
      
      // Ensure meta description is the right length
      metaDescription = metaDescription ? truncateText(metaDescription, 155) : '';
      
      // Add more specific information based on document type
      if (metaDescription && type === 'post' && doc.categories && doc.categories.length > 0) {
        const category = doc.categories[0];
        if (!metaDescription.includes(category)) {
          metaDescription = truncateText(`${metaDescription} Topics: ${doc.categories.join(', ')}.`, 155);
        }
      }
      
      // Add Capitol Insights branding if not present
      if (metaDescription && !metaDescription.includes('Capitol Insights')) {
        metaDescription = truncateText(`${metaDescription} From Capitol Insights.`, 155);
      }
      
      // Only update if the description has changed
      if (metaDescription && (!doc.seo.metaDescription || doc.seo.metaDescription !== metaDescription)) {
        try {
          // Update just the metaDescription in the seo object
          const updatedDoc = {
            ...doc,
            seo: {
              ...doc.seo,
              metaDescription
            }
          };
          
          await client.createOrReplace(updatedDoc);
          console.log(`✓ Updated meta description for: ${doc.title || doc.name || doc._id}`);
          updated++;
        } catch (error) {
          console.error(`Error updating ${type} document ${doc._id}:`, error.message);
        }
      }
    }
    
    console.log(`Updated meta descriptions for ${updated} ${type} documents`);
    return updated;
  } catch (error) {
    console.error(`Error fetching ${type} documents:`, error.message);
    return 0;
  }
}

// Main function to fix all meta descriptions
async function fixAllMetaDescriptions() {
  console.log('Starting meta description fix...');
  
  // Define document types to update
  const documentTypes = [
    'post',
    'page',
    'service',
    'teamMember',
    'resource',
    'homeFeature'
  ];
  
  let totalUpdated = 0;
  
  // Update each document type
  for (const type of documentTypes) {
    const count = await fixMetaDescriptionsForType(type);
    totalUpdated += count;
  }
  
  console.log(`\nMeta description fix completed! Updated ${totalUpdated} documents.`);
}

// Check if token is provided
if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set the SANITY_API_TOKEN environment variable');
  process.exit(1);
}

// Run the update
fixAllMetaDescriptions().catch(console.error);
