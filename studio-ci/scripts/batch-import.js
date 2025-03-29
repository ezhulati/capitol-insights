/**
 * Batch Import Tool for Sanity CMS
 * 
 * This script imports multiple posts and other content types from JSON files into Sanity CMS.
 * 
 * Usage:
 * sanity exec scripts/batch-import.js -- --source=./data/posts.json --type=post
 * 
 * Options:
 * --source: Path to the JSON file containing the data (required)
 * --type: Content type to import (post, page, teamMember, etc.) (required)
 * --dataset: Sanity dataset to import to (default: production)
 * --replace: Whether to replace existing documents (default: false)
 */

import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    acc[key] = value || true;
  }
  return acc;
}, {});

// Check required arguments
if (!args.source || !args.type) {
  console.error('Error: --source and --type are required');
  console.log('Usage: sanity exec scripts/batch-import.js -- --source=./data/posts.json --type=post');
  process.exit(1);
}

// Configure Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'bowvx6js',
  dataset: args.dataset || process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2023-03-01',
  token: process.env.SANITY_API_TOKEN, // Needed to write to dataset
  useCdn: false,
});

// Read the source file
let sourceData;
try {
  const sourcePath = path.resolve(process.cwd(), args.source);
  const fileContent = fs.readFileSync(sourcePath, 'utf8');
  sourceData = JSON.parse(fileContent);
  
  if (!Array.isArray(sourceData)) {
    sourceData = [sourceData]; // Convert to array if it's a single object
  }
} catch (error) {
  console.error(`Error reading source file: ${error.message}`);
  process.exit(1);
}

console.log(`Found ${sourceData.length} items to import as type "${args.type}"`);

// Transform data based on content type
function transformData(item, type) {
  switch (type) {
    case 'post':
      return transformPost(item);
    case 'page':
      return transformPage(item);
    case 'teamMember':
      return transformTeamMember(item);
    default:
      console.warn(`Unknown content type "${type}", importing as-is`);
      return { ...item, _type: type };
  }
}

// Transform post data
function transformPost(post) {
  const slug = post.slug?.current || 
               post._sys?.basename || 
               slugify(post.title, { lower: true, strict: true });
  
  // Convert content to Portable Text if it's a string
  let bodyContent = post.body;
  if (typeof bodyContent === 'string') {
    bodyContent = [
      {
        _type: 'block',
        _key: nanoid(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: nanoid(),
            text: bodyContent,
            marks: [],
          },
        ],
      },
    ];
  }
  
  return {
    _type: 'post',
    title: post.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    publishedAt: post.date || post.publishedAt || new Date().toISOString(),
    excerpt: post.excerpt || (typeof post.body === 'string' ? `${post.body.substring(0, 155)}...` : ''),
    body: bodyContent || [],
    // Skip image references as they need to be uploaded manually first
    // featuredImage will need to be added manually in Sanity Studio
    seo: {
      _type: 'seo',
      metaTitle: post.seo?.metaTitle || post.title,
      metaDescription: post.seo?.metaDescription || post.excerpt || '',
      metaKeywords: post.seo?.metaKeywords || post.tags || [],
    },
    featured: post.featured || false,
    author: post.author || '',
    authorTitle: post.authorTitle || '',
    readTime: post.readTime || '5 min read',
    category: post.category || '',
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

// Transform page data
function transformPage(page) {
  const slug = page.slug?.current || 
               page._sys?.basename || 
               slugify(page.title, { lower: true, strict: true });
  
  // Convert content to Portable Text if it's a string
  let bodyContent = page.body;
  if (typeof bodyContent === 'string') {
    bodyContent = [
      {
        _type: 'block',
        _key: nanoid(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: nanoid(),
            text: bodyContent,
            marks: [],
          },
        ],
      },
    ];
  }
  
  return {
    _type: 'page',
    title: page.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    body: bodyContent || [],
    seo: {
      _type: 'seo',
      metaTitle: page.seo?.metaTitle || page.title,
      metaDescription: page.seo?.metaDescription || '',
      metaKeywords: page.seo?.metaKeywords || [],
    },
  };
}

// Transform team member data
function transformTeamMember(member) {
  const slug = member.slug?.current || 
               member._sys?.basename || 
               slugify(member.name, { lower: true, strict: true });
  
  return {
    _type: 'teamMember',
    name: member.name,
    title: member.title || member.position,
    slug: {
      _type: 'slug',
      current: slug,
    },
    bio: member.bio,
    photo: member.photo || member.image ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: `image-${(member.photo || member.image).split('/').pop().replace(/\.\w+$/, '')}-${Math.floor(Math.random() * 1000)}x${Math.floor(Math.random() * 1000)}-jpg`,
      },
    } : undefined,
    email: member.email,
    phone: member.phone,
    order: member.order || 0,
  };
}

// Import data to Sanity
async function importData() {
  // Check if documents already exist
  if (args.replace !== 'true' && args.replace !== true) {
    const existingDocs = await client.fetch(
      `*[_type == $type]._id`,
      { type: args.type }
    );
    
    if (existingDocs.length > 0) {
      console.warn(`Found ${existingDocs.length} existing documents of type "${args.type}"`);
      console.warn('Use --replace=true to replace existing documents');
      
      const shouldContinue = await new Promise(resolve => {
        process.stdout.write('Continue without replacing? (y/n) ');
        process.stdin.once('data', data => {
          const input = data.toString().trim().toLowerCase();
          resolve(input === 'y' || input === 'yes');
        });
      });
      
      if (!shouldContinue) {
        console.log('Import cancelled');
        process.exit(0);
      }
    }
  } else if (args.replace === 'true' || args.replace === true) {
    // Delete existing documents
    console.log(`Deleting existing documents of type "${args.type}"...`);
    const deleted = await client.delete({
      query: `*[_type == $type]`,
      params: { type: args.type }
    });
    console.log(`Deleted ${deleted.results.length} documents`);
  }
  
  // Transform and import each item
  const transaction = client.transaction();
  
  for (const item of sourceData) {
    const transformedData = transformData(item, args.type);
    transaction.create(transformedData);
  }
  
  try {
    const result = await transaction.commit();
    console.log(`Successfully imported ${result.results.length} ${args.type} documents`);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData();
