import type { FilterState } from '@shared/store/filter-store';

// 일정 추가하기를 누른 상태에서 캘린더를 통해 실제 일정을 선택하지 않은 경우를 제외
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
