import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current.disconnect(); // Stop observing after the first intersection
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;
