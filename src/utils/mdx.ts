/**
 * MDX content utilities for loading and processing MDX files
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define types for our content
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

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all MDX files from a directory
 */
export function getMdxFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  return fs.readdirSync(fullPath)
    .filter(file => {
      const stat = fs.statSync(path.join(fullPath, file));
      return stat.isFile() && (file.endsWith('.mdx') || file.endsWith('.md'));
    });
}

/**
 * Get MDX file content with frontmatter
 */
export function getMdxContent(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data,
    content,
    slug: path.basename(filePath, path.extname(filePath)),
  };
}

/**
 * Get all MDX posts with frontmatter
 */
export function getAllPosts(): BlogPost[] {
  const files = getMdxFiles('posts');
  const posts = files
    .map(file => {
      const { frontmatter, content, slug } = getMdxContent(`posts/${file}`);
      return {
        ...frontmatter,
        _sys: {
          filename: file,
          basename: slug,
          relativePath: `posts/${file}`,
        },
        id: slug,
        body: content,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const files = getMdxFiles('posts');
  const mdxFile = files.find(file => file.replace(/\.mdx?$/, '') === slug);
  
  if (!mdxFile) {
    return null;
  }
  
  const { frontmatter, content } = getMdxContent(`posts/${mdxFile}`);
  
  return {
    ...frontmatter,
    _sys: {
      filename: mdxFile,
      basename: slug,
      relativePath: `posts/${mdxFile}`,
    },
    id: slug,
    body: content,
  } as BlogPost;
}

/**
 * Get page content by path
 */
export function getPageContent(pagePath: string): PageContent | null {
  try {
    const fullPath = `${pagePath}/index.mdx`;
    const { frontmatter, content } = getMdxContent(fullPath);
    
    return {
      ...frontmatter,
      body: content,
      _sys: {
        filename: 'index.mdx',
        basename: 'index',
        relativePath: fullPath,
      },
    } as PageContent;
  } catch (error) {
    console.error(`Error loading page content for ${pagePath}:`, error);
    return null;
  }
}

/**
 * Helper to parse markdown content to HTML
 * This is a simple implementation - for more advanced use cases,
 * consider using a markdown-to-JSX library
 */
export function renderMarkdown(content: string) {
  if (!content) return null;
  
  return content.split('\n\n').map((paragraph, index) => {
    if (paragraph.startsWith('# ')) {
      const text = paragraph.replace('# ', '');
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return { type: 'h1', content: text, id, key: index };
    } else if (paragraph.startsWith('## ')) {
      const text = paragraph.replace('## ', '');
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return { type: 'h2', content: text, id, key: index };
    } else if (paragraph.startsWith('### ')) {
      const text = paragraph.replace('### ', '');
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return { type: 'h3', content: text, id, key: index };
    } else if (paragraph.startsWith('- ')) {
      const items = paragraph.split('\n').map(item => item.replace('- ', ''));
      return { type: 'ul', items, key: index };
    } else if (paragraph.match(/^\d+\./)) {
      const items = paragraph.split('\n').map(item => {
        return item.replace(/^\d+\.\s/, '');
      });
      return { type: 'ol', items, key: index };
    } else {
      return { type: 'p', content: paragraph, key: index };
    }
  });
}
