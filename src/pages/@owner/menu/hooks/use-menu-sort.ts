import { useState } from 'react';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';

export const useMenuSort = () => {
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);

  const handleSortByLatest = () => {
    setIsSorted(SORT_TYPES.LATEST);
  };

  const handleSortByOldest = () => {
    setIsSorted(SORT_TYPES.OLDEST);
  };

  return {
    isSorted,
    handleSortByLatest,
    handleSortByOldest,
  };
};
