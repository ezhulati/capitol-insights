# Connecting Sanity CMS to Your Website

Your content has been successfully migrated to Sanity CMS, but there's one more step needed to make it appear on your live website. Currently, your website is still using the local MDX files rather than content from Sanity.

## Why Published Content Isn't Showing on Your Website

When you publish content in Sanity Studio, it's stored in Sanity's database but doesn't automatically appear on your website. To display Sanity content on your website, you need to:

1. Install the Sanity client in your website code
2. Fetch content from Sanity using their API
3. Modify your site to render content from Sanity instead of MDX files

## Integration Steps

### 1. Install Required Packages

First, install the Sanity client in your website project:

```bash
npm install @sanity/client
```

### 2. Create a Sanity Client

Add a file called `sanityClient.js` in your project's `src/utils` directory:

```javascript
// src/utils/sanityClient.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'bowvx6js',
  dataset: 'production',
  apiVersion: '2023-05-03', // use a UTC date string
  useCdn: true // `false` if you want to ensure fresh data
});
```

### 3. Replace MDX Content with Sanity Content

Update your `src/utils/mdx.ts` file to fetch content from Sanity instead of local files:

```typescript
// src/utils/mdx.ts
import { sanityClient } from './sanityClient';

// Fetch a page by slug
export async function getPageBySlug(slug: string) {
  const page = await sanityClient.fetch(`
    *[_type == "page" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      content,
      "description": seo.metaDescription,
      "metaTitle": seo.metaTitle,
      "metaKeywords": seo.metaKeywords,
      "featuredImage": featuredImage{asset->{url}}
    }
  `, { slug });
  
  return page;
}

// Fetch all posts
export async function getAllPosts() {
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "categories": categories,
      "featuredImage": featuredImage{asset->{url}}
    }
  `);
  
  return posts;
}

// Fetch a post by slug
export async function getPostBySlug(slug: string) {
  const post = await sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      publishedAt,
      "categories": categories,
      body,
      excerpt,
      "featuredImage": featuredImage{asset->{url}},
      "description": seo.metaDescription,
      "metaTitle": seo.metaTitle,
      "metaKeywords": seo.metaKeywords
    }
  `, { slug });
  
  return post;
}

// Similar functions for other content types...
```

### 4. Update Your Components

Modify your React components to use the data structure returned from Sanity:

```jsx
// Example: src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../utils/mdx';

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      getPostBySlug(slug)
        .then(postData => {
          setPost(postData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    }
  }, [slug]);
  
  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      {post.featuredImage && (
        <img 
          src={post.featuredImage.asset.url} 
          alt={post.title} 
        />
      )}
      <div className="content">
        {/* Render the Sanity body content */}
        {/* You'll need a Portable Text renderer for this */}
      </div>
    </article>
  );
}
```

### 5. Install Portable Text Renderer

For rendering Sanity's rich text content:

```bash
npm install @portabletext/react
```

Then use it in your components:

```jsx
import { PortableText } from '@portabletext/react';

// In your component:
<PortableText value={post.body} />
```

## Deployment Process

To ensure changes in Sanity are reflected on your website:

1. When you publish content in Sanity Studio, it's immediately available via the API
2. However, your website needs to be rebuilt to fetch the latest content
3. Set up a webhook in Sanity to trigger a rebuild of your site when content changes

### Setting Up Webhooks

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API > Webhooks
4. Add a webhook that triggers when documents are published
5. Point it to your deployment platform's build hook URL (Netlify, Vercel, etc.)

## Next Steps

To fully implement this integration:

1. Install the required packages in your website project
2. Create the Sanity client and content fetching utilities
3. Update your components to use Sanity data
4. Set up webhooks for automatic rebuilds
5. Deploy your updated website

For more detailed integration, you may want to consult with a developer who can help structure queries for your specific content models and set up the proper rendering components.
