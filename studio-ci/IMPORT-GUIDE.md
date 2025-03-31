# How to Import Your Content into Sanity

Good news! I've prepared all your existing content for Sanity. The content has been extracted from your MDX files and converted into Sanity-compatible JSON files.

## Content Extracted

Successfully extracted:
- 7 blog posts
- 2 team members
- 8 services
- 4 pages

## Where to Find the Prepared Content

All content is in JSON format in the `studio-ci/import-data` directory, organized by content type:
- `post-*.json` - Blog posts
- `teamMember-*.json` - Team member profiles
- `service-*.json` - Service offerings
- `page-*.json` - Website pages

## How to Import into Sanity

There are two ways to use this content:

### Method 1: Manual Entry (Recommended)

1. Open the JSON files in the `import-data` directory to view your content
2. Log in to Sanity Studio at http://localhost:3333
3. Create new content items using the Sanity interface, copying over the content from the JSON files

### Method 2: Import Using Sanity CLI (Advanced)

If you're comfortable with the command line:

1. Install the Sanity CLI globally (if not already installed):
   ```
   npm install -g @sanity/cli
   ```

2. Log in to Sanity:
   ```
   sanity login
   ```

3. Navigate to your studio-ci directory and run:
   ```
   sanity dataset import ./import-data/post-*.json production --replace
   sanity dataset import ./import-data/teamMember-*.json production --replace
   sanity dataset import ./import-data/service-*.json production --replace
   sanity dataset import ./import-data/page-*.json production --replace
   ```

## What's Next?

After importing your content:

1. Verify everything looks correct in the Sanity Studio
2. Make any necessary adjustments or enhancements
3. Start using Sanity for content management going forward

The Sanity Studio gives you a structured editing environment for all your content, making it easier to maintain consistency and quality.
