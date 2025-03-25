import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lowQualitySrc?: string;
  placeholderColor?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  lowQualitySrc,
  placeholderColor = '#f3f4f6',
  aspectRatio = '16/9',
  objectFit = 'cover',
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

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor,
    aspectRatio,
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

  return (
    <div ref={ref} style={containerStyle} className={className}>
      {inView && (
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
            />
          )}
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            style={imageStyle}
            loading="lazy"
            {...props}
          />
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