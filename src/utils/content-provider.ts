/**
 * Content Provider
 * 
 * This file serves as a bridge between the MDX file system and Sanity CMS.
 * It provides the same interface as the original MDX utilities but can
 * switch between local file content and Sanity CMS content based on configuration.
 */

import * as MDXLocal from './mdx'; // Original MDX file-based content
import * as MDXSanity from './mdx-sanity'; // New Sanity-based content
import { BlogPost, PageContent } from './mdx-sanity';

// Set this to 'sanity' to use Sanity CMS content, or 'local' to use local MDX files
const CONTENT_SOURCE = 'sanity';

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (CONTENT_SOURCE === 'sanity') {
    return MDXSanity.getAllPosts();
  } else {
    // Fall back to local MDX files
    return MDXLocal.getAllPosts() as unknown as BlogPost[];
  }
}

/**
 * Get a blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (CONTENT_SOURCE === 'sanity') {
    return MDXSanity.getPostBySlug(slug);
  } else {
    // Fall back to local MDX files
    return MDXLocal.getPostBySlug(slug) as unknown as BlogPost;
  }
}

/**
 * Get page content
 */
export async function getPageContent(pagePath: string): Promise<PageContent | null> {
  if (CONTENT_SOURCE === 'sanity') {
    return MDXSanity.getPageContent(pagePath);
  } else {
    // Fall back to local MDX files
    return MDXLocal.getPageContent(pagePath) as unknown as PageContent;
  }
}

/**
 * Render markdown content
 */
export function renderMarkdown(content: string) {
  if (CONTENT_SOURCE === 'sanity') {
    return MDXSanity.renderMarkdown(content);
  } else {
    // Fall back to local MDX rendering
    return MDXLocal.renderMarkdown(content);
  }
}

/**
 * For components that need to directly access MDX files (legacy support)
 */
export function getMdxFiles(dir: string): string[] {
  // Always use local for this function as it's specifically for file system
  return MDXLocal.getMdxFiles(dir);
}

/**
 * For components that need to directly access MDX content (legacy support)
 */
export function getMdxContent(filePath: string) {
  // Always use local for this function as it's specifically for file system
  return MDXLocal.getMdxContent(filePath);
}
