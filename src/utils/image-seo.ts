/**
 * Image SEO Utilities
 * 
 * This utility provides functions for optimizing images for SEO, including:
 * - Generating structured data for images
 * - Managing responsive image sources
 * - Creating optimized alt text
 */

/**
 * Interface for ImageObject structured data
 */
export interface ImageObjectData {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  author?: string;
  contentLocation?: string;
  datePublished?: string;
}

/**
 * Interface for responsive image sources
 */
export interface ResponsiveImageSource {
  src: string;
  width: number;
  type?: string; // e.g., 'image/webp', 'image/jpeg'
}

/**
 * Generate ImageObject structured data for SEO
 */
export const generateImageStructuredData = (image: ImageObjectData): object => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": image.contentUrl || image.url,
    "url": image.url,
    ...(image.width && { "width": image.width }),
    ...(image.height && { "height": image.height }),
    ...(image.caption && { "caption": image.caption }),
    ...(image.altText && { "description": image.altText }),
    ...(image.thumbnailUrl && { "thumbnailUrl": image.thumbnailUrl }),
    ...(image.author && { 
      "author": {
        "@type": "Person",
        "name": image.author
      }
    }),
    ...(image.contentLocation && {
      "contentLocation": {
        "@type": "Place",
        "name": image.contentLocation
      }
    }),
    ...(image.datePublished && { "datePublished": image.datePublished })
  };
};

/**
 * Generate optimized srcset attribute for responsive images
 */
export const generateSrcSet = (sources: ResponsiveImageSource[]): string => {
  return sources
    .map(source => `${source.src} ${source.width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * This tells the browser what size the image will be displayed at different viewport widths
 */
export const generateSizes = (sizes: string[] = []): string => {
  if (sizes.length === 0) {
    // Default responsive sizes
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
  
  return sizes.join(', ');
};

/**
 * Generate responsive image sources based on a base image URL
 * This assumes the images are available in the format: base-{width}.{extension}
 * 
 * Example:
 * - Base: /images/hero.jpg
 * - Responsive sources: /images/hero-320.jpg, /images/hero-640.jpg, /images/hero-1280.jpg
 */
export const generateResponsiveSources = (
  baseUrl: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
  type: string = ''
): ResponsiveImageSource[] => {
  // Extract the base name and extension
  const match = baseUrl.match(/(.+)\.([a-zA-Z]+)$/);
  
  if (!match) {
    // If the URL format is not recognized, return a single source
    return [{ src: baseUrl, width: 1200 }];
  }
  
  const [, baseName, extension] = match;
  
  return widths.map(width => ({
    src: `${baseName}-${width}.${extension}`,
    width,
    ...(type && { type })
  }));
};

/**
 * Generate WebP alternative sources for an image
 * Assumes the WebP versions are available at the same paths but with .webp extension
 */
export const generateWebPSources = (
  sources: ResponsiveImageSource[]
): ResponsiveImageSource[] => {
  return sources.map(source => {
    const webpSrc = source.src.replace(/\.[a-zA-Z]+$/, '.webp');
    return {
      ...source,
      src: webpSrc,
      type: 'image/webp'
    };
  });
};

/**
 * Enhance image alt text for SEO and accessibility
 */
export const enhanceAltText = (
  alt: string, 
  context: string = '', 
  maxLength: number = 125
): string => {
  if (!alt || alt.trim() === '') {
    return context ? `Image related to ${context}` : 'Image';
  }
  
  // Add context if it's not already in the alt text
  let enhancedAlt = alt;
  if (context && !alt.toLowerCase().includes(context.toLowerCase())) {
    enhancedAlt = `${enhancedAlt} - ${context}`;
  }
  
  // Truncate if too long
  if (enhancedAlt.length > maxLength) {
    enhancedAlt = enhancedAlt.substring(0, maxLength - 3) + '...';
  }
  
  return enhancedAlt;
};
