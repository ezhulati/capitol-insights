# Using Sanity Import Scripts

This guide covers how to use the import scripts to populate your Sanity Studio with content.

## Prerequisites

Before using these scripts, install the required dependencies:

```bash
# Make the script executable
chmod +x scripts/install-dependencies.sh

# Run the installation script
./scripts/install-dependencies.sh
```

This will install the necessary packages (`@sanity/client`, `nanoid`, and `slugify`) needed for the scripts to work.

## Authentication

The scripts require a Sanity API token with write permissions:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to API > Tokens
4. Click "Add API token"
5. Give it a name (e.g., "Content Import")
6. Select "Editor" or "Write" permissions
7. Copy the generated token

Set the token as an environment variable before running the scripts:

```bash
export SANITY_API_TOKEN=your-token-here
```

## Creating a Single Post

Use the `create-post.js` script to create individual posts:

```bash
cd studio-ci
sanity exec scripts/create-post.js -- --title="Post Title" --content="Post content..." --image="/uploads/path/to/image.jpg"
```

### Parameters:

- `--title`: Post title (required)
- `--content`: Main content of the post
- `--excerpt`: Brief summary (will be generated from content if not provided)
- `--image`: Path to featured image
- `--categories`: Comma-separated list of categories
- `--tags`: Comma-separated list of tags
- `--metaTitle`: SEO title (defaults to post title)
- `--metaDescription`: SEO description (defaults to excerpt)
- `--keywords`: Comma-separated SEO keywords

## Batch Importing Content

For importing multiple items at once, use the `batch-import.js` script with a JSON data file:

```bash
cd studio-ci
sanity exec scripts/batch-import.js -- --source=./data/sample-posts.json --type=post
```

### Parameters:

- `--source`: Path to the JSON file (required)
- `--type`: Content type to import (post, page, teamMember, etc.) (required)
- `--dataset`: Sanity dataset (defaults to "production")
- `--replace`: Set to "true" to replace existing documents (defaults to "false")

## Sample Data Format

The `data/sample-posts.json` file contains example posts to help you get started. The structure looks like:

```json
[
  {
    "title": "Post Title",
    "excerpt": "Brief summary...",
    "date": "2024-10-15T12:00:00.000Z",
    "author": "Author Name",
    "authorTitle": "Author Position",
    "readTime": "5 min read",
    "category": "Category Name",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "featured": true,
    "image": "/path/to/image.jpg",
    "body": "Full markdown content..."
  },
  {
    // Additional posts...
  }
]
```

## Creating Your Own Import Data

You can create your own JSON files following the sample format. For different content types, adjust the structure according to the schema:

### For Pages:

```json
[
  {
    "title": "About Us",
    "slug": "about",
    "body": "Page content...",
    "seo": {
      "metaTitle": "About Our Company",
      "metaDescription": "Learn about our company history and mission."
    }
  }
]
```

### For Team Members:

```json
[
  {
    "name": "John Doe",
    "title": "CEO",
    "bio": "John has over 20 years of experience...",
    "photo": "/uploads/team/john-doe.jpg",
    "email": "john@example.com",
    "order": 1
  }
]
```

## Troubleshooting

### Common Issues:

1. **Authentication Errors**: Make sure your SANITY_API_TOKEN environment variable is set correctly and hasn't expired.

2. **Missing Dependencies**: If you see module not found errors, run the install-dependencies.sh script again.

3. **Schema Mismatch**: If fields don't match your schema, you'll need to modify the transform functions in the scripts to match your specific Sanity schema.

4. **Rate Limiting**: If importing large amounts of data, you might hit API rate limits. In this case, split your data into smaller batches.

5. **Image References**: The current scripts create mock image references. For proper image handling, you'll need to use Sanity's asset API to upload images first.

## Next Steps

After importing content into Sanity:

1. Visit your Sanity Studio to verify the imported content
2. Run your Netlify build to deploy the updated content to your website
3. Set up webhooks (see WEBHOOKS-GUIDE.md) to automatically update your site when content changes
