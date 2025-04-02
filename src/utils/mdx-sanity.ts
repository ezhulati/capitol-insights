/**
 * MDX-Sanity Bridge Implementation
 * 
 * This file provides types and mock functions for content fetching
 * during development to avoid Sanity client errors.
 */

export interface BlogPost {
  _sys: {
    filename: string;
    basename: string;
    relativePath: string;
  };
  id?: string;
  slug?: string;
  title: string;
  excerpt?: string;
  date: string;
  author: string;
  authorTitle?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  image?: string;
  body?: string;
  metaDescription?: string;
  metaTitle?: string;
  metaKeywords?: string[];
}

export interface PageContent {
  _sys: {
    filename: string;
    basename: string;
    relativePath: string;
  };
  title: string;
  body: string;
}

/**
 * Mock function to get all posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // This is implemented in content-provider.ts using fallback data
  return [];
}

/**
 * Mock function to get a post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // This is implemented in content-provider.ts using fallback data
  return null;
}

/**
 * Mock function to get page content
 */
export async function getPageContent(pagePath: string): Promise<PageContent | null> {
  // This is implemented in content-provider.ts using fallback data
  return null;
}
