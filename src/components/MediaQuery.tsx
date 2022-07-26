import React from "react";
import { useMediaQuery } from "../hook/useMediaQuery";

interface propsInterface {
    orientation?: 'portait' | 'landscape';
    minResolution?: number | string;
    maxResolution?: number | string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

const MediaQuery = (props: propsInterface) => {
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
                return `(min-resolution: ${typeof value === 'string' ? value : value + 'dppx'})`;
            case 'maxResolution':
                return `(max-resolution: ${typeof value === 'string' ? value : value + 'dppx'})`;
            default:
                return ('');
        }
    }

    const array = Object.entries(props).filter(([key]) => key !== 'children');
    const line = array.map(([key, value]) => `${getProperty(key, value)}`).join('; ');
    const query = useMediaQuery({ query: line });

    if (!query) return null;

    if (typeof props.children === 'function') {
        return <div>{props.children(query)}</div>;
    }

    return <div>{props.children}</div>;
}

export default MediaQuery;