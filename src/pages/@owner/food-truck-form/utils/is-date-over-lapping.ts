import type { AvailableDate } from '@pages/@owner/food-truck-form/types/available-date';

export const isDateOverlapping = (
  newId: string,
  newStartDate: string,
  newEndDate: string,
  dates: AvailableDate[]
) => {
  const newStart = new Date(newStartDate);
  const newEnd = new Date(newEndDate);

  return dates.some(date => {
    if (newId && date.id === newId) return false;

    const existingStart = new Date(date.startDate);
    const existingEnd = new Date(date.endDate);

    return (
      (newStart > existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd < existingEnd) ||
      (newStart < existingStart && newEnd > existingEnd) ||
      (newStart === existingStart && newEnd === existingEnd)
    );
  });
};
