# Capitol Insights Sanity CMS

This repository contains a complete Sanity CMS setup for Capitol Insights, providing a structured content management system with full SEO optimization.

## Getting Started

### Running the Studio Locally

```bash
cd studio-ci
npm install
npm run dev
```

The Studio will be available at http://localhost:3333

### Content Structure

The CMS includes schemas for:

- Blog Posts
- Team Members
- Services
- Resources/Policy Briefings
- Pages (Home, Approach, Results, Contact)
- Home Page Features

Each content type includes full SEO metadata fields including meta title, meta description, keywords, and Open Graph images.

## Documentation

The following guides are available to help you work with the CMS:

1. [INTEGRATE-WITH-WEBSITE.md](./INTEGRATE-WITH-WEBSITE.md) - Instructions for connecting your website to Sanity
2. [DEPLOY-STUDIO.md](./DEPLOY-STUDIO.md) - How to deploy the Sanity Studio
3. [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) - Fast deployment options
4. [WEBHOOKS-GUIDE.md](./WEBHOOKS-GUIDE.md) - Setting up GROQ-powered webhooks
5. [README-MIGRATION.md](./README-MIGRATION.md) - How content was migrated from MDX

## Scripts

The `scripts` directory contains utilities for:

- `import-content.js` - Import content from MDX files
- `fix-meta-descriptions.js` - Update SEO meta descriptions
- `update-seo-metadata.js` - Add SEO fields to all content
- `prepare-import.js` - Prepare content for import

## Deployment

To deploy the Studio, you have several options:

1. **Sanity.io hosting**:
   ```bash
   sanity deploy
   ```

2. **Netlify**: 
   Build the studio and upload the `dist` folder or connect your repository.
   ```bash
   npm run build
   ```

3. **Vercel**:
   Use the included `vercel.json` configuration.

## Environment Variables

When deploying, you'll need:

- `SANITY_API_TOKEN` - For content migration scripts

## Webhooks

Set up webhooks to automatically rebuild your site when content changes using GROQ filters for precise control. See [WEBHOOKS-GUIDE.md](./WEBHOOKS-GUIDE.md) for details.

## SEO Implementation

All content includes a complete SEO structure:

- Meta titles (55-60 characters)
- Meta descriptions (155-160 characters)
- Keywords
- Open Graph images

## Content Editing Tips

1. **Preview before publishing**: Use the "Preview" button in the Studio to see how content will look
2. **Images**: Add proper alt text to all images
3. **SEO**: Always fill out SEO fields for optimal search presence

## License

Private - Copyright © 2025 Capitol Insights
