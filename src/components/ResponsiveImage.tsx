import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { 
  generateSrcSet, 
  generateSizes, 
  generateImageStructuredData, 
  enhanceAltText, 
  ResponsiveImageSource 
} from '../utils/image-seo';

// Use Omit to avoid conflict with the native 'sizes' attribute on HTMLImageElement
export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'sizes'> {
  src: string;
  alt: string;
  sources?: ResponsiveImageSource[];
  webpSources?: ResponsiveImageSource[];
  imageSizes?: string[];
  width?: number;
  height?: number;
  caption?: string;
  contentLocation?: string;
  author?: string;
  datePublished?: string;
  generateStructuredData?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  placeholderColor?: string;
  lowQualitySrc?: string;
  context?: string; // Additional context for alt text optimization
}

/**
 * ResponsiveImage component with SEO optimizations
 * 
 * This component extends the basic image element with:
 * - Responsive image support (srcset, sizes)
 * - WebP format support with fallback
 * - JSON-LD structured data
 * - Enhanced alt text
 * - Lazy loading with IntersectionObserver
 * - Blur-up image loading effect
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sources = [],
  webpSources = [],
  imageSizes = [],
  width,
  height,
  caption,
  contentLocation,
  author,
  datePublished,
  generateStructuredData = false,
  objectFit = 'cover',
  aspectRatio = 'auto',
  placeholderColor = '#f3f4f6',
  lowQualitySrc,
  context = '',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Generate enhanced alt text
  const optimizedAlt = enhanceAltText(alt, context);
  
  // Generate srcset and sizes attributes
  const srcSet = sources.length > 0 ? generateSrcSet(sources) : '';
  const sizesAttr = generateSizes(imageSizes);
  
  // Generate WebP srcset
  const webpSrcSet = webpSources.length > 0 ? generateSrcSet(webpSources) : '';

  useEffect(() => {
    if (inView && imageRef.current) {
      const img = imageRef.current;
      
      if (img.complete) {
        setIsLoaded(true);
      } else {
        const onLoad = () => {
          setIsLoaded(true);
        };
        
        const onError = () => {
          setError(true);
          setIsLoaded(true); // Still mark as loaded to remove loading state
        };
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        
        return () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };
      }
    }
  }, [inView]);

  // Generate structured data for the image
  const structuredData = generateStructuredData ? 
    generateImageStructuredData({
      url: src,
      width: width,
      height: height,
      caption: caption,
      altText: optimizedAlt,
      author: author,
      contentLocation: contentLocation,
      datePublished: datePublished
    }) : null;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor,
    aspectRatio: aspectRatio,
    ...(width ? { width: `${width}px` } : {}),
    ...(height ? { height: `${height}px` } : {})
  };

  return (
    <>
      {generateStructuredData && structuredData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}
      
      <div ref={ref} style={containerStyle} className={className}>
        {inView && (
          <>
            {lowQualitySrc && !isLoaded && (
              <img
                src={lowQualitySrc}
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit,
                  opacity: 1,
                  filter: 'blur(10px)',
                }}
                aria-hidden="true"
              />
            )}
            
            <picture>
              {/* WebP sources */}
              {webpSrcSet && (
                <source 
                  srcSet={webpSrcSet} 
                  sizes={sizesAttr} 
                  type="image/webp" 
                />
              )}
              
              {/* Original format sources */}
              {srcSet && (
                <source 
                  srcSet={srcSet} 
                  sizes={sizesAttr} 
                />
              )}
              
              {/* Fallback image */}
              <img
                ref={imageRef}
                src={src}
                alt={optimizedAlt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit,
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: isLoaded ? 1 : 0,
                }}
                {...props}
              />
            </picture>
            
            {/* Optional Caption */}
            {caption && isLoaded && (
              <figcaption 
                className="text-sm text-slate-500 mt-2 italic"
              >
                {caption}
              </figcaption>
            )}
          </>
        )}
        
        {/* Error fallback */}
        {error && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
            }}
          >
            <span className="text-slate-400 text-sm">Image unavailable</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ResponsiveImage;
