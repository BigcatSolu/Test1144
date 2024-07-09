import { useEffect, useRef, useState } from 'react';
import './style.css'

const useIntersectionObserver = (rootMargin = '0px') => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: rootMargin,
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver;
