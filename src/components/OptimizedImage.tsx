import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  decoding?: 'async' | 'sync' | 'auto';
}

/**
 * OptimizedImage component that automatically uses WebP images with fallback to JPG/PNG
 * 
 * This component improves performance by:
 * 1. Using WebP format when available (with fallback to original format)
 * 2. Supporting responsive sizing with srcset and sizes attributes
 * 3. Allowing control of loading priority and decoding
 * 4. Supporting aspect ratio and object-fit for better layout stability
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '100vw',
  objectFit = 'cover',
  aspectRatio,
  decoding = 'async'
}) => {
  // Generate WebP source path
  const generateWebPPath = (imagePath: string): string => {
    // Check if the path already ends with .webp
    if (imagePath.toLowerCase().endsWith('.webp')) {
      return imagePath;
    }
    
    const lastDotIndex = imagePath.lastIndexOf('.');
    if (lastDotIndex === -1) {
      // No file extension found
      return imagePath;
    }
    
    const extension = imagePath.substring(lastDotIndex + 1).toLowerCase();
    
    // Only convert jpg, jpeg, and png to webp
    if (!['jpg', 'jpeg', 'png'].includes(extension)) {
      return imagePath;
    }
    
    // Create the WebP version path
    return `${imagePath.substring(0, lastDotIndex)}.webp`;
  };
  
  // Generate srcset for responsive images
  const generateSrcSet = (imagePath: string): string => {
    const webpPath = generateWebPPath(imagePath);
    
    // Create srcset with multiple sizes
    const basePath = webpPath.replace(/\.\w+$/, '');
    const ext = webpPath.substring(webpPath.lastIndexOf('.'));
    
    return `${webpPath} 1x, ${basePath}@2x${ext} 2x`;
  };
  
  // Generate original format srcset for fallback
  const generateFallbackSrcSet = (imagePath: string): string => {
    const basePath = imagePath.replace(/\.\w+$/, '');
    const ext = imagePath.substring(imagePath.lastIndexOf('.'));
    
    return `${imagePath} 1x, ${basePath}@2x${ext} 2x`;
  };
  
  // Style for aspect ratio
  const imageStyle: React.CSSProperties = {
    objectFit,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width ? { width: `${width}px` } : { width: '100%' }),
    ...(height ? { height: `${height}px` } : { height: 'auto' })
  };
  
  return (
    <picture>
      {/* WebP source */}
      <source 
        srcSet={generateSrcSet(src)} 
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Original format fallback */}
      <source 
        srcSet={generateFallbackSrcSet(src)} 
        sizes={sizes}
      />
      
      {/* Fallback img element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        // @ts-ignore - fetchpriority is valid HTML but not in TS types
        fetchpriority={fetchPriority}
        decoding={decoding}
        className={className}
        style={imageStyle}
      />
    </picture>
  );
};

export default OptimizedImage;
