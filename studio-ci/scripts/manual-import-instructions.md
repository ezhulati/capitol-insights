# Manual Content Import Instructions

Since you've already successfully logged into the Sanity Studio running locally, we'll use a simpler approach to import your content.

## Step 1: Create Content Manually

You can create your content directly in the Sanity Studio interface. Here's how:

1. Make sure the Sanity Studio is running (`npm run dev` in the studio-ci directory)
2. Log in to the Studio at http://localhost:3333
3. In the left sidebar, you'll see all the content types we defined (Posts, Team Members, Services, Resources, Pages)
4. Click on each content type and use the "Create new" button to add content

## Step 2: Create a Post

Let's start by creating a post based on your existing content:

1. Click on "Post" in the left sidebar
2. Click "Create new" 
3. Fill in the details from your existing post:
   - Title: "Hello, World!"
   - Slug: "hello-world"
   - Published At: 2024-03-28
   - Excerpt: "Welcome to Capitol Insights, where we transform policy challenges into strategic advantages for organizations throughout Texas."
   - Body: Copy the content from content/posts/hello-world.md
   - Categories: "Texas Legislature", "Government Relations", "Policy"

## Step 3: Create Team Members

1. Click on "Team Member" in the left sidebar
2. Click "Create new"
3. For each team member, fill in:
   - Name
   - Slug (auto-generated from name)
   - Position
   - Bio
   - Upload their image

## Step 4: Create Services

1. Click on "Service" in the left sidebar
2. Click "Create new"
3. For each service your company offers, fill in:
   - Title
   - Slug (auto-generated from title)
   - Description
   - Content (detailed description)
   - Display Order (to control the order on your website)

## Step 5: Create Pages

1. Click on "Page" in the left sidebar
2. Click "Create new"
3. Create pages for:
   - Home
   - About
   - Services
   - Contact
   - Any other main pages on your site

## Importing Multiple Items

If you have a lot of content, this manual process might be time-consuming. In that case, you could:

1. Consider running the import script with modifications to not require an API token
2. Use a CSV import tool if your content is in a structured format
3. Build a custom importer using the Sanity JavaScript client

## Advantages of Manual Import

While it may take more time, manually importing your content has advantages:

1. You can carefully review and structure each piece of content
2. You can make improvements as you go
3. You'll become familiar with the Sanity interface
4. No technical issues with API tokens or script execution
