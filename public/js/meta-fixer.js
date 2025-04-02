/**
 * Meta Fixer - Enhances HTML document metadata
 * Ensures proper og:tags and metadata are present for better SEO
 */
(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    enhanceMetadata();
  });

  /**
   * Main function to enhance document metadata
   */
  function enhanceMetadata() {
    // Get page title and description
    const pageTitle = document.title || 'Capitol Insights';
    const pageDescription = getMetaContent('description') || 
      'Capitol Insights provides expert government affairs and legislative advocacy services in Texas.';
    
    // Get canonical URL
    const canonicalUrl = getCanonicalUrl();
    
    // Document type detection
    const isDocument = detectDocumentType();
    
    // Add OpenGraph tags if not present
    ensureOpenGraphTags(pageTitle, pageDescription, canonicalUrl, isDocument);
    
    // Add Twitter card if not present
    ensureTwitterCard(pageTitle, pageDescription, canonicalUrl);
    
    // Enhance structured data
    ensureStructuredData(pageTitle, pageDescription, canonicalUrl, isDocument);
  }

  /**
   * Get meta tag content by name
   * @param {string} name - The meta name to search for
   * @return {string|null} The content of the meta tag or null if not found
   */
  function getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
    return meta ? meta.getAttribute('content') : null;
  }

  /**
   * Get canonical URL from link or current location
   * @return {string} The canonical URL
   */
  function getCanonicalUrl() {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    return canonicalLink ? canonicalLink.href : window.location.href;
  }

  /**
   * Detect if this page is a document/publication
   * @return {boolean} True if page appears to be a document
   */
  function detectDocumentType() {
    // Check URL patterns
    const urlPath = window.location.pathname.toLowerCase();
    if (urlPath.includes('/files/') || urlPath.includes('/downloads/')) {
      return true;
    }
    
    // Look for document-like content
    const hasDateSection = !!document.querySelector('.date, .published-date');
    const hasAuthorSection = !!document.querySelector('.author, .byline');
    const hasPrintOption = !!document.querySelector('.print, .print-link, .pdf-download');
    
    return hasDateSection && (hasAuthorSection || hasPrintOption);
  }

  /**
   * Ensure OpenGraph tags are present
   * @param {string} title - The page title
   * @param {string} description - The page description
   * @param {string} url - The canonical URL
   * @param {boolean} isDocument - Whether this is a document type page
   */
  function ensureOpenGraphTags(title, description, url, isDocument) {
    ensureMeta('og:title', title);
    ensureMeta('og:description', description);
    ensureMeta('og:url', url);
    ensureMeta('og:site_name', 'Capitol Insights');
    
    // Add document type if applicable
    if (isDocument) {
      ensureMeta('og:type', 'article');
      
      // Try to find publication date
      const pubDate = getMetaContent('publication_date') || 
                    document.querySelector('.date, .published-date')?.textContent?.trim();
      if (pubDate) {
        ensureMeta('article:published_time', pubDate);
      }
    } else {
      ensureMeta('og:type', 'website');
    }
    
    // Set image if available, or default
    const ogImage = getMetaContent('og:image');
    if (!ogImage) {
      const pageImage = document.querySelector('main img')?.src;
      ensureMeta('og:image', pageImage || '/images/texas-capitol.jpg');
    }
  }

  /**
   * Ensure Twitter card tags are present
   * @param {string} title - The page title
   * @param {string} description - The page description
   * @param {string} url - The canonical URL
   */
  function ensureTwitterCard(title, description, url) {
    ensureMeta('twitter:card', 'summary');
    ensureMeta('twitter:title', title);
    ensureMeta('twitter:description', description);
    ensureMeta('twitter:url', url);
    
    // Set image if available
    const twitterImage = getMetaContent('twitter:image');
    if (!twitterImage) {
      const ogImage = getMetaContent('og:image');
      if (ogImage) {
        ensureMeta('twitter:image', ogImage);
      }
    }
  }

  /**
   * Create or update a meta tag
   * @param {string} name - The meta name or property
   * @param {string} content - The content to set
   */
  function ensureMeta(name, content) {
    if (!content) return;
    
    // Check if already exists
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.querySelector(`meta[property="${name}"]`);
    }
    
    if (meta) {
      // Update existing
      meta.setAttribute('content', content);
    } else {
      // Create new
      meta = document.createElement('meta');
      
      // Determine if this is an OpenGraph property
      if (name.startsWith('og:') || name.startsWith('article:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }

  /**
   * Ensure structured data is present
   * @param {string} title - The page title
   * @param {string} description - The page description
   * @param {string} url - The canonical URL
   * @param {boolean} isDocument - Whether this is a document type page
   */
  function ensureStructuredData(title, description, url, isDocument) {
    // Check if structured data already exists
    if (document.querySelector('script[type="application/ld+json"]')) {
      return; // Already has structured data
    }
    
    // Create appropriate structured data
    let structuredData;
    
    if (isDocument) {
      // Create Article structured data
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": url,
        "publisher": {
          "@type": "Organization",
          "name": "Capitol Insights",
          "logo": {
            "@type": "ImageObject",
            "url": window.location.origin + "/favicon-192.png"
          }
        }
      };
      
      // Try to find author
      const authorElement = document.querySelector('.author, .byline');
      if (authorElement) {
        structuredData.author = {
          "@type": "Person",
          "name": authorElement.textContent.trim()
        };
      }
      
      // Try to find date
      const dateElement = document.querySelector('.date, .published-date');
      if (dateElement) {
        structuredData.datePublished = dateElement.textContent.trim();
      }
      
      // Try to find main image
      const mainImage = document.querySelector('main img');
      if (mainImage && mainImage.src) {
        structuredData.image = mainImage.src;
      }
    } else {
      // Create WebPage structured data
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": url
      };
    }
    
    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
})();
