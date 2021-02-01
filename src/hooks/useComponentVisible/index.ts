import { useRef, useState, useEffect } from 'react';

export default function useComponentVisible(
  initialVisible: boolean,
  divRef: React.RefObject<HTMLDivElement>
) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !divRef.current?.contains(event.target as Node)
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
