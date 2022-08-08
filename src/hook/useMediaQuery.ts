import { useEffect, useMemo, useState } from 'react';

interface queryInterface {
  query: string;
}

const checkWindow = ({ query }: queryInterface) => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query);
};

export const useMediaQuery = ({ query }: queryInterface): boolean => {
  const checkWindowMemo = useMemo(() => checkWindow({ query }), [query]);
  const [state, setState] = useState(typeof checkWindowMemo === 'boolean' ? false : checkWindowMemo.matches);

  const changeState = () => {
    setState(typeof checkWindowMemo === 'boolean' ? false : checkWindowMemo.matches);
  };

  useEffect(() => {
    if (typeof checkWindowMemo !== 'boolean') {
      setState(checkWindowMemo.matches);
      checkWindowMemo.addEventListener('change', changeState);
    }

    return () => {
      if (typeof checkWindowMemo !== 'boolean') {
        checkWindowMemo.removeEventListener('change', changeState);
      }
    };
  }, [query]);

  return state;
};
