import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps, generateSEO } from '../utils/seo';
import { 
  generateOrganizationStructuredData, 
  generateBreadcrumbStructuredData 
} from '../utils/structured-data';
import { SocialPreviewMetadata, socialPreviewToMetaTags } from '../utils/social-preview';

/**
 * Enhanced SEO component with structured data support
 * 
 * This component handles all SEO-related aspects of a page including:
 * - Basic meta tags (title, description)
 * - Open Graph and Twitter Card metadata
 * - JSON-LD structured data for rich results
 * - Canonical URLs and other link tags
 */
const SEO: React.FC<SEOProps & { 
  structuredData?: object | object[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeOrganizationData?: boolean;
  socialPreview?: SocialPreviewMetadata;
}> = (props) => {
  const { 
    structuredData, 
    breadcrumbs, 
    includeOrganizationData = false,
    socialPreview,
    ...standardSeoProps
  } = props;
  
  const seoProps = generateSEO(standardSeoProps);
  
  // Prepare JSON-LD structured data
  let jsonLdData: object[] = [];
  
  // Add explicitly provided structured data
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      jsonLdData = [...jsonLdData, ...structuredData];
    } else {
      jsonLdData.push(structuredData);
    }
  }
  
  // Add breadcrumbs structured data if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdData.push(generateBreadcrumbStructuredData(breadcrumbs));
  }
  
  // Add organization data if requested
  if (includeOrganizationData) {
    jsonLdData.push(generateOrganizationStructuredData());
  }
  
  // Add from schemaMarkup if present in props
  if (props.schemaMarkup) {
    const schemaData = {
      '@context': 'https://schema.org',
      ...props.schemaMarkup
    };
    jsonLdData.push(schemaData);
  }
  
  return (
    <Helmet prioritizeSeoTags>
      {/* Force overwrite title */}
      <title>{seoProps.title}</title>
      
      {/* Force overwrite critical SEO meta tags */}
      <meta name="description" content={props.description || ''} />
      <meta property="og:title" content={props.title || ''} />
      <meta property="og:description" content={props.description || ''} />
      <meta name="twitter:title" content={props.title || ''} />
      <meta name="twitter:description" content={props.description || ''} />
      {props.canonical && <link rel="canonical" href={props.canonical} />}
      {props.image && <meta property="og:image" content={props.image} />}
      {props.image && <meta name="twitter:image" content={props.image} />}
      {props.type && <meta property="og:type" content={props.type} />}
      
      {/* Social media preview metadata */}
      {socialPreview && socialPreviewToMetaTags(socialPreview).map((meta, index) => (
        <meta 
          key={`social-${index}`} 
          name={meta.name || undefined} 
          property={meta.property || undefined} 
          content={meta.content}
        />
      ))}
      
      {/* Force overwrite other meta tags */}
      {seoProps.meta?.map((meta, index) => (
        <meta 
          key={index} 
          name={meta.name || undefined} 
          property={meta.property || undefined} 
          content={meta.content}
        />
      ))}
      
      {/* Link tags */}
      {seoProps.link?.map((link, index) => (
        <link 
          key={index} 
          rel={link.rel} 
          href={link.href} 
        />
      ))}
      
      {/* Script tags for schema */}
      {seoProps.script?.map((script, index) => (
        <script 
          key={index} 
          type={script.type} 
          dangerouslySetInnerHTML={{ __html: script.innerHTML }} 
        />
      ))}
      
      {/* JSON-LD structured data */}
      {jsonLdData.length > 0 && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(
              jsonLdData.length === 1 ? jsonLdData[0] : jsonLdData
            )
          }} 
        />
      )}
    </Helmet>
  );
};

export default SEO;
