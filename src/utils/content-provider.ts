/**
 * Content Provider
 * 
 * This file serves as a bridge between the MDX file system and Sanity CMS.
 * It provides the same interface as the original MDX utilities but can
 * switch between local file content and Sanity CMS content based on configuration.
 */

import { BlogPost, PageContent } from './mdx-sanity';

// Set this to 'sanity' to use Sanity CMS content, or 'local' to use local MDX files
const CONTENT_SOURCE = 'local';

// Fallback blog posts data for use in browser
const fallbackPosts: BlogPost[] = [
  {
    _sys: {
      filename: "texas-legislative-session-2025-preview.mdx",
      basename: "texas-legislative-session-2025-preview",
      relativePath: "texas-legislative-session-2025-preview.mdx"
    },
    id: "texas-legislative-session-2025-preview",
    title: "Texas Legislative Session 2025 - What Organizations Need to Know",
    excerpt: "A comprehensive preview of key issues likely to dominate the upcoming legislative session and how they may impact various sectors.",
    date: "2024-10-15T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "6 min read",
    category: "Legislative Preview",
    tags: ["Texas Legislature", "Policy", "Government Affairs"],
    featured: true,
    image: "/uploads/posts/texas-legislative.jpg",
    body: "Content will be provided by Sanity CMS in production"
  },
  {
    _sys: {
      filename: "healthcare-regulatory-changes-impact.mdx",
      basename: "healthcare-regulatory-changes-impact",
      relativePath: "healthcare-regulatory-changes-impact.mdx"
    },
    id: "healthcare-regulatory-changes-impact",
    title: "Impact of Recent Healthcare Regulatory Changes on Texas Providers",
    excerpt: "An analysis of how recent regulatory changes are affecting healthcare providers across Texas and strategies for adaptation.",
    date: "2024-09-28T12:00:00.000Z",
    author: "Byron Campbell",
    authorTitle: "Healthcare Policy Specialist",
    readTime: "5 min read",
    category: "Healthcare",
    tags: ["Healthcare", "Regulatory", "Compliance"],
    featured: false,
    image: "/uploads/posts/healthcare-regulatory.jpg",
    body: "Content will be provided by Sanity CMS in production"
  },
  {
    _sys: {
      filename: "municipal-advocacy-strategies.mdx",
      basename: "municipal-advocacy-strategies",
      relativePath: "municipal-advocacy-strategies.mdx"
    },
    id: "municipal-advocacy-strategies",
    title: "Effective Municipal Advocacy Strategies for 2025",
    excerpt: "Key strategies for organizations to effectively advocate for their interests at the municipal level in Texas.",
    date: "2024-09-10T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "4 min read",
    category: "Municipal Affairs",
    tags: ["Local Government", "Advocacy", "Strategy"],
    featured: false,
    image: "/uploads/posts/municipal-advocacy.jpg",
    body: "Content will be provided by Sanity CMS in production"
  }
];

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // In development/browser environment, return fallback data
    return Promise.resolve(fallbackPosts);
    
    // In production with SSR, this would use:
    // if (CONTENT_SOURCE === 'sanity') {
    //   return MDXSanity.getAllPosts();
    // } else {
    //   return MDXLocal.getAllPosts() as unknown as BlogPost[];
    // }
  } catch (error) {
    console.error("Error getting posts:", error);
    return fallbackPosts;
  }
}

/**
 * Get a blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // In development/browser environment, use fallback data
    const post = fallbackPosts.find(p => p._sys.basename === slug);
    return Promise.resolve(post || null);
    
    // In production with SSR, this would use:
    // if (CONTENT_SOURCE === 'sanity') {
    //   return MDXSanity.getPostBySlug(slug);
    // } else {
    //   return MDXLocal.getPostBySlug(slug) as unknown as BlogPost;
    // }
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    const post = fallbackPosts.find(p => p._sys.basename === slug);
    return post || null;
  }
}

/**
 * Get page content
 */
export async function getPageContent(pagePath: string): Promise<PageContent | null> {
  try {
    // In development/browser environment, return mock page content
    const mockPageContent: PageContent = {
      _sys: {
        filename: "index.mdx",
        basename: "index",
        relativePath: `${pagePath}/index.mdx`
      },
      title: `${pagePath.charAt(0).toUpperCase() + pagePath.slice(1)} Page`,
      body: "Content will be provided by Sanity CMS in production"
    };
    
    return Promise.resolve(mockPageContent);
    
    // In production with SSR, this would use:
    // if (CONTENT_SOURCE === 'sanity') {
    //   return MDXSanity.getPageContent(pagePath);
    // } else {
    //   return MDXLocal.getPageContent(pagePath) as unknown as PageContent;
    // }
  } catch (error) {
    console.error(`Error getting content for page ${pagePath}:`, error);
    return null;
  }
}

/**
 * Render markdown content
 */
export function renderMarkdown(content: string) {
  try {
    // Simple placeholder for rendering in development/browser
    return [{ type: 'p', content: content, key: 0 }];
    
    // In production with SSR, this would use:
    // if (CONTENT_SOURCE === 'sanity') {
    //   return MDXSanity.renderMarkdown(content);
    // } else {
    //   return MDXLocal.renderMarkdown(content);
    // }
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return [{ type: 'p', content: "Error rendering content", key: 0 }];
  }
}

/**
 * For components that need to directly access MDX files (legacy support)
 */
export function getMdxFiles(dir: string): string[] {
  // Simplified version for browser
  return [];
}

/**
 * For components that need to directly access MDX content (legacy support)
 */
export function getMdxContent(filePath: string) {
  // Simplified version for browser
  return {
    frontmatter: {},
    content: "",
    slug: ""
  };
}
