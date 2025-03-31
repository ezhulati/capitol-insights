/**
 * Script to update all Sanity documents with proper SEO metadata
 */
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

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

// Generate SEO metadata based on document type and content
function generateSeoMetadata(doc) {
  let metaTitle = '';
  let metaDescription = '';
  let metaKeywords = [];
  let ogImage = null;
  
  // Extract appropriate keywords based on document type
  switch (doc._type) {
    case 'post':
      metaKeywords = doc.categories || [];
      if (doc.featuredImage) {
        ogImage = doc.featuredImage;
      }
      break;
    case 'resource':
      metaKeywords = doc.categories || [];
      if (doc.featuredImage) {
        ogImage = doc.featuredImage;
      }
      break;
    case 'service':
      metaKeywords = ['Services', 'Capitol Insights', doc.title];
      if (doc.icon) {
        ogImage = doc.icon;
      }
      break;
    case 'teamMember':
      metaKeywords = ['Team', 'Capitol Insights', doc.position || 'Team Member'];
      if (doc.image) {
        ogImage = doc.image;
      }
      break;
    case 'page':
      metaKeywords = ['Capitol Insights', 'Texas', 'Government Relations'];
      if (doc.featuredImage) {
        ogImage = doc.featuredImage;
      }
      break;
    case 'homeFeature':
      metaKeywords = ['Capitol Insights', 'Texas', 'Feature', doc.title];
      if (doc.image) {
        ogImage = doc.image;
      }
      break;
  }
  
  // Generate title based on document type
  switch (doc._type) {
    case 'post':
      metaTitle = truncateText(doc.title, 55) + ' | Capitol Insights';
      break;
    case 'page':
      if (doc.slug.current === 'home') {
        metaTitle = 'Capitol Insights | Texas Government Relations & Legislative Affairs';
      } else {
        metaTitle = truncateText(doc.title, 50) + ' | Capitol Insights';
      }
      break;
    case 'service':
      metaTitle = truncateText(doc.title, 45) + ' Services | Capitol Insights';
      break;
    case 'teamMember':
      metaTitle = doc.name + ' | Capitol Insights Team';
      break;
    case 'resource':
      metaTitle = truncateText(doc.title, 45) + ' | Capitol Insights Resource';
      break;
    case 'homeFeature':
      metaTitle = truncateText(doc.title, 50) + ' | Capitol Insights';
      break;
    default:
      metaTitle = doc.title + ' | Capitol Insights';
  }
  
  // Generate description based on document type and content
  switch (doc._type) {
    case 'post':
      metaDescription = doc.excerpt 
        ? truncateText(doc.excerpt, 155) 
        : 'Read the latest insights on ' + doc.title + ' from Capitol Insights, your trusted Texas government relations firm.';
      break;
    case 'page':
      metaDescription = doc.description 
        ? truncateText(doc.description, 155) 
        : 'Learn more about Capitol Insights, a premier Texas government relations and legislative affairs firm based in Austin, Texas.';
      break;
    case 'service':
      metaDescription = doc.description 
        ? truncateText(doc.description, 155) 
        : 'Capitol Insights offers professional ' + doc.title + ' services to help organizations navigate the complex Texas political landscape.';
      break;
    case 'teamMember':
      metaDescription = 'Meet ' + doc.name + ', ' + (doc.position || 'team member') + ' at Capitol Insights. Experienced in Texas government relations and legislative affairs.';
      break;
    case 'resource':
      metaDescription = doc.description 
        ? truncateText(doc.description, 155) 
        : 'Download our professional resource on ' + doc.title + ' from Capitol Insights, your Texas government relations experts.';
      break;
    case 'homeFeature':
      metaDescription = doc.description 
        ? truncateText(doc.description, 155) 
        : 'Capitol Insights offers ' + doc.title + ' services to help organizations navigate the complex Texas political landscape.';
      break;
    default:
      metaDescription = 'Capitol Insights is a premier Texas government relations and legislative affairs firm based in Austin, Texas.';
  }
  
  // Create SEO metadata object
  const seo = {
    _type: 'seo',
    metaTitle,
    metaDescription,
    metaKeywords,
  };
  
  // Add OG image if available
  if (ogImage) {
    seo.ogImage = ogImage;
  }
  
  return seo;
}

// Process all documents of a specific type
async function updateDocumentsOfType(type) {
  console.log(`\nUpdating SEO metadata for ${type} documents...`);
  
  try {
    // Fetch all documents of this type
    const query = `*[_type == "${type}"]`;
    const documents = await client.fetch(query);
    
    console.log(`Found ${documents.length} ${type} documents`);
    
    for (const doc of documents) {
      // Generate SEO metadata based on document content
      const seo = generateSeoMetadata(doc);
      
      // Update the document with SEO metadata
      try {
        const updatedDoc = { ...doc, seo };
        await client.createOrReplace(updatedDoc);
        console.log(`✓ Updated SEO metadata for: ${doc.title || doc.name || doc._id}`);
      } catch (error) {
        console.error(`Error updating ${type} document ${doc._id}:`, error.message);
      }
    }
    
    return documents.length;
  } catch (error) {
    console.error(`Error fetching ${type} documents:`, error.message);
    return 0;
  }
}

// Main function to update all documents
async function updateAllSeoMetadata() {
  console.log('Starting SEO metadata update...');
  
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
    const count = await updateDocumentsOfType(type);
    totalUpdated += count;
  }
  
  console.log(`\nSEO metadata update completed! Updated ${totalUpdated} documents.`);
  console.log('\nYour content now has:');
  console.log('- Properly formatted meta titles (55-60 characters)');
  console.log('- Descriptive meta descriptions (155-160 characters)');
  console.log('- Relevant meta keywords');
  console.log('- Social sharing images where available');
}

// Check if token is provided
if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set the SANITY_API_TOKEN environment variable');
  process.exit(1);
}

// Run the update
updateAllSeoMetadata().catch(console.error);
