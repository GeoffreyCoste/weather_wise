'use client'

import {useState, useEffect} from 'react'

export const useMediaQuery = (query: string): boolean => {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== undefined) {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState(getMatches(query));

    const handleChange = () => {
        setMatches(getMatches(query));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        handleChange();

        matchMedia.addEventListener('change', handleChange);

        return () => matchMedia.removeEventListener('change', handleChange);

    }, [query]);
    
    return matches;
}