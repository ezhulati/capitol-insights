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
}

/**
 * OptimizedImage component that serves WebP images with JPG fallback
 * and provides responsive image sizes for better performance
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
  objectFit = 'cover'
}) => {
  // Extract the base filename without extension
  const basePath = src.replace(/\.(jpg|jpeg|png)$/, '');
  const baseName = basePath.split('/').pop();
  
  // Create WebP source path
  const webpSrc = `/images/webp/${baseName}.webp`;
  const webpSrcSmall = `/images/webp/${baseName}-400.webp`;
  const webpSrcLarge = `/images/webp/${baseName}-1200.webp`;
  
  // Create fallback JPG srcset
  const jpgSrcset = `${src} 800w, ${src}?width=400 400w, ${src}?width=1200 1200w`;
  
  // Create WebP srcset
  const webpSrcset = `${webpSrc} 800w, ${webpSrcSmall} 400w, ${webpSrcLarge} 1200w`;
  
  // Style for object-fit
  const style = objectFit ? { objectFit } : undefined;
  
  return (
    <picture>
      {/* WebP source */}
      <source
        srcSet={webpSrcset}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* Fallback JPG source */}
      <source
        srcSet={jpgSrcset}
        sizes={sizes}
        type="image/jpeg"
      />
      
      {/* Fallback image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        decoding={loading === 'eager' ? 'sync' : 'async'}
      />
    </picture>
  );
};

export default OptimizedImage;