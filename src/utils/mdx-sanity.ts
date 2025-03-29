/**
 * Integration between MDX content utilities and Sanity CMS
 * This file provides compatibility between the existing MDX structure
 * and the new Sanity data structure
 */

import { sanityClient } from './sanityClient';

// Define types matching our existing data structure
export interface MDXSys {
  filename: string;
  basename: string;
  relativePath: string;
}

export interface BlogPost {
  _sys: MDXSys;
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorTitle: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  body: string;
  [key: string]: any; // Allow for other frontmatter properties
}

export interface PageContent {
  _sys: MDXSys;
  title: string;
  body: string;
  [key: string]: any; // Allow for other frontmatter properties
}

/**
 * Get all posts from Sanity and convert to MDX-compatible format
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        "categories": categories,
        body,
        "featuredImage": featuredImage{
          asset->{
            _id,
            url
          }
        },
        "seo": seo
      }
    `);
    
    // Transform Sanity data to match our existing MDX structure
    return sanityPosts.map((post: any) => ({
      _sys: {
        filename: `${post.slug}.mdx`,
        basename: post.slug,
        relativePath: `posts/${post.slug}.mdx`,
      },
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      date: post.publishedAt || new Date().toISOString(),
      author: "Capitol Insights",
      authorTitle: "Staff",
      readTime: "5 min read",
      category: post.categories?.[0] || "General",
      tags: post.categories || [],
      featured: false,
      image: post.featuredImage?.asset?.url || "",
      body: JSON.stringify(post.body),
      metaTitle: post.seo?.metaTitle || post.title,
      metaDescription: post.seo?.metaDescription || post.excerpt,
      metaKeywords: post.seo?.metaKeywords || [],
    }));
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return [];
  }
}

/**
 * Get a single post by slug from Sanity
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        "categories": categories,
        body,
        "featuredImage": featuredImage{
          asset->{
            _id,
            url
          }
        },
        "seo": seo
      }
    `, { slug });
    
    if (!post) return null;
    
    // Transform Sanity data to match our existing MDX structure
    return {
      _sys: {
        filename: `${post.slug}.mdx`,
        basename: post.slug,
        relativePath: `posts/${post.slug}.mdx`,
      },
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      date: post.publishedAt || new Date().toISOString(),
      author: "Capitol Insights",
      authorTitle: "Staff",
      readTime: "5 min read",
      category: post.categories?.[0] || "General",
      tags: post.categories || [],
      featured: false,
      image: post.featuredImage?.asset?.url || "",
      body: JSON.stringify(post.body),
      metaTitle: post.seo?.metaTitle || post.title,
      metaDescription: post.seo?.metaDescription || post.excerpt,
      metaKeywords: post.seo?.metaKeywords || [],
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug} from Sanity:`, error);
    return null;
  }
}

/**
 * Get page content by path from Sanity
 */
export async function getPageContent(pagePath: string): Promise<PageContent | null> {
  try {
    // For page paths like "about", "contact", etc.
    const pageSlug = pagePath.split('/').pop() || pagePath;
    
    const page = await sanityClient.fetch(`
      *[_type == "page" && slug.current == $pageSlug][0]{
        _id,
        title,
        "slug": slug.current,
        content,
        "featuredImage": featuredImage{
          asset->{
            _id,
            url
          }
        },
        "seo": seo
      }
    `, { pageSlug });
    
    if (!page) return null;
    
    // Transform Sanity data to match our existing MDX structure
    return {
      _sys: {
        filename: 'index.mdx',
        basename: 'index',
        relativePath: `${pagePath}/index.mdx`,
      },
      title: page.title,
      body: JSON.stringify(page.content),
      metaTitle: page.seo?.metaTitle || page.title,
      metaDescription: page.seo?.metaDescription || "",
      metaKeywords: page.seo?.metaKeywords || [],
      featuredImage: page.featuredImage?.asset?.url || "",
    };
  } catch (error) {
    console.error(`Error fetching page content for ${pagePath} from Sanity:`, error);
    return null;
  }
}

/**
 * Helper to create portable text renderer for Sanity's rich text content
 * For now, it just returns the serialized JSON, but in a real implementation
 * you'd use @portabletext/react to render this properly
 */
export function renderMarkdown(content: string) {
  try {
    // For now, just parse the JSON back to an object
    const parsedContent = JSON.parse(content);
    
    // In a real implementation, you would use @portabletext/react to render this
    // For now, we'll just return a simple representation
    return parsedContent.map((block: any, index: number) => {
      if (block._type === 'block') {
        const style = block.style || 'normal';
        const text = block.children
          .map((child: any) => child.text)
          .join('');
          
        if (style === 'h1') {
          return { type: 'h1', content: text, key: index };
        } else if (style === 'h2') {
          return { type: 'h2', content: text, key: index };
        } else if (style === 'h3') {
          return { type: 'h3', content: text, key: index };
        } else {
          return { type: 'p', content: text, key: index };
        }
      }
      
      // For images and other block types
      return { type: 'p', content: '[Complex content]', key: index };
    });
  } catch (error) {
    console.error('Error rendering Sanity content:', error);
    return [{ type: 'p', content: 'Error rendering content', key: 0 }];
  }
}
