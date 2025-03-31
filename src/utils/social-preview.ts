/**
 * Social Media Preview Optimization
 * 
 * This utility provides enhanced social media preview metadata for various 
 * platforms including Facebook, Twitter, LinkedIn, and Pinterest.
 * 
 * It supports customized previews based on content type and generates 
 * the appropriate meta tags for optimal sharing appearances.
 */

/**
 * Base interface for social media preview metadata
 */
export interface SocialPreviewBase {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: 'website' | 'article' | 'profile' | 'book';
  siteName?: string;
  locale?: string;
}

/**
 * Twitter-specific preview options
 */
export interface TwitterPreviewOptions {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  imageAlt?: string;
}

/**
 * Facebook-specific preview options
 */
export interface FacebookPreviewOptions {
  appId?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
}

/**
 * LinkedIn-specific preview options
 */
export interface LinkedInPreviewOptions {
  authorName?: string;
  publishDate?: string;
}

/**
 * Combined social preview metadata interface
 */
export interface SocialPreviewMetadata extends SocialPreviewBase {
  twitter?: TwitterPreviewOptions;
  facebook?: FacebookPreviewOptions;
  linkedin?: LinkedInPreviewOptions;
}

/**
 * Blog post specific preview metadata
 */
export interface BlogPostPreviewMetadata {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  author: string;
  category?: string;
  image?: string;
  tags?: string[];
}

/**
 * Resource specific preview metadata
 */
export interface ResourcePreviewMetadata {
  title: string;
  description: string;
  type: string; // guide, brief, report, etc.
  category: string;
  image?: string;
}

/**
 * Team member specific preview metadata
 */
export interface TeamMemberPreviewMetadata {
  name: string;
  title: string;
  bio: string;
  image: string;
}

/**
 * Generate social preview metadata for the home page
 */
export const generateHomePagePreview = (): SocialPreviewMetadata => {
  return {
    title: 'Capitol Insights | Strategic Texas Government Relations',
    description: 'When legislation threatens your business, will you be introducing yourself to lawmakers or activating relationships you\'ve already built? 40+ years of legislative success.',
    url: 'https://capitol-insights.com',
    image: 'https://capitol-insights.com/images/social/home-preview.jpg',
    type: 'website',
    siteName: 'Capitol Insights',
    locale: 'en_US',
    twitter: {
      card: 'summary_large_image',
      site: '@CapitolInsights',
      imageAlt: 'Capitol Insights - Texas Government Relations'
    },
    facebook: {
      appId: '1234567890', // Replace with actual Facebook App ID if available
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: 'Capitol Insights - Texas Government Relations'
    }
  };
};

/**
 * Generate social preview metadata for blog posts
 */
export const generateBlogPostPreview = (post: BlogPostPreviewMetadata): SocialPreviewMetadata => {
  return {
    title: post.title,
    description: post.description,
    url: `https://capitol-insights.com/updates/${post.slug}`,
    image: post.image || 'https://capitol-insights.com/images/social/blog-default.jpg',
    type: 'article',
    siteName: 'Capitol Insights',
    locale: 'en_US',
    twitter: {
      card: 'summary_large_image',
      site: '@CapitolInsights',
      creator: '@CapitolInsights',
      imageAlt: `${post.title} | Capitol Insights`
    },
    facebook: {
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: `${post.title} | Capitol Insights`
    },
    linkedin: {
      authorName: post.author,
      publishDate: post.publishDate
    }
  };
};

/**
 * Generate social preview metadata for resources
 */
export const generateResourcePreview = (resource: ResourcePreviewMetadata): SocialPreviewMetadata => {
  // Customize image based on resource type
  const getResourceImage = (type: string) => {
    switch (type) {
      case 'guide':
        return 'https://capitol-insights.com/images/social/guide-preview.jpg';
      case 'brief':
        return 'https://capitol-insights.com/images/social/brief-preview.jpg';
      case 'report':
        return 'https://capitol-insights.com/images/social/report-preview.jpg';
      case 'calendar':
        return 'https://capitol-insights.com/images/social/calendar-preview.jpg';
      default:
        return 'https://capitol-insights.com/images/social/resource-default.jpg';
    }
  };

  return {
    title: `${resource.title} | Capitol Insights`,
    description: resource.description,
    url: `https://capitol-insights.com/resources`,
    image: resource.image || getResourceImage(resource.type),
    type: 'article',
    siteName: 'Capitol Insights',
    locale: 'en_US',
    twitter: {
      card: 'summary_large_image',
      site: '@CapitolInsights',
      imageAlt: `${resource.title} - ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} | Capitol Insights`
    },
    facebook: {
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: `${resource.title} - ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} | Capitol Insights`
    }
  };
};

/**
 * Generate social preview metadata for team members
 */
export const generateTeamMemberPreview = (member: TeamMemberPreviewMetadata): SocialPreviewMetadata => {
  return {
    title: `${member.name} | Capitol Insights Team`,
    description: member.bio,
    url: `https://capitol-insights.com/team`,
    image: member.image,
    type: 'profile',
    siteName: 'Capitol Insights',
    locale: 'en_US',
    twitter: {
      card: 'summary',
      site: '@CapitolInsights',
      imageAlt: `${member.name}, ${member.title} at Capitol Insights`
    },
    facebook: {
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: `${member.name}, ${member.title} at Capitol Insights`
    }
  };
};

/**
 * Convert SocialPreviewMetadata to meta tags
 */
export const socialPreviewToMetaTags = (metadata: SocialPreviewMetadata): Array<{
  name?: string;
  property?: string;
  content: string;
}> => {
  const tags = [
    // Open Graph basic tags
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.description },
    { property: 'og:url', content: metadata.url },
    { property: 'og:image', content: metadata.image },
    { property: 'og:type', content: metadata.type || 'website' },
    
    // Twitter Card tags
    { name: 'twitter:card', content: metadata.twitter?.card || 'summary' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.description },
    { name: 'twitter:image', content: metadata.image },
  ];

  // Add optional Open Graph tags
  if (metadata.siteName) {
    tags.push({ property: 'og:site_name', content: metadata.siteName });
  }
  
  if (metadata.locale) {
    tags.push({ property: 'og:locale', content: metadata.locale });
  }

  // Add Twitter-specific tags
  if (metadata.twitter) {
    if (metadata.twitter.site) {
      tags.push({ name: 'twitter:site', content: metadata.twitter.site });
    }
    
    if (metadata.twitter.creator) {
      tags.push({ name: 'twitter:creator', content: metadata.twitter.creator });
    }
    
    if (metadata.twitter.imageAlt) {
      tags.push({ name: 'twitter:image:alt', content: metadata.twitter.imageAlt });
    }
  }

  // Add Facebook-specific tags
  if (metadata.facebook) {
    if (metadata.facebook.appId) {
      tags.push({ property: 'fb:app_id', content: metadata.facebook.appId });
    }
    
    if (metadata.facebook.imageWidth) {
      tags.push({ property: 'og:image:width', content: metadata.facebook.imageWidth.toString() });
    }
    
    if (metadata.facebook.imageHeight) {
      tags.push({ property: 'og:image:height', content: metadata.facebook.imageHeight.toString() });
    }
    
    if (metadata.facebook.imageAlt) {
      tags.push({ property: 'og:image:alt', content: metadata.facebook.imageAlt });
    }
  }

  // Add LinkedIn-specific tags
  if (metadata.linkedin) {
    if (metadata.linkedin.authorName) {
      tags.push({ property: 'article:author', content: metadata.linkedin.authorName });
    }
    
    if (metadata.linkedin.publishDate) {
      tags.push({ property: 'article:published_time', content: metadata.linkedin.publishDate });
    }
  }

  return tags;
};
