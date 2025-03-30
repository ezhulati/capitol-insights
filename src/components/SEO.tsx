import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps, generateSEO } from '../utils/seo';

const SEO: React.FC<SEOProps> = (props) => {
  const seoProps = generateSEO(props);
  
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
    </Helmet>
  );
};

export default SEO;
