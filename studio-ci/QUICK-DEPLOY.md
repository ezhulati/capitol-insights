# Quick Deployment Guide for Sanity Studio

I've prepared the Sanity Studio for deployment. You have multiple options for hosting:

## Option 1: Deploy to Netlify (Fastest Method)

1. **Your Studio is already built and ready to deploy**

2. **Deploy to Netlify with drag-and-drop:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Simply drag and drop the `studio-ci/dist` folder from your file explorer
   - Wait for upload to complete
   - Your Studio will be instantly deployed with a Netlify URL
   - You can later connect a custom domain if needed

3. **After deployment:**
   - Set up CORS origins in Sanity management:
     * Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
     * Select project "CI"
     * Navigate to API > CORS origins
     * Add your website's domain
     * Include your Netlify URL

## Option 2: Deploy to GitHub Pages

1. **Create a GitHub repository for your Studio**

2. **Initialize Git and push:**
   ```bash
   cd studio-ci
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

3. **Set up GitHub Pages:**
   - Go to your repo settings
   - Navigate to Pages
   - Set source to GitHub Actions
   - Create a workflow that publishes the `dist` folder

## Option 3: Use Sanity's Hosted Service

This requires interactive login, which we were attempting. For this option:
   ```bash
   cd studio-ci
   sanity deploy
   ```
And follow the interactive prompts.

## Connecting Your Website to Sanity

1. **The Sanity client is already set up in your project:**
   - `src/utils/sanityClient.ts` contains the configured client
   - This includes query functions for all your content types

2. **Update your React components to use Sanity data:**
   - Follow the guide in `studio-ci/INTEGRATE-WITH-WEBSITE.md`
   - Install dependencies: `npm install @sanity/client @portabletext/react`

3. **Set up webhooks for automated rebuilds:**
   - In the Sanity management console
   - Navigate to API > Webhooks
   - Add a webhook pointing to your hosting platform's build URL

Your Sanity Studio is ready to be deployed, and your website code is ready to connect to Sanity!
