export default function getScheduleDays(year: number, month: number) {
  const prevFillCount = new Date(year, month - 1, 1).getDay();
  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
  const prevStartDate = prevMonthLastDate - prevFillCount + 1;

  const prevDates = Array.from({ length: prevFillCount }, (_, i) => {
    return new Date(year, month - 2, prevStartDate + i);
  });

  const thisDates = Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );

  const baseLen = prevDates.length + thisDates.length;
  const targetLength = baseLen > 35 ? 42 : 35;
  const nextDates = Array.from(
    { length: targetLength - baseLen },
    (_, i) => new Date(year, month, i + 1)
  );

  const dates = [...prevDates, ...thisDates, ...nextDates];

  return dates;
}
