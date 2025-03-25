import { HelmetProps } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  twitterCardType?: 'summary' | 'summary_large_image';
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export const generateSEO = ({
  title = 'Capitol Insights | Government Relations & Lobbying',
  description = 'Capitol Insights transforms policy challenges into strategic business advantages through direct access to Texas decision-makers and decades of insider experience.',
  canonical = '',
  image = 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1200&h=630&fit=crop',
  type = 'website',
  twitterCardType = 'summary_large_image',
  additionalMetaTags = [],
}: SEOProps): HelmetProps => {
  const fullUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    const baseUrl = 'https://capitol-insights.com';
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:image', content: fullUrl(image) },
      { property: 'og:url', content: fullUrl(canonical) },
      { name: 'twitter:card', content: twitterCardType },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: fullUrl(image) },
      ...additionalMetaTags,
    ],
    link: canonical ? [{ rel: 'canonical', href: fullUrl(canonical) }] : [],
  };
};

export const pageSEO = (page: string, customDescription?: string): SEOProps => {
  const pageTitles: Record<string, string> = {
    home: 'Capitol Insights | Government Relations & Lobbying',
    services: 'Expert Government Relations Services | Capitol Insights',
    team: 'Our Experienced Lobbying Team | Capitol Insights',
    results: 'Client Success Stories & Case Studies | Capitol Insights',
    approach: 'Our Strategic Advocacy Approach | Capitol Insights',
    contact: 'Schedule Your Policy Assessment | Capitol Insights',
    updates: 'Capitol Watch: Latest Policy Insights | Capitol Insights',
    privacy: 'Privacy Policy | Capitol Insights',
    terms: 'Terms of Service | Capitol Insights',
  };

  const pageDescriptions: Record<string, string> = {
    home: 'Capitol Insights transforms policy challenges into strategic business advantages through direct access to Texas decision-makers and decades of insider experience.',
    services: 'Explore our comprehensive government relations services including legislative advocacy, regulatory affairs, and strategic policy development for Texas organizations.',
    team: 'Meet our team of experienced government relations professionals with decades of combined experience in Texas politics and policy.',
    results: 'Discover how we have delivered measurable results for clients across diverse industries through effective, ethical government relations strategies.',
    approach: 'Learn about our transparent, relationship-driven approach to government relations and what sets Capitol Insights apart.',
    contact: 'Schedule a consultation with our government relations experts to discuss your organization\'s policy objectives and challenges.',
    updates: 'Stay informed with the latest legislative developments, regulatory changes, and policy trends affecting Texas organizations.',
    privacy: 'Capitol Insights Privacy Policy: Learn how we collect, use, and protect your personal information.',
    terms: 'Capitol Insights Terms of Service: The terms and conditions that govern your use of our website and services.',
  };

  return {
    title: pageTitles[page] || 'Capitol Insights | Government Relations & Lobbying',
    description: customDescription || pageDescriptions[page] || pageDescriptions.home,
  };
};