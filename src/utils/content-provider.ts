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
    body: "The 2025 Texas Legislative Session is poised to be a pivotal one for organizations across the state. As we approach this important period, businesses, non-profits, and public entities need to understand the key issues that are likely to dominate the agenda and potentially impact their operations.\n\n## Key Issues for the 2025 Session\n\n### Economic Development\nWith Texas continuing to lead in job creation and business relocation, legislators will focus on maintaining this competitive edge. Expect debates on:\n- Business incentive programs\n- Workforce development initiatives\n- Infrastructure investments to support growth\n\n### Energy Policy\nAs a global energy leader, Texas faces unique challenges and opportunities:\n- Grid reliability improvements following recent weather events\n- Renewable energy integration with traditional energy production\n- Regulatory frameworks for emerging technologies\n\n### Healthcare Access\nHealthcare remains a critical concern for Texans:\n- Rural healthcare accessibility\n- Telehealth permanence post-pandemic\n- Insurance market reforms\n\n## Strategic Considerations for Organizations\n\nSuccessful legislative advocacy requires thorough preparation:\n\n1. **Identify Key Stakeholders**: Map out legislators and staff members crucial to your issue areas\n2. **Build Coalitions**: Align with like-minded organizations to amplify your message\n3. **Develop Clear Messaging**: Articulate how your positions benefit constituents and the state\n4. **Engage Early**: Don't wait until the session begins to establish relationships\n\n## Looking Ahead\n\nThe most effective organizations are already laying groundwork for the 2025 session. By understanding the legislative landscape and preparing thoroughly, you can position your organization to navigate the challenges and opportunities that lie ahead in the Texas Capitol."
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
    body: "Healthcare providers across Texas are navigating a complex landscape of regulatory changes that have been implemented over the past year. These modifications to healthcare policy are creating both challenges and opportunities for providers throughout the state.\n\n## Recent Regulatory Developments\n\n### Telehealth Expansion\nOne of the most significant changes has been the permanent expansion of telehealth services:\n- Reimbursement parity for virtual visits\n- Expanded eligible service types\n- Relaxed technology requirements for rural providers\n\n### Staffing Requirements\nNew staffing regulations are affecting operational costs and care delivery:\n- Updated nurse-to-patient ratios in certain settings\n- Training mandates for specialized care\n- Documentation requirements for staffing levels\n\n### Billing and Coding Updates\nChanges to reimbursement structures are impacting provider finances:\n- New procedure codes for emerging treatments\n- Modified documentation requirements\n- Billing transparency measures\n\n## Adaptation Strategies\n\nHealthcare organizations are implementing various approaches to adapt to these changes:\n\n1. **Technology Investment**: Upgrading systems to support new documentation and telehealth requirements\n2. **Staff Training**: Comprehensive education on new requirements and processes\n3. **Compliance Audits**: Regular internal reviews to ensure adherence to new regulations\n4. **Strategic Partnerships**: Collaborating with other providers to share resources and expertise\n\n## Looking Forward\n\nThe healthcare regulatory environment in Texas will likely continue to evolve. Providers that establish robust compliance systems and remain flexible will be best positioned to thrive in this changing landscape.\n\nFor more detailed guidance on specific regulatory requirements, healthcare organizations should consult with specialized legal counsel and maintain active involvement in their professional associations."
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
    body: "While state-level advocacy often receives the most attention, municipal government decisions frequently have the most direct impact on organizations' day-to-day operations. Effective municipal advocacy requires a different approach than state or federal efforts, with greater emphasis on community engagement and local relationships.\n\n## Understanding Municipal Decision-Making\n\n### The Local Landscape\nMunicipal governments in Texas have distinct characteristics:\n- More direct access to decision-makers\n- Stronger influence of community opinion\n- Faster policy implementation timelines\n- Significant variation in processes between cities\n\n### Key Municipal Issues for 2025\nSeveral issues are likely to dominate local agendas:\n- Land use and zoning decisions\n- Local business regulations\n- Infrastructure investment priorities\n- Public safety resource allocation\n\n## Effective Advocacy Tactics\n\n1. **Know Your Audience**\n   - Research council members' backgrounds and priorities\n   - Understand the demographic makeup of council districts\n   - Identify key staff members who influence policy development\n\n2. **Build Community Coalitions**\n   - Partner with neighborhood associations\n   - Engage local business organizations\n   - Collaborate with community nonprofits\n\n3. **Localize Your Message**\n   - Frame issues in terms of community benefit\n   - Provide specific examples of local impact\n   - Utilize local data and testimonials\n\n4. **Maintain Consistent Presence**\n   - Regularly attend council and committee meetings\n   - Participate in public comment opportunities\n   - Engage in community events and forums\n\n## Case Study: Successful Municipal Advocacy\n\nA recent example demonstrates these principles in action. When a major infrastructure project threatened to disrupt a business district, local organizations collaborated to advocate for construction timing and access modifications. By presenting unified community feedback, offering constructive alternatives, and emphasizing economic impact data, they secured significant accommodations that preserved business operations during construction.\n\n## Moving Forward\n\nAs municipal governments face increasing challenges with limited resources, organizations that position themselves as community partners rather than simply interested parties will have the greatest success in advocacy efforts. By demonstrating how your priorities align with community needs, you build the foundation for effective municipal influence."
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
    // Basic markdown parser for development mode
    if (!content) {
      return [{ type: 'p', content: '', key: 0 }];
    }

    // Split content by line breaks
    const lines = content.split('\n');
    const result = [];
    let currentList: string[] = [];
    let listType = '';
    let key = 0;

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === '') {
        // If we're building a list, finish it
        if (currentList.length > 0) {
          result.push({
            type: listType,
            items: [...currentList],
            key: key++,
          });
          currentList = [];
          listType = '';
        }
        continue;
      }

      // Handle headings
      if (trimmedLine.startsWith('# ')) {
        result.push({
          type: 'h1',
          content: trimmedLine.substring(2),
          key: key++,
          id: trimmedLine.substring(2).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      } else if (trimmedLine.startsWith('## ')) {
        result.push({
          type: 'h2',
          content: trimmedLine.substring(3),
          key: key++,
          id: trimmedLine.substring(3).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      } else if (trimmedLine.startsWith('### ')) {
        result.push({
          type: 'h3',
          content: trimmedLine.substring(4),
          key: key++,
          id: trimmedLine.substring(4).toLowerCase().replace(/[^\w]+/g, '-'),
        });
      }
      // Handle unordered lists
      else if (trimmedLine.startsWith('- ')) {
        // If we're starting a new list or continuing a list of a different type
        if (listType !== 'ul') {
          // If we have a previous list, add it to results
          if (currentList.length > 0) {
            result.push({
              type: listType,
              items: [...currentList],
              key: key++,
            });
            currentList = [];
          }
          listType = 'ul';
        }
        currentList.push(trimmedLine.substring(2));
      }
      // Handle ordered lists (basic support for numbers only)
      else if (/^\d+\.\s/.test(trimmedLine)) {
        // If we're starting a new list or continuing a list of a different type
        if (listType !== 'ol') {
          // If we have a previous list, add it to results
          if (currentList.length > 0) {
            result.push({
              type: listType,
              items: [...currentList],
              key: key++,
            });
            currentList = [];
          }
          listType = 'ol';
        }
        // Extract the content after the number and period
        const content = trimmedLine.replace(/^\d+\.\s/, '');
        currentList.push(content);
      }
      // Handle paragraphs
      else {
        // If we have a list in progress, finish it
        if (currentList.length > 0) {
          result.push({
            type: listType,
            items: [...currentList],
            key: key++,
          });
          currentList = [];
          listType = '';
        }
        
        // Check if this is a continuation of previous paragraph or a new one
        if (result.length > 0 && result[result.length - 1].type === 'p' && lines[i-1]?.trim() !== '') {
          // Append to existing paragraph with a space
          result[result.length - 1].content += ' ' + trimmedLine;
        } else {
          // Create new paragraph
          result.push({
            type: 'p',
            content: trimmedLine,
            key: key++,
          });
        }
      }
    }

    // If we have a list in progress at the end, add it
    if (currentList.length > 0) {
      result.push({
        type: listType,
        items: [...currentList],
        key: key++,
      });
    }

    return result;
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
