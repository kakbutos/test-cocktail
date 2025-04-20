import { FC, useState, useRef, useEffect } from 'react';
import './LazyImage.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`lazy-image ${className}`} ref={imgRef}>
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
            onLoad={handleImageLoad}
          />
          {!isLoaded && <div className="lazy-image__placeholder" />}
        </>
      )}
      {!isInView && <div className="lazy-image__placeholder" />}
    </div>
  );
};
