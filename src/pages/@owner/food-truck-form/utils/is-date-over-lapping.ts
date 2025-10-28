import type { AvailableDate } from '@pages/@owner/food-truck-form/types/available-date';

export const isDateOverlapping = (
  newId: string,
  newStartDate: string,
  newEndDate: string,
  dates: AvailableDate[]
) => {
  const newStart = toDateOnly(newStartDate);
  const newEnd = toDateOnly(newEndDate);

  if (!newStart) return false;

  const newRangeStart = newStart;
  const newRangeEnd = newEnd || newStart;

  return dates.some(date => {
    if (newId && date.id === newId) return false;

    const existingStartOnly = toDateOnly(date.startDate);
    const existingEndOnly = toDateOnly(date.endDate);

    if (!existingStartOnly) return false;

    const existingRangeStart = existingStartOnly;
    const existingRangeEnd = existingEndOnly || existingStartOnly;

    const noOverlap =
      newRangeEnd < existingRangeStart || existingRangeEnd < newRangeStart;
    return !noOverlap;
  });
};

const toDateOnly = (isoLike: string): string => {
  if (!isoLike) return '';
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};
