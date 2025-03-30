import { SEOProps } from './seo';

export interface EnhancedSEOProps extends SEOProps {
  pageType: 'home' | 'services' | 'team' | 'results' | 'approach' | 'contact' | 'updates' | 'blog' | 'policy';
  slug?: string;
}

/**
 * Page-specific optimized metadata following best practices:
 * - Titles: 55-60 characters
 * - Descriptions: 155-160 characters
 * - Keywords: Relevant terms for search engines
 * - Featured images: Unique for each page
 */
export const getPageSEO = (props: EnhancedSEOProps): SEOProps => {
  const { pageType, slug } = props;
  
  // Base metadata that will be overridden as needed
  const baseSEO: SEOProps = {
    title: 'Capitol Insights | Texas Government Relations & Lobbying',
    description: 'Capitol Insights transforms policy challenges into strategic advantages through direct access to Texas decision-makers and 40+ years of government relations experience.',
    image: '/images/capitol-background.jpg',
    additionalMetaTags: [
      { 
        name: "keywords", 
        content: "Texas government relations, legislative advocacy, lobbying Texas, Drew Campbell, Byron Campbell, Austin lobbying firm" 
      }
    ],
    canonical: '/'
  };
  
  // Page-specific optimized metadata
  switch (pageType) {
    case 'home':
      return {
        ...baseSEO,
        title: 'Capitol Insights | Strategic Texas Government Relations & Lobbying',
        description: 'When legislation threatens your business, will you be introducing yourself to lawmakers or activating relationships you\'ve already built? 40+ years of legislative success.',
        image: '/images/capitol-background.jpg',
        canonical: '/',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Texas government relations, legislative advocacy, Drew Campbell, Byron Campbell, lobbyist Texas, Texas lobbying firm, Austin lobbying" 
          }
        ],
        schemaMarkup: {
          type: 'Organization',
          name: 'Capitol Insights',
          description: 'Capitol Insights transforms policy challenges into strategic advantages through direct access to Texas decision-makers and 40+ years of government relations experience.',
          url: 'https://capitol-insights.com',
          image: '/images/capitol-background.jpg'
        }
      };

    case 'services':
      return {
        ...baseSEO,
        title: 'Texas Government Relations Services | Legislative Advocacy & Lobbying',
        description: 'Our government relations services have secured $32M in appropriations and achieved 22% reduction in compliance costs through strategic advocacy and expert policy analysis.',
        image: '/images/approach-capitol.jpg',
        canonical: '/services',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Texas legislative advocacy, regulatory affairs, compliance guidance, stakeholder engagement, policy analysis, government relations services" 
          }
        ],
        schemaMarkup: {
          type: 'Service',
          name: 'Texas Government Relations Services',
          description: 'Our services have secured $32M in appropriations and achieved 22% reduction in compliance costs for clients through strategic advocacy and relationship building.',
          url: 'https://capitol-insights.com/services',
          image: '/images/approach-capitol.jpg'
        }
      };

    case 'team':
      return {
        ...baseSEO,
        title: 'Meet Our Texas Government Relations Team | Capitol Insights',
        description: 'Our team brings 40+ years of experience in Texas politics with established relationships with key legislators, officials, and agency heads throughout the state.',
        image: '/uploads/team/team-page.png',
        canonical: '/team',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Drew Campbell lobbyist, Byron Campbell government relations, Texas lobbyist team, Capitol Insights partners, Texas government affairs experts" 
          }
        ],
        schemaMarkup: {
          type: 'Organization',
          name: 'Capitol Insights Team',
          description: 'Our government relations team brings decades of experience and established relationships with key decision-makers throughout Texas.',
          url: 'https://capitol-insights.com/team',
          image: '/uploads/team/team-page.png'
        }
      };

    case 'results':
      return {
        ...baseSEO,
        title: 'Government Relations Success Stories & Case Studies | Capitol Insights',
        description: 'Explore how our strategic government relations approach has delivered measurable results including $32M in appropriations and 85% success rate across 200+ initiatives.',
        image: '/images/texas-capitol.jpg',
        canonical: '/results',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "government relations case studies, Texas lobbying success, legislative advocacy results, policy advocacy outcomes, Texas regulatory affairs success" 
          }
        ],
        schemaMarkup: {
          type: 'WebPage',
          name: 'Government Relations Success Stories',
          description: 'Discover how our strategic government relations approach has delivered measurable results across diverse industries through effective, ethical advocacy.',
          url: 'https://capitol-insights.com/results',
          image: '/images/texas-capitol.jpg'
        }
      };

    case 'approach':
      return {
        ...baseSEO,
        title: 'Strategic Government Relations Approach | Texas Lobbying Firm',
        description: 'Our 4-step government relations methodology has secured an 85% success rate across 20+ legislative sessions by building relationships before they\'re needed.',
        image: '/images/approach-capitol.jpg',
        canonical: '/approach',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Texas lobbying approach, government relations strategy, legislative advocacy method, strategic policy approach, relationship-based lobbying" 
          }
        ],
        schemaMarkup: {
          type: 'WebPage',
          name: 'Our Strategic Government Relations Approach',
          description: 'Learn about our 4-step government relations methodology that has achieved an 85% success rate across 20+ legislative sessions since 1983.',
          url: 'https://capitol-insights.com/approach',
          image: '/images/approach-capitol.jpg'
        }
      };

    case 'contact':
      return {
        ...baseSEO,
        title: 'Contact Capitol Insights | Texas Government Relations Experts',
        description: 'Schedule a consultation with our government relations team to discuss your legislative needs and discover how we can help navigate Texas politics for your organization.',
        image: '/images/capitol-background.jpg',
        canonical: '/contact',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "contact Texas lobbyist, hire government relations firm, Texas legislative consultant, policy advocacy contact, Capitol Insights consultation" 
          }
        ],
        schemaMarkup: {
          type: 'ContactPage',
          name: 'Contact Capitol Insights',
          description: 'Schedule a consultation with our government relations experts to discuss your organization\'s policy objectives and challenges.',
          url: 'https://capitol-insights.com/contact',
          image: '/images/capitol-background.jpg'
        }
      };

    case 'updates':
      return {
        ...baseSEO,
        title: 'Texas Legislative Updates & Policy Insights | Capitol Insights',
        description: 'Stay informed with expert analysis of Texas legislative developments, regulatory changes, and policy trends that may impact your organization.',
        image: '/images/texas-capitol.jpg',
        canonical: '/updates',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Texas legislative updates, policy insights, regulatory changes, government affairs news, Texas politics analysis, legislative developments" 
          }
        ],
        schemaMarkup: {
          type: 'CollectionPage',
          name: 'Texas Legislative Updates & Policy Insights',
          description: 'Stay informed with expert analysis of legislative developments, regulatory changes, and policy trends affecting Texas organizations.',
          url: 'https://capitol-insights.com/updates',
          image: '/images/texas-capitol.jpg'
        }
      };

    case 'blog':
      // If we have a specific blog post
      if (props.title && props.description && slug) {
        return {
          ...props,
          canonical: `/blog/${slug}`,
          schemaMarkup: {
            type: 'BlogPosting',
            name: props.title,
            description: props.description,
            url: `https://capitol-insights.com/blog/${slug}`,
            image: props.image || '/images/texas-capitol.jpg'
          }
        };
      }
      
      // Default blog section
      return {
        ...baseSEO,
        title: 'Texas Government Relations Blog | Capitol Insights Perspectives',
        description: 'Expert analysis and insights on Texas legislative developments, regulatory affairs, and government relations strategy from Capitol Insights professionals.',
        image: '/images/texas-capitol.jpg',
        canonical: '/blog',
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "Texas government relations blog, legislative analysis, policy insights, Texas politics blog, lobbying perspectives, regulatory affairs updates" 
          }
        ],
        schemaMarkup: {
          type: 'WebPage',
          name: 'Capitol Insights Government Relations Blog',
          description: 'Expert analysis and insights on Texas legislative developments, regulatory affairs, and government relations strategy.',
          url: 'https://capitol-insights.com/blog',
          image: '/images/texas-capitol.jpg'
        }
      };

    case 'policy':
      return {
        ...baseSEO,
        title: `${props.title || 'Privacy Policy & Terms'} | Capitol Insights`,
        description: props.description || 'Legal policies and terms governing your use of Capitol Insights services and website, including privacy practices and usage guidelines.',
        image: '/images/capitol-background.jpg',
        canonical: `/${slug || 'privacy-policy'}`,
        additionalMetaTags: [
          { 
            name: "keywords", 
            content: "privacy policy, terms of service, legal terms, government relations policy, website terms, data privacy" 
          }
        ]
      };

    default:
      return baseSEO;
  }
};

/**
 * Blog post specific SEO optimization
 */
export const getBlogPostSEO = (post: {
  title: string;
  slug: string;
  excerpt?: string;
  metaDescription?: string;
  metaTitle?: string;
  metaKeywords?: string[];
  author?: string;
  date?: string;
  image?: string;
}): SEOProps => {
  // Create an optimized title (55-60 chars)
  const title = post.metaTitle || 
    (post.title.length > 55 ? `${post.title.substring(0, 52)}... | CI` : `${post.title} | Capitol Insights`);
  
  // Create an optimized description (155-160 chars)
  const rawDescription = post.metaDescription || post.excerpt || '';
  const description = rawDescription.length > 155 ? 
    `${rawDescription.substring(0, 152)}...` : rawDescription;
  
  // Default keywords if none provided
  const defaultKeywords = [
    "Texas legislative insights", 
    "government relations analysis",
    "Texas policy perspectives",
    "Capitol Insights blog",
    "lobbying expertise",
    post.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').slice(0, 3).join(', ')
  ].join(', ');
  
  return {
    title,
    description,
    canonical: `/blog/${post.slug}`,
    image: post.image || '/images/texas-capitol.jpg',
    type: 'article',
    additionalMetaTags: [
      { 
        name: "keywords", 
        content: post.metaKeywords?.join(', ') || defaultKeywords
      },
      {
        name: "author",
        content: post.author || "Capitol Insights"
      },
      post.date ? {
        name: "article:published_time",
        content: new Date(post.date).toISOString()
      } : undefined
    ].filter(Boolean) as Array<{ name?: string; property?: string; content: string }>,
    schemaMarkup: {
      type: 'BlogPosting',
      name: post.title,
      description: description,
      url: `https://capitol-insights.com/blog/${post.slug}`,
      image: post.image || '/images/texas-capitol.jpg',
      headline: post.title,
      datePublished: post.date ? new Date(post.date).toISOString() : undefined,
      authorName: post.author || "Capitol Insights",
      publisherName: "Capitol Insights",
      publisherLogo: "/images/capitol-background.jpg"
    }
  };
};
