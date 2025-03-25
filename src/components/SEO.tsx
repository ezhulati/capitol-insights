import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps, generateSEO } from '../utils/seo';

const SEO: React.FC<SEOProps> = (props) => {
  const seoProps = generateSEO(props);
  
  return <Helmet {...seoProps} />;
};

export default SEO;