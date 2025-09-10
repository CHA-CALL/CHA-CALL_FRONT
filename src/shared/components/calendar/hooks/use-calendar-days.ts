interface CalendarDays {
  prevDates: number[];
  thisDates: number[];
  nextDates: number[];
}

export default function useCalendarDays(
  year: number,
  month: number
): CalendarDays {
  const prevFillCount = new Date(year, month - 1, 1).getDay();
  const prevStart =  new Date(year, month - 1, 0).getDate() - prevFillCount + 1;
  const prevDates = Array.from(
    { length: prevFillCount },
    (_, i) => prevStart + i
  );

  const thisDates = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

  const baseLen = prevDates.length + thisDates.length;
  const targetLength = baseLen > 35 ? 42 : 35;
  const nextDates = Array.from({ length:  targetLength - baseLen }, (_, i) => i + 1);

  return { prevDates, thisDates, nextDates };
}
