interface CalendarDays {
  prevDates: number[];
  thisDates: number[];
  nextDates: number[];
}

export const useCalendarDays = (year: number, month: number): CalendarDays => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const prevLastDay = new Date(year, month - 1, 0);

  const prevFillCount = firstDay.getDay();
  const prevStart = prevLastDay.getDate() - prevFillCount + 1;
  const prevDates = Array.from(
    { length: prevFillCount },
    (_, i) => prevStart + i
  );

  const thisDates = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);

  const baseLen = prevDates.length + thisDates.length;
  const targetLength = baseLen > 35 ? 42 : 35;
  const nextCount = targetLength - baseLen;
  const nextDates = Array.from({ length: nextCount }, (_, i) => i + 1);

  return { prevDates, thisDates, nextDates };
};
