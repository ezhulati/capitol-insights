# Setting Up Webhooks for Sanity to Netlify

You have successfully deployed your website to Netlify with Sanity integration! The next step is to set up a webhook so that when you publish content in Sanity, your website will automatically rebuild.

## Create a Build Hook in Netlify

1. Go to your Netlify dashboard: https://app.netlify.com/sites/capitol-insights/settings/deploys#build-hooks

2. Under "Build & deploy" > "Continuous deployment" > "Build hooks", click "Add build hook"

3. Name it "Sanity CMS Trigger" and select the branch "main"

4. Click "Save" and copy the URL that Netlify generates (it will look like `https://api.netlify.com/build_hooks/12345abcde`)

## Add the Webhook in Sanity

1. Go to your Sanity project dashboard: https://www.sanity.io/manage/personal/project/[your-project-id]

2. Navigate to "API" > "Webhooks"

3. Click "Create webhook"

4. Enter the following details:
   - **Name**: Production Deploy
   - **URL**: Paste the build hook URL you copied from Netlify
   - **Dataset**: production
   - **Trigger on**: Check all three options (Create, Update, Delete)
   - **Filter**: Leave empty to trigger on all documents, or use a GROQ filter to be more selective:
     ```groq
     _type in ["post", "page", "service", "teamMember", "resource", "homeFeature"]
     ```
   - **Projection**: Leave empty
   - **HTTP method**: POST
   - **HTTP Headers**: None needed for Netlify
   - **Enable webhook**: Toggle on

5. Click "Save"

## Test the Webhook

1. Make a small change to any content in your Sanity Studio
2. Publish the change
3. Go to your Netlify dashboard and check under "Deploys" to see a new deploy starting
4. After the deploy completes, visit your website to see the updated content

## Troubleshooting

If your webhook is not triggering a build:

1. Check the Webhook delivery logs in Sanity (click on the three dots next to your webhook)
2. Ensure your Netlify build hook URL is correct
3. Try recreating the build hook in Netlify
4. Make sure you've enabled the webhook in Sanity

## Content Schedule

When planning content updates, keep in mind that each publication will trigger a new build of your site. 

For bulk content updates, consider:
1. Making all your changes in draft mode first
2. Publishing them all at once to trigger just one rebuild

This helps optimize your build minutes on Netlify and provides a better experience for your website visitors.
