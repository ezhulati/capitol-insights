# Deploying Your Sanity Studio

Currently, you're running Sanity Studio locally at `http://localhost:3333`. To make it accessible to content editors from anywhere, you need to deploy it to a hosted environment.

## Option 1: Deploy to Sanity's Hosted Service (Recommended)

Sanity offers free hosting for your Studio with your account.

### Steps to Deploy:

1. **Install Sanity CLI globally** (if not already installed):
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login to Sanity** (if not already logged in):
   ```bash
   sanity login
   ```

3. **Navigate to your studio directory**:
   ```bash
   cd studio-ci
   ```

4. **Deploy your studio**:
   ```bash
   sanity deploy
   ```

5. **Choose a hostname** when prompted:
   - This will be your studio's URL: `https://[your-hostname].sanity.studio`
   - For example: `capitol-insights.sanity.studio`

That's it! Your Studio will be deployed to `https://[your-hostname].sanity.studio`.

### Whenever you make schema changes:

1. Update your schemas in the studio-ci directory
2. Run `sanity deploy` again to update the hosted version

## Option 2: Deploy to Netlify or Vercel

You can also deploy Sanity Studio to platforms like Netlify or Vercel.

### Deploy to Netlify:

1. Build your Studio for production:
   ```bash
   cd studio-ci
   npm run build
   ```

2. The built studio will be in the `studio-ci/dist` folder

3. Deploy this folder to Netlify:
   - Sign in to Netlify (netlify.com)
   - Drag and drop the `dist` folder onto the Netlify dashboard
   - Or connect to your Git repository for automatic deployments

### Deploy to Vercel:

1. Create a `vercel.json` file in your studio-ci directory:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "dist/**", "use": "@vercel/static" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/dist/$1" }
     ]
   }
   ```

2. Build your studio:
   ```bash
   npm run build
   ```

3. Deploy with Vercel CLI:
   ```bash
   vercel
   ```

## Studio Access Management

After deploying your Studio, you'll want to control who can access it:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to the "Members" tab
4. Add team members by email address
5. Assign appropriate roles:
   - **Viewer**: Can only view content, not edit
   - **Editor**: Can create and edit content
   - **Administrator**: Full access including schema changes

## CORS Origins

If you're hosting your website on a different domain, add that domain to your CORS origins:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API > CORS origins
4. Add your website's domain (e.g., `https://capitolinsights.com`)
5. Make sure to check "Allow credentials" if you're using authenticated requests

## Next Steps

1. Deploy your Sanity Studio using one of the methods above
2. Share the Studio URL with your content team
3. Set up user accounts for your team members
4. Connect your website to Sanity using the client we've created

You'll then have a fully functional CMS workflow:
1. Editors create/update content in the hosted Sanity Studio
2. Your website pulls content from Sanity's API
3. Changes appear on your site automatically (if webhooks are set up)
