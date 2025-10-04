import type { FilterState } from '@shared/store/filter-store';

export const getCleanedFilters = (filters: FilterState): FilterState => {
  const cleaned = {
    ...filters,
    schedules: filters.schedules.filter(
      schedule => schedule.startDate !== null
    ),
  };
  if (cleaned.schedules.length === 0) {
    cleaned.schedules = [{ startDate: null, endDate: null }];
  }
  return cleaned;
};
