import { useEffect, useState } from 'react';

interface queryInterface {
  query: string;
}
export const useMediaQuery = ({ query }: queryInterface): boolean => {
  const [state, setState] = useState(window.matchMedia(query).matches);

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
