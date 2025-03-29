# Deploying Your Sanity Integration to Production

Your local development environment is now successfully connected to Sanity CMS, but the live website at https://capitol-insights.com still shows the old content. This is because we need to deploy the changes to your production hosting platform.

## Steps to Deploy to Production

### 1. Deploy Website Code Changes

First, deploy the code changes we've made to your website:

```bash
# Assuming you're using Netlify CLI
netlify deploy --prod
```

Or if you're using another hosting platform like Vercel:

```bash
vercel --prod
```

This will upload the latest code, including:
- The Sanity client
- Content provider logic
- Updated React components

### 2. Set Up Webhook for Automatic Rebuilds

For content changes in Sanity to automatically appear on your live site, set up a webhook:

1. **Get your Netlify build hook URL**:
   - Go to your Netlify site dashboard
   - Navigate to **Site Settings > Build & Deploy > Build hooks**
   - Click **Add build hook**, name it "Sanity Content Update" and copy the URL

2. **Add the webhook in Sanity**:
   - Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Navigate to **API > Webhooks**
   - Click **Create webhook**
   - Enter the following details:
     - Name: `Production Deploy`
     - URL: Paste your Netlify build hook URL
     - Trigger on: Check all three (Create, Update, Delete)
     - Filter: Leave empty to trigger on all content changes, or use `_type == "post" || _type == "page"` to be more selective
     - Projection: Leave empty
     - HTTP method: `POST`
     - HTTP Headers: None needed for Netlify/Vercel
     - Toggle "Enabled" to on

3. **Test the webhook**:
   - Make a small change to any content in Sanity Studio
   - Publish the change
   - Monitor your Netlify/Vercel dashboard to confirm a new build is triggered

### 3. Update DNS (If Needed)

If you're migrating from a different CMS or hosting provider, ensure your domain points to the new deployment.

## Verify Production Deployment

After deploying, check these specific items:

1. Visit your live site and confirm content from Sanity is displaying
2. Verify images and media are loading correctly
3. Check SEO metadata is properly rendered in the page source
4. Test the production webhook by publishing a new content change

## Troubleshooting Production Issues

If content isn't updating on the live site after publishing in Sanity:

1. **Check webhook logs**:
   - Go to Sanity management portal
   - Navigate to **API > Webhooks**
   - Click on your webhook and check the delivery attempts

2. **Verify build logs**:
   - Check your hosting platform's build logs
   - Look for errors during the build process

3. **Content API permissions**:
   - Ensure your production environment has proper API token permissions
   - Check CORS settings in Sanity to allow your production domain

4. **Cache issues**:
   - Your hosting provider might be caching pages
   - Clear CDN caches if needed

## Production Rollback Plan

If you encounter issues with the Sanity integration in production:

1. You can temporarily revert to local content by changing:
   ```typescript
   // In src/utils/content-provider.ts
   const CONTENT_SOURCE = 'local'; // Change from 'sanity' to 'local'
   ```

2. Then redeploy the site

This gives you time to troubleshoot while keeping the site operational with your original MDX content.
