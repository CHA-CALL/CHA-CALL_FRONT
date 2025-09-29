interface DateTime {
  period: string;
  time: string;
}

export const formatDateTimeInfos = (dateTimeInfos?: string[]): DateTime => {
  if (!dateTimeInfos || dateTimeInfos.length === 0) {
    return { period: '', time: '' };
  }

  const dateTimeRegex = /(\d{4}-\d{2}-\d{2})\s+(\d+)시~(\d+)시/;

  const dates: string[] = [];
  let startTime = '';
  let endTime = '';

  dateTimeInfos.forEach((info) => {
    const match = info.match(dateTimeRegex);
    if (match) {
      const [, date, start, end] = match;

      dates.push(date.replace(/-/g, '.'));

      if (!startTime) {
        startTime = start.padStart(2, '0');
        endTime = end.padStart(2, '0');
      }
    }
  });


  const period = dates.length > 1
    ? `${dates[0]} - ${dates[dates.length - 1]}`
    : dates[0] || '';

  const time = startTime && endTime
    ? `${startTime}:00 - ${endTime}:00`
    : '';

  return { period, time };
}