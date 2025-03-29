# Creating Content in Sanity Studio

This guide walks you through the process of creating and managing content in your Sanity Studio for Capitol Insights.

## Accessing Sanity Studio

### Option 1: Local Development
```bash
cd studio-ci
npm run dev
```
Then open your browser to http://localhost:3333

### Option 2: Deployed Studio
Go to https://capitol-insights.sanity.studio/

## Creating New Content

### Blog Posts

1. **Navigate to Posts**: In the left sidebar of Sanity Studio, click on "Content" and then "Posts"

2. **Create a New Post**: Click the "Create new" button in the top right corner

3. **Add Content**:
   - **Title**: Enter the post title
   - **Slug**: Automatically generated from title, but you can customize it
   - **Published At**: Select the publication date
   - **Excerpt**: Add a brief summary (155-160 characters is ideal for SEO)
   - **Categories**: Select or create applicable categories
   - **Featured Image**: Upload or select an image
   - **Body**: Use the rich text editor to create your content
     - Add headings using the formatting options
     - Insert images using the image button
     - Create bullet or numbered lists
     - Add links to external resources
   - **SEO Fields**:
     - Meta Title: 55-60 characters max
     - Meta Description: 155-160 characters max
     - Meta Keywords: Comma-separated keywords

4. **Preview**: Click the "Preview" button to see how your content will look on the site

5. **Publish**: When ready, click the "Publish" button in the bottom right

### Team Members

1. **Navigate to Team**: In the left sidebar, click on "Content" and then "Team Members"

2. **Create a New Team Member**: Click the "Create new" button

3. **Add Information**:
   - **Name**: Full name
   - **Title**: Job title/position
   - **Slug**: Automatically generated
   - **Bio**: Biographical information
   - **Photo**: Upload a professional photo
   - **Contact Information**: Email, phone, etc. (if applicable)
   - **SEO Fields**: As above

4. **Publish**: Click the "Publish" button when complete

### Pages (Home, About, etc.)

1. **Navigate to Pages**: In the left sidebar, click on "Content" and then "Pages"

2. **Select or Create a Page**: Choose an existing page to edit or create a new one

3. **Add Content**:
   - **Title**: Page title
   - **Slug**: URL path for the page
   - **Content**: Use the rich text editor
   - **SEO Fields**: As above

4. **Publish**: Click the "Publish" button when complete

## Managing Media

### Uploading Images

1. Go to "Content" > "Media Library"
2. Click "Upload" and select an image
3. Add metadata:
   - Title: Descriptive name
   - Alt Text: Accessibility description (important for SEO)
   - Caption: Optional image caption

### Using Images in Content

1. When editing content, click the image icon in the editor toolbar
2. Either:
   - Select an existing image from the library
   - Upload a new image
3. Adjust the image size and positioning as needed

## Working with Rich Text Content

The rich text editor in Sanity provides several formatting options:

- **Text Formatting**: Bold, italic, underline
- **Headings**: H1, H2, H3, etc.
- **Lists**: Bullet points and numbered lists
- **Links**: External URLs or internal references
- **Images**: Insert images from the media library
- **Blockquotes**: For quotations
- **Code Blocks**: For code snippets

## Publishing Workflow

1. **Draft Mode**: Content starts in draft mode where only you can see it
2. **Review**: Preview your content before publishing
3. **Publish**: Make content live on the website
4. **Update**: Edit published content and republish when needed

## Setting Up Featured Content

For the homepage and other key sections:

1. Go to "Content" > "Home Features"
2. Create or edit featured content items
3. Select which content to feature
4. Arrange the order of featured items
5. Publish changes

## Best Practices

1. **Consistent Formatting**: Maintain consistent heading and paragraph styles
2. **Image Optimization**: Use properly sized images (ideal dimensions for blog posts: 1200×630px)
3. **SEO Fields**: Always complete all SEO fields for better search visibility
4. **Regular Updates**: Schedule regular content updates to keep the site fresh
5. **Content Planning**: Use draft mode to prepare content in advance

## Troubleshooting

If you encounter issues:

1. **Publishing Errors**: Check that all required fields are filled in
2. **Image Issues**: Ensure images are in supported formats (JPG, PNG, WebP)
3. **Content Not Updating**: Check webhook setup in WEBHOOKS-GUIDE.md
4. **Studio Errors**: Try refreshing the browser or clearing cache

## Additional Resources

- **Sanity Documentation**: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **Content Modeling Guide**: [https://www.sanity.io/docs/content-modeling](https://www.sanity.io/docs/content-modeling)
- **Rich Text Editor Guide**: [https://www.sanity.io/docs/portable-text-editor](https://www.sanity.io/docs/portable-text-editor)
