# Setting Up GROQ-Powered Webhooks for Capitol Insights

This guide explains how to set up webhooks to automatically trigger your website rebuild whenever content changes in Sanity. This creates a seamless publishing workflow for your team.

## What Are Sanity Webhooks?

Webhooks are HTTP callbacks that notify your deployment platform (Netlify, Vercel, etc.) when content changes happen in Sanity. They allow you to:

- Automatically rebuild your website when content is published
- Trigger notifications in tools like Slack when important content changes
- Update external systems with new content data
- Create custom workflows for content approval

## Setting Up a Basic Deployment Webhook

### 1. Get Your Platform's Build Hook URL

#### For Netlify:
1. Go to your Netlify site dashboard
2. Navigate to **Site Settings > Build & Deploy > Build hooks**
3. Click **Add build hook**
4. Name it "Sanity Content Updates"
5. Select the branch to build (usually `main`)
6. Save and copy the generated URL (looks like `https://api.netlify.com/build_hooks/your-unique-id`)

#### For Vercel:
1. Go to your Vercel project dashboard
2. Navigate to **Settings > Git > Deploy Hooks**
3. Create a new hook with a name like "Sanity Content Updates"
4. Select the branch to deploy
5. Copy the generated URL (looks like `https://api.vercel.com/v1/hooks/your-unique-id`)

### 2. Create the Webhook in Sanity

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your Capitol Insights project
3. Navigate to **API > Webhooks**
4. Click **Create webhook**
5. Configure your webhook:
   - **Name**: `Trigger Site Rebuild`
   - **URL**: Paste your build hook URL from step 1
   - **Dataset**: `production`
   - **Trigger on**: Select all three options (Create, Update, Delete)
   - **Filter**: Leave empty to trigger on all documents, or use a specific filter (see examples below)
   - **Projection**: Leave empty (only needed for custom payloads)
   - **HTTP method**: `POST`
   - **HTTP Headers**: None needed for build hooks
   - **Enable webhook**: Toggle on

## Advanced GROQ Filters for Capitol Insights

You can use GROQ filters to make webhooks more precise. Here are some tailored examples for Capitol Insights:

### 1. Only Trigger on Published Blog Posts:

```groq
_type == "post" && !(_id in path("drafts.**"))
```

### 2. Only Trigger on Service Updates:

```groq
_type == "service"
```

### 3. Only Trigger on Team Member or Homepage Changes:

```groq
_type in ["teamMember", "page"] && slug.current == "home"
```

### 4. Only Trigger on SEO Metadata Changes:

```groq
defined(seo) && delta::changedAny(["seo.metaTitle", "seo.metaDescription", "seo.metaKeywords"])
```

### 5. Only Trigger on Featured Content:

```groq
defined(featuredImage) || _type == "homeFeature"
```

## Setting Up Custom Webhooks with Projections

For more advanced cases, you might want to send specific data to external systems:

### Example: Slack Notification for New Blog Posts

1. Create a Slack incoming webhook in your Slack workspace
2. Create a new Sanity webhook:
   - **Filter**: `_type == "post" && !(_id in path("drafts.**"))`
   - **Projection**:
     ```groq
     {
       "text": "New blog post published: " + title,
       "blocks": [
         {
           "type": "section",
           "text": {
             "type": "mrkdwn",
             "text": "*New post published:* " + title + "\n\n" + (excerpt || "")
           }
         },
         {
           "type": "section",
           "text": {
             "type": "mrkdwn",
             "text": "Published at: " + publishedAt + "\n\nView it in Sanity Studio: https://capitol-insights.sanity.studio/desk/post;" + _id
           }
         }
       ]
     }
     ```
   - **HTTP Headers**: Add a header `Content-Type` with value `application/json`

## Debugging Webhook Delivery

If your webhooks aren't triggering as expected:

1. Check the **Attempts log** by clicking the three-dot menu on your webhook
2. Look for status codes to diagnose issues:
   - 200-range: Success
   - 400-range: Client error (check your webhook configuration)
   - 429: Rate limited, will retry automatically
   - 500-range: Server error at the receiving end, will retry

## Best Practices for Capitol Insights

1. **Start with broad webhooks** and narrow them down as needed
2. **Consider splitting webhooks** for different content types if you have specialized build processes
3. **Use the drafts filter** (`!(_id in path("drafts.**"))`) to avoid unnecessary builds during content creation
4. **Monitor the attempts log** periodically to ensure webhooks are firing correctly
5. **Test webhooks** with temporary endpoints at [webhook.site](https://webhook.site) before connecting to production systems

## Webhook Performance and Limitations

- Limited to 1 concurrent request
- Requests timeout after 30 seconds
- Requests are retried for up to 30 minutes with exponential backoff
- Consider the impact on your build minutes quota if you're triggering too many builds

## Setting Up a Preview Webhook

For content previews, you can set up a separate webhook that builds a preview version of your site:

1. Create a preview deployment in your hosting platform
2. Set up a webhook that specifically targets draft documents:
   ```groq
   _id in path("drafts.**")
   ```
3. Point this webhook to a different build hook that deploys to your preview environment

This enables a workflow where:
- Draft content appears in a preview environment
- Published content triggers your main site to rebuild

With these webhooks in place, your Capitol Insights content workflow becomes fully automated, with changes appearing on your site as soon as they're published in Sanity.
