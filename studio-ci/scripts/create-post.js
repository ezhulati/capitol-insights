/**
 * Create a new post in Sanity
 * 
 * Usage:
 * sanity exec scripts/create-post.js -- --title="Post Title" --content="Post content..." --image="/uploads/path/to/image.jpg"
 */

import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

// Configure Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'bowvx6js',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2023-03-01',
  token: process.env.SANITY_API_TOKEN, // Needed to write to dataset
  useCdn: false,
});

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    acc[key] = value || true;
  }
  return acc;
}, {});

// Check required arguments
if (!args.title) {
  console.error('Error: --title is required');
  process.exit(1);
}

// Prepare post data
const postData = {
  _type: 'post',
  title: args.title,
  slug: {
    _type: 'slug',
    current: slugify(args.title, { lower: true, strict: true }),
  },
  publishedAt: new Date().toISOString(),
  excerpt: args.excerpt || `${args.content?.substring(0, 155)}...` || `Summary of ${args.title}`,
  body: [
    {
      _type: 'block',
      _key: nanoid(),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: nanoid(),
          text: args.content || 'Post content will go here.',
          marks: [],
        },
      ],
    },
  ],
};

// Add featured image if provided
if (args.image) {
  // This assumes the image already exists in Sanity
  // For new images, you would need to use the assets API to upload
  postData.featuredImage = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: `image-${args.image.split('/').pop().replace(/\.\w+$/, '')}-${Math.floor(Math.random() * 1000)}x${Math.floor(Math.random() * 1000)}-jpg`, // Mock reference
    },
  };
}

// Add SEO metadata
postData.seo = {
  _type: 'seo',
  metaTitle: args.metaTitle || args.title,
  metaDescription: args.metaDescription || args.excerpt || `${args.content?.substring(0, 155)}...`,
  metaKeywords: args.keywords?.split(',') || [],
};

// Add categories if provided
if (args.categories) {
  postData.categories = args.categories.split(',').map(category => ({
    _type: 'reference',
    _key: nanoid(),
    _ref: `category-${slugify(category.trim(), { lower: true, strict: true })}`,
  }));
}

// Save the post to Sanity
async function createPost() {
  try {
    const result = await client.create(postData);
    console.log(`Post created successfully with ID: ${result._id}`);
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    process.exit(1);
  }
}

createPost();
