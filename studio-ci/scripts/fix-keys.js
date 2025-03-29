/**
 * Fix Missing Keys in Sanity Documents
 * 
 * This script fixes missing _key properties in arrays within Sanity documents.
 * It's particularly useful for fixing content imported via API that didn't include keys.
 * 
 * Usage:
 * sanity exec scripts/fix-keys.js -- --type=post
 */

import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    acc[key] = value || true;
  }
  return acc;
}, {});

// Check required arguments
if (!args.type) {
  console.error('Error: --type is required (e.g. post, page, etc.)');
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

// Function to add keys to arrays recursively
function ensureKeysExist(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => {
      // If item is an object and doesn't have a _key, add one
      if (item && typeof item === 'object' && !Array.isArray(item) && !item._key) {
        return { ...ensureKeysExist(item), _key: nanoid() };
      } 
      return ensureKeysExist(item);
    });
  }

  // Handle objects (recursively process all properties)
  const result = { ...obj };
  for (const key in result) {
    result[key] = ensureKeysExist(result[key]);
  }
  return result;
}

// Main function to fix keys in documents
async function fixKeys() {
  try {
    // Fetch all documents of the specified type
    const documents = await client.fetch(
      `*[_type == $type]`,
      { type: args.type }
    );

    console.log(`Found ${documents.length} ${args.type} documents to process`);

    // Process documents to ensure all arrays have keys
    let updatedCount = 0;
    let transaction = client.transaction();

    for (const doc of documents) {
      const originalDoc = { ...doc };
      const processedDoc = ensureKeysExist(doc);
      
      // Only update if changes were made
      if (JSON.stringify(originalDoc) !== JSON.stringify(processedDoc)) {
        transaction.patch(doc._id, { set: processedDoc });
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      console.log(`Updating ${updatedCount} documents with missing keys...`);
      const result = await transaction.commit();
      console.log(`Successfully updated ${result.results.length} documents`);
    } else {
      console.log('No documents needed key fixes');
    }
  } catch (error) {
    console.error('Error fixing keys:', error);
    process.exit(1);
  }
}

// Run the fix keys function
fixKeys();
