import React from 'react';
import { useMediaQuery } from '../hook/useMediaQuery';

interface mediaQueryProps {
  orientation?: 'portrait' | 'landscape';
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

const MediaQuery = ({ children, ...props }: mediaQueryProps) => {
  const getProperty = (key: string, value: number | string) => {
    switch (key) {
      case 'orientation':
        return `(orientation: ${value})`;
      case 'minWidth':
        return `(min-width: ${value}px)`;
      case 'maxWidth':
        return `(max-width: ${value}px)`;
      case 'minHeight':
        return `(min-height: ${value}px)`;
      case 'maxHeight':
        return `(max-height: ${value}px)`;
      case 'minResolution':
        return `(min-resolution: ${typeof value === 'number' ? value + 'dppx' : value})`;
      case 'maxResolution':
        return `(max-resolution: ${typeof value === 'number' ? value + 'dppx' : value})`;
      default:
        return '';
    }
  };

  const line = Object.entries(props)
    .map(([key, value]) => `${getProperty(key, value)}`)
    .join('; ');
  const query = useMediaQuery({ query: line });

  if (typeof children === 'function') {
    return <>{children(query)}</>;
  }

  if (!query) return null;

  return <>{children}</>;
};

export default MediaQuery;
