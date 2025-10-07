import { useState, useRef, useEffect } from 'react';
import { useSearchRegions } from '@pages/set-location/hooks/use-regions';

export default function useRegionSearch() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data: searchRegions,
    isPending,
    isError,
  } = useSearchRegions(debouncedSearchText);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClearSearchBar = () => {
    setSearchText('');
    setDebouncedSearchText('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleSetSearchText = (text: string, immediate: boolean = false) => {
    setSearchText(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (immediate) {
      setDebouncedSearchText(text);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDebouncedSearchText(text);
      }, 1500);
    }
  };

  return {
    searchText,
    handleClearSearchBar,
    handleSetSearchText,
    searchRegions,
    isPending,
    isError,
  };
}
