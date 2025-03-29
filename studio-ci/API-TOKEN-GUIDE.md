# Sanity API Token Guide

This guide explains how to create and use the appropriate API token for your Sanity content management scripts.

## Token Types

Sanity offers several types of API tokens with different permission levels:

| Token Type | Access Level | Best For |
|------------|--------------|----------|
| Viewer     | Read-only    | Public content display, read-only integrations |
| Editor     | Read & Write | Content management tools, import/export scripts |
| Write      | Write-only   | Data ingestion where reading isn't needed |
| Management | Full control | Schema changes, project settings |

## Which Token to Use for Import Scripts

For the `create-post.js` and `batch-import.js` scripts, you should use an **Editor token**. This is because:

1. The scripts need to **write** content to create new documents
2. The scripts also need to **read** existing documents to check for duplicates
3. Editor tokens provide the right balance of permissions without being overly privileged

## Creating an Editor Token

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (ID: `bowvx6js`)
3. Navigate to "API" tab in the top menu
4. Click on "Tokens" in the sidebar
5. Click the "Add API token" button
6. Enter a descriptive name (e.g., "Content Import Scripts")
7. Set the token type to **Editor**
8. Optional: Set an expiration date if this is temporary
9. Click "Create token"
10. **Important**: Copy the token immediately - you won't be able to see it again!

## Security Considerations

1. **Never commit API tokens to version control**
2. Set an expiration date for tokens if they're only needed temporarily
3. Revoke tokens when they're no longer needed
4. Consider using environment variables to store tokens securely

## Using the Token with Scripts

Set the token as an environment variable before running import scripts:

```bash
# Set the token as an environment variable
export SANITY_API_TOKEN=your-editor-token-here

# Run your import script
cd studio-ci
sanity exec scripts/batch-import.js -- --source=./data/sample-posts.json --type=post
```

For production systems, you might want to set this in a `.env` file (which should be added to `.gitignore`).

## Token Management

Periodically review your API tokens at [https://www.sanity.io/manage/project/bowvx6js/api](https://www.sanity.io/manage/project/bowvx6js/api) and revoke any that are no longer needed.
