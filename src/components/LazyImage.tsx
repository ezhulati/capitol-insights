import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// Extend the HTMLImageElement to include fetchPriority
interface ExtendedImgHTMLAttributes extends React.ImgHTMLAttributes<HTMLImageElement> {
  fetchPriority?: 'high' | 'low' | 'auto';
}

interface LazyImageProps extends ExtendedImgHTMLAttributes {
  src: string;
  alt: string;
  lowQualitySrc?: string;
  placeholderColor?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean; // For critical images that need to load immediately
  // fetchPriority is now defined in ExtendedImgHTMLAttributes
  srcset?: string; // Support responsive images
  sizes?: string; // Support responsive images
  width?: number; // Original width for better CLS handling
  height?: number; // Original height for better CLS handling
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  lowQualitySrc,
  placeholderColor = '#f3f4f6',
  aspectRatio = '16/9',
  objectFit = 'cover',
  className = '',
  priority = false,
  fetchPriority = 'auto',
  srcset,
  sizes,
  width,
  height,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    // Skip IntersectionObserver for priority images to load them immediately
    skip: priority
  });
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Set fetchPriority to high for priority images if not explicitly set
  const effectiveFetchPriority = priority && fetchPriority === 'auto' ? 'high' : fetchPriority;

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
          setIsLoaded(true);
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

  // Calculate aspect ratio styles or use explicit dimensions
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor,
    ...(width && height 
        ? { 
            width: '100%', 
            maxWidth: `${width}px`,
            // Use padding-bottom for aspect ratio to prevent CLS
            paddingBottom: `${(height / width) * 100}%` 
          } 
        : { aspectRatio }
    )
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
    position: 'absolute',
    top: 0,
    left: 0,
  };
  
  // For priority images, preload them with a link tag
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const linkEl = document.createElement('link');
      linkEl.rel = 'preload';
      linkEl.as = 'image';
      linkEl.href = src;
      if (srcset) linkEl.setAttribute('imagesrcset', srcset);
      if (sizes) linkEl.setAttribute('imagesizes', sizes);
      document.head.appendChild(linkEl);
      
      return () => {
        document.head.removeChild(linkEl);
      };
    }
  }, [priority, src, srcset, sizes]);

  // Generate WebP source path
  const generateWebPPath = (imagePath: string): string => {
    const pathInfo = imagePath.split('.');
    const extension = pathInfo.pop();
    
    // Only convert jpg, jpeg, and png to webp
    if (!['jpg', 'jpeg', 'png'].includes(extension?.toLowerCase() || '')) {
      return imagePath;
    }
    
    return `${pathInfo.join('.')}.webp`;
  };

  return (
    <div ref={priority ? undefined : ref} style={containerStyle} className={className}>
      {(inView || priority) && (
        <>
          {lowQualitySrc && !isLoaded && (
            <img
              src={lowQualitySrc}
              alt=""
              style={{
                ...imageStyle,
                opacity: 1,
                filter: 'blur(10px)',
              }}
              aria-hidden="true"
              width={width}
              height={height}
            />
          )}
          <picture>
            {/* WebP source */}
            <source 
              srcSet={srcset ? srcset.split(', ').map(src => {
                const [url, size] = src.split(' ');
                return `${generateWebPPath(url)} ${size}`;
              }).join(', ') : generateWebPPath(src)}
              type="image/webp"
              sizes={sizes}
            />
            
            {/* Original format fallback */}
            <source 
              srcSet={srcset}
              sizes={sizes}
            />
            
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              style={imageStyle}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={effectiveFetchPriority}
              width={width}
              height={height}
              decoding={priority ? 'sync' : 'async'}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setError(true);
                setIsLoaded(true);
              }}
              {...props}
            />
          </picture>
        </>
      )}
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
  );
};

export default LazyImage;
