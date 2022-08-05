import { useEffect, useState } from 'react';

interface queryInterface {
  query: string;
}

const checkWindow = ({ query }: queryInterface): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

export const useMediaQuery = ({ query }: queryInterface): boolean => {
  const [state, setState] = useState(checkWindow({ query }));

  useEffect(() => {
    setState(window.matchMedia(query).matches);

    const changeState = () => {
      setState(window.matchMedia(query).matches);
    };
    window.addEventListener('resize', changeState);

    return () => {
      window.removeEventListener('resize', changeState);
    };
  }, [query]);

  return state;
};
