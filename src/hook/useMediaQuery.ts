import { useEffect, useMemo, useState } from 'react';

interface queryInterface {
  query: string;
}

const checkWindow = ({ query }: queryInterface) => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query);
};

export const useMediaQuery = ({ query }: queryInterface): boolean => {
  const windowMatchMedia = useMemo(() => checkWindow({ query }), [query]);
  const [mediaResponse, setMediaResponse] = useState(
    typeof windowMatchMedia === 'boolean' ? false : windowMatchMedia.matches,
  );

  const changeState = () => {
    setMediaResponse(typeof windowMatchMedia === 'boolean' ? false : windowMatchMedia.matches);
  };

  useEffect(() => {
    if (typeof windowMatchMedia !== 'boolean') {
      setMediaResponse(windowMatchMedia.matches);
      windowMatchMedia.addEventListener('change', changeState);
    }

    return () => {
      if (typeof windowMatchMedia !== 'boolean') {
        windowMatchMedia.removeEventListener('change', changeState);
      }
    };
  }, [query]);

  return mediaResponse;
};
