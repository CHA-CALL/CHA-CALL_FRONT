import type { FilterState } from '@shared/store/filter-store';

export const getCleanedFilters = (filters: FilterState): FilterState => {
  const cleaned = {
    ...filters,
    date: filters.date.filter(d => d.startDate !== null),
  };
  if (cleaned.date.length === 0) {
    cleaned.date = [{ startDate: null, endDate: null }];
  }
  return cleaned;
};
