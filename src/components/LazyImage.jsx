import { useState, useRef, useEffect } from 'react';

export default function LazyImage({ src, alt, className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsSeen(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsSeen(true);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '50px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {!isLoaded && <div className="absolute inset-0 skeleton" />}
      {isSeen && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {!isSeen && <div className="w-full h-full bg-gray-100 dark:bg-dark-700 skeleton" />}
    </div>
  );
}
