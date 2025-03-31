/**
 * Enhanced structured data implementation for improved SEO
 * 
 * This file provides functions to generate JSON-LD structured data 
 * following Schema.org specifications for better search engine visibility
 * and rich result opportunities.
 */

interface StructuredDataProps {
  type: string;
  name: string;
  description: string;
  url: string;
  image?: string;
  [key: string]: any;
}

/**
 * Generate base schema.org structured data for consistent application
 */
export const generateStructuredData = (props: StructuredDataProps): object => {
  const { type, name, description, url, image, ...rest } = props;
  
  // Base structured data that all types will use
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url,
    ...(image && { "image": image })
  };
  
  // Add any additional properties
  return {
    ...baseSchema,
    ...rest
  };
};

/**
 * Generate BlogPosting structured data for enhancing blog post pages
 */
export const generateBlogPostStructuredData = (post: {
  title: string;
  slug: string;
  description: string;
  date: string;
  modifiedDate?: string;
  image?: string;
  author: string;
  authorTitle?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
}): object => {
  // Extract word count from read time if available
  let wordCount;
  if (post.readTime) {
    const minutes = parseInt(post.readTime.split(" ")[0]);
    if (!isNaN(minutes)) {
      // Estimate based on average reading speed of 200-250 words per minute
      wordCount = minutes * 225;
    }
  }

  return generateStructuredData({
    type: "BlogPosting",
    name: post.title,
    description: post.description,
    url: `https://capitol-insights.com/updates/${post.slug}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.modifiedDate ? new Date(post.modifiedDate).toISOString() : new Date(post.date).toISOString(),
    image: post.image || "/images/texas-capitol.jpg",
    wordCount: wordCount,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle || "Government Relations Specialist",
      affiliation: {
        "@type": "Organization",
        name: "Capitol Insights",
        url: "https://capitol-insights.com"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "Capitol Insights",
      logo: {
        "@type": "ImageObject",
        url: "https://capitol-insights.com/images/logo.png"
      }
    },
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && { keywords: post.tags.join(", ") }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://capitol-insights.com/updates/${post.slug}`
    }
  });
};

/**
 * Generate structured data for resource items (FAQs, guides, downloads)
 */
export const generateResourceStructuredData = (resource: {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  downloadUrl: string;
  date: string;
  fileSize?: string;
}): object => {
  let resourceType = 'DigitalDocument';
  
  // Map resource types to appropriate Schema.org types
  switch (resource.type) {
    case 'guide':
      resourceType = 'TechArticle';
      break;
    case 'brief':
      resourceType = 'Report';
      break;
    case 'report':
      resourceType = 'Report';
      break;
    case 'calendar':
      resourceType = 'DigitalDocument';
      break;
    default:
      resourceType = 'DigitalDocument';
  }
  
  return generateStructuredData({
    type: resourceType,
    name: resource.title,
    description: resource.description,
    url: `https://capitol-insights.com/resources#${resource.id}`,
    datePublished: resource.date,
    about: resource.category,
    provider: {
      "@type": "Organization",
      "name": "Capitol Insights",
      "url": "https://capitol-insights.com"
    },
    ...(resource.fileSize && { 
      contentSize: resource.fileSize,
      encodingFormat: 'text/html'
    })
  });
};

/**
 * Generate FAQ structured data for enhanced search results
 */
export const generateFAQStructuredData = (faqs: {
  question: string;
  answer: string;
}[]): object => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate BreadcrumbList structured data for improved navigation display
 */
export const generateBreadcrumbStructuredData = (breadcrumbs: {
  name: string;
  url: string;
}[]): object => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

/**
 * Generate Person structured data for team members
 */
export const generatePersonStructuredData = (person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
  url?: string;
  sameAs?: string[];
  alumniOf?: {
    name: string;
    url?: string;
  }[];
  knowsAbout?: string[];
  worksFor?: {
    name: string;
    url?: string;
    sameAs?: string[];
  };
}): object => {
  return generateStructuredData({
    type: "Person",
    name: person.name,
    description: person.description || `${person.name} is ${person.jobTitle} at Capitol Insights, a government relations firm in Texas.`,
    url: person.url || "https://capitol-insights.com/team",
    image: person.image,
    jobTitle: person.jobTitle,
    email: person.email,
    telephone: person.telephone,
    sameAs: person.sameAs,
    alumniOf: person.alumniOf?.map(institution => ({
      "@type": "EducationalOrganization",
      "name": institution.name,
      ...(institution.url && { "url": institution.url })
    })),
    knowsAbout: person.knowsAbout,
    worksFor: person.worksFor && {
      "@type": "Organization",
      "name": person.worksFor.name,
      "url": person.worksFor.url,
      "sameAs": person.worksFor.sameAs
    }
  });
};

/**
 * Generate Team structured data with proper Organization and Person nodes
 */
export const generateTeamStructuredData = (
  organization: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
  },
  teamMembers: {
    name: string;
    jobTitle: string;
    description?: string;
    image?: string;
    url?: string;
    sameAs?: string[];
  }[]
): object[] => {
  // Create organization schema
  const organizationSchema = generateStructuredData({
    type: "Organization",
    name: organization.name,
    description: organization.description || `${organization.name} is a government relations firm specializing in legislative advocacy in Texas.`,
    url: organization.url,
    logo: organization.logo,
    sameAs: organization.sameAs
  });

  // Create person schemas for each team member
  const personSchemas = teamMembers.map(member => 
    generatePersonStructuredData({
      ...member,
      worksFor: {
        name: organization.name,
        url: organization.url
      }
    })
  );

  // Return all schemas
  return [organizationSchema, ...personSchemas];
};

/**
 * Generate LocalBusiness structured data for organization contact info
 */
export const generateOrganizationStructuredData = (): object => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Capitol Insights",
    "description": "Strategic Texas government relations firm specializing in legislative advocacy, regulatory affairs, and policy development.",
    "url": "https://capitol-insights.com",
    "logo": "https://capitol-insights.com/images/logo.png",
    "image": "https://capitol-insights.com/images/capitol-background.jpg",
    "location": [
      {
        "@type": "Place",
        "name": "Capitol Insights Austin Office",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1005 Congress Ave Suite 800",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "postalCode": "78701",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 30.2712,
          "longitude": -97.7403
        }
      },
      {
        "@type": "Place",
        "name": "Capitol Insights Dallas Office",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "P.O. Box 195892",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "postalCode": "75219",
          "addressCountry": "US"
        }
      }
    ],
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "telephone": "+12142133443",
    "email": "contact@capitol-insights.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:30",
        "closes": "17:30"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 31.9686,
        "longitude": -99.9018
      },
      "geoRadius": "500000"
    },
    "priceRange": "$$$",
    "sameAs": [
      "https://www.linkedin.com/company/capitol-insights",
      "https://twitter.com/capitolinsights"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Government Relations Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legislative Advocacy",
            "description": "Strategic representation before the Texas Legislature"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Regulatory Affairs",
            "description": "Navigate complex regulatory frameworks and agency relationships"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Policy Development",
            "description": "Research and develop effective policy positions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coalition Building",
            "description": "Build strategic alliances to advance legislative priorities"
          }
        }
      ]
    }
  };
};
