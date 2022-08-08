import { useEffect, useState } from 'react';

interface queryInterface {
  query: string;
}

export const useMediaQuery = ({ query }: queryInterface): boolean => {
  const [checkWindowState] = useState<Function>(() => ({ query }: queryInterface): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  const [state, setState] = useState(checkWindowState({ query }));

  useEffect(() => {
    setState(window.matchMedia(query).matches);

    const changeState = () => {
      setState(window.matchMedia(query).matches);
    };
    window.matchMedia(query).addEventListener('change', changeState);

    return () => {
      window.matchMedia(query).removeEventListener('change', changeState);
    };
  }, [query]);

  return state;
};
