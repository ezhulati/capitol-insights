# Content Migration Guide

This guide explains how to migrate your existing MDX content into Sanity CMS.

## Prerequisites

1. You need to be logged into the Sanity Studio
2. You need to create a Sanity API token with write permissions

## Creating a Sanity API Token

1. Log in to your Sanity project at [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project "CI"
3. Go to "API" tab
4. Click "Add API token"
5. Name your token (e.g., "Content Migration")
6. Choose "Editor" permission (needed to create content)
7. Set an expiry date (e.g., 1 day from now)
8. Click "Create"
9. Copy the token (you'll only see it once)

## Running the Migration

Once you have your API token, run the migration script:

```bash
# In the studio-ci directory
export SANITY_API_TOKEN=your_token_here
node scripts/import-content.js
```

## What Gets Migrated

The migration script will:

1. Import all posts from `content/posts/*.md` and `content/posts/*.mdx`
2. Import team members from `content/team/index.mdx` 
3. Import services from `content/services/index.mdx`
4. Import pages from various content directories including home, approach, results, and contact

## After Migration

After migration, you should:

1. Log in to Sanity Studio at http://localhost:3333
2. Verify your content has been imported correctly
3. Make any necessary adjustments to the content structure
4. Start using Sanity for content management going forward

## Troubleshooting

If you encounter any issues:

- Check the console output for error messages
- Verify your API token has the correct permissions
- Check that your content files are in the expected format and location
